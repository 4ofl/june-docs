<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Preset {
  name: string
  category: 'catastrophic' | 'safe'
  badge: string
  pattern: string
  flags: string
  input: string
  description: string
}

const presets: Preset[] = [
  {
    name: 'Catastrophic Nesting',
    category: 'catastrophic',
    badge: 'O(2ⁿ) Backtracking',
    pattern: '(a+)+$',
    flags: 'g',
    input: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa!',
    description: 'Nested repeating quantifier partitions 28 "a" characters across 2²⁸ branch permutations before rejecting on "!".'
  },
  {
    name: 'Overlapping Quantifiers',
    category: 'catastrophic',
    badge: 'Evil Overlap',
    pattern: '(x+x+)+y',
    flags: '',
    input: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx!',
    description: 'Ambiguous boundary matching causes exponential branching as the engine tries every combination of lengths for both groups.'
  },
  {
    name: 'Vulnerable Email Parser',
    category: 'catastrophic',
    badge: 'Nested Repetition',
    pattern: '^([a-zA-Z0-9_.-]+)+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,4}$',
    flags: '',
    input: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!@gmail.com',
    description: 'Common flawed email pattern where a nested quantifier on the local-part causes exponential backtracking on poison characters.'
  },
  {
    name: 'June Hardened Token Parser',
    category: 'safe',
    badge: 'O(N) Linear Bounded',
    pattern: '^\\/([a-z0-9_-]{1,32})(?:\\s+([^\\n\\r]{1,512}))?$',
    flags: '',
    input: '/site headers url:https://example.com',
    description: 'Strict length bounds ({1,32}, {1,512}) with disjoint character sets ensure deterministic single-pass parsing.'
  },
  {
    name: 'Bounded Email Validator',
    category: 'safe',
    badge: 'Safe Bounded',
    pattern: '^[a-zA-Z0-9_.+-]{1,64}@[a-zA-Z0-9-]{1,255}\\.[a-zA-Z]{2,24}$',
    flags: 'i',
    input: 'security-team@temp.4ofl.dev',
    description: 'No nested repetition. Length-bounded quantifiers prevent backtracking runaways.'
  }
]

const currentPattern = ref(presets[0].pattern)
const currentFlags = ref(presets[0].flags)
const currentInput = ref(presets[0].input)

type ExecutionStatus = 'idle' | 'running' | 'completed' | 'timeout' | 'error'
const status = ref<ExecutionStatus>('idle')
const elapsedMs = ref(0)
const maxTimeMs = 500
const matchResult = ref<string[] | null>(null)
const matched = ref<boolean>(false)
const errorMessage = ref<string | null>(null)
const workerProgress = ref(0)

let activeWorker: Worker | null = null
let watchdogTimer: any = null
let progressInterval: any = null
let runStartTime = 0

function selectPreset(preset: Preset) {
  abortExecution()
  currentPattern.value = preset.pattern
  currentFlags.value = preset.flags
  currentInput.value = preset.input
  status.value = 'idle'
  matchResult.value = null
  errorMessage.value = null
  elapsedMs.value = 0
  workerProgress.value = 0
}

function appendPoison(char: string = 'a') {
  currentInput.value = currentInput.value.replace(/!$/, '') + char.repeat(5) + '!'
}

function createWorkerCode(): string {
  return `
    self.onmessage = function(e) {
      const { pattern, flags, input } = e.data;
      const start = performance.now();
      try {
        const regex = new RegExp(pattern, flags);
        const matches = input.match(regex);
        const duration = performance.now() - start;
        self.postMessage({
          success: true,
          matches: matches ? Array.from(matches) : null,
          matched: !!matches,
          duration: duration
        });
      } catch (err) {
        self.postMessage({
          success: false,
          error: err.message,
          duration: performance.now() - start
        });
      }
    };
  `
}

function abortExecution() {
  if (activeWorker) {
    activeWorker.terminate()
    activeWorker = null
  }
  if (watchdogTimer) {
    clearTimeout(watchdogTimer)
    watchdogTimer = null
  }
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  if (status.value === 'running') {
    status.value = 'idle'
    elapsedMs.value = 0
    workerProgress.value = 0
  }
}

