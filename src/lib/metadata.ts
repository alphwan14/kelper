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
}: {
  title?: string;
  description: string;
  path: string;
  socialTitle?: string;
}): Metadata {
  const ogTitle = socialTitle ?? (title ? `${title} | ${business.legalName}` : `${business.legalName}: ${business.descriptor}`);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: business.legalName,
      locale: "en_KE",
      title: ogTitle,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${business.legalName}: ${business.descriptor}` }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  };
}
