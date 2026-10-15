---
title: "/evidence Command Reference"
description: "Generate a verifiable cryptographic forensic bundle for a website. · Access: Whitelisted User · Provider: Local Network Inspector & Cryptographic Hasher"
ogImage: "/og/cmd-evidence.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/evidence</span>
  </div>
</div>

## `/evidence`

> Generate a verifiable cryptographic forensic bundle for a website.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Local Network Inspector & Cryptographic Hasher |
| **Data Stored** | Ephemeral (Point-in-time technical capture bundle, zero database storage) |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Target URL to create forensic evidence for. | String | Yes |
| `bundle_file` | Attach tamper-evident JSON forensic proof file (default: true). | Boolean | No |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/evidence url:"https://example.com"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#evidence" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
