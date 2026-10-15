---
title: "/translate Command Reference"
description: "Translate text. · Access: Whitelisted User · Provider: Configured Translation Provider"
ogImage: "/og/cmd-translate.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/translate</span>
  </div>
</div>

## `/translate`

> Translate text.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Configured Translation Provider |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to translate. | String | Yes |
| `from` | Source language. Defaults to auto detect. *(Autocomplete supported)* | String | No |
| `to` | Target language. Defaults to English. *(Autocomplete supported)* | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/translate text:"Bonjour le monde" target:"en"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#translate" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
