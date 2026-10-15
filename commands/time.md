---
title: "/time Command Reference"
description: "Check local time and create or parse Discord timestamps. · Access: All Users · Provider: Local V8 Intl Engine"
ogImage: "/og/cmd-time.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/time</span>
  </div>
</div>

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



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#time" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
