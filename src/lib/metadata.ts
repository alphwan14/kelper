import type { Metadata } from "next";
import { business } from "@/config/business";

/**
 * Per-page metadata. Next.js replaces (not merges) a parent's `openGraph`
 * object, so every page builds the full set here: canonical, og:url,
 * og:image, site name and locale stay correct on every route.
 */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
  type = "website",
}: {
  title?: string;
  description: string;
  path: string;
  socialTitle?: string;
  type?: "website" | "article";
}): Metadata {
  const ogTitle = socialTitle ?? (title ? `${title} · ${business.name} ${business.city}` : undefined);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: business.name,
      locale: "en_KE",
      ...(ogTitle ? { title: ogTitle } : {}),
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${business.name}, ${business.city}: paperwork, sorted.` }],
    },
    twitter: { card: "summary_large_image", ...(ogTitle ? { title: ogTitle } : {}), description },
  };
}
