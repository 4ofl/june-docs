---
title: "/receipt Command Reference"
description: "Manage your saved receipts. · Access: Whitelisted User / Guild Member · Provider: Local SQLite WAL (receipts table)"
ogImage: "/og/cmd-receipt.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/receipt</span>
  </div>
</div>

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



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#receipt" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
