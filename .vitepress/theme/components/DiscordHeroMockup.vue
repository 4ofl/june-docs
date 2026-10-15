<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Scenario {
  id: string
  label: string
  commandText: string
  thinkingTimeMs: number
  response: {
    title: string
    color: string
    badgeText?: string
    description?: string
    fields: { label: string; value: string; inline?: boolean }[]
    footer?: string
    buttons?: { label: string; style: 'primary' | 'secondary' | 'danger'; icon?: string }[]
  }
}

const scenarios: Scenario[] = [
  {
    id: 'tempmail',
    label: 'Ephemeral Mail',
    commandText: '/tempmail create',
    thinkingTimeMs: 400,
    response: {
      title: 'Temporary Mailbox Provisioned',
      color: '#10b981',
      badgeText: 'Active · 60m TTL',
      description: 'Private ephemeral inbox configured on **temp.4ofl.dev** via Stalwart JMAP. Inbound messages stream live to your dashboard.',
      fields: [
        { label: 'Assigned Address', value: '`7f6899f3a1@temp.4ofl.dev`', inline: true },
        { label: 'Expires In', value: '<t:1700003600:R> (60 mins)', inline: true },
        { label: 'Security Boundary', value: 'Inbound MX only · Outbound SMTP disabled · Zero raw storage' }
      ],
      footer: 'Only your Discord account can query messages for this address.',
      buttons: [
        { label: 'Check Messages', style: 'primary', icon: '📥' },
        { label: 'Copy Address', style: 'secondary', icon: '📋' },
        { label: 'Cancel Lease', style: 'danger', icon: '✕' }
      ]
    }
  },
  {
    id: 'site',
    label: 'Site Diagnostics',
    commandText: '/site headers url:https://example.com',
    thinkingTimeMs: 350,
    response: {
      title: 'example.com — HTTP/2 200 OK',
      color: '#34d399',
      badgeText: 'Pinned Socket Connection',
      description: 'Outbound request validated through June firewall. Socket connection pinned directly to resolved public IP.',
      fields: [
        { label: 'Destination IP', value: '`93.184.216.34` (Public IPv4)', inline: true },
        { label: 'TLS Protocol', value: '`TLSv1.3 · AES_256_GCM`', inline: true },
        { label: 'Server', value: '`ECS (iad/182a)`', inline: true },
        { label: 'Security Headers', value: '`Strict-Transport-Security` · `X-Frame-Options: DENY` · `X-Content-Type-Options: nosniff`' }
      ],
      footer: 'Resolution verified before connection · Zero DNS rebinding window',
      buttons: [
        { label: 'Inspect DNS', style: 'secondary', icon: '🔍' },
        { label: 'Scan SSL Cert', style: 'secondary', icon: '🔒' }
      ]
    }
  },
  {
    id: 'evidence',
    label: 'Forensic Evidence',
    commandText: '/evidence url:https://docs.june.4ofl.dev',
    thinkingTimeMs: 450,
    response: {
      title: 'Forensic Verification Bundle',
      color: '#059669',
      badgeText: 'Cryptographically Hashed',
      description: 'Point-in-time technical capture of response headers, TLS certificate chain, and body digest.',
      fields: [
        { label: 'SHA-256 Digest', value: '`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`' },
        { label: 'Capture Timestamp', value: '<t:1700000000:F>', inline: true },
        { label: 'DNS Origin', value: '`185.199.108.153` (Pinned)', inline: true },
        { label: 'Certificate Issuer', value: '`Let\'s Encrypt E6` · Valid until Jan 2027' }
      ],
      footer: 'Technical verification capture · Carries no statutory warranty of legal admissibility.',
      buttons: [
        { label: 'Download JSON Bundle', style: 'primary', icon: '📦' },
        { label: 'View Hashes', style: 'secondary', icon: '🔑' }
      ]
    }
  },
  {
    id: 'watch',
    label: 'Watch Sentinel',
    commandText: '/watch add url:https://api.example.com interval:15m label:"Production API"',
    thinkingTimeMs: 300,
    response: {
      title: 'Sentinel Target Registered',
      color: '#10b981',
      badgeText: 'Active Monitoring',
      description: 'Automated monitoring scheduled in SQLite WAL. Alerts dispatch on TLS expiry, status codes, and DNS shifts.',
      fields: [
        { label: 'Target Host', value: '`api.example.com`', inline: true },
        { label: 'Probe Frequency', value: '`Every 15 minutes`', inline: true },
        { label: 'Monitored Vectors', value: 'HTTP Status · SSL Cert Expiration (30d warning) · DNS A/AAAA Shift · Content Hash Drift' }
      ],
      footer: 'Target ID: wt_98f12a · SQLite WAL monitored',
      buttons: [
        { label: 'View Active Targets', style: 'secondary', icon: '📊' },
        { label: 'Trigger Immediate Probe', style: 'secondary', icon: '⚡' }
      ]
    }
  }
]

const activeIndex = ref(0)
const isAutoPlay = ref(true)
const typedText = ref('')
const isTyping = ref(false)
const isThinking = ref(false)
const showResponse = ref(true)
const buttonNotice = ref<string | null>(null)
let autoPlayTimer: any = null
let typeTimer: any = null

