---
title: "/settings Command Reference"
description: "Manage your personal June defaults. · Access: All Users · Provider: Local SQLite WAL (user_settings table)"
ogImage: "/og/cmd-settings.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/settings</span>
  </div>
</div>

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



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#settings" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
