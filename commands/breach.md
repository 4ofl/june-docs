---
title: "/breach Command Reference"
description: "Check whether a public breach index has entries for an email address. · Access: Whitelisted User · Provider: External Breach Intelligence Index"
ogImage: "/og/cmd-breach.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/threat" style="color: var(--vp-c-text-2);">Threat Intelligence</a> / <span style="color: var(--vp-c-brand-1);">/breach</span>
  </div>
</div>

## `/breach`

> Check whether a public breach index has entries for an email address.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | External Breach Intelligence Index |
| **Data Stored** | Ephemeral (Query processed in-memory, zero database logging) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `email` | Email address to check. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/breach email:"user@example.com"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/threat#breach" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Threat Intelligence Reference</a>
</div>
