---
title: "/urlscan Command Reference"
description: "Submit a public URL to urlscan.io as unlisted. · Access: Whitelisted User · Provider: urlscan.io API"
ogImage: "/og/cmd-urlscan.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/threat" style="color: var(--vp-c-text-2);">Threat Intelligence</a> / <span style="color: var(--vp-c-brand-1);">/urlscan</span>
  </div>
</div>

## `/urlscan`

> Submit a public URL to urlscan.io as unlisted.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | urlscan.io API |
| **Data Stored** | Ephemeral (Target URL submitted for unlisted analysis) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Public URL. Query parameters and fragments are removed. | String | Yes |
| `consent` | Confirm submission to the third-party urlscan.io service. | Boolean | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/urlscan target:"https://example.com"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/threat#urlscan" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Threat Intelligence Reference</a>
</div>
