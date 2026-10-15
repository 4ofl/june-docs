<script setup lang="ts">
import { ref, computed } from 'vue'

const inputTarget = ref('http://0177.0.0.1/admin')

const presets = [
  { label: 'Octal 0177.0.0.1', value: 'http://0177.0.0.1/admin' },
  { label: 'AWS Metadata (IPv4-Mapped)', value: 'http://[::ffff:169.254.169.254]/latest/meta-data' },
  { label: 'DWORD Integer (2130706433)', value: 'http://2130706433/' },
  { label: 'Linux 0.0.0.0', value: 'http://0.0.0.0:80/' },
  { label: 'RFC 1918 (10.250.1.1)', value: 'http://10.250.1.1/internal' },
  { label: 'IPv6 ULA (fc00::1)', value: 'http://[fc00::1]/service' },
  { label: 'Public (docs.june.4ofl.dev)', value: 'https://docs.june.4ofl.dev/' }
]

interface InspectionResult {
  validUrl: boolean
  urlObj?: URL
  rawHostname: string
  canonicalIp: string
  ipFamily: 4 | 6 | null
  isBlocked: boolean
  matchedRule: string | null
  disposition: string
  steps: { name: string; status: 'ok' | 'blocked' | 'warning'; detail: string }[]
}

function parseDword(str: string): string | null {
  const num = Number(str)
  if (!Number.isInteger(num) || num < 0 || num > 0xffffffff) return null
  return `${(num >>> 24) & 255}.${(num >>> 16) & 255}.${(num >>> 8) & 255}.${num & 255}`
}

function parseOctalOrHexIpv4(host: string): string | null {
  const parts = host.split('.')
  if (parts.length !== 4) return null
  const nums: number[] = []
  for (const part of parts) {
    let n: number
    if (/^0x[0-9a-f]+$/i.test(part)) n = parseInt(part, 16)
    else if (/^0[0-7]+$/.test(part)) n = parseInt(part, 8)
    else if (/^\d+$/.test(part)) n = parseInt(part, 10)
    else return null
    if (n < 0 || n > 255) return null
    nums.push(n)
  }
  return nums.join('.')
}

function evaluateIpv4(address: string): { blocked: boolean; rule: string | null } {
  const p = address.split('.').map(Number)
  if (p.length !== 4 || p.some(x => isNaN(x) || x < 0 || x > 255)) return { blocked: true, rule: 'Malformed IPv4' }
  const [a, b, c] = p

  if (a === 0) return { blocked: true, rule: '0.0.0.0/8 (Current network / Linux localhost alias)' }
  if (a === 10) return { blocked: true, rule: '10.0.0.0/8 (RFC 1918 Private Address)' }
  if (a === 100 && b >= 64 && b <= 127) return { blocked: true, rule: '100.64.0.0/10 (RFC 6598 Carrier-Grade NAT)' }
  if (a === 127) return { blocked: true, rule: '127.0.0.0/8 (Loopback / Localhost)' }
  if (a === 169 && b === 254) return { blocked: true, rule: '169.254.0.0/16 (Link-Local / Cloud Instance Metadata)' }
  if (a === 172 && b >= 16 && b <= 31) return { blocked: true, rule: '172.16.0.0/12 (RFC 1918 Private Address)' }
  if (a === 192 && b === 0 && c === 0) return { blocked: true, rule: '192.0.0.0/24 (IETF Protocol Assignments)' }
  if (a === 192 && b === 0 && c === 2) return { blocked: true, rule: '192.0.2.0/24 (TEST-NET-1 Documentation)' }
  if (a === 192 && b === 168) return { blocked: true, rule: '192.168.0.0/16 (RFC 1918 Private Address)' }
  if (a === 198 && (b === 18 || b === 19)) return { blocked: true, rule: '198.18.0.0/15 (Benchmarking Subnet)' }
  if (a === 198 && b === 51 && c === 100) return { blocked: true, rule: '198.51.100.0/24 (TEST-NET-2 Documentation)' }
  if (a === 203 && b === 0 && c === 113) return { blocked: true, rule: '203.0.113.0/24 (TEST-NET-3 Documentation)' }
  if (a >= 224 && a <= 239) return { blocked: true, rule: '224.0.0.0/4 (Class D Multicast)' }
  if (a >= 240) return { blocked: true, rule: '240.0.0.0/4 (Class E Reserved)' }

  return { blocked: false, rule: null }
}