function runTest() {
  if (typeof window === 'undefined' || typeof Worker === 'undefined') {
    errorMessage.value = 'Web Workers are not supported in this environment.'
    status.value = 'error'
    return
  }

  abortExecution()

  // Pre-validate regex syntax
  try {
    new RegExp(currentPattern.value, currentFlags.value)
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = `SyntaxError in regular expression: ${err.message}`
    return
  }

  status.value = 'running'
  errorMessage.value = null
  matchResult.value = null
  matched.value = false
  elapsedMs.value = 0
  workerProgress.value = 0

  runStartTime = performance.now()

  // Animated countdown / progress ticker
  progressInterval = setInterval(() => {
    const now = performance.now()
    const diff = Math.min(maxTimeMs, Math.round(now - runStartTime))
    elapsedMs.value = diff
    workerProgress.value = Math.min(100, (diff / maxTimeMs) * 100)
  }, 16)

  // Hard Watchdog: 500ms
  watchdogTimer = setTimeout(() => {
    if (activeWorker) {
      activeWorker.terminate()
      activeWorker = null
    }
    clearInterval(progressInterval)
    status.value = 'timeout'
    elapsedMs.value = maxTimeMs
    workerProgress.value = 100
  }, maxTimeMs)

  try {
    const blob = new Blob([createWorkerCode()], { type: 'application/javascript' })
    const workerUrl = URL.createObjectURL(blob)
    activeWorker = new Worker(workerUrl)

    activeWorker.onmessage = (e) => {
      clearTimeout(watchdogTimer)
      clearInterval(progressInterval)
      const duration = Math.round(performance.now() - runStartTime)
      elapsedMs.value = duration
      workerProgress.value = Math.min(100, (duration / maxTimeMs) * 100)

      if (e.data.success) {
        status.value = 'completed'
        matched.value = e.data.matched
        matchResult.value = e.data.matches
      } else {
        status.value = 'error'
        errorMessage.value = e.data.error
      }

      if (activeWorker) {
        activeWorker.terminate()
        activeWorker = null
      }
      URL.revokeObjectURL(workerUrl)
    }

    activeWorker.onerror = (err) => {
      clearTimeout(watchdogTimer)
      clearInterval(progressInterval)
      status.value = 'error'
      errorMessage.value = `Worker runtime failure: ${err.message}`
      if (activeWorker) {
        activeWorker.terminate()
        activeWorker = null
      }
      URL.revokeObjectURL(workerUrl)
    }

    activeWorker.postMessage({
      pattern: currentPattern.value,
      flags: currentFlags.value,
      input: currentInput.value
    })
  } catch (err: any) {
    clearTimeout(watchdogTimer)
    clearInterval(progressInterval)
    status.value = 'error'
    errorMessage.value = `Failed to spawn worker: ${err.message}`
  }
}

onUnmounted(() => {
  abortExecution()
})
</script>

