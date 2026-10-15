---
title: "/data Command Reference"
description: "Review, export, or delete your June data. · Access: All Users · Provider: Local SQLite WAL (userData.js)"
ogImage: "/og/cmd-data.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/data</span>
  </div>
</div>

## `/data`

> Review, export, or delete your June data.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | Local SQLite WAL (userData.js) |
| **Data Stored** | None (Self-service data inspection, export, and atomic purge utility) |

### Subcommands

#### `/data summary`

Show the June records currently linked to you.

#### `/data export`

Export your June-controlled records as private JSON.

#### `/data retention`

Explain what deletion can and cannot remove.

#### `/data delete`

Delete your self-service June records.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `confirmation` | Type DELETE to confirm. | String | Yes |

### Examples

```text
/data view
/data export
/data delete
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#data" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
