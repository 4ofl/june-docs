---
title: Terms of Service
description: June's terms of service, authorized usage policies, disclaimers, liability limitations, and governing law.
---

# Terms of Service

**Effective Date:** October 14, 2026  
**Operator:** 4ofl (`aby@4ofl.dev`)  
**Jurisdiction:** Republic of Singapore

By inviting, authorizing, accessing, or using June (the "Service")—including the Discord application, the web dashboard at `june.4ofl.dev`, and associated APIs—you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use or interact with the Service.

---

## 1. Eligibility & Minimum Age

You represent and warrant that you are at least **13 years of age**, or the minimum age of digital consent required in your country of residence (such as 16 in certain EU member states), and that you meet the age requirements set forth by the [Discord Terms of Service](https://discord.com/terms).

---

## 2. Authorized Use & Restrictions

June provides advanced Discord utility, productivity, threat intelligence, and ephemeral messaging capabilities. You agree to use the Service in full compliance with all applicable local, national, and international laws, the Discord Developer Terms of Service, and the Discord Community Guidelines.

You specifically agree **not** to:
1. **Target Unauthorized Systems**: Use network diagnostics, port scanners (`/portscan`), WHOIS, or threat intelligence commands against third-party systems, networks, or hostnames without explicit authorization from the system owner. Running `/portscan` requires confirming authorization (`authorized: true`) and is restricted to administrators.
2. **Conduct Disruptive Operations**: Trigger high-frequency automated requests intended to exhaust June’s rate limits, bypass server security guards, cause denial-of-service, or disrupt upstream provider APIs.
3. **Exploit or Bypass Guards**: Attempt to circumvent June’s SSRF defense firewall, access internal RFC 1918 networks, execute catastrophic backtracking ReDoS patterns, or forge authentication tokens.
4. **Transmit Unlawful Content**: Transmit unsolicited bulk email (spam) to temporary mailboxes, distribute malware, or store unlawful content in managed pastes or receipts.

### Evidentiary & OSINT Disclaimers
Technical bundles generated via `/evidence` and information returned by open-source intelligence tools (`/breach`, `/telegram`, `/reddit`, `/whois`, `/lens`) represent automated point-in-time observations of publicly available data. **These outputs do not constitute certified legal forensic evidence for statutory submission in judicial proceedings and carry no warranty of legal admissibility or absolute completeness.**


---

## 3. Ephemeral Mail & Uptime Disclaimers

### Mailbox Isolation Model
Temporary email inboxes provisioned through June (`/tempmail` and the web dashboard) are assigned to an exclusive 60-minute lease session bound to your Discord User ID. During this active session, inboxes and received messages are accessible only to you. 
- However, because email is received over the public internet via SMTP, you acknowledge that **email transmissions are inherently unencrypted across intermediate mail relays**.
- **Do not use temporary disposable mailboxes for high-risk accounts, primary authentication, banking, legal correspondence, or sensitive credentials.**

### Service Availability
The Service is provided on an **"AS IS"** and **"AS AVAILABLE"** basis. While June is engineered for high availability and low-latency SQLite query execution, the operator makes no representations, warranties, or guarantees regarding uninterrupted uptime, zero data loss, or continuous availability of third-party upstream providers (such as VirusTotal, urlscan.io, or OCR services).

---

## 4. Account Termination & Access Control

June operates a managed whitelist and authorization tier. The operator reserves the right to:
1. Revoke whitelist access or terminate access for any user or Discord server immediately, with or without notice, upon violation of these Terms or suspected abuse.
2. Modify, rate-limit, or discontinue any feature, command, or API endpoint at any time.
3. Remove or prune orphaned or expired database records in accordance with operational maintenance schedules.

You may terminate your relationship with June at any time by removing the bot from your Discord server, revoking the user application authorization in your Discord settings, and running `/data delete` to purge your stored records.

---

## 5. Limitation of Liability & Indemnification

To the maximum extent permitted by applicable law:
- In no event shall the operator (**4ofl**) or contributors be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages—including loss of data, loss of profits, downtime, or security incidents—arising from your use of or inability to use the Service.
- You agree to defend, indemnify, and hold harmless the operator from and against any claims, damages, liabilities, and expenses arising out of your violation of these Terms or misuse of commands against third-party infrastructure.

---

## 6. Governing Law & Jurisdiction

These Terms of Service and any disputes arising out of or related to the Service shall be governed by and construed in accordance with the laws of the **Republic of Singapore**, without regard to conflict of law principles. Any legal action or proceeding arising under these Terms shall be brought exclusively in the competent courts located in Singapore.

---

## 7. Contact Information

For inquiries, support, or legal notices concerning these Terms:
- **Primary Contact:** `aby@4ofl.dev`
- **Security Inquiries:** `security@4ofl.dev`
- **Web Dashboard:** [june.4ofl.dev/dashboard](https://june.4ofl.dev/dashboard)
- **Documentation & Public Issues:** [github.com/4ofl/june-docs](https://github.com/4ofl/june-docs)
