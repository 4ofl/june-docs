---
title: Threat Intelligence
description: Security analysis, URL sandbox reports, breach indexing, network diagnostics, and forensic metadata tools.
---

# Threat Intelligence

Security analysis, URL sandbox reports, breach indexing, network diagnostics, and forensic metadata tools.

> [!IMPORTANT]
> **Forensic Metadata vs Image Stripping:**
> - **`/exif`** is an inspection tool that extracts and displays embedded device tags, GPS coordinates, and camera serial numbers from user-supplied images for forensic analysis. It never stores the metadata.
> - To strip metadata to protect privacy before sharing an image, use the **[`/sanitize`](/commands/general#sanitize)** command.
>
> **Diagnostic Port Scanning:**
> - **`/portscan`** is restricted to bot administrators, requires an explicit `authorized: true` confirmation, and evaluates a fixed list of 11 common ports against public hosts.
>
> **Evidentiary Notice:**
> - **`/evidence`** produces a point-in-time technical snapshot bundle (HTTP headers, TLS certificates, SHA-256 body hashes). It is designed for operational debugging and verification, not as a certified legal forensic submission.

---

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

## `/exif`

> Extract metadata embedded in an image.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Local Exif-Parser (Buffer cap 10MB) |
| **Data Stored** | Ephemeral (Extracted metadata displayed for forensic inspection, never stored) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `image` | Image to inspect. | Attachment | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/exif image:<attachment>
```

---

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

## `/portscan`

> Scan common ports on an authorized public host.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Operator / Bot Administrator Only (requires authorized:true) |
| **Provider** | Direct Socket Connection via net.Socket (1500ms timeout) |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `target` | Public hostname you own or may test. | String | Yes |
| `authorized` | Confirm that you are authorized to scan this host. | Boolean | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/portscan target:"example.com" authorized:true
```

---

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

