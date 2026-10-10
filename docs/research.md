# Kelper Investments Ltd: market research and regulatory notes

*Research date: 10 October 2026. Internal document: not published on the site.*

**Labels**
- **VERIFIED**: found in a cited source. Official sources are named as such.
- **SECONDARY**: press or third-party source. Re-check before relying on it.
- **ASSUMPTION**: our inference, with no source.

Nothing in this document confirms any licence, registration or capability held by Kelper Investments Ltd. Those are listed as owner questions in [`owner-questions.md`](owner-questions.md).

**Access limits:** nca.go.ke failed a TLS certificate check when fetched directly, so the NCA facts below come from search snippets of official NCA pages. ebk.go.ke and agpo.go.ke pages could not be fetched directly. Treat fee figures as indicative.

---

## 1. Regulation that applies to the three business lines

### 1.1 National Construction Authority (NCA): contracting

- **VERIFIED (NCA):** Section 15 of the NCA Act (No. 41 of 2011) says no one may carry on the business of a contractor without being registered by the Board and holding a valid practising licence. https://www.nca.go.ke/local-contractors
- **VERIFIED (NCA):** Contractors are graded from **NCA 1 (highest) to NCA 8**. The classes of works are building, roads/civil, water, electrical and mechanical. Some specialist subclasses also need licences from other authorities (EPRA, Communications Authority). https://www.nca.go.ke/contractor_registration-FAQs
- **VERIFIED (NCA, via search snippet):** Contract value limits differ by class. For building works, NCA 8 is capped at about KSh 10M and NCA 1 is unlimited.
- **SECONDARY:** Indicative caps for building works by grade. https://hudumaglobal.com/blog/nca-contractor-categories-nca1-nca8-tiers-explained-kenya

  | Grade | Indicative cap |
  |---|---|
  | NCA 8 | ≈ KSh 10M |
  | NCA 7 | ≈ KSh 20M |
  | NCA 6 | ≈ KSh 50M |
  | NCA 5 | ≈ KSh 100M |
  | NCA 4 | ≈ KSh 250M |
  | NCA 3 | ≈ KSh 500M |
  | NCA 2 | ≈ KSh 1B |
  | NCA 1 | Unlimited |

- **VERIFIED (NCA):** Registration requires all of the following:
  - certificate of incorporation
  - CR12
  - directors' IDs
  - qualifications of technical staff
  - a KRA Tax Compliance Certificate
  - a county business licence
  - audited accounts
  - proof of past projects
  - proof of plant and equipment
- **VERIFIED (NCA):** The licence expires on **30 June** each year. https://www.nca.go.ke/media/NCA_Contractor_Application_Form_.pdf
- **VERIFIED (NCA):** The developer must register each project with NCA within 30 days of award, using an NCA-registered contractor. https://www.nca.go.ke/project-registration
- **VERIFIED (press, June 2026):** NCA is actively enforcing in Mombasa. One developer was arrested over unapproved floors. https://peopledaily.digital/news/nca-cracks-down-on-developer-adding-unauthorised-floors-to-mombasa-building

**Site implication:** The Construction page describes the service line but makes no NCA claim. Once the owner confirms a grade and class, add it to `business.credentials` exactly as printed on the certificate, for example "NCA 7 · Building works". It will then appear on /about. Without NCA registration, contracting cannot lawfully be offered, and the construction pillar should be reworded or removed before launch.

### 1.2 Engineers Board of Kenya (EBK): the biggest wording risk

- **VERIFIED (Kenya Law):** The Engineers Act 2011 creates these offences:
  - using the title "engineer" while unregistered (s.47)
  - providing professional engineering services as an unregistered body of persons (s.48)
  - submitting engineering documents to an authority without registration (s.50)
  - practising without a licence (s.51)

  https://new.kenyalaw.org/akn/ke/act/2011/43/eng@2022-12-31
- **VERIFIED (Engineers Rules 2019, LN 18/2019):** A consulting engineering firm must meet these conditions:
  - all of its shareholders are professional engineers
  - a consulting engineer holds at least 51%
  - it has a consulting engineer for each discipline it practises

  https://new.kenyalaw.org/akn/ke/act/ln/2019/18/eng@2022-12-31
