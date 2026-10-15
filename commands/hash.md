---
title: "/hash Command Reference"
description: "Generate a cryptographic hash. · Access: All Users · Provider: Local Node.js crypto module"
ogImage: "/og/cmd-hash.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/hash</span>
  </div>
</div>

## `/hash`

> Generate a cryptographic hash.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Node.js crypto module |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to hash. | String | Yes |
| `algorithm` | Hash algorithm. Defaults to SHA-256.<br><em>Allowed values:</em> `md5`, `sha1`, `sha256`, `sha384`, `sha512` | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/hash algorithm:"sha256" text:"secure string"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#hash" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
