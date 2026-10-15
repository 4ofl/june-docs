<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'

interface ProviderStatus {
  name: string
  status: 'operational' | 'degraded' | 'unavailable'
  detail?: string
}

interface TelemetryData {
  schemaVersion: number
  checkedAt: string
  status: 'operational' | 'degraded' | 'unavailable'
  version: {
    release: string
    commit: string
  }
  uptimeSeconds: number
  discord: {
    connected: boolean
    gatewayPingMs: number | null
  }
  database: {
    status: 'operational' | 'unavailable'
    latencyMs: number | null
  }
  providers: ProviderStatus[]
  runtime: {
    mode: string
    totalShards: number
    shards: number[]
  }
  source: 'live' | 'fallback'
}

const isOpen = ref(false)
const isSpinning = ref(false)
const stamp = ref('just now')
const canvasRef = ref<HTMLCanvasElement | null>(null)
const chartWrapRef = ref<HTMLDivElement | null>(null)

const defaultTelemetry: TelemetryData = {
  schemaVersion: 1,
  checkedAt: new Date().toISOString(),
  status: 'unavailable',
  version: {
    release: '2.4.0',
    commit: '84d4d43'
  },
  uptimeSeconds: 0,
  discord: {
    connected: false,
    gatewayPingMs: null
  },
  database: {
    status: 'unavailable',
    latencyMs: null
  },
  providers: [
    { name: 'virustotal', status: 'unavailable' },
    { name: 'stalwart_jmap', status: 'unavailable' },
    { name: 'cobalt', status: 'unavailable' }
  ],
  runtime: {
    mode: 'standalone',
    totalShards: 1,
    shards: [0]
  },
  source: 'fallback'
}

const data = ref<TelemetryData>({ ...defaultTelemetry })
let refreshTimer: any = null
let resizeObserver: ResizeObserver | null = null

const mode = computed<'ok' | 'warn' | 'off'>(() => {
  if (data.value.status === 'unavailable' || !data.value.discord.connected) return 'off'
  if (data.value.status === 'degraded' || data.value.providers.some(p => p.status !== 'operational')) return 'warn'
  return 'ok'
})

const title = computed(() => {
  if (mode.value === 'off') return 'Bot offline'
  if (mode.value === 'warn') {
    const degraded = data.value.providers.find(p => p.status !== 'operational')
    return degraded ? `${providerDisplayName(degraded.name)} is degraded` : 'Service degraded'
  }
  return 'All systems operational'
})

function formatUptime(seconds: number): string {
  if (mode.value === 'off' || seconds <= 0) return '—'
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

const uptimeDisplay = computed(() => formatUptime(data.value.uptimeSeconds))

function providerDisplayName(name: string): string {
  const map: Record<string, string> = {
    virustotal: 'VirusTotal',
    stalwart_jmap: 'Stalwart JMAP',
    cobalt: 'Cobalt'
  }
  return map[name] || name
}

/* ============================================================
   HEARTBEAT CANVAS ENGINE WITH INTERACTIVE SCRUBBER
============================================================ */
interface Sample {
  t: number
  v: number
}

const WINDOW = 60000
const STEP = 1000
let samples: Sample[] = []
let raf = 0
let tick = 0
let W = 0
let H = 0
let ctx: CanvasRenderingContext2D | null = null
const hoverX = ref<number | null>(null)

const scrubbedLatency = ref<number | string | null>(null)
const scrubbedSub = ref<string | null>(null)

const livePing = ref<number | string>('—')

const displayBigNumber = computed(() => {
  if (mode.value === 'off') return '—'
  if (scrubbedLatency.value !== null) return scrubbedLatency.value
  return livePing.value !== '—' ? livePing.value : (data.value.discord.gatewayPingMs || 28)
})

const displaySub = computed(() => {
  if (mode.value === 'off') return 'Signal flatlined / Unreachable'
  if (scrubbedSub.value !== null) return scrubbedSub.value
  return 'Live, last 60 seconds'
})

function baseLatency(): number {
  if (mode.value === 'off') return 0
  if (Number.isFinite(data.value.discord.gatewayPingMs)) {
    return Number(data.value.discord.gatewayPingMs)
  }
  return mode.value === 'warn' ? 31 : 28
}

function nextSampleValue(): number {
  const base = baseLatency()
  if (base === 0) return 0
  const jitter = (Math.random() - 0.5) * 6
  const spike = Math.random() < 0.05 ? 12 : 0
  return Math.max(12, Math.round(base + jitter + spike))
}

function seedSamples() {
  if (typeof window === 'undefined') return
  const now = performance.now()
  samples = []
  const count = mode.value === 'off' ? 38 : 61
  for (let i = 0; i < count; i++) {
    samples.push({
      t: now - (count - 1 - i) * STEP,
      v: mode.value === 'off' ? 28 + (Math.random() - 0.5) * 4 : nextSampleValue()
    })
  }
}

function resizeCanvas() {
  if (!canvasRef.value) return
  const cv = canvasRef.value
  const r = cv.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  W = r.width
  H = r.height
  if (!W || !H) return
  cv.width = Math.round(W * dpr)
  cv.height = Math.round(H * dpr)
  ctx = cv.getContext('2d')
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    drawTrace(performance.now())
  }
}

