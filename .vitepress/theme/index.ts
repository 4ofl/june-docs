import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import DiscordHeroMockup from './components/DiscordHeroMockup.vue'
import SsrfChecker from './components/SsrfChecker.vue'
import RedosSandbox from './components/RedosSandbox.vue'
import LiveTelemetry from './components/LiveTelemetry.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(Layout)
  },
  enhanceApp({ app }) {
    app.component('DiscordHeroMockup', DiscordHeroMockup)
    app.component('SsrfChecker', SsrfChecker)
    app.component('RedosSandbox', RedosSandbox)
    app.component('LiveTelemetry', LiveTelemetry)
  }
} satisfies Theme
