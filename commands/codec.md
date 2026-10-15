---
title: "/codec Command Reference"
description: "Encode and decode text formats. · Access: All Users · Provider: Local V8 Runtime"
ogImage: "/og/cmd-codec.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/codec</span>
  </div>
</div>

## `/codec`

> Encode and decode text formats.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local V8 Runtime |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/codec base64 encode`

Encode text as Base64.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to encode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec base64 decode`

Decode Base64 as text.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Base64 text to decode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec url encode`

Encode text as URL.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to encode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec url decode`

Decode URL as text.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | URL text to decode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec hex encode`

Encode text as hexadecimal.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to encode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec hex decode`

Decode hexadecimal as text.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | hexadecimal text to decode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec binary encode`

Encode text as binary.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to encode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/codec binary decode`

Decode binary as text.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | binary text to decode. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/codec base64 encode text:"hello world"
/codec hex decode text:"68656c6c6f"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#codec" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
