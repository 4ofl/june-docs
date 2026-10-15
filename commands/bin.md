---
title: "/bin Command Reference"
description: "Create and manage your secure pastes. · Access: Whitelisted User · Provider: Configured Pastebin Service & SQLite WAL"
ogImage: "/og/cmd-bin.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/bin</span>
  </div>
</div>

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



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#bin" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
