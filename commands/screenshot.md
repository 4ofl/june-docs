---
title: "/screenshot Command Reference"
description: "Render a screenshot of a public webpage. · Access: Whitelisted User · Provider: SSRF-Guarded External Preview Service"
ogImage: "/og/cmd-screenshot.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/screenshot</span>
  </div>
</div>

## `/screenshot`

> Render a screenshot of a public webpage.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | SSRF-Guarded External Preview Service |
| **Data Stored** | Ephemeral (Target URL pre-checked by June firewall; rendered image URL displayed) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Public webpage URL. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/screenshot url:"https://docs.june.4ofl.dev"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#screenshot" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
