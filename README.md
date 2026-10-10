# Kelper Investments Ltd: kelper.co.ke

Website for **Kelper Investments Ltd**, which offers construction, engineering services and supplies in Mombasa, Kenya.

## Stack

- **Framework:** Next.js 16 (App Router, Cache Components), TypeScript (strict) and Tailwind CSS v4.
- **Rendering:** Every page is prerendered as static output, enforced by `ensureStatic = "navigation"` in the root layout.
- **Proxy:** The only runtime code is `src/proxy.ts`, which answers retired cybercafé URLs with `410 Gone`.
- **Backend:** There is no database, no backend and no form submission server. The quotation request builds a WhatsApp message in the browser.

## Docs

| Document | What it covers |
|---|---|
| [`docs/research.md`](docs/research.md) | Market and regulatory research, positioning decisions |
| [`docs/owner-questions.md`](docs/owner-questions.md) | **What must be confirmed before launch** |
| [`docs/seo-checklist.md`](docs/seo-checklist.md) | SEO changes and the post-deploy Search Console steps |
| [`docs/brand.md`](docs/brand.md) | Logo files, colours, type, photography |

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + production build
npm run build && npm start
npm run smoke      # route, SEO and content checks against http://localhost:3000
npm run smoke -- https://kelper.co.ke   # the same checks against production
```

Requires Node.js 20.9 or later.

## Where things live

| What | File |
| --- | --- |
| **Business facts** (name, phone, email switch, address, credentials) | `src/config/business.ts` |
| Service lines (scope, who it's for, what to send, notes) | `src/content/services.ts` |
| Navigation | `src/content/nav.ts` |
| Quotation request builder | `src/components/quote-builder.tsx` |
| Photos and licences | `public/images/`, `src/content/image-credits.json` |
| Logo files | `public/brand/` (the in-page mark is `src/components/wordmark.tsx`) |
| Design tokens and motifs | `src/app/globals.css` |
| Structured data | `src/lib/schema.ts` |
| Retired URLs (410) | `src/proxy.ts` |

### Adding confirmed business details

Fill in the blank fields in `src/config/business.ts`. Never put a guess in them: a blank is hidden on the site, but a wrong licence grade or address is published. The site updates itself:

- **`email.active`:** Set it to `true` only after `info@kelper.co.ke` has been tested end to end. It shows the address on the site and adds an Email button to the quotation form.
- **`credentials`:** Use exact text from certificates, for example NCA grade and class. Shown on /about.
- **`streetAddress`, `mapUrl`, `postalAddress`, `hours`, `areaServed`, `socials`:** Shown where relevant and added to structured data.

## Deploy

- **How it deploys:** The Vercel project `kelper` is linked to `github.com/alphwan14/kelper`, so pushing `main` deploys to production. Preview first by pushing a branch, or run `npx vercel` for a preview deployment.
- **Domains:** `kelper.co.ke` and `www` are configured in Vercel. DNS is on Cloudflare. A code deploy needs no DNS changes.
- **After deploying:** Follow [`docs/seo-checklist.md`](docs/seo-checklist.md).
