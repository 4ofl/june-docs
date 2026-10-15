---
title: "/tempmail Command Reference"
description: "Manage private, self-hosted temporary inboxes. · Access: Whitelisted User · Provider: Stalwart Mail Server (RFC 8621 / RFC 8620 JMAP) & SQLite WAL"
ogImage: "/og/cmd-tempmail.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/tempmail</span>
  </div>
</div>

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



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#tempmail" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
