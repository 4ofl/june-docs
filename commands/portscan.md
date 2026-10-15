---
title: "/portscan Command Reference"
description: "Scan common ports on an authorized public host. · Access: Operator / Bot Administrator Only (requires authorized:true) · Provider: Direct Socket Connection via net.Socket (1500ms timeout)"
ogImage: "/og/cmd-portscan.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/threat" style="color: var(--vp-c-text-2);">Threat Intelligence</a> / <span style="color: var(--vp-c-brand-1);">/portscan</span>
  </div>
</div>

## `/portscan`

> Scan common ports on an authorized public host.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Operator / Bot Administrator Only (requires authorized:true) |
| **Provider** | Direct Socket Connection via net.Socket (1500ms timeout) |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `target` | Public hostname you own or may test. | String | Yes |
| `authorized` | Confirm that you are authorized to scan this host. | Boolean | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/portscan target:"example.com" authorized:true
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/threat#portscan" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to Threat Intelligence Reference</a>
</div>
