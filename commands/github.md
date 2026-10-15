---
title: "/github Command Reference"
description: "Look up a public GitHub profile. · Access: All Users · Provider: GitHub Public API"
ogImage: "/og/cmd-github.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/osint" style="color: var(--vp-c-text-2);">OSINT & Reconnaissance</a> / <span style="color: var(--vp-c-brand-1);">/github</span>
  </div>
</div>

## `/github`

> Look up a public GitHub profile.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | GitHub Public API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | GitHub username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/github user username:"torvalds"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/osint#github" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to OSINT & Reconnaissance Reference</a>
</div>