function inspectTarget(input: string): InspectionResult {
  const steps: { name: string; status: 'ok' | 'blocked' | 'warning'; detail: string }[] = []

  let raw = String(input || '').trim()
  if (!raw.includes('://')) raw = 'http://' + raw

  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return {
      validUrl: false,
      rawHostname: raw,
      canonicalIp: 'None',
      ipFamily: null,
      isBlocked: true,
      matchedRule: 'Invalid URL format',
      disposition: 'Rejected at URL Parser',
      steps: [{ name: 'URL Protocol & Parsing', status: 'blocked', detail: 'Invalid URL syntax' }]
    }
  }

  // Step 1: Protocol & Credentials
  if (!['http:', 'https:'].includes(url.protocol)) {
    steps.push({ name: 'Protocol Check', status: 'blocked', detail: `Protocol '${url.protocol}' rejected. Only http and https allowed.` })
    return { validUrl: false, rawHostname: url.hostname, canonicalIp: 'None', ipFamily: null, isBlocked: true, matchedRule: 'Non-HTTP protocol', disposition: 'Rejected', steps }
  }
  if (url.username || url.password) {
    steps.push({ name: 'Credential Sanitization', status: 'blocked', detail: 'Embedded HTTP credentials detected and rejected.' })
    return { validUrl: false, rawHostname: url.hostname, canonicalIp: 'None', ipFamily: null, isBlocked: true, matchedRule: 'Embedded credentials blocked', disposition: 'Rejected', steps }
  }
  steps.push({ name: 'Protocol & URL Parser', status: 'ok', detail: `Protocol ${url.protocol} validated. No embedded credentials.` })

  let host = url.hostname.toLowerCase().replace(/\.$/, '')
  if (host.startsWith('[') && host.endsWith(']')) host = host.slice(1, -1)

  // Step 2: Localhost checks
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) {
    steps.push({ name: 'Host Normalization', status: 'blocked', detail: `Localhost keyword '${host}' blocked.` })
    return { validUrl: true, urlObj: url, rawHostname: host, canonicalIp: '127.0.0.1', ipFamily: 4, isBlocked: true, matchedRule: 'Localhost domain keyword', disposition: 'Rejected', steps }
  }

  // Canonicalize non-standard IPv4
  let canonicalIp = host
  let family: 4 | 6 | null = null

  // Check IPv4-mapped IPv6 ::ffff:a.b.c.d
  if (host.startsWith('::ffff:')) {
    const embedded = host.replace('::ffff:', '')
    const check = evaluateIpv4(embedded)
    steps.push({ name: 'IPv6-Mapped IPv4 Decapsulation', status: check.blocked ? 'blocked' : 'ok', detail: `Extracted embedded IPv4: ${embedded}` })
    steps.push({ name: 'IP Range Evaluation', status: check.blocked ? 'blocked' : 'ok', detail: check.blocked ? `Blocked by rule: ${check.rule}` : 'All ranges public' })
    return {
      validUrl: true,
      urlObj: url,
      rawHostname: host,
      canonicalIp: embedded,
      ipFamily: 6,
      isBlocked: check.blocked,
      matchedRule: check.rule,
      disposition: check.blocked ? 'Connection Aborted: Socket is never opened' : 'Permitted: Socket pinned to IP',
      steps
    }
  }

  // Check DWORD integer notation
  if (/^\d+$/.test(host)) {
    const parsed = parseDword(host)
    if (parsed) {
      canonicalIp = parsed
      family = 4
      steps.push({ name: 'DWORD Integer Normalization', status: 'warning', detail: `Converted DWORD ${host} -> ${canonicalIp}` })
    }
  } else if (/^(0x[0-9a-f]+|0[0-7]+|\d+)(\.(0x[0-9a-f]+|0[0-7]+|\d+)){3}$/i.test(host)) {
    const parsed = parseOctalOrHexIpv4(host)
    if (parsed) {
      canonicalIp = parsed
      family = 4
      steps.push({ name: 'Octal/Hex Normalization', status: 'warning', detail: `Canonicalized non-standard notation ${host} -> ${canonicalIp}` })
    }
  }

  // Evaluate IPv4
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(canonicalIp)) {
    family = 4
    const check = evaluateIpv4(canonicalIp)
    steps.push({
      name: 'IP Range Evaluation (IPv4)',
      status: check.blocked ? 'blocked' : 'ok',
      detail: check.blocked ? `Blocked by ${check.rule}` : `Verified public IPv4 address: ${canonicalIp}`
    })
    return {
      validUrl: true,
      urlObj: url,
      rawHostname: host,
      canonicalIp,
      ipFamily: family,
      isBlocked: check.blocked,
      matchedRule: check.rule,
      disposition: check.blocked ? 'Connection Aborted: Socket is never opened' : `Permitted: Socket pinned directly to ${canonicalIp}`,
      steps
    }
  }

  // Evaluate IPv6
  if (host.includes(':')) {
    family = 6
    let blocked = false
    let rule: string | null = null
    if (host === '::' || host === '::1') {
      blocked = true
      rule = 'Loopback / Unspecified (::1, ::)'
    } else if (host.startsWith('fc') || host.startsWith('fd')) {
      blocked = true
      rule = 'fc00::/7 (RFC 4193 Unique Local Address - ULA)'
    } else if (host.startsWith('fe80')) {
      blocked = true
      rule = 'fe80::/10 (Link-Local Unicast)'
    } else if (host.startsWith('ff')) {
      blocked = true
      rule = 'ff00::/8 (Multicast)'
    }

    steps.push({
      name: 'IP Range Evaluation (IPv6)',
      status: blocked ? 'blocked' : 'ok',
      detail: blocked ? `Blocked by rule: ${rule}` : `Valid IPv6 address: ${host}`
    })
    return {
      validUrl: true,
      urlObj: url,
      rawHostname: host,
      canonicalIp: host,
      ipFamily: family,
      isBlocked: blocked,
      matchedRule: rule,
      disposition: blocked ? 'Connection Aborted: Socket is never opened' : `Permitted: Socket pinned directly to [${host}]`,
      steps
    }
  }

  // Hostname (DNS mock check)
  steps.push({
    name: 'DNS Resolution via dns.lookup',
    status: 'ok',
    detail: `Resolved ${host} -> 185.199.108.153 (A), 2606:50c0:8000::153 (AAAA)`
  })
  steps.push({
    name: 'IP Range Evaluation',
    status: 'ok',
    detail: 'All resolved addresses validated as public.'
  })
  steps.push({
    name: 'Socket Pinning Engine',
    status: 'ok',
    detail: 'Custom lookup agent pins socket to 185.199.108.153 (TOCTOU eliminated)'
  })

  return {
    validUrl: true,
    urlObj: url,
    rawHostname: host,
    canonicalIp: '185.199.108.153',
    ipFamily: 4,
    isBlocked: false,
    matchedRule: null,
    disposition: 'Permitted: Socket connection pinned directly to validated IP',
    steps
  }
}

