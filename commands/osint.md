---
title: OSINT & Reconnaissance
description: Open-source intelligence gathering, public profile inspection, and reverse image reconnaissance.
---

# OSINT & Reconnaissance

Open-source intelligence gathering, public profile inspection, and reverse image reconnaissance.

> [!NOTE]
> **Lawful Reconnaissance Boundaries:**
> - All OSINT commands query strictly publicly indexed endpoints and official platform APIs.
> - June never stores search queries, usernames, or returned profile records in its SQLite database.
> - **`/lens` vs `/exif`:** `/lens` executes reverse visual image search across indexed web sources to find public matches. In contrast, `/exif` inspects local embedded hardware tags.
> - For Discord account and identity lookups, see **[`/whois`](/commands/general#whois)**.

---

## `/github`

> Look up a public GitHub profile.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | GitHub Public API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | GitHub username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/github user username:"torvalds"
```

---

## `/invite`

> Inspect a Discord invite.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Discord Invite API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `code` | Invite URL or code. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/invite code:"discord-developers"
```

---

## `/lens`

> Find visually similar public images.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | SerpAPI / Google Lens |
| **Data Stored** | Ephemeral (Reverse visual search across indexed web) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `image` | Image to search. | Attachment | No |
| `url` | Direct public image URL. | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/lens image:<attachment>
```

---

## `/reddit`

> Look up a public Reddit profile.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Reddit Public JSON API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | Reddit username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/reddit user username:"spez"
```

---

## `/telegram`

> Look up a public Telegram profile or channel.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Telegram Public Web Channel API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | Public Telegram username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/telegram channel username:"durov"
```

---

