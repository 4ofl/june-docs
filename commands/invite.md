---
title: "/invite Command Reference"
description: "Inspect a Discord invite. · Access: All Users · Provider: Discord Invite API"
ogImage: "/og/cmd-invite.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/osint" style="color: var(--vp-c-text-2);">OSINT & Reconnaissance</a> / <span style="color: var(--vp-c-brand-1);">/invite</span>
  </div>
</div>

## `/invite`

> Inspect a Discord invite.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Discord Invite API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `code` | Invite URL or code. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/invite code:"discord-developers"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/osint#invite" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to OSINT & Reconnaissance Reference</a>
</div>