const result = computed(() => inspectTarget(inputTarget.value))
</script>

<template>
  <div class="ssrf-checker-card">
    <div class="checker-header">
      <div class="header-left">
        <span class="shield-icon">🛡️</span>
        <div>
          <h4 class="title">Interactive SSRF Firewall Simulator</h4>
          <p class="subtitle">Test how June’s network firewall evaluates URLs, decodes obfuscated notations, and pins sockets.</p>
        </div>
      </div>
      <div class="status-badge" :class="result.isBlocked ? 'blocked' : 'allowed'">
        {{ result.isBlocked ? 'BLOCKED AT PERIMETER' : 'VERIFIED & PINNED' }}
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="presets-row">
      <span class="presets-label">Attack Presets:</span>
      <div class="presets-scroll">
        <button
          v-for="p in presets"
          :key="p.label"
          class="preset-btn"
          :class="{ active: inputTarget === p.value }"
          @click="inputTarget = p.value"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <!-- Target Input -->
    <div class="input-container">
      <span class="input-icon">🌐</span>
      <input
        v-model="inputTarget"
        type="text"
        class="target-input"
        placeholder="Enter target URL or IP (e.g. http://0177.0.0.1/)"
        spellcheck="false"
      />
      <button v-if="inputTarget" class="clear-btn" @click="inputTarget = ''">✕</button>
    </div>

    <!-- Analysis Pipeline Stepper -->
    <div class="pipeline-stepper">
      <div
        v-for="(step, idx) in result.steps"
        :key="idx"
        class="step-card"
        :class="step.status"
      >
        <div class="step-indicator">
          <span v-if="step.status === 'ok'" class="indicator-icon ok">✓</span>
          <span v-else-if="step.status === 'blocked'" class="indicator-icon blocked">✕</span>
          <span v-else class="indicator-icon warning">!</span>
        </div>
        <div class="step-info">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-detail">{{ step.detail }}</div>
        </div>
      </div>
    </div>

    <!-- Final Socket Disposition Footer -->
    <div class="disposition-footer" :class="result.isBlocked ? 'blocked' : 'allowed'">
      <div class="disposition-title">
        <span>{{ result.isBlocked ? '🛑 Firewall Action: REJECTED' : '🔒 Firewall Action: SOCKET PINNED' }}</span>
      </div>
      <div class="disposition-text">
        {{ result.disposition }}
        <span v-if="result.matchedRule" class="matched-rule">({{ result.matchedRule }})</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ssrf-checker-card {
  margin: 2rem 0;
  background: #09090d;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  font-family: 'Inter', system-ui, sans-serif;
}

