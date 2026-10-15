<script setup lang="ts">
import { ref } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page } = useData()
const route = useRoute()

const copied = ref(false)

async function copyAsMarkdown() {
  if (typeof window === 'undefined') return

  const docEl = document.querySelector('.vp-doc')
  if (!docEl) return

  const title = page.value.title || page.value.frontmatter.title || 'June Documentation'
  const canonicalUrl = `https://docs.june.4ofl.dev${route.path.replace(/\/$/, '') || '/'}`

  // Clone document to safely strip unwanted chrome
  const clone = docEl.cloneNode(true) as HTMLElement
  clone.querySelectorAll('.doc-toolbar, .telemetry-bar-wrap, script, style, .command-page-header, .command-page-footer').forEach(el => el.remove())

  let markdown = `# ${title}\n\n`
  markdown += `> Source: ${canonicalUrl}\n`
  markdown += `> Platform: June Discord Utility Engine (Node.js 22 LTS, SQLite WAL)\n`
  markdown += `> Extracted: ${new Date().toISOString()}\n\n`
  markdown += `---\n\n`

  function walk(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || ''
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return ''

    const el = node as HTMLElement
    const tag = el.tagName.toLowerCase()

    if (tag === 'h1') return `\n# ${el.innerText.trim()}\n\n`
    if (tag === 'h2') return `\n## ${el.innerText.trim()}\n\n`
    if (tag === 'h3') return `\n### ${el.innerText.trim()}\n\n`
    if (tag === 'h4') return `\n#### ${el.innerText.trim()}\n\n`
    if (tag === 'p') return `${el.innerText.trim()}\n\n`
    if (tag === 'blockquote') return `> ${el.innerText.trim().replace(/\n/g, '\n> ')}\n\n`
    if (tag === 'pre') {
      const lang = el.className.match(/language-(\w+)/)?.[1] || ''
      return `\`\`\`${lang}\n${el.innerText.trim()}\n\`\`\`\n\n`
    }
    if (tag === 'code' && el.parentElement?.tagName.toLowerCase() !== 'pre') {
      return `\`${el.innerText.trim()}\``
    }
    if (tag === 'ul') {
      let items = ''
      el.querySelectorAll(':scope > li').forEach(li => {
        items += `- ${(li as HTMLElement).innerText.trim()}\n`
      })
      return items + '\n'
    }
    if (tag === 'ol') {
      let items = ''
      let idx = 1
      el.querySelectorAll(':scope > li').forEach(li => {
        items += `${idx++}. ${(li as HTMLElement).innerText.trim()}\n`
      })
      return items + '\n'
    }
    if (tag === 'table') {
      const rows = Array.from(el.querySelectorAll('tr'))
      if (!rows.length) return ''
      let tableText = ''
      rows.forEach((row, rIdx) => {
        const cells = Array.from(row.querySelectorAll('th, td')).map(c => (c as HTMLElement).innerText.trim().replace(/\|/g, '\\|'))
        tableText += `| ${cells.join(' | ')} |\n`
        if (rIdx === 0) {
          tableText += `| ${cells.map(() => ':---').join(' | ')} |\n`
        }
      })
      return tableText + '\n'
    }

    let childText = ''
    node.childNodes.forEach(child => {
      childText += walk(child)
    })
    return childText
  }

  const extracted = walk(clone).replace(/\n{3,}/g, '\n\n').trim()
  markdown += extracted

  try {
    await navigator.clipboard.writeText(markdown)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2200)
  } catch (err) {
    console.error('Failed to copy markdown:', err)
  }
}
</script>

<template>
  <div class="sidebar-llm-actions">
    <a href="/llms.txt" target="_blank" rel="noopener" class="sidebar-llms-link">
      <span>llms.txt documentation</span>
      <span class="ext">↗</span>
    </a>

    <button
      class="sidebar-copy-btn"
      :class="{ success: copied }"
      title="Copy page as clean Markdown for LLMs"
      aria-label="Copy page as clean Markdown for LLMs"
      @click="copyAsMarkdown"
    >
      <svg v-if="!copied" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
      <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>{{ copied ? 'Copied as Markdown!' : 'Copy as Markdown' }}</span>
    </button>
  </div>
</template>

<style scoped>
.sidebar-llm-actions {
  margin-top: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-family: var(--vp-font-family-base);
}

.sidebar-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: none;
  border: 0;
  padding: 0.2rem 0;
  cursor: pointer;
  text-align: left;
  transition: color 0.15s;
}

.sidebar-copy-btn:hover {
  color: var(--vp-c-brand-1);
}

.sidebar-copy-btn.success {
  color: var(--vp-c-brand-1);
}

.sidebar-copy-btn svg {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: color 0.15s;
}

.sidebar-copy-btn:hover svg,
.sidebar-copy-btn.success svg {
  color: var(--vp-c-brand-1);
}

.sidebar-llms-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  text-decoration: none;
  padding: 0.1rem 0;
  transition: color 0.15s;
}

.sidebar-llms-link .ext {
  font-family: var(--vp-font-family-mono);
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.sidebar-llms-link:hover,
.sidebar-llms-link:hover .ext {
  color: var(--vp-c-brand-1);
}
</style>
