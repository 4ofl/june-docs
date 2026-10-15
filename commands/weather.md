---
title: "/weather Command Reference"
description: "Check current weather for a location. · Access: All Users · Provider: wttr.in API (circuit breaker guarded)"
ogImage: "/og/cmd-weather.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/weather</span>
  </div>
</div>

## `/weather`

> Check current weather for a location.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | wttr.in API (circuit breaker guarded) |
| **Data Stored** | Cached briefly in memory (2m TTL) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `location` | City or location. | String | Yes |
| `units` | Unit system.<br><em>Allowed values:</em> `metric`, `imperial` | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/weather location:"London"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#weather" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
