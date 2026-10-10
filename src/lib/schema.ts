import { activeEmail, business } from "@/config/business";
import type { ServiceLine } from "@/content/services";

const orgId = `${business.url}/#organization`;

/**
 * Organization built only from confirmed facts. It is deliberately not a
 * LocalBusiness/GeneralContractor: there is no confirmed street address or
 * opening hours yet. Address, email, area served and socials are added
 * automatically once they're filled in src/config/business.ts.
 */
export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: business.legalName,
        legalName: business.legalName,
        alternateName: business.name,
        description: business.descriptor,
        url: business.url,
        logo: `${business.url}/brand/kelper-mark.png`,
        image: `${business.url}/opengraph-image`,
        telephone: business.phone.e164,
        ...(activeEmail ? { email: activeEmail } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: business.city,
          addressRegion: business.region,
          addressCountry: business.countryCode,
          ...(business.streetAddress ? { streetAddress: business.streetAddress } : {}),
        },
        ...(business.areaServed?.length
          ? { areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })) }
          : {}),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: business.phone.e164,
          ...(activeEmail ? { email: activeEmail } : {}),
          areaServed: business.countryCode,
          availableLanguage: ["en"],
        },
        ...(business.socials.length ? { sameAs: business.socials.map((s) => s.url) } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${business.url}/#website`,
        url: business.url,
        name: business.legalName,
        publisher: { "@id": orgId },
        inLanguage: "en-KE",
      },
    ],
  };
}

export function serviceSchema(service: ServiceLine): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.name,
    url: `${business.url}/services/${service.slug}`,
    provider: { "@id": orgId },
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