- **SECONDARY (Nation, quoting the EBK Registrar):** Unregistered persons or firms may not submit engineering drawings, designs or reports to any authority.

**Site implication (legal review advised):** "Engineering Services" stays in the owner-requested descriptor. The Engineering page frames the line as technical support, installation, and coordination with registered professionals. It does **not** offer engineering design, structural design, certification or consulting-engineer services. It states plainly that designs and certification are by registered professionals as the law requires. If Kelper employs or is an EBK-registered engineer or firm, add that to `credentials` and widen the copy.

### 1.3 BORAQS: architects and quantity surveyors

- **VERIFIED:** Cap. 525 governs the registration of architects and quantity surveyors. https://new.kenyalaw.org/akn/ke/act/1933/60/eng@2023-12-11
- **Site implication:** The site says "we price against your BoQ or materials list". It does not claim BoQ preparation or quantity surveying.

### 1.4 NEMA, the county and OSHA

- **NEMA EIA (VERIFIED):** Under EMCA s.58, listed projects need an EIA licence before they start. EIAs are prepared by NEMA-registered experts.
- **Mombasa County (VERIFIED, official):** Building permits go through **e-DAMS**, which says permit applications are submitted by registered professionals. A separate repair-works (e-RW) permit covers minor refurbishment. https://edams.mombasa.go.ke/site/index.php/construction-permit
- **OSHA 2007 (VERIFIED):** Premises where building operations or works of engineering construction are carried out must be registered as workplaces (LN 51/2022). https://new.kenyalaw.org/akn/ke/act/ln/2022/51/eng@2022-03-29

**Site implication:** The site says only that clients should expect approvals to be in place, and that Kelper can discuss what a project needs. It makes no HSE certification claim. A written safety commitment is an owner question.

### 1.5 KEBS: building materials

- **VERIFIED (press):** KEBS standards cover:
  - cement (KS EAS 18-1)
  - reinforcement steel (KS EAS 412)
  - structural steel (KS 572)
  - blocks and roofing

  Twisted bars have been banned since 2017. KEBS has suspended makers of substandard steel bars and roofing sheets. https://www.citizen.digital/business/kebs-announces-new-standards-for-major-construction-materials-n295635
- **Site implication:** The Supplies page invites customers to state the grade or standard they need, for example "Y12 high-yield, KS EAS 412". It does not claim that Kelper stock is KEBS-marked or that Kelper is certified. That claim is an owner question.

### 1.6 Public procurement

- **VERIFIED (Treasury):** Since 1 July 2025, national and county government procurement runs through **e-GP (egpkenya.go.ke)**, and supplier registration there is a prerequisite. https://brs.go.ke/wp-content/uploads/2025/06/Notice-to-suppliers.pdf
- **VERIFIED (KRA):** The Tax Compliance Certificate is issued on iTax, is valid for 12 months, and can be checked by third parties. https://www.kra.go.ke/business/business-compliance-penalties/business-how-to-file/tax-compliance
- **VERIFIED (BRS):** A CR12 (official search) is obtained through eCitizen/BRS.
- **SECONDARY:** AGPO reserves 30% of public procurement for youth-, women- and PWD-owned firms (PPADA s.157(10)).

---

## 2. Competitors and peers

| Company | Offer | How it shows credibility | Weaknesses observed |
|---|---|---|---|
| Malidadi Construction (David Jomeli Construction & Supplies Ltd), Mombasa. https://malidadiconstruction.co.ke/ | Building, roads, water, electrical and mechanical works, plus supplies. The closest peer to Kelper. | Per a search snippet: NCA 2 across five classes, and the director's qualifications. | The site was behind a bot check, so it could not be audited. |
| Multiple Matrix Construction Ltd, Mombasa. https://multiplematrixconstructionltd.com/ | Building, roads, water, renovations | Says "registered with NCA" without a grade or number. Has a free-quote CTA. | Lorem ipsum left on the page, template copy, dead social links, no address |
| Steel Structures Ltd. https://steelstructureskenya.com/ | Pre-engineered steel buildings | ISO 9001 post, testimonials, named projects, quote form | Counters showing "0", "test test" placeholders |
| Jalaram Industrial Supplies, Mombasa. https://jalaramkenya.com/ | Hardware, PPE, plumbing, paint | Product categories, WhatsApp, three phone numbers | No quote form, no quality proof, Gmail address |
| Mombasa hardware retail (Changamwe, Nyali), via BusinessList | Building materials | Directory listings and reviews | Mostly no website of their own |
| Maisha Mabati / MRM (national). https://maishamabatisupplies.com/ | Roofing | Published prices and branches | Not a direct peer |
| Westcon, Civicon, Epco (directory profiles) | Building, civil and energy works | NCA grade, years in business, yards and plant | Little or no own-site presence |