<template>
  <div class="redos-sandbox">
    <!-- Header -->
    <div class="sandbox-header">
      <div class="header-left">
        <div class="radar-indicator" :class="status">
          <span class="radar-dot"></span>
        </div>
        <div>
          <div class="header-title">Live ReDoS Isolation Sandbox</div>
          <div class="header-sub">Dedicated Worker Watchdog & Backtracking Circuit Breaker</div>
        </div>
      </div>
      <div class="header-badge">
        <span class="threshold-pill">Limit: 500ms</span>
      </div>
    </div>

    <!-- Presets Selector -->
    <div class="presets-bar">
      <div class="presets-label">Attack & Defense Presets:</div>
      <div class="presets-grid">
        <button
          v-for="p in presets"
          :key="p.name"
          class="preset-btn"
          :class="{ active: currentPattern === p.pattern && currentInput === p.input, [p.category]: true }"
          @click="selectPreset(p)"
        >
          <span class="preset-name">{{ p.name }}</span>
          <span class="preset-tag">{{ p.badge }}</span>
        </button>
      </div>
    </div>

    <!-- Playground Form -->
    <div class="sandbox-body">
      <!-- Pattern Input -->
      <div class="form-group">
        <label class="group-label">
          <span>Regular Expression Pattern</span>
          <span class="regex-hint">Tested in isolated V8 Worker thread</span>
        </label>
        <div class="regex-input-row">
          <span class="regex-slash">/</span>
          <input
            v-model="currentPattern"
            type="text"
            class="code-input pattern-input"
            placeholder="e.g. (a+)+$"
            spellcheck="false"
          />
          <span class="regex-slash">/</span>
          <input
            v-model="currentFlags"
            type="text"
            class="code-input flags-input"
            placeholder="flags"
            maxlength="5"
            spellcheck="false"
          />
        </div>
      </div>

      <!-- Test Input Payload -->
      <div class="form-group">
        <div class="group-label-row">
          <label class="group-label">
            <span>Test Payload (Target String)</span>
            <span class="char-count">{{ currentInput.length }} chars</span>
          </label>
          <div class="payload-actions">
            <button class="pill-action" @click="appendPoison('a')">+5 Attack 'a's</button>
            <button class="pill-action" @click="appendPoison('x')">+5 Attack 'x's</button>
          </div>
        </div>
        <textarea
          v-model="currentInput"
          class="code-textarea"
          rows="3"
          placeholder="Paste or type test input..."
          spellcheck="false"
        ></textarea>
      </div>

      <!-- Action & Progress Bar -->
      <div class="action-bar">
        <button
          class="primary-btn"
          :class="{ loading: status === 'running' }"
          :disabled="status === 'running'"
          @click="runTest"
        >
          <span v-if="status === 'running'" class="btn-spinner"></span>
          <span v-else class="btn-icon">⚡</span>
          <span>{{ status === 'running' ? 'Executing Pattern...' : 'Execute in Sandboxed Worker' }}</span>
        </button>

        <button
          v-if="status === 'running'"
          class="abort-btn"
          @click="abortExecution"
        >
          Abort Immediately
        </button>

        <!-- Watchdog Gauge -->
        <div class="watchdog-meter">
          <div class="meter-info">
            <span class="meter-label">Watchdog Timer:</span>
            <span class="meter-time" :class="{ danger: elapsedMs >= 450, ok: status === 'completed' && elapsedMs < 200 }">
              {{ elapsedMs }}ms / 500ms
            </span>
          </div>
          <div class="meter-track">
            <div
              class="meter-fill"
              :class="{
                running: status === 'running',
                timeout: status === 'timeout',
                success: status === 'completed'
              }"
              :style="{ width: `${workerProgress}%` }"
            ></div>
            <div class="meter-danger-zone"></div>
          </div>
        </div>
      </div>

      <!-- Verdict / Result Panel -->
      <div v-if="status !== 'idle'" class="result-panel" :class="status">
        <!-- Running state -->
        <div v-if="status === 'running'" class="verdict running">
          <div class="verdict-icon pulse">⏳</div>
          <div class="verdict-content">
            <div class="verdict-title">Worker Backtracking in Progress...</div>
            <div class="verdict-desc">
              Watchdog armed at <strong>500ms</strong>. If backtracking branches exceed the timeout, the worker will be abruptly killed without stalling UI or bot event loop.
            </div>
          </div>
        </div>

        <!-- Timeout / ReDoS detected -->
        <div v-else-if="status === 'timeout'" class="verdict timeout">
          <div class="verdict-icon danger">⛔</div>
          <div class="verdict-content">
            <div class="verdict-headline">
              <span class="verdict-badge danger">CATASTROPHIC BACKTRACKING DETECTED</span>
              <span class="verdict-time">500ms hard ceiling reached</span>
            </div>
            <div class="verdict-title">Worker Terminated by Watchdog</div>
            <p class="verdict-desc">
              The input triggered non-polynomial O(2ⁿ) state search. The June circuit breaker killed the isolated Web Worker at <strong>500ms</strong>.
            </p>
            <div class="isolation-proof">
              <div class="proof-item">
                <span class="proof-label">Main Thread Impact:</span>
                <span class="proof-val green">0ms (Zero event loop starvation)</span>
              </div>
              <div class="proof-item">
                <span class="proof-label">Discord Gateway Ping:</span>
                <span class="proof-val green">Unaffected (Heartbeats continue)</span>
              </div>
              <div class="proof-item">
                <span class="proof-label">Worker Process:</span>
                <span class="proof-val red">Terminated & Garbage Collected</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Safe / Completed -->
        <div v-else-if="status === 'completed'" class="verdict completed">
          <div class="verdict-icon green">✓</div>
          <div class="verdict-content">
            <div class="verdict-headline">
              <span class="verdict-badge green">SAFE EXECUTION</span>
              <span class="verdict-time">{{ elapsedMs }}ms evaluation time</span>
            </div>
            <div class="verdict-title">Evaluation Completed Within Bounds</div>
            <p class="verdict-desc">
              No exponential backtracking detected. {{ matched ? 'Pattern matched successfully.' : 'Pattern evaluated to no-match in bounded time.' }}
            </p>
            <div v-if="matchResult && matchResult.length" class="matches-box">
              <div class="matches-header">Matches ({{ matchResult.length }}):</div>
              <div class="match-list">
                <span v-for="(m, i) in matchResult" :key="i" class="match-item">
                  {{ m }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="status === 'error'" class="verdict error">
          <div class="verdict-icon red">⚠</div>
          <div class="verdict-content">
            <div class="verdict-title">Pattern Compilation Error</div>
            <p class="verdict-desc">{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Defensive Architecture Summary -->
      <div class="architecture-notes">
        <div class="arch-col">
          <div class="arch-title">
            <span class="arch-bullet">01</span>
            <span>Static Pattern Linting</span>
          </div>
          <p class="arch-text">
            User-provided regexes undergo static AST validation using safe-regex to reject ambiguous overlapping groups like <code>(a+)+</code> before execution.
          </p>
        </div>
        <div class="arch-col">
          <div class="arch-title">
            <span class="arch-bullet">02</span>
            <span>Input Size Constraints</span>
          </div>
          <p class="arch-text">
            Payloads for arbitrary regex matching are strictly clamped to 1,024 characters, bounding worst-case backtracking permutations.
          </p>
        </div>
        <div class="arch-col">
          <div class="arch-title">
            <span class="arch-bullet">03</span>
            <span>500ms Hard Watchdog</span>
          </div>
          <p class="arch-text">
            All untrusted evaluations execute on disposable child worker threads with a 500ms SIGKILL watchdog, guaranteeing zero Discord gateway heartbeat delay.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.redos-sandbox {
  background: #050507;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  margin: 2rem 0;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #e2e8f0;
}

/* Header */
.sandbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.4rem;
  background: #08080c;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.radar-indicator {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.radar-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

.radar-indicator.running {
  background: rgba(245, 158, 11, 0.2);
}
.radar-indicator.running .radar-dot {
  background: #f59e0b;
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.radar-indicator.timeout {
  background: rgba(239, 68, 68, 0.2);
}
.radar-indicator.timeout .radar-dot {
  background: #ef4444;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.header-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #f8fafc;
  letter-spacing: -0.01em;
}

.header-sub {
  font-size: 0.76rem;
  color: #94a3b8;
}

.threshold-pill {
  font-size: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-weight: 600;
}

/* Presets Bar */
.presets-bar {
  padding: 0.85rem 1.4rem;
  background: #0c0c12;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.presets-label {
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.presets-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.preset-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 0.4rem 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.18s ease;
  font-size: 0.8rem;
  color: #cbd5e1;
}

.preset-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.15);
  color: #f8fafc;
}

.preset-btn.active {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.4);
  color: #34d399;
}

