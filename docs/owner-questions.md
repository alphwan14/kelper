# Owner questions: Kelper Investments Ltd

The website was rebuilt on 10 October 2026 from the brief and from public research. Nothing about the company's licences, history, projects or capacity has been invented. This list covers what the site needs from you before it goes live, and what it can use later.

**Where the answers go:** almost everything goes in `src/config/business.ts` or `src/content/services.ts`. Blank fields stay hidden on the site until you fill them in, so a gap never shows as a wrong fact.

---

## A. Confirm before going live (blocking)

### 1. Phone number

- **The question:** Is **+254 723 938401** still the right number for Kelper Investments Ltd? It came from the cybercafé site.
- **Also confirm:** Is it on WhatsApp, and who answers it?
- **Why it blocks launch:** Every call and WhatsApp button uses this number.

### 2. Construction contracting and NCA registration

- **The question:** Is the company registered with the National Construction Authority?
- **If it is, send us:**
  - the grade(s) and class(es) exactly as printed on the certificate, for example "NCA 7 · Building works"
  - the registration number
  - the licence expiry date
- **If it is not:** We will reword or remove the Construction service before launch.
- **Why:** NCA Act s.15 says no one may carry on business as a contractor without registration and a practising licence.

### 3. Engineering Services

- **The question:** Does the company employ an engineer registered with the Engineers Board of Kenya (EBK)? Is it itself an EBK-registered firm?
- **What the page says now:** It is written for a company that is *not* EBK-registered. It offers technical support, setting out, supervision, coordination and installation, and says that design and certification are done by registered professionals.
- **If you have EBK registration:** Send the details and we can widen the copy.
- **Electrical installation:** It is deliberately not listed. It needs an EPRA licence and an NCA electrical class.

### 4. Confirm or remove each scope item

Each item below is currently a *proposed* category in `src/content/services.ts`. Delete anything you will not quote for.

- **Construction**
  - new buildings
  - extensions
  - foundations, masonry and concrete frames
  - plastering, screeding, tiling and painting
  - roofing
  - ceilings, partitions, doors and windows
  - boundary walls and gates
  - paving and cabro
  - drainage and soakaways
- **Engineering**
  - site visits and condition assessments
  - setting out and levels
  - site supervision and reporting
  - working to consultants' drawings
  - pricing against designs and BoQs
  - approvals guidance
  - water, plumbing and drainage installation
  - steel fabrication: gates, grilles and light frames
- **Supplies**
  - cement
  - reinforcement steel and mesh
  - blocks and machine-cut stone
  - sand, ballast and aggregates
  - timber
  - roofing sheets
  - tiles, paint and ceiling boards
  - doors, windows and ironmongery
  - pipes, fittings and tanks
  - nails, wire, fixings and tools
  - PPE

### 5. Promises the copy makes

Confirm each one, or tell us to soften it.

- [ ] "Get an itemised quotation", meaning items, specifications, quantities, rates and exclusions written out (home page)
- [ ] "We come back with any questions, and arrange a site visit where the work needs one" (home page)
- [ ] "Scope, payment terms and dates are agreed in writing before work starts or an order is placed" (home page and /about)
- [ ] "Every order is quoted on its own, with how long the price holds" (home page)
- [ ] "If we suggest an alternative product, the quotation says so" (home page and Supplies)
- [ ] "Ask for our company documents… we'll send ours" (home page and /about)
- [ ] "Meetings by appointment" (/contact). This only shows while no office address is set.
- [ ] Customers may send drawings, BoQs and files over WhatsApp

### 6. Brand

- **Logo:** Approve or replace the proposed mark and logo. The files are in `public/brand/` and the rationale is in [`brand.md`](brand.md).
- **Headline:** Approve or replace the supporting headline, "Construction, engineering support and materials, quoted clearly."

## B. Fill in when available (not blocking)

| Item | Field | Effect on the site |
|---|---|---|
| Email working | `email.active: true` | Shows `info@kelper.co.ke` in the footer, /contact and /privacy, adds an "Email" button to the quotation form, and adds the address to structured data. **Only switch it on after a test message has been sent and received.** On 10 Oct 2026 the domain had no MX record, so mail to this address would bounce. |
| Office or yard address and landmark | `streetAddress`, `mapUrl`, `geo` | Shows the address and adds a "Open in Google Maps" link |
| P.O. Box | `postalAddress` | Footer and /contact |
| Office hours | `hours` | Shown on /contact |
| Towns and counties you will work or deliver in | `areaServed` | Structured data. Later, add location wording to the copy. |
| Registrations you can produce on request (NCA, EBK, AGPO, e-GP supplier, DOSHS workplace registration) | `credentials` | Listed on /about as a "Company documents" title block |
| Social profiles and Google Business Profile | `socials` | `sameAs` in structured data |

## C. Content that would strengthen the site

- **Genuine project photos**, with the client's permission, plus location, scope and year. A Projects page should be added only once real projects can be documented. It has deliberately not been built.
- **A company profile PDF** for procurement teams, offered as a download.
- **A written safety (HSE) commitment**, if you will stand behind it.
- **Whether the supplies you stock are KEBS-marked**, and whether you can provide mill certificates for steel.
- **The year the company was registered**, if you want it shown.