.checker-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.shield-icon {
  font-size: 1.8rem;
}

.title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  font-family: 'Space Grotesk', sans-serif;
}

.subtitle {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: #a1a1aa;
}

.status-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: 5px;
  letter-spacing: 0.04em;
}

.status-badge.blocked {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.status-badge.allowed {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* Presets */
.presets-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
  flex-wrap: wrap;
}

.presets-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #71717a;
}

.presets-scroll {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.preset-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #d4d4d8;
  font-size: 0.72rem;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.preset-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.preset-btn.active {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.3);
}

/* Input */
.input-container {
  display: flex;
  align-items: center;
  background: #050507;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  padding: 0.4rem 0.75rem;
  gap: 0.5rem;
  margin-bottom: 1.15rem;
  transition: border-color 0.2s ease;
}

.input-container:focus-within {
  border-color: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
}

.input-icon {
  font-size: 1rem;
}

.target-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.88rem;
}

.clear-btn {
  background: transparent;
  border: none;
  color: #71717a;
  cursor: pointer;
  font-size: 0.8rem;
}

.clear-btn:hover {
  color: #ffffff;
}

/* Pipeline Stepper */
.pipeline-stepper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.step-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.6rem 0.85rem;
  border-radius: 6px;
  background: #0e0e13;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}

.step-card.ok {
  border-left: 3px solid #10b981;
}

.step-card.blocked {
  border-left: 3px solid #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.step-card.warning {
  border-left: 3px solid #f59e0b;
}

.step-indicator {
  margin-top: 2px;
}

.indicator-icon {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: 700;
}

.indicator-icon.ok {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.indicator-icon.blocked {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.indicator-icon.warning {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.step-info {
  flex: 1;
}

.step-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
}

.step-detail {
  font-size: 0.75rem;
  color: #a1a1aa;
  margin-top: 0.15rem;
  font-family: 'JetBrains Mono', monospace;
}

/* Disposition Footer */
.disposition-footer {
  padding: 0.85rem 1rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.disposition-footer.blocked {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #fca5a5;
}

.disposition-footer.allowed {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #6ee7b7;
}

.disposition-title {
  font-weight: 700;
  font-size: 0.85rem;
}

.disposition-text {
  font-size: 0.78rem;
  line-height: 1.4;
}

.matched-rule {
  font-weight: 600;
  color: #ffffff;
}
</style>
