---
title: REST & Webhook APIs
description: Specification of June's public and internal APIs including the Documentation Manifest, Dashboard REST API, Webhooks, and Health endpoints.
---

# REST & Webhook APIs

June exposes several specialized HTTP interfaces designed for documentation syndication, web dashboard interactions, mail webhook ingestion, and operational health monitoring.

---

## 1. Documentation & Manifest API

When enabled via `DOCS_API_ENABLED=true` in `src/docs/server.js`, June exposes a read-only, versioned interface designed for static site builders, documentation portals, and LLM context indexers.

### Configuration

```env
DOCS_API_ENABLED=true
DOCS_API_HOST=0.0.0.0
DOCS_API_PORT=3010
DOCS_ORIGIN=https://docs.june.4ofl.dev
DOCS_INCLUDE_ADMIN_COMMANDS=false
```

### Endpoints

#### `GET /v1/manifest`
Returns the complete generated command contract with ETag caching support.
- **Fields:** `schemaVersion`, `generatedAt`, `product`, `version`, `categories`, and `commands`.
- **Exclusions:** Excludes internal secrets, administrator IDs, database connection strings, and unwhitelisted server IDs.

#### `GET /v1/commands`
A lightweight array of command specifications without product metadata, optimized for automated CI validation and test harnesses.

#### `GET /v1/status`
Returns a sanitized operational snapshot:
- `state`: Application health (`healthy`, `degraded`).
- `uptime`: Process uptime in seconds.
- `discord`: Gateway WebSocket latency and shard connectivity status.
- `database`: SQLite page count, integrity status (`ok`), and query latency.
- `providers`: Circuit breaker states for external APIs (e.g. VirusTotal, urlscan, OMDb).

#### `GET /v1/llms.txt`
Plain-text, markdown-formatted command reference optimized for Large Language Model indexing and developer CLI consumption.

---

## 2. Obsidian Dashboard REST API

The web dashboard backend (`src/web/dashboardApi.js`) operates an Express 5 REST API secured via Discord OAuth2 and signed session cookies (`__Host-june_session`).

### Authentication & Sessions
- **Session Tokens:** HMAC-SHA256 encrypted session tokens (`SESSION_TTL_MS = 7 days`).
- **CSRF Protection:** Secure, HttpOnly, SameSite=Lax cookies with state nonce validation during OAuth callbacks.
- **Role Resolution:** Resolves callers into `admin`, `whitelisted`, or `authenticated` tiers based on SQLite authorization records.

### Core Endpoints

| Method | Endpoint | Access Tier | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dashboard/me` | Authenticated | Current user profile, Discord avatar, and resolved role. |
| `GET` | `/api/dashboard/settings` | Authenticated | Retrieve user preferences (timezone, clock, ephemeral default). |
| `PATCH` | `/api/dashboard/settings` | Authenticated | Update a specific preference (e.g. `timezone`, `units`). |
| `GET` | `/api/dashboard/receipts` | Authenticated | List all saved message receipts for the user. |
| `DELETE` | `/api/dashboard/receipts/:id` | Authenticated | Delete a saved message receipt. |
| `DELETE` | `/api/dashboard/receipts` | Authenticated | Clear all saved message receipts. |
| `GET` | `/api/dashboard/reminders` | Authenticated | List pending scheduled reminders. |
| `POST` | `/api/dashboard/reminders` | Authenticated | Create a new scheduled reminder. |
| `DELETE` | `/api/dashboard/reminders/:id`| Authenticated | Cancel a pending reminder. |
| `GET` | `/api/dashboard/tempmail` | Authenticated | List active temporary inboxes for the user. |
| `POST` | `/api/dashboard/tempmail` | Authenticated | Generate a new 60-minute temporary inbox (`<hex>@temp.4ofl.dev`). |
| `GET` | `/api/dashboard/tempmail/:addr/messages` | Authenticated | Fetch messages for an active inbox via Stalwart JMAP. |
| `GET` | `/api/dashboard/watch` | Whitelisted | List active uptime and defacement monitoring targets. |
| `POST` | `/api/dashboard/watch` | Whitelisted | Add a new URL/hostname to the watch sentinel. |
| `DELETE` | `/api/dashboard/watch/:id` | Whitelisted | Remove a watch sentinel target. |
| `POST` | `/api/admin/whitelist` | Administrator | Add a user ID or username to the global bot whitelist. |
| `DELETE` | `/api/admin/whitelist/:id`| Administrator | Remove a user ID from the global bot whitelist. |

---

## 3. Realtime Events & Ingestion Webhooks

### Stalwart JMAP Push Notifications & Webhooks
When an email is received for a temporary address on `temp.4ofl.dev`, Stalwart delivers an event notification to June:
1. Stalwart triggers an authenticated webhook to June's internal ingestion listener.
2. June validates the recipient address against active SQLite leases (`tempmail_inboxes`).
3. If an active lease exists, the event is emitted to the in-memory **Server-Sent Events (SSE)** hub.
4. Active dashboard clients listening on `GET /api/dashboard/events` receive real-time notification to refresh the inbox view without polling.

---

## 4. Operational Health & Metrics Endpoints

June exposes standard observability endpoints for container orchestrators and Prometheus scraping:

- **`GET /livez`**: Process liveness probe. Returns HTTP 200 `{ "status": "alive" }` if the event loop is responsive.
- **`GET /readyz`**: Readiness probe. Validates Discord Gateway connection and SQLite database accessibility. Returns HTTP 503 if the database is busy or the gateway is disconnected.
- **`GET /metrics`**: Prometheus-formatted metrics (HTTP requests, command durations, database queries, circuit breaker trip counts). Gated by `METRICS_TOKEN` Bearer authentication.
- **`GET /version`**: Returns deployed application version and git commit hash.
