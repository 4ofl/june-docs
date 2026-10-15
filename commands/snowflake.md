---
title: "/snowflake Command Reference"
description: "Inspect a Discord snowflake ID. · Access: All Users · Provider: Local Discord Snowflake Decoder"
ogImage: "/og/cmd-snowflake.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/snowflake</span>
  </div>
</div>

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



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#snowflake" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
