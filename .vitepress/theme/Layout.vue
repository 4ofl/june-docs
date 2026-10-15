<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { nextTick, provide, onMounted, watch } from 'vue'

const { isDark } = useData()
const route = useRoute()

import DocToolbar from './components/DocToolbar.vue'

let mermaidInstance: any = null

function initSpotlight() {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const handlePointerMove = (e: PointerEvent) => {
    const target = (e.target as HTMLElement)?.closest(
      '.spotlight-card, .vp-doc table, .vp-doc blockquote, .vp-doc .custom-block, div[class*="language-"], .card'
    ) as HTMLElement | null

    if (!target) return
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    target.style.setProperty('--spotlight-x', `${x}px`)
    target.style.setProperty('--spotlight-y', `${y}px`)
  }

  document.addEventListener('pointermove', handlePointerMove, { passive: true })
}

async function renderMermaidDiagrams() {
  if (typeof window === 'undefined') return
  await nextTick()

  const blocks = document.querySelectorAll('div[class*="language-mermaid"]')
  if (!blocks.length) return

  try {
    if (!mermaidInstance) {
      const mod = await import('mermaid')
      mermaidInstance = mod.default
    }

    mermaidInstance.initialize({
      startOnLoad: false,
      theme: isDark.value ? 'dark' : 'neutral',
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      themeVariables: isDark.value
        ? {
            darkMode: true,
            background: '#050507',
            primaryColor: '#101015',
            primaryTextColor: '#f4f4f6',
            primaryBorderColor: 'rgba(255, 255, 255, 0.16)',
            lineColor: '#a1a1aa',
            secondaryColor: '#16161d',
            tertiaryColor: '#0a0a0d'
          }
        : {
            darkMode: false,
            background: '#ffffff',
            primaryColor: '#f8fafc',
            primaryTextColor: '#09090b',
            primaryBorderColor: 'rgba(0, 0, 0, 0.12)',
            lineColor: '#52525b',
            secondaryColor: '#f1f5f9',
            tertiaryColor: '#ffffff'
          }
    })

    let count = 0
    for (const block of blocks) {
      const codeEl = block.querySelector('code')
      if (!codeEl) continue

      if (!block.getAttribute('data-mermaid-src')) {
        block.setAttribute('data-mermaid-src', codeEl.innerText.trim())
      }

      const rawCode = block.getAttribute('data-mermaid-src')
      if (!rawCode) continue

      const countId = ++count
      const id = `mermaid-svg-${Date.now()}-${countId}`
      const { svg } = await mermaidInstance.render(id, rawCode)

      let wrapper = block.parentElement?.querySelector(`.mermaid-preview[data-target="${countId}"]`)
      if (!wrapper) {
        wrapper = document.createElement('div')
        wrapper.className = 'mermaid-preview'
        wrapper.setAttribute('data-target', String(countId))
        block.parentNode?.insertBefore(wrapper, block)
      }

      wrapper.innerHTML = svg
      ;(block as HTMLElement).style.display = 'none'
    }
  } catch (err) {
    console.error('Failed to render mermaid diagram:', err)
  }
}

onMounted(() => {
  renderMermaidDiagrams()
  initSpotlight()
})

watch(() => route.path, () => {
  renderMermaidDiagrams()
})

watch(() => isDark.value, () => {
  renderMermaidDiagrams()
})

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async (event?: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const x = event?.clientX ?? window.innerWidth - 80
  const y = event?.clientY ?? 32

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  try {
    await transition.ready

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 450,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  } catch {
    // Fallback gracefully
  }
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #aside-outline-after>
      <DocToolbar />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
}
</style>
