---
title: Privacy Policy
description: June's privacy policy, data retention schedules, GDPR compliance, and complete subprocessor and external provider disclosure.
---

# Privacy Policy

**Effective Date:** October 14, 2026  
**Operator:** 4ofl (`aby@4ofl.dev`)  
**Physical Infrastructure:** Dedicated servers located in Singapore, hosted via OVHcloud.

June is an invite-only Discord utility and intelligence platform designed with defense-in-depth architectural boundaries and minimal data persistence. This Privacy Policy details the exact data we collect, why we process it, where it is stored, how long it is retained, and how you can inspect, export, or permanently delete your data.

---

## 1. Legal Basis & Core Principles

We process personal data in compliance with the **General Data Protection Regulation (GDPR, Regulation (EU) 2016/679)** under the following legal bases:
- **Art. 6(1)(b) GDPR (Contractual Necessity)**: Processing required to execute slash commands, schedule reminders, save bookmarked message receipts, and provision temporary inboxes explicitly requested by you.
- **Art. 6(1)(f) GDPR (Legitimate Interests)**: Processing required to enforce sliding-window rate limiting, block unauthorized access on whitelisted instances, prevent denial-of-service or SSRF attacks, and ensure platform availability.

June does not sell, license, rent, or trade personal data to third parties, advertising networks, or data brokers.

---

## 2. Data Categories & Retention Schedules

All persistent state is stored locally on private servers in a native SQLite database with Write-Ahead Logging (`node:sqlite`). We do not read or process message content across your Discord servers except during explicit command invocations or when you use a context menu action.

| Data Category | Stored Attributes | Purpose | Retention Period & Purge Policy |
| :--- | :--- | :--- | :--- |
| **Discord Identifiers** | User ID, Guild ID, Guild Name | Access control, whitelist verification, server installation tracking. | Retained while bot is active. Deleted upon server removal or operator whitelist revocation. |
| **User Preferences** (`user_settings`) | User ID, Timezone, Clock Format (12h/24h), Unit System (Metric/Imperial), Ephemeral Default, Result Layout, Target Language | Personalizes command output layout, timestamps, and translation defaults. | Retained until updated or permanently erased via `/data delete`. |
| **Reminders** (`reminders`) | User ID, Reminder Text, Due Timestamp, Delivery Preference (DM or Channel ID) | Scheduling and delivering automated user notifications. | Automatically deleted upon delivery. Erased immediately via `/remind clear` or `/data delete`. |
| **Saved Receipts** (`receipts`) | Saved-By User ID, Source Author ID, Author Tag, Message Content (≤ 2,000 chars), Timestamp, Embed/Attachment Metadata | User-initiated message bookmarking via the `Save Receipt` message context menu. | Retained until deleted by the user via `/receipt remove`, `/receipt clear`, or `/data delete`. |
| **Temporary Mail Leases** (`tempmail_inboxes`) | Generated Email Address, Local Part, Owner User ID, Lease Created At, Expiry Timestamp | Associates an ephemeral inbox with a Discord user for inbound message querying. | **Fixed 60-Minute Lease (`TEMPMAIL_TTL_SECONDS=3600`)**. Expired leases are automatically purged from SQLite on query runs and via `/data delete`. |
| **Email Messages in Stalwart** | Message Headers, Sender, Recipient, Subject, Plain Text & HTML Body, Attachments | Inbound email reception on `temp.4ofl.dev` via Stalwart Mail Server (RFC 8621 / RFC 8620 JMAP). | **Server-side mail storage**: Stored in Stalwart Mail Server. Expiring an inbox lease severes June's binding, but message bodies are subject to Stalwart's operational retention policies or administrative purge. |