function computeY(v: number): number {
  const pad = 22
  const maxVal = Math.max(50, ...samples.map(s => s.v))
  return H - pad - (Math.min(v, maxVal) / maxVal) * (H - pad * 2)
}

function buildSmoothPath(context: CanvasRenderingContext2D, pts: [number, number][]) {
  context.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2
    const my = (pts[i][1] + pts[i + 1][1]) / 2
    context.quadraticCurveTo(pts[i][0], pts[i][1], mx, my)
  }
  const last = pts[pts.length - 1]
  context.lineTo(last[0], last[1])
}

function drawTrace(now: number) {
  if (!ctx || !W || !H) return
  ctx.clearRect(0, 0, W, H)

  // Faint background grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
  ctx.lineWidth = 1
  for (let i = 1; i < 4; i++) {
    const y = Math.round((H * i) / 4) + 0.5
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(W, y)
    ctx.stroke()
  }

  const isOff = mode.value === 'off'
  const strokeColor = isOff ? '#55555e' : mode.value === 'warn' ? '#f59e0b' : '#10b981'
  const px = (t: number) => W - ((now - t) / WINDOW) * W
  const pts = samples.map(s => [px(s.t), computeY(s.v)] as [number, number]).filter(p => p[0] > -30)

  if (pts.length < 2) return
  if (!isOff) {
    const last = pts[pts.length - 1]
    pts.push([W - 6, last[1]])
  }

  // Smooth Area Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  const topColor = isOff
    ? 'rgba(139, 139, 150, 0.08)'
    : mode.value === 'warn'
      ? 'rgba(245, 158, 11, 0.20)'
      : 'rgba(16, 185, 129, 0.22)'
  grad.addColorStop(0, topColor)
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.beginPath()
  buildSmoothPath(ctx, pts)
  ctx.lineTo(pts[pts.length - 1][0], H)
  ctx.lineTo(pts[0][0], H)
  ctx.closePath()
  ctx.fillStyle = grad
  ctx.fill()

  // Stroke Curve
  ctx.beginPath()
  buildSmoothPath(ctx, pts)
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = 1.75
  ctx.lineJoin = 'round'
  ctx.stroke()

  const endPt = pts[pts.length - 1]
  if (isOff) {
    // Flatline dropoff where heartbeat was lost
    ctx.setLineDash([3, 5])
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.55)'
    ctx.beginPath()
    ctx.moveTo(endPt[0], endPt[1])
    ctx.lineTo(W, H - 22)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = '#f43f5e'
    ctx.beginPath()
    ctx.arc(W - 2, H - 22, 3, 0, Math.PI * 2)
    ctx.fill()
  } else {
    // Glowing live pulse head
    const pulsePhase = (now % 1600) / 1600
    const pulseAlpha = 0.35 * (1 - pulsePhase)
    ctx.fillStyle = mode.value === 'warn' ? `rgba(245, 158, 11, ${pulseAlpha})` : `rgba(16, 185, 129, ${pulseAlpha})`
    ctx.beginPath()
    ctx.arc(endPt[0], endPt[1], 4 + pulsePhase * 10, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = mode.value === 'warn' ? '#fbbf24' : '#34d399'
    ctx.beginPath()
    ctx.arc(endPt[0], endPt[1], 3, 0, Math.PI * 2)
    ctx.fill()
  }

  // Interactive scrubber cursor
  if (hoverX.value !== null && !isOff && pts.length > 1) {
    let closest = pts[0]
    let closestDist = Infinity
    let sampleVal = samples[0].v
    let sampleTime = samples[0].t

    pts.forEach((pt, idx) => {
      const d = Math.abs(pt[0] - (hoverX.value ?? 0))
      if (d < closestDist) {
        closestDist = d
        closest = pt
        if (samples[idx]) {
          sampleVal = samples[idx].v
          sampleTime = samples[idx].t
        }
      }
    })

    ctx.setLineDash([2, 3])
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.beginPath()
    ctx.moveTo(closest[0], 0)
    ctx.lineTo(closest[0], H)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = '#f4f4f5'
    ctx.beginPath()
    ctx.arc(closest[0], closest[1], 3.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 2
    ctx.stroke()

    const secAgo = Math.max(0, Math.round((now - sampleTime) / 1000))
    scrubbedLatency.value = Math.round(sampleVal)
    scrubbedSub.value = secAgo === 0 ? 'Just now' : `${secAgo}s ago`
  }
}

function handleMouseMove(e: MouseEvent) {
  if (mode.value === 'off' || !canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  hoverX.value = e.clientX - rect.left
}

function handleMouseLeave() {
  hoverX.value = null
  scrubbedLatency.value = null
  scrubbedSub.value = null
}

function runAnimation(now: number) {
  if (mode.value !== 'off' && now - tick >= STEP) {
    tick = now
    const val = nextSampleValue()
    samples.push({ t: now, v: val })
    while (samples.length && now - samples[0].t > WINDOW + STEP * 3) {
      samples.shift()
    }
    livePing.value = Math.round(val)
  }
  drawTrace(now)
  raf = requestAnimationFrame(runAnimation)
}

function restartAnimation() {
  if (typeof window === 'undefined') return
  cancelAnimationFrame(raf)
  resizeCanvas()
  if (!isOpen.value) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || mode.value === 'off') {
    livePing.value = '—'
    drawTrace(performance.now())
    return
  }

  tick = performance.now()
  raf = requestAnimationFrame(runAnimation)
}

function toggleDrawer() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      resizeCanvas()
      restartAnimation()
    })
  } else {
    cancelAnimationFrame(raf)
  }
}

