---
title: General Utilities
description: Core productivity, scheduling, temporary mail, media forensics, and account data sovereignty utilities.
---

# General Utilities

Core productivity, scheduling, temporary mail, media forensics, and account data sovereignty utilities.

---

## Quick Navigation

- [Productivity & Reminders](#productivity-reminders)
- [Temporary Mail & Storage](#temporary-mail-storage)
- [Data Privacy & Account Sovereignty](#data-privacy-account-sovereignty)
- [Cryptography, Hashing & Encoders](#cryptography-hashing-encoders)
- [Time & Timestamp Helpers](#time-timestamp-helpers)
- [Identity & Account Reconnaissance](#identity-account-reconnaissance)
- [Media & Image Processing](#media-image-processing)
- [Text, Formatting & Linguistics](#text-formatting-linguistics)
- [Sentinel Monitoring](#sentinel-monitoring)
- [System & Operational Diagnostics](#system-operational-diagnostics)

---

## Productivity & Reminders

## `/remind`

> Manage private reminders.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User / Guild Member |
| **Provider** | Local SQLite WAL (reminders table) |
| **Data Stored** | Stores user ID, reminder text, due timestamp, delivery channel in reminders table until delivered or cleared. |

### Subcommands

#### `/remind add`

Set a reminder.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `time` | When to remind you, such as 10m or 1h. *(Autocomplete supported)* | String | Yes |
| `text` | What June should remind you about. | String | Yes |

#### `/remind list`

List your pending reminders.

#### `/remind cancel`

Cancel one pending reminder.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `id` | Reminder ID to cancel. *(Autocomplete supported)* | String | Yes |

#### `/remind clear`

Cancel all your pending reminders.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `confirm` | Set to true to confirm cancellation. | Boolean | Yes |

### Examples

```text
/remind in duration:"2h 30m" text:"Review PR"
/remind list
/remind cancel id:"1a2b3c"
```

---

## `/receipt`

> Manage your saved receipts.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User / Guild Member |
| **Provider** | Local SQLite WAL (receipts table) |
| **Data Stored** | Stores saved-by user ID, author ID, author tag, message text (<=2000 chars), timestamps, attachment metadata. |

### Subcommands

#### `/receipt random`

Show a random saved receipt.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/receipt view`

View one saved receipt by ID.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `id` | Receipt ID to view. *(Autocomplete supported)* | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/receipt search`

Search your saved receipts.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `query` | Text to search for. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/receipt list`

List saved receipts, optionally by author.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `user` | Filter by message author. | User | No |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/receipt delete`

Delete a saved receipt.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `id` | Receipt ID to delete. *(Autocomplete supported)* | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/receipt clear`

Delete all your saved receipts.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `confirm` | Set to true to confirm deletion. | Boolean | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/receipt list
/receipt view id:"rec_123"
/receipt clear
```

---

## `/poll`

> Create a Discord poll.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User / Guild Member |
| **Provider** | Discord API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `question` | Poll question. | String | Yes |
| `option1` | First option. | String | Yes |
| `option2` | Second option. | String | Yes |
| `option3` | Third option. | String | No |
| `option4` | Fourth option. | String | No |
| `option5` | Fifth option. | String | No |
| `option6` | Sixth option. | String | No |
| `option7` | Seventh option. | String | No |
| `option8` | Eighth option. | String | No |
| `option9` | Ninth option. | String | No |
| `option10` | Tenth option. | String | No |
| `duration` | Duration in hours. Defaults to 24. | Integer | No |
| `multiselect` | Allow multiple selections. | Boolean | No |

### Examples

```text
/poll question:"Deploy to production?" duration:24
```

---

## `/tldr`

> Summarize text into a few concise points.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User / Guild Member |
| **Provider** | Internal Summarizer Engine |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to summarize. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/tldr text:"Long documentation or transcript text to summarize"
```

---

## Temporary Mail & Storage

## `/tempmail`

> Manage private, self-hosted temporary inboxes.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Stalwart Mail Server (RFC 8621 / RFC 8620 JMAP) & SQLite WAL |
| **Data Stored** | SQLite records 60-minute inbox lease. Inbound messages stored on Stalwart mail server until operational purge. |

### Subcommands

#### `/tempmail create`

Create a temporary inbox.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/tempmail list`

List your active temporary inboxes.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/tempmail check`

Check a temporary inbox.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `email` | Inbox to check. *(Autocomplete supported)* | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/tempmail read`

Read a message from an inbox.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `email` | Inbox containing the message. *(Autocomplete supported)* | String | Yes |
| `id` | Message ID. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/tempmail delete`

Remove one temporary inbox record.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `email` | Inbox record to remove. *(Autocomplete supported)* | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/tempmail clear`

Remove all your temporary inbox records.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `confirm` | Set to true to confirm removal. | Boolean | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/tempmail create
/tempmail list
/tempmail messages address:"7f6899f...@temp.4ofl.dev"
```

---

## `/bin`

> Create and manage your secure pastes.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Configured Pastebin Service & SQLite WAL |
| **Data Stored** | SQLite records managed bin slug and URL under user ID. Paste text stored on external bin service. |

### Subcommands

#### `/bin create`

Create a paste owned by your June account.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `content` | Paste contents. | String | Yes |
| `custom` | Optional custom slug for administrators. | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/bin list`

List only your pastes.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/bin delete`

Delete one of your pastes.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `slug` | Your paste slug. *(Autocomplete supported)* | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/bin clear`

Delete all pastes owned by your account.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `confirmation` | Enter CLEAR. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/bin create title:"config.json" content:"{\"port\": 3000}"
/bin list
/bin delete slug:"abc12"
```

---

## Data Privacy & Account Sovereignty

## `/data`

> Review, export, or delete your June data.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local SQLite WAL (userData.js) |
| **Data Stored** | None (Self-service data inspection, export, and atomic purge utility) |

### Subcommands

#### `/data summary`

Show the June records currently linked to you.

#### `/data export`

Export your June-controlled records as private JSON.

#### `/data retention`

Explain what deletion can and cannot remove.

#### `/data delete`

Delete your self-service June records.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `confirmation` | Type DELETE to confirm. | String | Yes |

### Examples

```text
/data view
/data export
/data delete
```

---

## `/privacy`

> See what June stores, shares, and lets you control.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Documentation |
| **Data Stored** | None |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `topic` | Privacy topic to open.<br><em>Allowed values:</em> `overview`, `storage`, `external`, `controls` | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/privacy
```

---

## `/settings`

> Manage your personal June defaults.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local SQLite WAL (user_settings table) |
| **Data Stored** | Stores user preferences (timezone, clock format, units, ephemeral default) under user ID. |

### Subcommands

#### `/settings view`

View your current settings.

#### `/settings timezone`

Set your default timezone.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `value` | IANA timezone. *(Autocomplete supported)* | String | Yes |

#### `/settings ephemeral`

Set whether responses are private by default.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `value` | Use private responses by default. | Boolean | Yes |

#### `/settings units`

Set your default unit system.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `value` | Unit system.<br><em>Allowed values:</em> `metric`, `imperial` | String | Yes |

#### `/settings clock`

Set your preferred clock format.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `value` | Clock format.<br><em>Allowed values:</em> `24h`, `12h` | String | Yes |

#### `/settings reminders`

Set where new reminders are delivered.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `value` | Delivery method.<br><em>Allowed values:</em> `dm`, `channel` | String | Yes |

#### `/settings translation`

Set your default translation target.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `value` | Target language. *(Autocomplete supported)* | String | Yes |

#### `/settings layout`

Set the default result density.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `value` | Result layout.<br><em>Allowed values:</em> `detailed`, `compact` | String | Yes |

#### `/settings reset`

Reset all personal settings.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `confirm` | Set to true to confirm reset. | Boolean | Yes |

### Examples

```text
/settings view
/settings timezone value:"America/New_York"
/settings clock value:"24h"
/settings units value:"metric"
```

---

## Cryptography, Hashing & Encoders

## `/codec`

> Encode and decode text formats.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local V8 Runtime |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/codec base64 encode`

Encode text as Base64.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to encode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec base64 decode`

Decode Base64 as text.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Base64 text to decode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec url encode`

Encode text as URL.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to encode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec url decode`

Decode URL as text.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | URL text to decode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec hex encode`

Encode text as hexadecimal.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to encode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec hex decode`

Decode hexadecimal as text.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | hexadecimal text to decode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec binary encode`

Encode text as binary.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to encode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec binary decode`

Decode binary as text.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | binary text to decode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/codec base64 encode text:"hello world"
/codec hex decode text:"68656c6c6f"
```

---

## `/crypto`

> Check a cryptocurrency market price.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | CoinGecko / Crypto Public API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `coin` | Asset name or symbol, such as BTC. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/crypto coin:"bitcoin"
/crypto coin:"ethereum"
```

---

## `/hash`

> Generate a cryptographic hash.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Node.js crypto module |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to hash. | String | Yes |
| `algorithm` | Hash algorithm. Defaults to SHA-256.<br><em>Allowed values:</em> `md5`, `sha1`, `sha256`, `sha384`, `sha512` | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/hash algorithm:"sha256" text:"secure string"
```

---

## `/password`

> Generate a cryptographically secure random password.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Node.js crypto.randomBytes |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `length` | Length of the password (default 16, max 100). | Integer | No |
| `ephemeral` | Hide response. | Boolean | No |

### Examples

```text
/password length:24 symbols:true
```

---

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

## `/uuid`

> Generate a random UUID.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Node.js crypto.randomUUID |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/uuid count:5
```

---

## Time & Timestamp Helpers

## `/time`

> Check local time and create or parse Discord timestamps.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local V8 Intl Engine |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/time location`

Check the local time for a location.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `location` | City or location. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/time now`

Show the current time in every Discord format.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/time create`

Create timestamps from a date and timezone.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `date` | Date in YYYY-MM-DD format. | String | Yes |
| `time` | Time in HH:mm format. | String | No |
| `timezone` | IANA timezone. Defaults to UTC. *(Autocomplete supported)* | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/time parse`

Parse Unix or Discord timestamp syntax.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `input` | Unix seconds, milliseconds, or ``<t:1234:R>``. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/time in timezone:"Asia/Tokyo"
/time parse input:"1700000000"
```

---

## Identity & Account Reconnaissance

## `/whois`

> Extract detailed Discord profile data.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User / Guild Member |
| **Provider** | Discord API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `target` | Target user. | User | No |
| `ephemeral` | Hide response. | Boolean | No |

### Examples

```text
/whois user:@username
```

---

## `/roblox`

> Look up a Roblox account.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Roblox Public API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | Roblox username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/roblox user username:"Roblox"
```

---

## `/pomelo`

> Check Discord username availability.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Discord Pomelo Availability API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | Username to check. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/pomelo username:"june_bot"
```

---

## `/snowflake`

> Inspect a Discord snowflake ID.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Discord Snowflake Decoder |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `id` | Discord snowflake ID. | String | Yes |
| `type` | Optional object label.<br><em>Allowed values:</em> `Object`, `User`, `Server`, `Channel`, `Message`, `Role` | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/snowflake id:"175928847299117063"
```

---

## `/npm`

> Look up a package on npm.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | npm Registry API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `package` | Package name. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/npm package:"discord.js"
```

---

## `/dict`

> Look up an English word.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Free Dictionary API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `word` | Word to define. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/dict word:"ephemeral"
```

---

## `/wiki`

> Look up a Wikipedia article.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Wikipedia API (circuit breaker guarded) |
| **Data Stored** | Cached briefly in memory (5m TTL) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `query` | Article or subject. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/wiki query:"Discord (software)"
```

---

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

## Media & Image Processing

## `/ocr`

> Extract text from an image.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | OCR.space REST API |
| **Data Stored** | Ephemeral (Image processed via stream buffer with 10MB limit) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `image` | Image to read. | Attachment | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/ocr image:<attachment>
```

---

## `/rembg`

> Remove the background from an image.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | remove.bg API (Credit-guarded) |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `image` | Image to process. | Attachment | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/rembg image:<attachment>
```

---

## `/qr`

> Encode text as a QR code.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local QR Matrix Generator |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text or URL to encode. | String | Yes |
| `correction` | Error-correction level.<br><em>Allowed values:</em> `L`, `M`, `Q`, `H` | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/qr text:"https://docs.june.4ofl.dev"
```

---

## `/avatar`

> Show a user’s profile avatar.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Discord CDN |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `target` | Target user. | User | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/avatar user:@username
```

---

## `/banner`

> Show a user’s profile banner.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Discord CDN |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `target` | Target user. | User | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/banner user:@username
```

---

## `/color`

> Generate a solid color preview.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Canvas / SVG Renderer |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `hex` | Six-digit hexadecimal color. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/color hex:"#10b981"
```

---

## `/media`

> Look up films, shows, games, anime, songs, and lyrics.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Spotify, OMDb, RAWG, Kitsu, LRCLIB (Circuit breaker protected) |
| **Data Stored** | Briefly cached in memory (5m TTL) |

### Subcommands

#### `/media anime`

Look up an anime title.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `title` | Anime title. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/media game`

Look up a video game.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `title` | Game title. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/media movie`

Look up a movie or television title.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `title` | Movie or show title. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/media song`

Look up a song in the iTunes catalog.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `query` | Song title and optional artist. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/media lyrics`

Look up lyric metadata and a short preview.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `query` | Song title and artist. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/media steam`

Look up a game on Steam.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `game` | Game title. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/media movie title:"Interstellar"
/media spotify query:"Starboy"
/media anime query:"Frieren"
```

---

## `/download`

> Download media from a supported URL.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Internal Cobalt Media Bridge (Container isolated) |
| **Data Stored** | Ephemeral (Streamed directly via memory buffer with 10MB limit) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Target URL. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/download url:"https://www.youtube.com/watch?v=..."
```

---

## `/screenshot`

> Render a screenshot of a public webpage.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | SSRF-Guarded External Preview Service |
| **Data Stored** | Ephemeral (Target URL pre-checked by June firewall; rendered image URL displayed) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Public webpage URL. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/screenshot url:"https://docs.june.4ofl.dev"
```

---

## Text, Formatting & Linguistics

## `/diff`

> Compare two text values.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Diff Engine |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `old` | Original text. | String | Yes |
| `new` | Updated text. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/diff original:"Hello" modified:"Hello World"
```

---

## `/json`

> Format, validate, and inspect JSON.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local V8 JSON Parser |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/json format`

Format a JSON payload.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `data` | JSON payload. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/json minify`

Minify a JSON payload.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `data` | JSON payload. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/json validate`

Validate a JSON payload.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `data` | JSON payload. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/json get`

Read a path from a JSON payload.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `data` | JSON payload. | String | Yes |
| `path` | Object path, such as user.name. *(Autocomplete supported)* | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/json validate input:"{\"valid\": true}"
```

---

## `/sanitize`

> Clean tracking parameters, metadata, and invisible characters.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Sanitizer Engine (Strips EXIF, metadata, trackers, invisible chars) |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/sanitize link`

Strip marketing and platform trackers from a URL.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Target URL to sanitize. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/sanitize image`

Scrub EXIF and GPS metadata from an image.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `image` | Image to sanitize. | Attachment | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/sanitize text`

Strip invisible characters and neutralize dangerous mentions.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to sanitize. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/sanitize text:"Text with tracking https://example.com?utm_source=test"
```

---

## `/unicode`

> Unicode string utilities.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Unicode Table |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/unicode inspect`

Inspect characters in a string.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to inspect. | String | Yes |
| `ephemeral` | Hide response. | Boolean | No |

#### `/unicode clean`

Clean invisible/zero-width characters from a string.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to clean. | String | Yes |
| `ephemeral` | Hide response. | Boolean | No |

### Examples

```text
/unicode inspect text:"✨"
```

---

## `/urban`

> Look up a term on Urban Dictionary.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Urban Dictionary API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `term` | Term to define. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/urban term:"fire"
```

---

## `/translate`

> Translate text.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Configured Translation Provider |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to translate. | String | Yes |
| `from` | Source language. Defaults to auto detect. *(Autocomplete supported)* | String | No |
| `to` | Target language. Defaults to English. *(Autocomplete supported)* | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/translate text:"Bonjour le monde" target:"en"
```

---

## `/evidence`

> Generate a verifiable cryptographic forensic bundle for a website.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Local Network Inspector & Cryptographic Hasher |
| **Data Stored** | Ephemeral (Point-in-time technical capture bundle, zero database storage) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Target URL to create forensic evidence for. | String | Yes |
| `bundle_file` | Attach tamper-evident JSON forensic proof file (default: true). | Boolean | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/evidence url:"https://example.com"
```

---

## Sentinel Monitoring

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

## System & Operational Diagnostics

## `/ping`

> Check June’s current latency.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Discord Gateway & Local Process |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/ping
```

---

## `/status`

> Check June and provider health.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Internal Runtime & Circuit Breakers |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/status
```

---

## `/info`

> Show June’s runtime information.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Node.js 22 Runtime |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/info
```

---

## `/help`

> Browse commands or inspect usage, examples, and data handling.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Internal Command Surface Registry |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `command` | Command or subcommand to inspect. *(Autocomplete supported)* | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/help
/help command:tempmail
```

---

