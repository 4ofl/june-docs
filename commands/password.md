---
title: "/password Command Reference"
description: "Generate a cryptographically secure random password. · Access: All Users · Provider: Local Node.js crypto.randomBytes"
ogImage: "/og/cmd-password.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/password</span>
  </div>
</div>

## `/password`

> Generate a cryptographically secure random password.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Node.js crypto.randomBytes |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `length` | Length of the password (default 16, max 100). | Integer | No |
| `ephemeral` | Hide response. | Boolean | No |

### Examples

```text
/password length:24 symbols:true
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#password" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
