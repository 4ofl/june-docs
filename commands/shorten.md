---
title: "/shorten Command Reference"
description: "Create and manage your shortened URLs. · Access: Whitelisted User · Provider: Configured Shortener Service & SQLite WAL"
ogImage: "/og/cmd-shorten.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/web" style="color: var(--vp-c-text-2);">Web & Media</a> / <span style="color: var(--vp-c-brand-1);">/shorten</span>
  </div>
</div>

## `/shorten`

> Create and manage your shortened URLs.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Configured Shortener Service & SQLite WAL |
| **Data Stored** | Stores slug, short URL, target destination URL in managed_short_links table. |

### Subcommands

#### `/shorten create`

Create a short link owned by your June account.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `url` | Target URL. | String | Yes |
| `custom` | Optional custom slug for administrators. | String | No |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/shorten list`

List only your short links.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/shorten delete`

Delete one of your short links.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `slug` | Your short-link slug. *(Autocomplete supported)* | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/shorten clear`

Delete all short links owned by your account.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `confirmation` | Enter CLEAR. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/shorten create target:"https://very-long-url.com/path" custom_slug:"docs"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/web#shorten" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Web & Media Reference</a>
</div>
