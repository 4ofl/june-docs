---
title: "/regex Command Reference"
description: "Test a regular expression against a string. · Access: Whitelisted User · Provider: Node.js worker_threads Sandbox (500ms watchdog)"
ogImage: "/og/cmd-regex.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/regex</span>
  </div>
</div>

## `/regex`

> Test a regular expression against a string.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Node.js worker_threads Sandbox (500ms watchdog) |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `pattern` | Pattern without slashes (max 256 characters). | String | Yes |
| `string` | Input string (max 8,000 characters). | String | Yes |
| `flags` | Regex flags. Default: g. | String | No |
| `ephemeral` | Hide response. | Boolean | No |

### Examples

```text
/regex pattern:"^[a-z0-9_-]+$" input:"test_slug-1"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#regex" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
