---
title: "/poll Command Reference"
description: "Create a Discord poll. · Access: Whitelisted User / Guild Member · Provider: Discord API"
ogImage: "/og/cmd-poll.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/poll</span>
  </div>
</div>

## `/poll`

> Create a Discord poll.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User / Guild Member |
| **Provider** | Discord API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `question` | Poll question. | String | Yes |
| `option1` | First option. | String | Yes |
| `option2` | Second option. | String | Yes |
| `option3` | Third option. | String | No |
| `option4` | Fourth option. | String | No |
| `option5` | Fifth option. | String | No |
| `option6` | Sixth option. | String | No |
| `option7` | Seventh option. | String | No |
| `option8` | Eighth option. | String | No |
| `option9` | Ninth option. | String | No |
| `option10` | Tenth option. | String | No |
| `duration` | Duration in hours. Defaults to 24. | Integer | No |
| `multiselect` | Allow multiple selections. | Boolean | No |

### Examples

```text
/poll question:"Deploy to production?" duration:24
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#poll" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
