---
title: "/unicode Command Reference"
description: "Unicode string utilities. · Access: All Users · Provider: Local Unicode Table"
ogImage: "/og/cmd-unicode.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/unicode</span>
  </div>
</div>

## `/unicode`

> Unicode string utilities.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Unicode Table |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/unicode inspect`

Inspect characters in a string.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to inspect. | String | Yes |
| `ephemeral` | Hide response. | Boolean | No |

#### `/unicode clean`

Clean invisible/zero-width characters from a string.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to clean. | String | Yes |
| `ephemeral` | Hide response. | Boolean | No |

### Examples

```text
/unicode inspect text:"✨"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#unicode" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
