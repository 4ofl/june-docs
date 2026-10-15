---
title: "/useragent Command Reference"
description: "Parse a User-Agent string. · Access: All Users · Provider: Local User-Agent Parser"
ogImage: "/og/cmd-useragent.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/web" style="color: var(--vp-c-text-2);">Web & Media</a> / <span style="color: var(--vp-c-brand-1);">/useragent</span>
  </div>
</div>

## `/useragent`

> Parse a User-Agent string.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local User-Agent Parser |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `string` | User-Agent string. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/useragent string:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/web#useragent" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Web & Media Reference</a>
</div>