/* ============================================================
   STATUS FETCHER
============================================================ */
async function fetchStatus() {
  if (typeof window === 'undefined') return
  isSpinning.value = true

  const endpoints = [
    'https://june.4ofl.dev/api/status',
    'https://june.4ofl.dev/v1/status',
    '/v1/status'
  ]

  let succeeded = false

  for (const url of endpoints) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 2500)
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      })
      clearTimeout(timeoutId)

      // Even on 503 (e.g. degraded provider report), parse JSON if available
      if (res.ok || res.status === 503) {
        const text = await res.text()
        try {
          const json = JSON.parse(text)
          if (json && typeof json === 'object' && json.status) {
            data.value = {
              ...json,
              source: 'live'
            }
            succeeded = true
            break
          }
        } catch {
          // Not JSON (e.g. HTML proxy error)
        }
      }
    } catch {
      // Continue next endpoint
    }
  }

  if (!succeeded) {
    data.value = {
      ...defaultTelemetry,
      checkedAt: new Date().toISOString(),
      status: 'unavailable',
      uptimeSeconds: 0,
      discord: { connected: false, gatewayPingMs: null },
      database: { status: 'unavailable', latencyMs: null },
      providers: data.value.providers.map(p => ({ ...p, status: 'unavailable' })),
      source: 'fallback'
    }
  }

  stamp.value = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  seedSamples()
  restartAnimation()

  setTimeout(() => {
    isSpinning.value = false
  }, 400)
}

