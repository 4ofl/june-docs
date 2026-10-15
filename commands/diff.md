---
title: "/diff Command Reference"
description: "Compare two text values. · Access: All Users · Provider: Local Diff Engine"
ogImage: "/og/cmd-diff.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/diff</span>
  </div>
</div>

## `/diff`

> Compare two text values.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Diff Engine |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `old` | Original text. | String | Yes |
| `new` | Updated text. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/diff original:"Hello" modified:"Hello World"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#diff" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