**Observed patterns (VERIFIED from the fetched sites):**
- Most rely on phone and WhatsApp.
- NCA claims usually give no grade.
- Portfolios are thin or unlabelled.
- HSE statements are almost absent.
- Placeholder text and unsupported superlatives are common.

**Opportunity:** A clean, honest site stands out in this field. To do that it needs:
- verifiable credentials, added as they are confirmed
- a structured quotation and materials-list workflow
- a plain statement of what Kelper does and does not do

That positioning is the basis of this redesign.

## 3. How buyers screen an unknown contractor or supplier

**Public sector (VERIFIED from 2025–26 NG-CDF and KRA prequalification notices).** They ask for:
- certificate of incorporation
- CR12
- valid TCC
- PIN certificate
- NCA certificate at a stated minimum grade
- AGPO certificate where applicable
- company profile and past experience
- directors' IDs
- e-GP registration

**Private developers and homeowners (SECONDARY guides).** They:
- verify NCA registration on the NCA portal
- check tax compliance
- confirm consultants are registered
- visit past projects and call referees
- want written contracts with stage payments
- ask who handles approvals

**Site implications:**
- The quote workflow asks for the right information up front: scope, location, drawings or BoQ status, quantities and dates.
- The /about page has a credentials block that fills in as documents are confirmed.
- A company-profile PDF is an owner action.

## 4. Search intent

No keyword-volume tool was available, so no volumes are claimed. What we observed:

- **"construction company / building contractors Mombasa":** results are dominated by directories (BusinessList, D&B), so firms' own sites face thin competition. A Google Business Profile and directory listings matter.
- **"renovation contractors Mombasa":** weak local results. This looks like an underserved niche.
- **"building materials / hardware suppliers Mombasa":** directories and manufacturers. Local intent is tied to areas such as Changamwe, Nyali, Mtwapa, Kisauni and Mikindani.
- **"general supplies Mombasa/Kenya":** the intent is procurement and tenders.

**Target clusters used in titles and headings:**
- "construction company Mombasa" / "building contractor Mombasa"
- "renovation Mombasa"
- "building materials supplier Mombasa"
- "construction supplies Kenya"
- "request a quotation"

Area names are not used until the owner confirms coverage.

## 5. Positioning decision

- **Name and descriptor:** Kelper Investments Ltd: Construction, Engineering Services & Supplies, as requested.
- **Supporting headline:** "Build, equip and supply projects across the Coast". Rejected: too broad, implies coverage that isn't confirmed.
- **Chosen headline:** **"Construction, engineering support and materials, quoted clearly."** It is specific about the three lines, makes a promise the company controls (a clear quotation), and claims no scale, history or licence.
- **Tone:** plain, precise and commercial. No superlatives, no invented numbers.
- **Brand concept, "the drawing set":**
  - **Colours:** navy ink on a warm white sheet, steel greys, and one signal orange for datums and the lower brace of the mark.
  - **Type:** Archivo semi-condensed for headings. IBM Plex Sans and Plex Mono are retained from the previous site for body text and annotations.
  - **Motifs:** structural grid lines, dimension lines, title blocks and datum squares. They are construction-specific without resorting to clip-art hard hats.
- **Mark:** a "K" built as a braced frame: a column, an upper brace and a lower brace in signal orange. It works at 16px and on light and dark backgrounds.

## 6. Legacy URLs

- **Retired cybercafé routes:**
  - `/print`
  - `/prepare` and its six guides
  - 13 old `/services/<slug>` pages

  They now return **410 Gone** via `src/proxy.ts`. The site launched on 9 October 2026, so little or nothing was indexed. None of these pages has an equivalent on the new site, and redirecting them to the homepage would be a soft-404.
- **Kept routes:** `/`, `/services`, `/contact`, `/privacy` and `/credits` keep their URLs with new content.
