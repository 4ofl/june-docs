---
title: "/exif Command Reference"
description: "Extract metadata embedded in an image. · Access: Whitelisted User · Provider: Local Exif-Parser (Buffer cap 10MB)"
ogImage: "/og/cmd-exif.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/threat" style="color: var(--vp-c-text-2);">Threat Intelligence</a> / <span style="color: var(--vp-c-brand-1);">/exif</span>
  </div>
</div>

## `/exif`

> Extract metadata embedded in an image.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Local Exif-Parser (Buffer cap 10MB) |
| **Data Stored** | Ephemeral (Extracted metadata displayed for forensic inspection, never stored) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `image` | Image to inspect. | Attachment | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/exif image:<attachment>
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/threat#exif" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Threat Intelligence Reference</a>
</div>
