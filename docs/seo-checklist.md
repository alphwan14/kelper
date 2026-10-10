# SEO and indexing checklist: kelper.co.ke

The domain stays at **kelper.co.ke**:
- registered with Truehost
- DNS on Cloudflare (`meg` / `theo.ns.cloudflare.com`)
- hosted on Vercel

The website change does not touch DNS, nameservers, SSL or the Google Search Console verification record. That record is a `google-site-verification` TXT record on the domain, confirmed present on 10 Oct 2026.

## What changed in the code

- **Titles and descriptions:** Every page names Kelper Investments Ltd and targets a real search phrase:

  | Page | Target phrase |
  |---|---|
  | Construction | construction / renovation contractor Mombasa |
  | Supplies | building materials Mombasa |
  | Quote | request a quotation |

- **Canonicals and social tags:** Every page sets a canonical URL and full Open Graph and Twitter tags. The new social image is generated at build time (`/opengraph-image`).
- **Structured data:**
  - **Every page:** an `Organization` plus `WebSite` graph with legal name, phone and city. No street address, coordinates, hours, ratings or prices are included, because none is confirmed.
  - **Service pages:** `Service` markup.
  - **Inner pages:** `BreadcrumbList` markup.
  - **What updates automatically:** filling in `src/config/business.ts` adds the address, email and other confirmed details.
- **Sitemap:** `sitemap.xml` lists the 9 public pages: `/`, `/services`, the three service pages, `/quote`, `/about`, `/contact` and `/privacy`.
- **robots.txt:** allows everything and points to the sitemap. `/credits` is `noindex, follow`.
- **Retired cybercafé URLs:** these return **410 Gone** from `src/proxy.ts`:
  - `/print`
  - `/prepare` and its guides
  - the 13 old `/services/<slug>` pages

  They have no equivalent on the new site, and redirecting them to the homepage would count as soft-404s. `/services`, `/contact` and `/privacy` keep their URLs.
- **Icons:** favicon, Apple touch icon and manifest all use the new mark.

## After deploying

1. [ ] **Check the domain and HTTPS.** `https://kelper.co.ke` should load over HTTPS, and `www` should redirect to the apex (set in Vercel → Domains).
2. [ ] **Run the automated checks** against production: `npm run smoke -- https://kelper.co.ke`
3. [ ] **Check the sitemap and robots.txt:** open `https://kelper.co.ke/sitemap.xml` and `https://kelper.co.ke/robots.txt`.
4. [ ] **Open Search Console.** Use the `kelper.co.ke` property, which is already verified by DNS TXT. Do not remove that TXT record in Cloudflare.
5. [ ] **Submit the sitemap.** Go to Sitemaps and resubmit `https://kelper.co.ke/sitemap.xml`.
6. [ ] **Inspect the homepage.** In URL Inspection, enter `https://kelper.co.ke/`, check "Test live URL", then press **Request indexing**.
7. [ ] **Request indexing for the service pages:** `/services/construction`, `/services/engineering`, `/services/supplies` and `/quote`.
8. [ ] **Check the old URLs** after 1–2 weeks. In Pages → "Not indexed", the old cybercafé URLs should appear as "Not found (404)" or "Excluded", and drop out over time. Nothing needs to be done about them.
9. [ ] **Monitor crawl errors** under Pages and Crawl stats for the first month.
10. [ ] **Create a Google Business Profile** for Kelper Investments Ltd, once an address or service area is confirmed. Local results for "construction company Mombasa" are dominated by directory and map listings. Add the profile URL to `socials`.
11. [ ] **Add accurate directory listings.** BusinessList.co.ke and similar sites rank for local construction searches.

## Expectations

- Google does not index pages immediately after a sitemap submission or indexing request, and nothing guarantees it will. New pages on a young domain usually take from a few days to several weeks.
- Old snippets showing the cybercafé text may linger in results until Google recrawls those URLs.
- Rankings for competitive phrases depend on more than the website: a Google Business Profile, genuine reviews, consistent directory listings and real project content all matter.