| **Managed Pastes** (`managed_bins`) | Slug, Custom Subpath, Target URL, Owner User ID, Created At | Tracking pastes created via `/bin create`. | Stored in SQLite until removed via `/bin delete` or `/data delete`. (Underlying paste on external bin host remains subject to host retention). |
| **Managed Short Links** (`managed_short_links`) | Slug, Short URL, Target Destination URL, Owner User ID, Created At | Tracking URL redirections created via `/shorten`. | Stored in SQLite until removed via `/shorten delete` or `/data delete`. |
| **Watch Sentinel Targets** (`watched_targets`) | Target URL, Hostname, Custom Label, Check Interval, Status Code, DNS Records, TLS Expiry & Issuer, Content Hash | Periodic HTTP/TLS/DNS uptime and defacement monitoring requested via `/watch`. | Retained until removed via `/watch remove` or `/data delete`. |
| **Command Telemetry & Usage** (`command_usage`, `pinned_commands`) | User ID, Command Name, Use Count, Last Used Timestamp | Powering `/help` recent commands, usage statistics, and user command pinning. | Retained until cleared via `/data delete`. |

---

## 3. Important Context: Third-Party Data & Message Receipts

### Save Receipt Context Action
When you trigger the `Save Receipt` message context menu command on Discord:
- The command captures the selected message's author ID, username/tag, creation timestamp, text content (up to 2,000 characters), attachment names/URLs, and embed metadata.
- This information is stored in June's SQLite database under your account (`saved_by = <your_user_id>`).
- **You are responsible for ensuring that saving messages complies with local consent laws and Discord community rules.**
- You can delete any receipt at any time using `/receipt remove id:<id>`, `/receipt clear`, or `/data delete`.

### OSINT & Threat Lookups (`/breach`, `/whois`, `/dns`, `/geoip`)
- Commands such as `/breach`, `/whois`, and `/geoip` look up publicly indexed information, domain records, and public breach notifications.
- June processes your lookup query ephemerally to fetch results from upstream threat intelligence providers.
- **June never persists your query terms or returned breach details into its database.**

---

## 4. Subprocessors and External Service Providers

When you invoke specific features, June queries third-party API providers to fetch external data. Outbound network requests are filtered through June's internal SSRF firewall, and socket connections are pinned directly to validated public IPs.

