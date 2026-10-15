---
title: "/download Command Reference"
description: "Download media from a supported URL. · Access: Whitelisted User · Provider: Internal Cobalt Media Bridge (Container isolated)"
ogImage: "/og/cmd-download.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/download</span>
  </div>
</div>

## `/download`

> Download media from a supported URL.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Internal Cobalt Media Bridge (Container isolated) |
| **Data Stored** | Ephemeral (Streamed directly via memory buffer with 10MB limit) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Target URL. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/download url:"https://www.youtube.com/watch?v=..."
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#download" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
