---
title: Command Reference & Master Matrix
description: Complete index, access tiers, and data retention specifications for all slash commands in June.
---

# Command Reference & Master Matrix

June provides a comprehensive suite of developer utilities, forensic tools, temporary mailbox operations, and productivity workflows.

> [!TIP]
> Ready to onboard or configure your account? Read the **[Getting Started & Access Guide](/commands/getting-started)**.

---

## Command Categories

| Category | Description | Primary Commands |
| :--- | :--- | :--- |
| **[General Utilities](/commands/general)** | Productivity, temporary mail, settings, reminders, and data controls. | `/remind`, `/receipt`, `/tempmail`, `/data`, `/settings`, `/time` |
| **[OSINT & Reconnaissance](/commands/osint)** | Public profile lookups, GitHub intelligence, and reverse visual search. | `/github`, `/reddit`, `/lens`, `/invite`, `/telegram` |
| **[Threat Intelligence](/commands/threat)** | Phishing analysis, URL sandbox reports, and forensic EXIF inspection. | `/phishcheck`, `/urlscan`, `/breach`, `/exif`, `/bssid`, `/portscan` |
| **[Web & Media](/commands/web)** | IP geolocation, domain headers, JWT debugging, URL shorteners, and media. | `/geoip`, `/jwt`, `/site`, `/shorten`, `/media`, `/screenshot` |
| **[Roleplay Actions](/commands/roleplay)** | Expressive social interactions with rich Discord embeds and Components V2. | `/roleplay hug`, `/roleplay pat`, `/roleplay slap` |

---

## Context Menu Actions

June registers interactive message and user context menus directly into the Discord client:

- **Save Receipt** *(Message Context)*: Securely bookmarks the selected message, author tag, content, and attachments into your personal receipts table.
- **Extract Text (OCR)** *(Message Context)*: Runs optical character recognition across image attachments and returns parsed text via upstream OCR API.
- **Summarize (TL;DR)** *(Message Context)*: Generates a concise summary of long messages or pasted logs.
- **Translate Message** *(Message Context)*: Translates selected text into your default language configured in `/settings`.
- **User Banner & Avatar** *(User Context)*: Quick-inspect full-resolution avatars, banners, and creation dates.
- **Inspect User (Whois)** *(User Context)*: Displays detailed account metadata, Discord permissions, and creation timestamps.

---

## Complete Command Master Matrix

The table below summarizes every available command, its functional category, required access level, and data retention classification:

