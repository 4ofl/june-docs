---
title: "/watch Command Reference"
description: "Infrastructure & Domain Sentinel: monitor uptime, TLS, and DNS. · Access: Whitelisted User · Provider: June Network Guard & SQLite WAL (watched_targets table)"
ogImage: "/og/cmd-watch.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/watch</span>
  </div>
</div>

## `/watch`

> Infrastructure & Domain Sentinel: monitor uptime, TLS, and DNS.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | June Network Guard & SQLite WAL (watched_targets table) |
| **Data Stored** | Stores target URL, hostname, interval, status code, TLS cert expiry/issuer, and content hash in watched_targets table. |

### Subcommands

#### `/watch add`

Add a website or API to Sentinel monitoring.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Target URL to monitor. | String | Yes |
| `interval` | Check interval in minutes (default: 60).<br><em>Allowed values:</em> `15`, `30`, `60`, `360`, `1440` | Integer | No |
| `label` | Optional friendly label for this monitor. | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/watch list`

List all your active Sentinel monitors.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/watch check`

Run an on-demand live probe for a watched target.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `target` | Target ID or URL to probe. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/watch remove`

Remove a target from Sentinel monitoring.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `target` | Target ID or URL to remove. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/watch clear`

Remove all your active Sentinel monitors.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/watch add url:"https://example.com" label:"Production API"
/watch list
/watch remove id:"wt_123"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#watch" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
