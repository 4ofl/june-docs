---
title: "/remind Command Reference"
description: "Manage private reminders. · Access: Whitelisted User / Guild Member · Provider: Local SQLite WAL (reminders table)"
ogImage: "/og/cmd-remind.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/remind</span>
  </div>
</div>

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



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#remind" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
