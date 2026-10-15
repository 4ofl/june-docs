---
title: "/ocr Command Reference"
description: "Extract text from an image. · Access: Whitelisted User · Provider: OCR.space REST API"
ogImage: "/og/cmd-ocr.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/ocr</span>
  </div>
</div>

## `/ocr`

> Extract text from an image.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | OCR.space REST API |
| **Data Stored** | Ephemeral (Image processed via stream buffer with 10MB limit) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `image` | Image to read. | Attachment | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/ocr image:<attachment>
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#ocr" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
