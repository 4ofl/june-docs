---
title: "/json Command Reference"
description: "Format, validate, and inspect JSON. · Access: All Users · Provider: Local V8 JSON Parser"
ogImage: "/og/cmd-json.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/json</span>
  </div>
</div>

## `/json`

> Format, validate, and inspect JSON.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local V8 JSON Parser |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/json format`

Format a JSON payload.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `data` | JSON payload. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/json minify`

Minify a JSON payload.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `data` | JSON payload. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/json validate`

Validate a JSON payload.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `data` | JSON payload. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/json get`

Read a path from a JSON payload.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `data` | JSON payload. | String | Yes |
| `path` | Object path, such as user.name. *(Autocomplete supported)* | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/json validate input:"{\"valid\": true}"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#json" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
