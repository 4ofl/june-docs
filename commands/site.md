---
title: "/site Command Reference"
description: "Inspect public websites and domains. · Access: Whitelisted User · Provider: Safe HTTP Client & DNS Resolver"
ogImage: "/og/cmd-site.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/web" style="color: var(--vp-c-text-2);">Web & Media</a> / <span style="color: var(--vp-c-brand-1);">/site</span>
  </div>
</div>

## `/site`

> Inspect public websites and domains.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Safe HTTP Client & DNS Resolver |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/site inspect`

Inspect DNS, redirects, headers, TLS, and robots.txt.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `target` | Domain or URL to inspect. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/site dns`

Query common DNS records for a domain.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `domain` | Domain such as example.com. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/site headers`

Read response headers from a public web URL.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Public HTTP or HTTPS URL. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/site cors`

Inspect CORS headers from a public web endpoint.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Public HTTP or HTTPS URL. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/site tls`

Inspect the TLS certificate presented by a public host.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `domain` | Public domain on port 443. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/site robots`

Read robots.txt from a public website.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `domain` | Public website domain or URL. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/site certificates`

List certificate-transparency names for a domain.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `domain` | Domain such as example.com. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/site redirects`

Trace redirects for a public URL.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Public HTTP or HTTPS URL. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/site traceroute`

Request a third-party traceroute to a public host.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `target` | Public hostname or IP address. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/site headers url:"https://example.com"
/site dns host:"example.com"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/web#site" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Web & Media Reference</a>
</div>
