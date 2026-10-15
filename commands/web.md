---
title: Web & Media
description: Network diagnostics, IP geolocation, domain validation, media lookups, and URL tools.
---

# Web & Media

Network diagnostics, IP geolocation, domain validation, media lookups, and URL tools.

> [!NOTE]
> All outbound HTTP requests initiated by Web & Media tools pass through June's IP-level firewall with socket pinning, eliminating SSRF and DNS rebinding risks. Webpage screenshots are rendered via an isolated external capture service without running in-process Chromium.

---

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

## `/minecraft`

> Look up Minecraft players, skins, and servers.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | api.mcsrvstat.us & PlayerDB |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/minecraft player`

Look up a Java player profile.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | Java username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/minecraft server`

Check a public Minecraft server.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ip` | Hostname and optional port. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/minecraft skin`

Get a Java player skin.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | Java username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/minecraft server target:"mc.hypixel.net"
/minecraft user username:"Notch"
```

---

## `/shorten`

> Create and manage your shortened URLs.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Configured Shortener Service & SQLite WAL |
| **Data Stored** | Stores slug, short URL, target destination URL in managed_short_links table. |

### Subcommands

#### `/shorten create`

Create a short link owned by your June account.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Target URL. | String | Yes |
| `custom` | Optional custom slug for administrators. | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/shorten list`

List only your short links.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/shorten delete`

Delete one of your short links.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `slug` | Your short-link slug. *(Autocomplete supported)* | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/shorten clear`

Delete all short links owned by your account.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `confirmation` | Enter CLEAR. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/shorten create target:"https://very-long-url.com/path" custom_slug:"docs"
```

---

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

## `/useragent`

> Parse a User-Agent string.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local User-Agent Parser |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `string` | User-Agent string. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/useragent string:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
```

---