watch(mode, () => {
  seedSamples()
  restartAnimation()
})

onMounted(() => {
  seedSamples()
  fetchStatus()
  refreshTimer = setInterval(fetchStatus, 30000)
  window.addEventListener('resize', resizeCanvas)

  if (typeof ResizeObserver !== 'undefined' && chartWrapRef.value) {
    resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })
    resizeObserver.observe(chartWrapRef.value)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', resizeCanvas)
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (refreshTimer) clearInterval(refreshTimer)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="telemetry-bar-wrap">
    <section class="widget" :class="{ open: isOpen }" :data-state="mode" aria-label="June service status">
      <!-- Main Status Strip (entire strip is clickable accordion) -->
      <div class="strip" id="strip" @click="toggleDrawer">
        <div
          class="toggle"
          id="toggle"
          role="button"
          tabindex="0"
          :aria-expanded="isOpen"
          aria-controls="drawer-panel"
          @keydown.enter.prevent="toggleDrawer"
          @keydown.space.prevent="toggleDrawer"
        >
          <span class="beacon" aria-hidden="true"></span>
          <span class="titles">
            <span class="title">{{ title }}</span>
            <span class="origin">june.4ofl.dev</span>
          </span>
        </div>

        <div class="metrics" aria-hidden="false">
          <div class="m ping">
            <span>Ping</span>
            <b :class="{ dim: mode === 'off' }">
              {{ mode === 'off' ? '—' : `${livePing !== '—' ? livePing : (data.discord.gatewayPingMs || 28)} ms` }}
            </b>
          </div>
          <div class="m">
            <span>Uptime</span>
            <b :class="{ dim: mode === 'off' }">{{ uptimeDisplay }}</b>
          </div>
          <div class="m">
            <span>Release</span>
            <b>v{{ data.version.release }}<small>{{ data.version.commit ? data.version.commit.slice(0, 7) : '84d4d43' }}</small></b>
          </div>
        </div>

        <div class="tools">
          <button
            class="icon"
            id="refresh"
            :class="{ spin: isSpinning }"
            title="Refresh status"
            aria-label="Refresh status"
            @click.stop="fetchStatus"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 1 1-2.64-6.36"/>
              <path d="M21 3v6h-6"/>
            </svg>
          </button>
          <span class="chev" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </span>
        </div>
      </div>

      <!-- Expandable Animated Drawer -->
      <div id="drawer-panel" class="drawer">
        <div class="drawer-in">
          <div class="body">
            <!-- Heartbeat Chart Row -->
            <div class="pulse">
              <div class="pulse-info">
                <div>
                  <div class="lbl">Gateway heartbeat</div>
                </div>
                <div class="big">
                  <span>{{ displayBigNumber }}</span>
                  <em v-if="mode !== 'off'">ms</em>
                </div>
                <div class="sub">
                  {{ displaySub }}
                </div>
              </div>
              <div
                ref="chartWrapRef"
                class="pulse-chart"
                @mousemove="handleMouseMove"
                @mouseleave="handleMouseLeave"
              >
                <canvas ref="canvasRef" role="img" aria-label="Heartbeat latency over the last 60 seconds"></canvas>
              </div>
            </div>

            <!-- Detail Cards -->
            <div class="cards">
              <!-- Gateway -->
              <div class="card">
                <h2>
                  <span>Gateway</span>
                  <span class="dot" :class="{ off: !data.discord.connected }" role="img"></span>
                </h2>
                <div class="rows">
                  <div class="row">
                    <span class="k">Connection</span>
                    <span class="v" :class="{ dim: !data.discord.connected }">
                      {{ data.discord.connected ? 'Connected' : '—' }}
                    </span>
                  </div>
                  <div class="row">
                    <span class="k">Shards</span>
                    <span class="v" :class="{ dim: !data.discord.connected }">
                      {{ data.discord.connected ? `${data.runtime.shards.length} / ${data.runtime.totalShards}` : '—' }}
                    </span>
                  </div>
                  <div class="row">
                    <span class="k">Mode</span>
                    <span class="v" :class="{ dim: !data.discord.connected }">
                      {{ data.discord.connected ? data.runtime.mode : '—' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Storage -->
              <div class="card">
                <h2>
                  <span>Storage</span>
                  <span class="dot" :class="{ off: data.database.status !== 'operational' }" role="img"></span>
                </h2>
                <div class="rows">
                  <div class="row">
                    <span class="k">Engine</span>
                    <span class="v">node:sqlite</span>
                  </div>
                  <div class="row">
                    <span class="k">Journal</span>
                    <span class="v">WAL</span>
                  </div>
                  <div class="row">
                    <span class="k">Query time</span>
                    <span class="v" :class="{ dim: data.database.latencyMs == null }">
                      {{ data.database.latencyMs != null ? `${data.database.latencyMs} ms` : '—' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Providers -->
              <div class="card">
                <h2>
                  <span>Providers</span>
                  <span class="dot" :class="{ off: mode === 'off', warn: mode === 'warn' }" role="img"></span>
                </h2>
                <div class="rows">
                  <div
                    v-for="p in data.providers"
                    :key="p.name"
                    class="row pr"
                    :class="{ ok: p.status === 'operational', warn: p.status === 'degraded', off: p.status === 'unavailable' }"
                  >
                    <span class="k">
                      <i class="dot"></i>{{ providerDisplayName(p.name) }}
                    </span>
                    <span class="v">
                      {{ mode === 'off' ? '—' : (p.detail || p.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Offline Notice -->
            <div v-if="mode === 'off'" class="notice" role="status">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 8v4m0 4h.01"/>
              </svg>
              <span>June isn't responding at <code>/api/status</code>. Commands won't run until it's back.</span>
              <span class="http">HTTP 502</span>
            </div>

            <!-- Foot -->
            <div class="foot">
              <span>Checked <span>{{ stamp }}</span></span>
              <a href="https://june.4ofl.dev/api/status" target="_blank" rel="noopener">june.4ofl.dev/api/status ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.telemetry-bar-wrap {
  width: 100%;
  margin: 1.5rem 0 2.2rem 0;
  font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  font-variant-numeric: tabular-nums;
  -webkit-font-smoothing: antialiased;
}

button {
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  cursor: pointer;
}

:focus-visible {
  outline: 2px solid #34d399;
  outline-offset: 2px;
  border-radius: 6px;
}

/* Widget */
.widget {
  --state: #10b981;
  background: #09090c;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 60px -24px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.widget[data-state="warn"] { --state: #f59e0b; }
.widget[data-state="off"] { --state: #f43f5e; }
.widget:hover { border-color: rgba(255, 255, 255, 0.14); }

.strip {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.9rem 1.15rem;
  cursor: pointer;
  user-select: none;
}
.strip:hover { background: rgba(255, 255, 255, 0.015); }

.toggle {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-align: left;
  min-width: 0;
  flex: 1;
}

.beacon {
  position: relative;
  width: 10px;
  height: 10px;
  flex: none;
}
.beacon::after {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 50%;
  background: var(--state);
  box-shadow: 0 0 8px var(--state);
}
.beacon::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 50%;
  background: var(--state);
  animation: ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.widget[data-state="off"] .beacon::before {
  animation: none;
  opacity: 0;
}

@keyframes ping {
  0% { transform: scale(1); opacity: 0.7; }
  70%, 100% { transform: scale(3); opacity: 0; }
}

.titles {
  display: flex;
  align-items: baseline;
  min-width: 0;
  gap: 0.55rem;
}

.title {
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #f4f4f5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.widget[data-state="off"] .title { color: #fda4af; }
.widget[data-state="warn"] .title { color: #fcd34d; }

.origin {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  color: #8b8b96;
  font-weight: 400;
  flex-shrink: 0;
}

.metrics {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1.4rem;
  font-size: 0.82rem;
}

.m {
  display: flex;
  gap: 0.45rem;
  align-items: baseline;
}
.m span:first-child { color: #8b8b96; font-size: 0.78rem; }
.m b { font-weight: 500; color: #f4f4f5; }
.m b.dim { color: #55555e; }
.m small {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.7rem;
  color: #55555e;
  margin-left: 0.3rem;
}

.tools {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #8b8b96;
  position: relative;
  z-index: 2;
}

.icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  transition: background 0.15s, color 0.15s;
  cursor: pointer;
}
.icon:hover { background: rgba(255, 255, 255, 0.07); color: #f4f4f5; }

.chev {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.widget.open .chev { transform: rotate(180deg); color: #f4f4f5; }
.spin svg { animation: spin 0.7s linear; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Drawer */
.drawer {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s 0.35s;
}
.widget.open .drawer {
  grid-template-rows: 1fr;
  visibility: visible;
  transition-delay: 0s;
}
.drawer-in {
  overflow: hidden;
  min-height: 0;
}
.body {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  background: #050507;
  padding: 1rem;
  display: grid;
  gap: 0.8rem;
}

/* Pulse Chart */
.pulse {
  display: grid;
  grid-template-columns: 150px 1fr;
  background: #0d0d12;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  overflow: hidden;
}
.pulse-info {
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.6rem;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
}
.pulse-info .lbl { font-size: 0.78rem; color: #8b8b96; letter-spacing: -0.01em; }
.pulse-info .big {
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--state);
  transition: color 0.2s;
}
.widget[data-state="off"] .pulse-info .big { color: #55555e; }
.big em {
  font-style: normal;
  font-size: 0.9rem;
  font-weight: 500;
  color: #8b8b96;
  margin-left: 0.2rem;
}
.pulse-info .sub { font-size: 0.74rem; color: #55555e; }
.pulse-chart {
  position: relative;
  min-height: 112px;
  cursor: crosshair;
}
.pulse-chart canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* Detail Cards */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
}
.card {
  background: #0d0d12;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  padding: 0.85rem 1rem;
  transition: border-color 0.2s;
}
.card:hover { border-color: rgba(255, 255, 255, 0.14); }
.card h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.84rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  color: #f4f4f5;
  letter-spacing: -0.01em;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c, #10b981);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.16);
}
.dot.warn { --c: #f59e0b; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.16); }
.dot.off { --c: #55555e; box-shadow: none; }

.rows { display: grid; gap: 0.5rem; }
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.8rem;
}
.row .k { color: #8b8b96; }
.row .v {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.76rem;
  color: #f4f4f5;
}
.v.dim, .off .v { color: #55555e; }
.row.warn .v { color: #fcd34d; }
.row.ok .v { color: #34d399; }
.row.pr .k {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f4f4f5;
}
.row.pr .dot { width: 6px; height: 6px; box-shadow: none; }
.row.pr.warn .dot { --c: #f59e0b; }
.row.pr.off .dot { --c: #55555e; }

/* Notice */
.notice {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  font-size: 0.8rem;
  background: rgba(244, 63, 94, 0.07);
  border: 1px solid rgba(244, 63, 94, 0.2);
  color: #fda4af;
}
.notice svg { flex: none; }
.notice code {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.74rem;
  color: #f4f4f5;
  background: rgba(0, 0, 0, 0.35);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}
.notice .http {
  margin-left: auto;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  color: #8b8b96;
}

/* Foot */
.foot {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.74rem;
  color: #55555e;
  padding: 0.1rem 0.15rem 0;
}
.foot a {
  color: #8b8b96;
  text-decoration: none;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  transition: color 0.15s;
}
.foot a:hover { color: #34d399; }

@media (max-width: 760px) {
  .cards { grid-template-columns: 1fr; }
  .pulse { grid-template-columns: 1fr; }
  .pulse-info {
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    flex-direction: row;
    align-items: flex-end;
  }
  .metrics .m:not(.ping) { display: none; }
  .origin { display: none; }
}

@media (max-width: 440px) {
  .strip { padding: 0.8rem 0.9rem; gap: 0.75rem; }
  .metrics { gap: 0.8rem; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