| Provider / Subprocessor | Purpose & Associated Commands | Data Transmitted | Provider Location & Privacy Information |
| :--- | :--- | :--- | :--- |
| **Discord Inc.** | Bot gateway connection, slash command interactions, OAuth2 dashboard authentication, message dispatching. | User IDs, Guild IDs, Channel IDs, command payloads, interaction tokens. | USA · [Discord Privacy Policy](https://discord.com/privacy) |
| **Stalwart Mail Server** | Self-hosted mail transfer agent (MTA) & JMAP storage server handling inbound SMTP for `temp.4ofl.dev`. | Inbound email headers, envelope recipients, and message bodies. | Singapore · Dedicated infrastructure operated directly by June's operator (OVH SAS). |
| **VirusTotal (Chronicle)** | URL and file reputation scanning via `/phishcheck`. | Target URLs, domain names, cryptographic file hashes. | USA · [VirusTotal Privacy Policy](https://support.virustotal.com/hc/en-us/articles/115002168385-Privacy-Policy) |
| **urlscan.io** | Webpage analysis, sandbox scanning, and screenshot generation via `/urlscan`. | Target URLs submitted by user. | Germany / USA · [urlscan.io Privacy Policy](https://urlscan.io/about/) |
| **OCR.space** | Optical character recognition via `/ocr` and `Extract Text` context menu. | Public image URL or image buffer. | USA · [OCR.space Privacy Policy](https://ocr.space/privacypolicy) |
| **WiGLE.net** | Wireless network BSSID and SSID geolocation lookup via `/wigle`. | Target BSSID MAC address. | USA · [WiGLE Privacy Policy](https://wigle.net/eula) |
| **SerpAPI / Google Lens** | Reverse image visual search via `/lens`. | Image URL submitted by user. | USA · [SerpAPI Privacy Policy](https://serpapi.com/privacy) |
| **Spotify AB** | Music metadata, track search, and artist information via `/media spotify`. | Search query strings. | Sweden (EU) · [Spotify Privacy Policy](https://www.spotify.com/legal/privacy-policy/) |
| **OMDb & RAWG** | Film, television, and video game metadata via `/media movie`, `/media show`, `/media game`. | Search query strings. | USA / International. |
| **IP-API** | Autonomous System (ASN), ISP, and approximate city-level geolocation via `/geoip`. | Target public IP address. | Switzerland · [IP-API Privacy Policy](https://ip-api.com/docs/legal) |
| **PlayerDB & mcstatus** | Minecraft player profiles and server status via `/minecraft`. | Target player username or server hostname/port. | International public APIs. |
| **External Shorteners & Bins** | Self-hosted or third-party paste and URL shortener backends (`/bin`, `/shorten`). | Paste content, URLs, requested slugs. | Configured per deployment instance. |

---

## 5. Security Architecture & Safeguards

June protects user data through rigorous security engineering:
- **SSRF Defense Engine**: Outbound HTTP requests pass through IP range validators blocking all private networks (RFC 1918), loopback (`127.0.0.0/8`), Link-Local (`169.254.0.0/16`), Carrier-Grade NAT (`100.64.0.0/10`), IPv6 Unique Local (`fc00::/7`), NAT64 well-known prefixes (`64:ff9b::/96`), and 6to4 subnets (`2002::/16`). Socket connections are pinned to validated IP records to prevent DNS rebinding attacks.
- **Worker Thread Sandbox**: Regular expression parsing (`/regex`) runs in isolated Node.js worker threads with a strict 500ms software watchdog timer (`worker.terminate()`) to prevent CPU starvation from catastrophic backtracking.
- **Timing-Safe Cryptography**: Administrative tokens, OAuth2 state parameters, and webhook signatures are compared using HMAC-then-compare cryptographic timing-safe routines (`crypto.timingSafeEqual`) to prevent timing side-channel attacks.
- **Encrypted Token Grants**: Discord OAuth2 access and refresh tokens for guild installations are encrypted at rest with AES-256-GCM using `OAUTH_TOKEN_ENCRYPTION_KEY`.

---

## 6. Your Rights & Self-Service Data Erasure

Under the GDPR and global privacy frameworks, you have specific rights regarding your personal data:
- **Right to Access & Portability (Art. 15 & Art. 20 GDPR)**: Run `/data view` to inspect your stored records count, or run `/data export` to download a complete, portable JSON archive of your settings, reminders, receipts, and temporary inbox bindings.
- **Right to Rectification (Art. 16 GDPR)**: Modify your stored preferences anytime via `/settings`.
- **Right to Erasure / "Right to be Forgotten" (Art. 17 GDPR)**: Run `/data delete` to immediately and permanently purge all receipts, scheduled reminders, user preferences, temporary inbox leases, watch targets, managed paste records, and command history associated with your Discord User ID.
- **Automated Execution**: Data deletion through `/data delete` executes an atomic SQLite transaction and invalidates all memory caches instantly without requiring manual operator intervention.

---

## 7. Age Requirements

June is not directed to individuals under the age of 13, or the minimum age of digital consent required by the laws of your jurisdiction (e.g., 16 in certain EU member states). If you are under this age, you are prohibited from using the platform or providing personal data.

---

## 8. Contact & Data Protection Inquiries

For data protection inquiries, manual erasure requests, or security notices:
- **Operator:** 4ofl
- **Direct & Privacy Contact:** `aby@4ofl.dev`
- **Security Inquiries:** `security@4ofl.dev`
- **Dashboard:** [june.4ofl.dev/dashboard](https://june.4ofl.dev/dashboard)
- **Documentation & Public Issues:** [github.com/4ofl/june-docs](https://github.com/4ofl/june-docs)