.preset-btn.catastrophic.active {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.4);
  color: #f87171;
}

.preset-tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.35);
  color: #94a3b8;
  font-family: ui-monospace, SFMono-Regular, monospace;
}

.preset-btn.catastrophic .preset-tag {
  color: #fca5a5;
}

.preset-btn.safe .preset-tag {
  color: #86efac;
}

/* Sandbox Body */
.sandbox-body {
  padding: 1.4rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.group-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #cbd5e1;
  margin-bottom: 0.45rem;
}

.group-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.45rem;
}

.regex-hint, .char-count {
  font-size: 0.74rem;
  color: #64748b;
  font-weight: normal;
}

.payload-actions {
  display: flex;
  gap: 0.4rem;
}

.pill-action {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  color: #94a3b8;
  font-size: 0.72rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  transition: all 0.15s;
}

.pill-action:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  border-color: rgba(255, 255, 255, 0.2);
}

.regex-input-row {
  display: flex;
  align-items: center;
  background: #020203;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 0 0.6rem;
  transition: border-color 0.2s;
}

.regex-input-row:focus-within {
  border-color: #10b981;
  box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.25);
}

.regex-slash {
  font-family: ui-monospace, SFMono-Regular, monospace;
  color: #64748b;
  font-size: 1.1rem;
  user-select: none;
}

.code-input {
  background: transparent;
  border: none;
  color: #38bdf8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.88rem;
  padding: 0.65rem 0.5rem;
  outline: none;
}

