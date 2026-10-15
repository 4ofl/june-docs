---
title: "/minecraft Command Reference"
description: "Look up Minecraft players, skins, and servers. · Access: All Users · Provider: api.mcsrvstat.us & PlayerDB"
ogImage: "/og/cmd-minecraft.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/web" style="color: var(--vp-c-text-2);">Web & Media</a> / <span style="color: var(--vp-c-brand-1);">/minecraft</span>
  </div>
</div>

## `/minecraft`

> Look up Minecraft players, skins, and servers.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | api.mcsrvstat.us & PlayerDB |
| **Data Stored** | Ephemeral |

### Subcommands

#### `/minecraft player`

Look up a Java player profile.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | Java username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/minecraft server`

Check a public Minecraft server.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `ip` | Hostname and optional port. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/minecraft skin`

Get a Java player skin.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `username` | Java username. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/minecraft server target:"mc.hypixel.net"
/minecraft user username:"Notch"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/web#minecraft" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Web & Media Reference</a>
</div>
