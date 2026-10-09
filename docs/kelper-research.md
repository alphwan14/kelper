# Kelper — research & decisions

_Compiled 9 October 2026. Concise by design: findings → what they mean for the build._

---

## 1. What we actually know about Kelper

| Fact | Status | Source |
| --- | --- | --- |
| Name: Kelper | Confirmed | Client brief |
| Cybercafé / digital-services business in Mombasa, Kenya | Confirmed | Client brief |
| Domain `kelper.co.ke` | Confirmed (registered) — **does not resolve yet** (DNS `ENOTFOUND`, 9 Oct 2026) | Fetch test |
| Phone / WhatsApp: +254 723 938401 | Client-provided. Not independently verified; WhatsApp Business status unknown | Client brief |
| Street address, landmark, map pin | **Unknown** | — |
| Opening hours | **Unknown** | — |
| Email, social accounts | **Unknown** | — |
| Prices, turnaround times | **Unknown** | — |
| Logo / brand assets | **None supplied** — a proposed wordmark was designed (needs client approval) | — |
| Online presence (Google profile, directories) | None found in search | Web search |

Everything unknown lives in one file, [`src/config/business.ts`](../src/config/business.ts). Components render those fields only when they are filled in, so nothing has to be invented to launch.

---

## 2. Market findings

**The cybercafé business has changed.** Browsing has collapsed ("Sh1 per minute for years", day passes at Sh300 attract little interest). Revenue now comes from *assisted* work:

- Government and online applications (KRA, eCitizen, job portals, visas, driving licences). Online services "start at Sh500".
- Typing and editing (from Sh350), binding (Sh50–150), printing jobs (Sh650–1,500 per job).
- **Parents printing school research material** for their children; demand rose after the 2017 curriculum change.
- Small city-centre businesses outsourcing bulk printing.
- Design and branding (logos ~Sh7,000; business stationery ~Sh15,000).

Source: Business Daily, _"Kenyan cyber cafés reinvent as smartphones kill browsing business"_ (2026). These are market figures only. **No Kelper prices are published.**

**Government-service demand is year-round and deadline-driven:**

- KRA services moved onto eCitizen in March 2024 (The Star). eCitizen adds small convenience fees (Sh5–50).
- **Finance Act 2026** changes filing dates from the 2026 income year: nil returns are due by **31 January** (previously 30 June), PAYE-only returns by **30 April**, and everyone else by 30 June (People Daily; Kenyans.co.ke). Many people won't know about this, which makes it a useful, timely guide.
- University funding goes through the **HEF portal (hef.co.ke)**. The 2026 window closed on 8 Sept 2026 and runs for about 60 days each year. Applicants need index numbers, an admission number, parent and guarantor ID numbers with their phone numbers, and PDF uploads (Kenyans.co.ke, K24).
- Passports: application on eCitizen, then a printed form and receipts, birth certificate, ID, photos, recommender's ID, and fingerprints at an immigration centre (HapaKenya 2025).

### Competitors reviewed

| Site | What works | What doesn't |
| --- | --- | --- |
| cybermfukoni.co.ke | 50+ services, categorised; independence disclaimer; some prices shown | Broken "0+" stat counters; no phone or WhatsApp visible; "100% compliant" badge without substance; built around online orders, not walk-ins |
| e-cyber.co.ke | Hours and payments listed; free tools | Placeholder phone (`+254 700 000 000`); tool search errors; no prices; vague copy |
| services.macista.co.ke, cybercentre.co.ke, cyberkenya.com, cyber.co.ke | Cover the same KRA / eCitizen / HELB / CV / printing list | Template look, keyword-heavy service lists, and "one-stop shop" language everywhere. Mostly "online cyber" portals rather than real local shops |

**The gap:** every competitor is either a generic template or a remote "online cyber" portal. None is built around a **local, walk-in, phone-first shop**: tell us what you need, know what to bring, send your file, collect it. None is precise about what the customer must prepare, and none treats privacy as part of the service.

---

## 3. Positioning

> **Kelper — the counter where Mombasa gets paperwork done.**

The visitor's problem isn't "I need a cybercafé". It's "I need my KRA return filed", "I need 40 copies by 2pm", or "my CV needs fixing before Friday". So the site is organised by **what the customer needs to get done**, not by our internal service list.

