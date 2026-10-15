---
title: "/wiki Command Reference"
description: "Look up a Wikipedia article. · Access: All Users · Provider: Wikipedia API (circuit breaker guarded)"
ogImage: "/og/cmd-wiki.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/wiki</span>
  </div>
</div>

## `/wiki`

> Look up a Wikipedia article.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Wikipedia API (circuit breaker guarded) |
| **Data Stored** | Cached briefly in memory (5m TTL) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `query` | Article or subject. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/wiki query:"Discord (software)"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#wiki" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
