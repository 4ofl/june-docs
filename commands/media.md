---
title: "/media Command Reference"
description: "Look up films, shows, games, anime, songs, and lyrics. · Access: Whitelisted User · Provider: Spotify, OMDb, RAWG, Kitsu, LRCLIB (Circuit breaker protected)"
ogImage: "/og/cmd-media.png"
---

<div class="command-page-header">
  <div style="font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 1.2rem; font-family: var(--vp-font-family-mono);">
    <a href="/commands/" style="color: var(--vp-c-text-2);">Commands</a> / <a href="/commands/general" style="color: var(--vp-c-text-2);">General Utilities</a> / <span style="color: var(--vp-c-brand-1);">/media</span>
  </div>
</div>

## `/media`

> Look up films, shows, games, anime, songs, and lyrics.

| Attribute | Details |
| :--- | :--- |
| **Access Tier** | Whitelisted User |
| **Provider** | Spotify, OMDb, RAWG, Kitsu, LRCLIB (Circuit breaker protected) |
| **Data Stored** | Briefly cached in memory (5m TTL) |

### Subcommands

#### `/media anime`

Look up an anime title.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `title` | Anime title. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/media game`

Look up a video game.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `title` | Game title. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/media movie`

Look up a movie or television title.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `title` | Movie or show title. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/media song`

Look up a song in the iTunes catalog.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `query` | Song title and optional artist. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/media lyrics`

Look up lyric metadata and a short preview.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `query` | Song title and artist. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

#### `/media steam`

Look up a game on Steam.

**Options:**

| Option | Description | Type | Required |
| :--- | :--- | :--- | :--- |
| `game` | Game title. | String | Yes |
| `ephemeral` | Hide this response. | Boolean | No |

### Examples

```text
/media movie title:"Interstellar"
/media spotify query:"Starboy"
/media anime query:"Frieren"
```

---



<div class="command-page-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--vp-c-divider);">
  <a href="/commands/general#media" style="font-family: var(--vp-font-family-mono); font-size: 0.85rem; color: var(--vp-c-brand-1);">← Return to General Utilities Reference</a>
</div>