const currentScenario = computed(() => scenarios[activeIndex.value])

function playScenario(index: number) {
  activeIndex.value = index
  const scenario = scenarios[index]
  
  clearTimeout(typeTimer)
  typedText.value = ''
  isTyping.value = true
  isThinking.value = false
  showResponse.value = false
  buttonNotice.value = null

  const fullText = scenario.commandText
  let charIndex = 0

  function typeChar() {
    if (charIndex < fullText.length) {
      typedText.value += fullText.charAt(charIndex)
      charIndex++
      typeTimer = setTimeout(typeChar, 25 + Math.random() * 20)
    } else {
      isTyping.value = false
      isThinking.value = true
      setTimeout(() => {
        isThinking.value = false
        showResponse.value = true
      }, scenario.thinkingTimeMs)
    }
  }

  typeChar()
}

function selectTab(index: number) {
  isAutoPlay.value = false
  clearTimeout(autoPlayTimer)
  playScenario(index)
}

function handleButtonClick(label: string) {
  buttonNotice.value = `Action simulated: "${label}"`
  setTimeout(() => {
    buttonNotice.value = null
  }, 2500)
}

function startAutoPlayLoop() {
  if (!isAutoPlay.value) return
  autoPlayTimer = setTimeout(() => {
    if (isAutoPlay.value) {
      const nextIndex = (activeIndex.value + 1) % scenarios.length
      playScenario(nextIndex)
      startAutoPlayLoop()
    }
  }, 7000)
}

onMounted(() => {
  playScenario(0)
  startAutoPlayLoop()
})

onUnmounted(() => {
  clearTimeout(autoPlayTimer)
  clearTimeout(typeTimer)
})
</script>

<template>
  <div class="discord-hero-mockup">
    <!-- Mockup Header Controls -->
    <div class="mockup-topbar">
      <div class="scenario-tabs">
        <button
          v-for="(scenario, idx) in scenarios"
          :key="scenario.id"
          class="tab-btn"
          :class="{ active: activeIndex === idx }"
          @click="selectTab(idx)"
        >
          {{ scenario.label }}
        </button>
      </div>

      <div class="autoplay-indicator" @click="isAutoPlay = !isAutoPlay" :title="isAutoPlay ? 'Auto-cycling (Click to pause)' : 'Paused (Click to auto-cycle)'">
        <span class="status-pulse" :class="{ running: isAutoPlay }"></span>
        <span class="autoplay-label">{{ isAutoPlay ? 'Auto-Cycle' : 'Paused' }}</span>
      </div>
    </div>

    <!-- Discord App Surface -->
    <div class="discord-chat-window">
      <!-- Channel Header -->
      <div class="chat-header">
        <div class="channel-title">
          <span class="hash">#</span>
          <span class="name">developer-lab</span>
          <span class="topic">Interactive June Discord Component Sandbox</span>
        </div>
      </div>

      <!-- Message Thread -->
      <div class="chat-body">
        <!-- User Command Invocation -->
        <div class="chat-message user-interaction">
          <div class="avatar user-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#3b82f6" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#ffffff" />
            </svg>
          </div>
          <div class="message-content">
            <div class="message-meta">
              <span class="author-name user-name">operator</span>
              <span class="timestamp">Today at 18:14</span>
            </div>
            <div class="command-bubble">
              <span class="slash">/</span>
              <span class="typed-command">{{ typedText }}</span>
              <span v-if="isTyping" class="typing-cursor"></span>
            </div>
          </div>
        </div>

        <!-- Thinking State -->
        <div v-if="isThinking" class="chat-message bot-thinking">
          <div class="avatar bot-avatar">
            <img src="/logo.png" alt="June" onerror="this.src='/favicon.svg'" />
          </div>
          <div class="message-content">
            <div class="thinking-pill">
              <span class="thinking-spinner"></span>
              <span>June is thinking...</span>
            </div>
          </div>
        </div>

        <!-- Bot Response Message -->
        <transition name="fade">
          <div v-if="showResponse" class="chat-message bot-message">
            <div class="avatar bot-avatar">
              <img src="/logo.png" alt="June" onerror="this.src='/favicon.svg'" />
            </div>
            <div class="message-content">
              <div class="message-meta">
                <span class="author-name bot-name">June</span>
                <span class="bot-badge">APP</span>
                <span class="timestamp">Today at 18:14</span>
              </div>

              <!-- Discord Component V2 Container -->
              <div class="discord-component-v2" :style="{ borderColor: currentScenario.response.color }">
                <div class="component-header">
                  <div class="component-title">{{ currentScenario.response.title }}</div>
                  <span v-if="currentScenario.response.badgeText" class="component-badge" :style="{ color: currentScenario.response.color, borderColor: currentScenario.response.color }">
                    {{ currentScenario.response.badgeText }}
                  </span>
                </div>

                <div v-if="currentScenario.response.description" class="component-desc">
                  {{ currentScenario.response.description }}
                </div>

                <!-- Structured Fields -->
                <div class="component-fields">
                  <div
                    v-for="(field, fIdx) in currentScenario.response.fields"
                    :key="fIdx"
                    class="field-item"
                    :class="{ inline: field.inline }"
                  >
                    <span class="field-label">{{ field.label }}</span>
                    <span class="field-value" v-html="field.value"></span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div v-if="currentScenario.response.buttons?.length" class="component-buttons">
                  <button
                    v-for="(btn, bIdx) in currentScenario.response.buttons"
                    :key="bIdx"
                    class="discord-btn"
                    :class="btn.style"
                    @click="handleButtonClick(btn.label)"
                  >
                    <span v-if="btn.icon" class="btn-icon">{{ btn.icon }}</span>
                    <span class="btn-label">{{ btn.label }}</span>
                  </button>
                </div>

                <div v-if="buttonNotice" class="button-sim-notice">
                  ✨ {{ buttonNotice }}
                </div>

                <!-- Footer -->
                <div v-if="currentScenario.response.footer" class="component-footer">
                  {{ currentScenario.response.footer }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.discord-hero-mockup {
  margin: 2.5rem 0 3.5rem;
  background: #09090d;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 45px -15px rgba(0, 0, 0, 0.8), 0 0 30px -10px rgba(16, 185, 129, 0.15);
  font-family: 'Inter', system-ui, sans-serif;
}

/* Mockup Topbar */
.mockup-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  background: #050507;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 0.6rem;
}

