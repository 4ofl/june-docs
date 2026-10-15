---
title: "/sanitize Command Reference"
description: "Clean tracking parameters, metadata, and invisible characters. · Access: All Users · Provider: Local Sanitizer Engine (Strips EXIF, metadata, trackers, invisible chars)"
ogImage: "/og/cmd-sanitize.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/sanitize</span>
  </div>
</div>

## `/sanitize`

> Clean tracking parameters, metadata, and invisible characters.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local Sanitizer Engine (Strips EXIF, metadata, trackers, invisible chars) |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/sanitize link`

Strip marketing and platform trackers from a URL.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Target URL to sanitize. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/sanitize image`

Scrub EXIF and GPS metadata from an image.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `image` | Image to sanitize. | Attachment | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/sanitize text`

Strip invisible characters and neutralize dangerous mentions.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `text` | Text to sanitize. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/sanitize text:"Text with tracking https://example.com?utm_source=test"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#sanitize" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
