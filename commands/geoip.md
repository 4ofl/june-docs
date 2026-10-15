---
title: "/geoip Command Reference"
description: "Look up approximate public geolocation data for an IP address. · Access: All Users · Provider: IP-API Geolocation Engine"
ogImage: "/og/cmd-geoip.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/web" style="color: var(--vp-c-text-2);">Web & Media</a> / <span style="color: var(--vp-c-brand-1);">/geoip</span>
  </div>
</div>

## `/geoip`

> Look up approximate public geolocation data for an IP address.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | IP-API Geolocation Engine |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `target` | Public IPv4 or IPv6 address. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/geoip ip:"1.1.1.1"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/web#geoip" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Web & Media Reference</a>
</div>
