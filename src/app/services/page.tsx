import type { Metadata } from "next";
import Link from "next/link";
import { QuoteAction } from "@/components/actions";
import { ArrowIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { business } from "@/config/business";
import { imageFor } from "@/content/images";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Services: Construction, Engineering & Supplies in Mombasa",
  description: `${business.legalName} services in ${business.city}: building works and renovations, engineering support and installation works, and construction materials supply.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        kicker={`Services · ${business.city}`}
        title={business.descriptor}
        intro={<p>Three service lines that can be quoted separately or together. Each page sets out the scope, who it&rsquo;s for, and what to send for a quotation.</p>}
      />

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="group block">
                <Photo image={imageFor(s.image)} aspect="aspect-[4/3]" sizes="(min-width: 768px) 30vw, 100vw" position={s.imagePosition} />
                <p className="label mt-5">{s.ref}</p>
                <h2 className="mt-2 flex items-center justify-between gap-4 text-3xl font-extrabold tracking-tight group-hover:underline group-hover:decoration-signal group-hover:decoration-2 group-hover:underline-offset-6">
                  {s.name}
                  <ArrowIcon className="h-6 w-6 shrink-0 text-signal-ink transition-transform group-hover:translate-x-1" />
                </h2>
                <p className="mt-2 text-ink-2">{s.short}</p>
              </Link>
              <ul className="mt-5">
                {s.scope.map((g) => (
                  <li key={g.title} className="index-row flex items-center gap-3 py-2.5 text-[0.95rem]">
                    <span className="datum" aria-hidden="true" />
                    {g.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-20 flex flex-col items-start gap-6 border border-ink bg-paper p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Not sure which service fits?</h2>
            <p className="mt-2 max-w-xl text-ink-2">Describe the project in the quotation request and choose &ldquo;Not sure&rdquo;. We&rsquo;ll route it.</p>
          </div>
          <QuoteAction />
        </div>
      </div>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
