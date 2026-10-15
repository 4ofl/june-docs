---
title: "/telegram Command Reference"
description: "Look up a public Telegram profile or channel. · Access: All Users · Provider: Telegram Public Web Channel API"
ogImage: "/og/cmd-telegram.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/osint" style="color: var(--vp-c-text-2);">OSINT & Reconnaissance</a> / <span style="color: var(--vp-c-brand-1);">/telegram</span>
  </div>
</div>

## `/telegram`

> Look up a public Telegram profile or channel.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Telegram Public Web Channel API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | Public Telegram username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/telegram channel username:"durov"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/osint#telegram" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to OSINT & Reconnaissance Reference</a>
</div>
