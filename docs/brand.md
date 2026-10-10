# Kelper Investments Ltd: brand notes

**Status:** proposed identity, pending owner approval.

## Concept: "the drawing set"

The visual language borrows from construction drawings rather than from stock construction clip art. You will see:
- structural grid lines on the backgrounds
- dimension lines under photos
- title blocks for summaries and the footer
- small filled "datum" squares as markers

The aim is to look technical and precise, and to stay calm and commercial rather than loud.

## Mark

The mark is a **"K" built as a braced frame**:
- one column
- an upper brace
- a lower brace in signal orange

It is drawn on a 32-unit grid, so it stays legible at favicon size (16 px).

| File | Use |
|---|---|
| `public/brand/kelper-logo.svg` / `.png` | Primary logo on white or light backgrounds |
| `public/brand/kelper-logo-inverse.svg` / `.png` | On navy or dark backgrounds |
| `public/brand/kelper-logo-descriptor.svg` | Letterheads, profiles and signage, with "Construction, Engineering Services & Supplies" |
| `public/brand/kelper-logo-descriptor-inverse.svg` | The descriptor version for dark backgrounds |
| `public/brand/kelper-mark.svg` / `.png` | Square mark: favicons, social avatars, small spaces |
| `public/brand/kelper-mark-inverse.svg` | Square mark for dark backgrounds |

All lettering in the SVG logos has been converted to outlines, so the files need no fonts installed.

**Usage rules:**
- Keep clear space around the logo equal to the height of the "K" mark's lower brace.
- Don't recolour the mark, stretch it, or put it on a photo without a solid panel behind it.

## Colour

| Token | Hex | Use |
|---|---|---|
| Navy | `#13263D` | Primary brand colour, buttons, dark sections |
| Navy deep | `#0B1828` | Footer, hover states |
| Ink | `#101B29` | Body text |
| Warm white (paper) | `#F5F3EE` | Page background |
| Concrete | `#D9D5CC` | Image placeholders, shadows |
| Steel | `#8A97A6` / `#C3CCD6` | Secondary text on dark backgrounds |
| Signal | `#E2702F` | Fills and accents only: datums, the mark's brace, the mobile CTA |
| Signal ink | `#B04517` | Accent text and focus rings on light backgrounds (5.1:1 contrast) |

Signal orange is a restrained nod to site safety colours. Use it sparingly: never for body text on light backgrounds, and never as large fills.

## Type

- **Archivo Semi-Condensed** (87.5% width, ExtraBold/Bold) for headings. It is a firm, engineered grotesque.
- **IBM Plex Sans** for body text and **IBM Plex Mono** for labels. Both are retained from the previous site because they work well for technical annotation.
- All three are SIL Open Font License fonts, loaded with `next/font`.

## Photography

- Current photos are licensed, illustrative stock (Pexels License). They are listed in `src/content/image-credits.json` and published on `/credits`.
- They are not Kelper's projects or staff, and the site never captions them as such.
- **Engineering photo:** the surveying level carries a small manufacturer logo, which is incidental equipment branding.
- **Replacing them:** use genuine site and yard photos once available. Add each as a new entry with `"source": "Kelper Investments Ltd"`.