| Command | Category | Description | Access Tier | Data Retention |
| :--- | :--- | :--- | :--- | :--- |
| [`/avatar`](/commands/general#avatar) | [General Utilities](/commands/general) | Show a user’s profile avatar. | All Users | `Ephemeral` |
| [`/banner`](/commands/general#banner) | [General Utilities](/commands/general) | Show a user’s profile banner. | All Users | `Ephemeral` |
| [`/bin`](/commands/general#bin) | [General Utilities](/commands/general) | Create and manage your secure pastes. | Whitelisted User | `SQLite Stored` |
| [`/breach`](/commands/threat#breach) | [Threat Intelligence](/commands/threat) | Check whether a public breach index has entries for an email address. | Whitelisted User | `Ephemeral` |
| [`/codec`](/commands/general#codec) | [General Utilities](/commands/general) | Encode and decode text formats. | All Users | `Ephemeral` |
| [`/color`](/commands/general#color) | [General Utilities](/commands/general) | Generate a solid color preview. | All Users | `Ephemeral` |
| [`/crypto`](/commands/general#crypto) | [General Utilities](/commands/general) | Check a cryptocurrency market price. | All Users | `Ephemeral` |
| [`/data`](/commands/general#data) | [General Utilities](/commands/general) | Review, export, or delete your June data. | All Users | `Ephemeral` |
| [`/dict`](/commands/general#dict) | [General Utilities](/commands/general) | Look up an English word. | All Users | `Ephemeral` |
| [`/diff`](/commands/general#diff) | [General Utilities](/commands/general) | Compare two text values. | All Users | `Ephemeral` |
| [`/download`](/commands/general#download) | [General Utilities](/commands/general) | Download media from a supported URL. | Whitelisted User | `Ephemeral` |
| [`/evidence`](/commands/general#evidence) | [General Utilities](/commands/general) | Generate a verifiable cryptographic forensic bundle for a website. | Whitelisted User | `Ephemeral` |
| [`/exif`](/commands/threat#exif) | [Threat Intelligence](/commands/threat) | Extract metadata embedded in an image. | Whitelisted User | `Ephemeral` |
| [`/geoip`](/commands/web#geoip) | [Web & Media](/commands/web) | Look up approximate public geolocation data for an IP address. | All Users | `Ephemeral` |
| [`/github`](/commands/osint#github) | [OSINT & Reconnaissance](/commands/osint) | Look up a public GitHub profile. | All Users | `Ephemeral` |
| [`/hash`](/commands/general#hash) | [General Utilities](/commands/general) | Generate a cryptographic hash. | All Users | `Ephemeral` |
| [`/help`](/commands/general#help) | [General Utilities](/commands/general) | Browse commands or inspect usage, examples, and data handling. | All Users | `Ephemeral` |
| [`/info`](/commands/general#info) | [General Utilities](/commands/general) | Show June’s runtime information. | All Users | `Ephemeral` |
| [`/invite`](/commands/osint#invite) | [OSINT & Reconnaissance](/commands/osint) | Inspect a Discord invite. | All Users | `Ephemeral` |
| [`/json`](/commands/general#json) | [General Utilities](/commands/general) | Format, validate, and inspect JSON. | All Users | `Ephemeral` |
| [`/jwt`](/commands/web#jwt) | [Web & Media](/commands/web) | Decode the header and payload of a JWT without verifying it. | All Users | `Ephemeral` |
| [`/lens`](/commands/osint#lens) | [OSINT & Reconnaissance](/commands/osint) | Find visually similar public images. | Whitelisted User | `Ephemeral` |
| [`/mailcheck`](/commands/web#mailcheck) | [Web & Media](/commands/web) | Check mail configuration records. | All Users | `Ephemeral` |
| [`/media`](/commands/general#media) | [General Utilities](/commands/general) | Look up films, shows, games, anime, songs, and lyrics. | Whitelisted User | `Ephemeral` |
| [`/minecraft`](/commands/web#minecraft) | [Web & Media](/commands/web) | Look up Minecraft players, skins, and servers. | All Users | `Ephemeral` |
| [`/npm`](/commands/general#npm) | [General Utilities](/commands/general) | Look up a package on npm. | All Users | `Ephemeral` |
| [`/ocr`](/commands/general#ocr) | [General Utilities](/commands/general) | Extract text from an image. | Whitelisted User | `Ephemeral` |
| [`/password`](/commands/general#password) | [General Utilities](/commands/general) | Generate a cryptographically secure random password. | All Users | `Ephemeral` |
| [`/phishcheck`](/commands/threat#phishcheck) | [Threat Intelligence](/commands/threat) | Show available VirusTotal analysis signals for a URL. | Whitelisted User | `Ephemeral` |
| [`/ping`](/commands/general#ping) | [General Utilities](/commands/general) | Check June’s current latency. | All Users | `Ephemeral` |
| [`/poll`](/commands/general#poll) | [General Utilities](/commands/general) | Create a Discord poll. | Whitelisted User / Guild Member | `Ephemeral` |
| [`/pomelo`](/commands/general#pomelo) | [General Utilities](/commands/general) | Check Discord username availability. | All Users | `Ephemeral` |
| [`/portscan`](/commands/threat#portscan) | [Threat Intelligence](/commands/threat) | Scan common ports on an authorized public host. | Operator / Bot Administrator Only (requires authorized:true) | `Ephemeral` |
| [`/privacy`](/commands/general#privacy) | [General Utilities](/commands/general) | See what June stores, shares, and lets you control. | All Users | `Ephemeral` |
| [`/qr`](/commands/general#qr) | [General Utilities](/commands/general) | Encode text as a QR code. | All Users | `Ephemeral` |
| [`/receipt`](/commands/general#receipt) | [General Utilities](/commands/general) | Manage your saved receipts. | Whitelisted User / Guild Member | `SQLite Stored` |
| [`/reddit`](/commands/osint#reddit) | [OSINT & Reconnaissance](/commands/osint) | Look up a public Reddit profile. | All Users | `Ephemeral` |
| [`/regex`](/commands/general#regex) | [General Utilities](/commands/general) | Test a regular expression against a string. | Whitelisted User | `Ephemeral` |
| [`/rembg`](/commands/general#rembg) | [General Utilities](/commands/general) | Remove the background from an image. | Whitelisted User | `Ephemeral` |
| [`/remind`](/commands/general#remind) | [General Utilities](/commands/general) | Manage private reminders. | Whitelisted User / Guild Member | `SQLite Stored` |
| [`/roblox`](/commands/general#roblox) | [General Utilities](/commands/general) | Look up a Roblox account. | All Users | `Ephemeral` |
| [`/roleplay`](/commands/roleplay#roleplay) | [Roleplay Actions](/commands/roleplay) | Use a roleplay action. | All Users | `Ephemeral` |
| [`/sanitize`](/commands/general#sanitize) | [General Utilities](/commands/general) | Clean tracking parameters, metadata, and invisible characters. | All Users | `Ephemeral` |
| [`/screenshot`](/commands/general#screenshot) | [General Utilities](/commands/general) | Render a screenshot of a public webpage. | Whitelisted User | `Ephemeral` |
| [`/settings`](/commands/general#settings) | [General Utilities](/commands/general) | Manage your personal June defaults. | All Users | `SQLite Stored` |
| [`/shorten`](/commands/web#shorten) | [Web & Media](/commands/web) | Create and manage your shortened URLs. | Whitelisted User | `SQLite Stored` |
| [`/site`](/commands/web#site) | [Web & Media](/commands/web) | Inspect public websites and domains. | Whitelisted User | `Ephemeral` |
| [`/snowflake`](/commands/general#snowflake) | [General Utilities](/commands/general) | Inspect a Discord snowflake ID. | All Users | `Ephemeral` |
| [`/status`](/commands/general#status) | [General Utilities](/commands/general) | Check June and provider health. | Whitelisted User | `Ephemeral` |
| [`/telegram`](/commands/osint#telegram) | [OSINT & Reconnaissance](/commands/osint) | Look up a public Telegram profile or channel. | All Users | `Ephemeral` |
| [`/tempmail`](/commands/general#tempmail) | [General Utilities](/commands/general) | Manage private, self-hosted temporary inboxes. | Whitelisted User | `SQLite Stored` |
| [`/time`](/commands/general#time) | [General Utilities](/commands/general) | Check local time and create or parse Discord timestamps. | All Users | `Ephemeral` |
| [`/tldr`](/commands/general#tldr) | [General Utilities](/commands/general) | Summarize text into a few concise points. | Whitelisted User / Guild Member | `Ephemeral` |
| [`/translate`](/commands/general#translate) | [General Utilities](/commands/general) | Translate text. | Whitelisted User | `Ephemeral` |
| [`/unicode`](/commands/general#unicode) | [General Utilities](/commands/general) | Unicode string utilities. | All Users | `Ephemeral` |
| [`/urban`](/commands/general#urban) | [General Utilities](/commands/general) | Look up a term on Urban Dictionary. | All Users | `Ephemeral` |
| [`/urlscan`](/commands/threat#urlscan) | [Threat Intelligence](/commands/threat) | Submit a public URL to urlscan.io as unlisted. | Whitelisted User | `Ephemeral` |
| [`/useragent`](/commands/web#useragent) | [Web & Media](/commands/web) | Parse a User-Agent string. | All Users | `Ephemeral` |
| [`/uuid`](/commands/general#uuid) | [General Utilities](/commands/general) | Generate a random UUID. | All Users | `Ephemeral` |
| [`/watch`](/commands/general#watch) | [General Utilities](/commands/general) | Infrastructure & Domain Sentinel: monitor uptime, TLS, and DNS. | Whitelisted User | `SQLite Stored` |
| [`/weather`](/commands/general#weather) | [General Utilities](/commands/general) | Check current weather for a location. | All Users | `Ephemeral` |
| [`/whois`](/commands/general#whois) | [General Utilities](/commands/general) | Extract detailed Discord profile data. | Whitelisted User / Guild Member | `Ephemeral` |
| [`/wiki`](/commands/general#wiki) | [General Utilities](/commands/general) | Look up a Wikipedia article. | All Users | `Ephemeral` |

---

## Category Breakdown

### [General Utilities](/commands/general)

- [`/remind`](/commands/remind): Manage private reminders.
- [`/receipt`](/commands/receipt): Manage your saved receipts.
- [`/poll`](/commands/poll): Create a Discord poll.
- [`/tldr`](/commands/tldr): Summarize text into a few concise points.
- [`/tempmail`](/commands/tempmail): Manage private, self-hosted temporary inboxes.
- [`/bin`](/commands/bin): Create and manage your secure pastes.
- [`/data`](/commands/data): Review, export, or delete your June data.
- [`/privacy`](/commands/privacy): See what June stores, shares, and lets you control.
- [`/settings`](/commands/settings): Manage your personal June defaults.
- [`/codec`](/commands/codec): Encode and decode text formats.
- [`/crypto`](/commands/crypto): Check a cryptocurrency market price.
- [`/hash`](/commands/hash): Generate a cryptographic hash.
- [`/password`](/commands/password): Generate a cryptographically secure random password.
- [`/regex`](/commands/regex): Test a regular expression against a string.
- [`/uuid`](/commands/uuid): Generate a random UUID.
- [`/time`](/commands/time): Check local time and create or parse Discord timestamps.
- [`/whois`](/commands/whois): Extract detailed Discord profile data.
- [`/roblox`](/commands/roblox): Look up a Roblox account.
- [`/pomelo`](/commands/pomelo): Check Discord username availability.
- [`/snowflake`](/commands/snowflake): Inspect a Discord snowflake ID.
- [`/npm`](/commands/npm): Look up a package on npm.
- [`/dict`](/commands/dict): Look up an English word.
- [`/wiki`](/commands/wiki): Look up a Wikipedia article.
- [`/weather`](/commands/weather): Check current weather for a location.
- [`/ocr`](/commands/ocr): Extract text from an image.
- [`/rembg`](/commands/rembg): Remove the background from an image.
- [`/qr`](/commands/qr): Encode text as a QR code.
- [`/avatar`](/commands/avatar): Show a user’s profile avatar.
- [`/banner`](/commands/banner): Show a user’s profile banner.
- [`/color`](/commands/color): Generate a solid color preview.
- [`/media`](/commands/media): Look up films, shows, games, anime, songs, and lyrics.
- [`/download`](/commands/download): Download media from a supported URL.
- [`/screenshot`](/commands/screenshot): Render a screenshot of a public webpage.
- [`/diff`](/commands/diff): Compare two text values.
- [`/json`](/commands/json): Format, validate, and inspect JSON.
- [`/sanitize`](/commands/sanitize): Clean tracking parameters, metadata, and invisible characters.
- [`/unicode`](/commands/unicode): Unicode string utilities.
- [`/urban`](/commands/urban): Look up a term on Urban Dictionary.
- [`/translate`](/commands/translate): Translate text.
- [`/evidence`](/commands/evidence): Generate a verifiable cryptographic forensic bundle for a website.
- [`/watch`](/commands/watch): Infrastructure & Domain Sentinel: monitor uptime, TLS, and DNS.
- [`/ping`](/commands/ping): Check June’s current latency.
- [`/status`](/commands/status): Check June and provider health.
- [`/info`](/commands/info): Show June’s runtime information.
- [`/help`](/commands/help): Browse commands or inspect usage, examples, and data handling.

### [OSINT & Reconnaissance](/commands/osint)

- [`/github`](/commands/github): Look up a public GitHub profile.
- [`/invite`](/commands/invite): Inspect a Discord invite.
- [`/lens`](/commands/lens): Find visually similar public images.
- [`/reddit`](/commands/reddit): Look up a public Reddit profile.
- [`/telegram`](/commands/telegram): Look up a public Telegram profile or channel.

### [Roleplay Actions](/commands/roleplay)

- [`/roleplay`](/commands/roleplay): Use a roleplay action.

### [Threat Intelligence](/commands/threat)

- [`/breach`](/commands/breach): Check whether a public breach index has entries for an email address.
- [`/exif`](/commands/exif): Extract metadata embedded in an image.
- [`/phishcheck`](/commands/phishcheck): Show available VirusTotal analysis signals for a URL.
- [`/portscan`](/commands/portscan): Scan common ports on an authorized public host.
- [`/urlscan`](/commands/urlscan): Submit a public URL to urlscan.io as unlisted.

### [Web & Media](/commands/web)

- [`/geoip`](/commands/geoip): Look up approximate public geolocation data for an IP address.
- [`/jwt`](/commands/jwt): Decode the header and payload of a JWT without verifying it.
- [`/mailcheck`](/commands/mailcheck): Check mail configuration records.
- [`/minecraft`](/commands/minecraft): Look up Minecraft players, skins, and servers.
- [`/shorten`](/commands/shorten): Create and manage your shortened URLs.
- [`/site`](/commands/site): Inspect public websites and domains.
- [`/useragent`](/commands/useragent): Parse a User-Agent string.

