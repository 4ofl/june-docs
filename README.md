<div align="center">
  <img src="./public/logo.png" width="108" height="108" alt="June Logo" style="border-radius: 50%;" />
  <h1>june · documentation & architecture</h1>
  <p>Official technical specifications, security protocols, and command reference.</p>

  <p>
    <a href="https://docs.june.4ofl.dev/"><img src="https://img.shields.io/badge/docs-live-10b981?style=for-the-badge&logo=vitepress&logoColor=white" alt="Live Docs" /></a>
    <a href="https://june.4ofl.dev"><img src="https://img.shields.io/badge/dashboard-june.4ofl.dev-050507?style=for-the-badge&logo=discord&logoColor=white" alt="Dashboard" /></a>
    <img src="https://img.shields.io/badge/node.js-22%20LTS-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node 22" />
    <img src="https://img.shields.io/badge/sqlite-native%20WAL-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite WAL" />
    <img src="https://img.shields.io/badge/protocol-JMAP%20RFC%208620-10b981?style=for-the-badge" alt="JMAP RFC 8620" />
  </p>
</div>

---

## Overview

This repository hosts the official documentation portal and deep-dive architectural specifications for **June**, an obsidian-engineered Discord utility and intelligence platform.

### Documentation Sections
- **[System Architecture](https://docs.june.4ofl.dev/architecture/)**: High-throughput topology, event dispatch pipeline, and component isolation.
- **[Security Architecture](https://docs.june.4ofl.dev/architecture/security)**: RFC 1918 SSRF firewall, worker thread ReDoS sandboxing, and timing-safe authentication.
- **[Storage Engine](https://docs.june.4ofl.dev/architecture/storage)**: Native `node:sqlite` WAL concurrency and zero-downtime schema migrations.
- **[JMAP Disposable Mail](https://docs.june.4ofl.dev/architecture/jmap-mail)**: RFC 8620 temporary mailbox lifecycle backed by Stalwart Mail Server.
- **[Command Reference](https://docs.june.4ofl.dev/commands/)**: Full slash command dictionary, arguments, and permission tiers.

---

## Local Development

To run the documentation portal locally:

```bash
# Clone the repository
git clone https://github.com/4ofl/june-docs.git
cd june-docs

# Install dependencies
npm install

# Start local VitePress dev server
npm run dev
```

Visit `http://localhost:5173` to view the documentation.

To build the static production distribution:

```bash
npm run build
npm run preview
```

---

## License

This public repository contains architectural specifications, user guides, and command documentation. The core proprietary bot implementation remains private.

Released under the ISC License. Copyright © 2026 4ofl.
