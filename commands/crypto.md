---
title: "/crypto Command Reference"
description: "Check a cryptocurrency market price. · Access: All Users · Provider: CoinGecko / Crypto Public API"
ogImage: "/og/cmd-crypto.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/crypto</span>
  </div>
</div>

## `/crypto`

> Check a cryptocurrency market price.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | All Users |
| **Provider** | CoinGecko / Crypto Public API |
| **Data Stored** | Ephemeral |

### Options

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `coin` | Asset name or symbol, such as BTC. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/crypto coin:"bitcoin"
/crypto coin:"ethereum"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#crypto" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
