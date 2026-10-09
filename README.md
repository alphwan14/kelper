# Kelper: kelper.co.ke

Website for **Kelper**, a cybercafé and document-services business in Mombasa: printing, typing, CVs, and help with KRA, eCitizen and HEF/KUCCPS applications.

Built with Next.js 16 (App Router, Cache Components), TypeScript (strict) and Tailwind CSS v4. Every route is prerendered as static output, enforced by `ensureStatic = "navigation"` in the root layout. There is no database, no backend, and no environment variables.

Research, positioning and design decisions are in [`docs/kelper-research.md`](docs/kelper-research.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + production build
npm run build && npm start
```

Requires Node.js 20.9 or later.

## Where things live

| What | File |
| --- | --- |
| **Business facts** (phone, address, hours, email, map) | `src/config/business.ts` |
| Services (names, copy, what to bring, WhatsApp text) | `src/content/services.ts` |
| "What to bring" checklists (with sources and check dates) | `src/content/guides.ts` |
| Home-page task finder entries | `src/content/tasks.ts` |
| Photos and licences | `public/images/`, `src/content/image-credits.json`, `src/content/images.ts` |
| Design tokens and motifs (ticket, crop marks, marker, stamp) | `src/app/globals.css` |

### Adding confirmed business details

Fill in the `null` fields in `src/config/business.ts`. The site picks them up automatically:

- `streetAddress`, `landmark`: shown in the footer, the home page and `/contact`, and added to structured data.
- `mapUrl`: adds "Open in Google Maps" links, replacing "Ask for a location pin".
- `hours`: shows opening hours, replacing "Ask what time we're open", and adds `openingHoursSpecification` to structured data.
- `geo`, `email`, `socials`: added where relevant.

Never put a guess in these fields. A blank is handled gracefully; a wrong fact is not.

### Changing services or guides

Edit the arrays in `src/content/`. Service and guide pages, the sitemap, the footer and the task finder all update from the same data. Guide facts change, so update each guide's `checked` date when you review it.

## Deploy to Vercel

1. Push this folder to a Git repository (GitHub, GitLab or Bitbucket).
2. In Vercel: **Add New → Project**, import the repo. Vercel detects Next.js; no build settings or environment variables are needed.
3. Deploy, then open the `*.vercel.app` preview and check it.
4. **Settings → Domains**: add `kelper.co.ke` and `www.kelper.co.ke`, and set the apex as primary so `www` redirects to it.
5. At the `.co.ke` registrar, set the DNS records Vercel shows (typically an `A` record for the apex and a `CNAME` for `www`). Propagation can take a few hours.
6. After the domain is live, submit `https://kelper.co.ke/sitemap.xml` in Google Search Console and create or claim a Google Business Profile for the shop. Local search relies heavily on it.

Or from the CLI: `npx vercel` (preview) and `npx vercel --prod`.

**Status (9 Oct 2026):** not deployed yet. `kelper.co.ke` does not resolve in DNS.

## Before launch: confirm with the client

See the checklist at the end of `docs/kelper-research.md`.