Primary audiences:

1. **Students & parents**: school assignment printing, KUCCPS/HEF applications, typing.
2. **Job seekers**: CVs, cover letters, online applications, certificate copies.
3. **Everyday admin**: KRA PIN and returns, eCitizen forms, passport application paperwork.
4. **Small businesses**: bulk printing, price lists, menus, flyers, invoices typed up.
5. **Walk-ins**: print from a phone, copy an ID, scan a document, use a computer.

Voice: helpful, direct, a little warm, and never loud. English first. A light "Karibu" greeting adds local warmth; we don't claim service in Kiswahili until the client confirms it.

---

## 4. Product decisions

| Feature | Why | How it stays honest |
| --- | --- | --- |
| **Task finder** ("What do you need to get done?") | Gets a scanning visitor to the right service in one tap | Each result shows what we help with, what to bring, and a pre-filled WhatsApp message. No sensitive data is requested |
| **Print job builder** (`/print`) | Printing is the highest-frequency job; specs over chat are messy | Builds a clear job ticket (pages, copies, colour, size, sides, finishing, collection time) and opens WhatsApp with it. **No price calculator**, because prices aren't confirmed. The file is attached in WhatsApp; the site stores nothing |
| **Prepare-before-you-come guides** (`/prepare/*`) | Wasted trips are the biggest frustration with government paperwork | Facts sourced from official/press references and marked "checked Oct 2026". Each links to the official portal. A tickable checklist can be printed or sent to yourself on WhatsApp |
| **Service pages** (`/services/*`) | Local search intent ("CV writing Mombasa", "KRA nil returns Mombasa") | Every page includes "What we don't do" or "Good to know" notes, plus the independence disclaimer on government services |
| **No backend, no database, no uploads** | Kelper has no operational system for secure file intake | Enquiries go to WhatsApp or a call. Files reach the shop through the channels customers already use. Nothing is stored by the site. Future: a secure upload with retention rules, if needed |

Rejected: booking system (no confirmed capacity or hours), online payments (no till number confirmed), testimonials (none exist), "trusted by 1,000+" stats (none exist).

### Privacy & trust stance

- WhatsApp messages never ask for ID numbers, KRA PINs, or passwords.
- The guides advise customers to **type their own passwords** and to keep their portal logins to themselves.
- Government services are framed as *assistance*. Kelper is independent. Official fees are set and charged by the government, and the agency makes the decision.
- Kenya Data Protection Act 2019: the site collects no personal data server-side. A plain-language privacy page explains what happens when you message the shop. ODPC registration thresholds (turnover over KES 5m and more than 10 staff) probably don't apply, but the client should confirm.

---

## 5. Visual direction: "the job ticket"

What the shop actually handles all day is **paper**: dockets, stamps, crop marks, carbon copies, receipts. Mombasa adds the coral-stone walls and deep Indian-Ocean blues of the Old Town. The identity takes both literally and stays restrained:

- **Palette:** paper (`#F5F0E6`), coral stone (`#E8DCC8`), ink (`#141414`), Indian-Ocean teal (`#0B5563`), highlighter marigold (`#FFC233`) used sparingly, the way a marker is used on a form. Red stamp (`#C2410C`) for rare emphasis.
- **Type:** _Bricolage Grotesque_ (display, a confident grotesk with character), _IBM Plex Sans_ (body, built for documents), _IBM Plex Mono_ (ticket labels, job numbers, specs).
- **Motifs:** printer's crop marks on photos, perforated "tear-off" edges on tickets, highlighter strokes under key words, a rubber-stamp detail. Section numbers in mono, like form fields.
- **Layout:** asymmetric editorial grid. Service directory as an index list, not a card grid. Tickets, lists and big type instead of rows of identical cards.
- **Motion:** minimal. A highlighter "draw" on load, hover lifts on tickets. Everything is disabled under `prefers-reduced-motion`.
- **Mark:** lowercase **kelper** wordmark plus a dog-eared page glyph. Proposed, not approved by the client.

## 6. SEO

Target intents (natural phrasing, no stuffing): _cyber café Mombasa · printing and photocopy Mombasa · CV writing Mombasa · KRA PIN / nil returns help Mombasa · eCitizen services Mombasa · HELB / HEF application help · bulk printing Mombasa_.

