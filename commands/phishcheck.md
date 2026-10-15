---
title: "/phishcheck Command Reference"
description: "Show available VirusTotal analysis signals for a URL. · Access: Whitelisted User · Provider: VirusTotal API"
ogImage: "/og/cmd-phishcheck.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/threat" style="color: var(--vp-c-text-2);">Threat Intelligence</a> / <span style="color: var(--vp-c-brand-1);">/phishcheck</span>
  </div>
</div>

## `/phishcheck`

> Show available VirusTotal analysis signals for a URL.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | VirusTotal API |
| **Data Stored** | Ephemeral (Target URL/hash sent to VirusTotal) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Public HTTP or HTTPS URL. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/phishcheck target:"https://suspicious-site.com"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/threat#phishcheck" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Threat Intelligence Reference</a>
</div>