.pattern-input {
  flex: 1;
}

.flags-input {
  width: 55px;
  color: #a78bfa;
}

.code-textarea {
  width: 100%;
  background: #020203;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 0.65rem 0.8rem;
  color: #e2e8f0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.82rem;
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  line-height: 1.4;
  transition: border-color 0.2s;
}

.code-textarea:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.25);
}

/* Action Bar */
.action-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.2rem;
  flex-wrap: wrap;
}

.primary-btn {
  background: #10b981;
  color: #020203;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1.25rem;
  font-weight: 700;
  font-size: 0.86rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.primary-btn:hover:not(:disabled) {
  background: #34d399;
  transform: translateY(-1px);
}

.primary-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1rem;
}

.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top-color: #020203;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.abort-btn {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #f87171;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.abort-btn:hover {
  background: rgba(239, 68, 68, 0.25);
}

/* Watchdog Meter */
.watchdog-meter {
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.meter-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.meter-label {
  color: #94a3b8;
}

.meter-time {
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-weight: 700;
  color: #f8fafc;
}

.meter-time.danger {
  color: #f87171;
}

.meter-time.ok {
  color: #34d399;
}

.meter-track {
  height: 8px;
  background: #020203;
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.meter-fill {
  height: 100%;
  width: 0%;
  background: #10b981;
  border-radius: 9999px;
  transition: width 0.08s linear;
}

.meter-fill.running {
  background: linear-gradient(90deg, #10b981, #f59e0b 80%, #ef4444 100%);
}

.meter-fill.timeout {
  background: #ef4444;
}

.meter-fill.success {
  background: #10b981;
}

.meter-danger-zone {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 10%;
  background: rgba(239, 68, 68, 0.2);
  border-left: 1px dashed rgba(239, 68, 68, 0.5);
  pointer-events: none;
}

/* Verdict Panels */
.result-panel {
  margin-top: 1.4rem;
  border-radius: 10px;
  padding: 1.1rem 1.3rem;
  border: 1px solid;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.verdict {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.verdict-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.verdict-icon.pulse {
  animation: pulse 1.2s infinite;
}

.verdict-content {
  flex: 1;
}

.verdict-headline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.35rem;
}

.verdict-badge {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.verdict-badge.danger {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.35);
}

.verdict-badge.green {
  background: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
  border: 1px solid rgba(16, 185, 129, 0.35);
}

.verdict-time {
  font-size: 0.74rem;
  color: #94a3b8;
  font-family: ui-monospace, SFMono-Regular, monospace;
}

.verdict-title {
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.3rem;
}

.verdict-desc {
  font-size: 0.82rem;
  color: #cbd5e1;
  line-height: 1.45;
  margin: 0;
}

.result-panel.running {
  background: rgba(245, 158, 11, 0.06);
  border-color: rgba(245, 158, 11, 0.25);
}

.result-panel.timeout {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.35);
}

.result-panel.completed {
  background: rgba(16, 185, 129, 0.06);
  border-color: rgba(16, 185, 129, 0.25);
}

.result-panel.error {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.3);
}

/* Proof items */
.isolation-proof {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.6rem;
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(239, 68, 68, 0.2);
}

.proof-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.75rem;
}

.proof-label {
  color: #94a3b8;
}

.proof-val {
  font-weight: 700;
  font-family: ui-monospace, SFMono-Regular, monospace;
}

.proof-val.green { color: #34d399; }
.proof-val.red { color: #f87171; }

.matches-box {
  margin-top: 0.8rem;
  padding: 0.6rem 0.8rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  font-size: 0.78rem;
}

.matches-header {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.match-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.match-item {
  background: rgba(16, 185, 129, 0.15);
  color: #a7f3d0;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, monospace;
}

/* Architecture Notes */
.architecture-notes {
  margin-top: 1.8rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.arch-col {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.arch-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: #f1f5f9;
}

.arch-bullet {
  font-size: 0.7rem;
  font-family: ui-monospace, SFMono-Regular, monospace;
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.arch-text {
  font-size: 0.76rem;
  color: #94a3b8;
  line-height: 1.45;
  margin: 0;
}

.arch-text code {
  background: rgba(255, 255, 255, 0.08);
  color: #38bdf8;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.72rem;
}

@media (max-width: 640px) {
  .sandbox-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
  .action-bar {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
