---
title: "/reddit Command Reference"
description: "Look up a public Reddit profile. · Access: All Users · Provider: Reddit Public JSON API"
ogImage: "/og/cmd-reddit.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/osint" style="color: var(--vp-c-text-2);">OSINT & Reconnaissance</a> / <span style="color: var(--vp-c-brand-1);">/reddit</span>
  </div>
</div>

## `/reddit`

> Look up a public Reddit profile.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Reddit Public JSON API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | Reddit username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/reddit user username:"spez"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/osint#reddit" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to OSINT & Reconnaissance Reference</a>
</div>