Implemented: per-page metadata, canonical `https://kelper.co.ke`, Open Graph image, sitemap, robots, `LocalBusiness` JSON-LD limited to verified fields (name, phone, URL, Mombasa / KE). Address, geo, hours and reviews are deliberately left out until confirmed.

## 7. Sources

- Business Daily, "Kenyan cyber cafés reinvent as smartphones kill browsing business": https://www.businessdailyafrica.com/bd/corporate/technology/cyber-caf%C3%A9s-reinvent-as-smartphones-kill-browsing-business-5580660
- The Star, "KRA services now available on eCitizen" (23 Mar 2024): https://www.the-star.co.ke/news/2024-03-23-kra-services-now-available-on-ecitizen-platform
- People Daily, "New KRA tax filing deadlines explained": https://peopledaily.digital/news/new-kra-tax-filing-deadlines-explained-who-files-by-april-30-and-who-files-by-june-30
- Kenyans.co.ke, "KRA clarifies new tax filing deadline": https://www.kenyans.co.ke/news/126943-kra-clarifies-new-tax-filing-deadline-amid-confusion-among-kenyans
- KRA, PIN registration requirements: https://www.kra.go.ke/individual/individual-pin-registration/learn-about-pin/requirements-for-kra-pin-registration
- HapaKenya, "How to apply for a Kenyan passport on eCitizen" (Feb 2025): https://hapakenya.com/2025/02/08/to-apply-for-a-kenyan-passport-on-ecitizen/
- Kenyans.co.ke, HEF document list: https://www.kenyans.co.ke/news/125199-university-fund-lists-documents-students-must-submit-get-scholarships-ahead-september
- K24, "How to apply for a HELB first-time loan in 2026": https://k24.digital/lifestyle/money/how-to-apply-for-a-helb-first-time-loan-in-2026
- Competitors: https://www.cybermfukoni.co.ke/ · https://e-cyber.co.ke/ · https://services.macista.co.ke/ · https://www.cybercentre.co.ke/
- DLA Piper, Data protection in Kenya: https://www.dlapiperdataprotection.com/?c=KE&t=law

---

## 8. Launch checklist: needs the client's confirmation

**Business facts** (all fields in `src/config/business.ts`):

- [ ] Street address / building, plus a landmark people use for directions
- [ ] Google Maps pin link
- [ ] Opening hours (including Sundays and public holidays)
- [ ] Is +254 723 938401 on WhatsApp (ideally WhatsApp Business), and who answers it?
- [ ] Email address and social accounts, if any
- [ ] Do staff serve customers in Kiswahili? (If yes, add a line saying so.)

**Services:** delete anything Kelper does not offer (`src/content/services.ts`):

- [ ] Printing (B/W and colour), photocopying, scanning, file conversion
- [ ] Binding and lamination; A3 and A5 paper *(equipment-dependent)*
- [ ] Typing and formatting; CVs and cover letters; online job applications
- [ ] KRA (PIN, nil and P9 returns, compliance certificate)
- [ ] eCitizen (passport forms, police clearance, birth certificates)
- [ ] KUCCPS and HEF/HELB applications
- [ ] School assignment research and printing
- [ ] Bulk and business printing; computer and internet use

**Operating promises the copy makes.** Confirm each one, or tell us to soften it:

- [ ] "We'll tell you the price first" / "We quote before we print" (home §05, service pages, print builder)
- [ ] "We reply with the price and ready time before we print" (print builder)
- [ ] "We never need your password, and never ask for one on WhatsApp" (home §05, services)
- [ ] "You can ask us to delete your scanned or printed files" (scanning service, privacy page)
- [ ] Customers may send files to print over WhatsApp

**Brand and media:**

- [ ] Approve or replace the proposed wordmark and page-mark icon
- [ ] Replace the stock photos with real photos of the shop when possible. The current images are licensed stock and are credited on `/credits`. They are not of Kelper.

**Future options (not built, deliberately):**

- Published price list, once prices are confirmed (`services.ts` can take a price field)
- Secure document upload, only with defined storage, access control and retention
- M-Pesa payment links (needs a till or paybill number)
- Google Business Profile and reviews, linked via `socials`
- Vercel Web Analytics (privacy-friendly; update `/privacy` if enabled)
