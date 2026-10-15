---
title: "/jwt Command Reference"
description: "Decode the header and payload of a JWT without verifying it. · Access: All Users · Provider: Local JWT Decoder"
ogImage: "/og/cmd-jwt.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/web" style="color: var(--vp-c-text-2);">Web & Media</a> / <span style="color: var(--vp-c-brand-1);">/jwt</span>
  </div>
</div>

## `/jwt`

> Decode the header and payload of a JWT without verifying it.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local JWT Decoder |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `token` | JWT to decode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/jwt token:"eyJhbGciOi..."
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/web#jwt" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Web & Media Reference</a>
</div>
