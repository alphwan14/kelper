import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { guides } from "@/content/guides";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${business.url}${path}`;
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/print"), changeFrequency: "yearly", priority: 0.8 },
    { url: url("/prepare"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.7 },
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...guides.map((g) => ({ url: url(`/prepare/${g.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