.scenario-tabs {
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
}

.tab-btn {
  background: transparent;
  border: 1px solid transparent;
  color: #a1a1aa;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.tab-btn.active {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}

.autoplay-indicator {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #71717a;
  cursor: pointer;
  user-select: none;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.autoplay-indicator:hover {
  color: #a1a1aa;
}

.status-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #71717a;
}

.status-pulse.running {
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.9); }
}

/* Discord Chat Layout */
.discord-chat-window {
  background: #07070a;
}

.chat-header {
  padding: 0.6rem 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: #060608;
}

.channel-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}

.channel-title .hash {
  color: #71717a;
  font-size: 1.1rem;
  font-weight: 600;
}

.channel-title .name {
  color: #ffffff;
  font-weight: 600;
}

.channel-title .topic {
  color: #71717a;
  font-size: 0.75rem;
  margin-left: 0.8rem;
  padding-left: 0.8rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 280px;
}

.chat-message {
  display: flex;
  gap: 1rem;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: #111116;
}

.bot-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}

.author-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.author-name.user-name {
  color: #60a5fa;
}

.author-name.bot-name {
  color: #ffffff;
}

.bot-badge {
  background: #5865f2;
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  letter-spacing: 0.04em;
}

.timestamp {
  color: #71717a;
  font-size: 0.72rem;
}

/* Command invocation */
.command-bubble {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #38bdf8;
}

.command-bubble .slash {
  color: #94a3b8;
  font-weight: 700;
}

.typing-cursor {
  display: inline-block;
  width: 7px;
  height: 14px;
  background: #38bdf8;
  margin-left: 2px;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Thinking Indicator */
.thinking-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #a1a1aa;
  font-style: italic;
  padding: 0.3rem 0;
}

.thinking-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-top-color: #10b981;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Discord Components V2 Container */
.discord-component-v2 {
  background: #101015;
  border-left: 4px solid #10b981;
  border-radius: 6px;
  padding: 1rem 1.15rem;
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
}

.component-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.component-title {
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
}

.component-badge {
  font-size: 0.7rem;
  font-family: 'JetBrains Mono', monospace;
  padding: 0.15rem 0.5rem;
  border: 1px solid currentColor;
  border-radius: 4px;
  background: rgba(16, 185, 129, 0.08);
  font-weight: 500;
}

.component-desc {
  font-size: 0.85rem;
  color: #d4d4d8;
  line-height: 1.5;
}

.component-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

.field-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
}

.field-item.inline {
  width: calc(50% - 0.75rem);
}

@media (max-width: 640px) {
  .field-item.inline {
    width: 100%;
  }
}

.field-label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #a1a1aa;
  letter-spacing: 0.04em;
}

.field-value {
  font-size: 0.85rem;
  color: #f4f4f6;
  word-break: break-all;
}

.field-value :deep(code) {
  background: #050507;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #34d399;
}

/* Action Buttons */
.component-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.3rem;
}

.discord-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: all 0.18s ease;
  user-select: none;
}

.discord-btn.primary {
  background: #5865f2;
  color: #ffffff;
}

.discord-btn.primary:hover {
  background: #4752c4;
}

.discord-btn.secondary {
  background: #4e5058;
  color: #ffffff;
}

.discord-btn.secondary:hover {
  background: #6d6f78;
}

.discord-btn.danger {
  background: #da373c;
  color: #ffffff;
}

.discord-btn.danger:hover {
  background: #a1282c;
}

.button-sim-notice {
  font-size: 0.75rem;
  color: #34d399;
  background: rgba(16, 185, 129, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.component-footer {
  font-size: 0.72rem;
  color: #71717a;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 0.45rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
</style>
