import { business } from "@/config/business";
import type { Guide } from "@/content/guides";
import type { Service } from "@/content/services";

/**
 * LocalBusiness built only from confirmed facts. Address details, geo and
 * hours are added automatically once they're filled in src/config/business.ts.
 */
export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${business.url}/#business`,
    name: business.name,
    url: business.url,
    telephone: business.phone.e164,
    image: `${business.url}/opengraph-image`,
    logo: `${business.url}/icon.svg`,
    areaServed: { "@type": "City", name: business.city },
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: business.countryCode,
      ...(business.streetAddress ? { streetAddress: business.streetAddress } : {}),
    },
    ...(business.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng } }
      : {}),
    ...(business.mapUrl ? { hasMap: business.mapUrl } : {}),
    ...(business.email ? { email: business.email } : {}),
    ...(business.hours
      ? {
          openingHoursSpecification: business.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.schemaDays,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    ...(business.socials.length ? { sameAs: business.socials.map((s) => s.url) } : {}),
  };
}

export function serviceSchema(service: Service): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.short,
    serviceType: service.name,
    url: `${business.url}/services/${service.slug}`,
    areaServed: { "@type": "City", name: business.city },
    provider: { "@id": `${business.url}/#business` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${business.url}${item.path}`,
    })),
  };
}

export function guideSchema(guide: Guide): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    url: `${business.url}/prepare/${guide.slug}`,
    publisher: { "@id": `${business.url}/#business` },
    inLanguage: "en-KE",
  };
}
