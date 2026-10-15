---
title: "/mailcheck Command Reference"
description: "Check mail configuration records. · Access: All Users · Provider: Local MX & Disposable Domain Heuristics"
ogImage: "/og/cmd-mailcheck.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/web" style="color: var(--vp-c-text-2);">Web & Media</a> / <span style="color: var(--vp-c-brand-1);">/mailcheck</span>
  </div>
</div>

## `/mailcheck`

> Check mail configuration records.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local MX & Disposable Domain Heuristics |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/mailcheck domain`

Check MX, SPF, DMARC for a domain.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `domain` | Target domain. | String | Yes |
| `ephemeral` | Hide response. | Boolean | No |

#### `/mailcheck dkim`

Check DKIM record for a domain and selector.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `domain` | Target domain. | String | Yes |
| `selector` | DKIM selector. | String | Yes |
| `ephemeral` | Hide response. | Boolean | No |

### Examples

```text
/mailcheck domain:"proton.me"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/web#mailcheck" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Web & Media Reference</a>
</div>
