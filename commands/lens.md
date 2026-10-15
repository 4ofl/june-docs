---
title: "/lens Command Reference"
description: "Find visually similar public images. · Access: Whitelisted User · Provider: SerpAPI / Google Lens"
ogImage: "/og/cmd-lens.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/osint" style="color: var(--vp-c-text-2);">OSINT & Reconnaissance</a> / <span style="color: var(--vp-c-brand-1);">/lens</span>
  </div>
</div>

## `/lens`

> Find visually similar public images.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | SerpAPI / Google Lens |
| **Data Stored** | Ephemeral (Reverse visual search across indexed web) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `image` | Image to search. | Attachment | No |
| `url` | Direct public image URL. | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/lens image:<attachment>
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/osint#lens" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to OSINT & Reconnaissance Reference</a>
</div>
