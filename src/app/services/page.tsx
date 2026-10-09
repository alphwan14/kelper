import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { WhatsAppAction } from "@/components/actions";
import { ArrowIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { business } from "@/config/business";
import { categories, servicesInCategory } from "@/content/services";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Services: printing, typing, CVs & online forms",
  description: `Everything at the ${business.name} counter in ${business.city}: printing, photocopying, scanning, typing, CVs, KRA, eCitizen, HEF/KUCCPS and bulk printing.`,
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
        title="Everything at the counter."
        intro="Grouped by what you're trying to get done. Every service page tells you what to bring and how to start."
      />

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="space-y-16">
          {categories.map((cat, ci) => (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
              <div>
                <p className="label">{String.fromCharCode(65 + ci)}</p>
                <h2 id={`cat-${cat.id}`} className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
                  {cat.name}
                </h2>
                <p className="mt-2 text-ink-3">{cat.line}</p>
              </div>
              <ul>
                {servicesInCategory(cat.id).map((s) => (
                  <li key={s.slug} className="index-row">
                    <Link href={`/services/${s.slug}`} className="group grid grid-cols-[1fr_auto] items-start gap-4 py-5">
                      <span>
                        <span className="block text-xl font-bold tracking-tight group-hover:underline group-hover:decoration-marker group-hover:decoration-[3px] group-hover:underline-offset-4">
                          {s.name}
                        </span>
                        <span className="mt-1 block text-ink-2">{s.short}</span>
                      </span>
                      <ArrowIcon className="mt-1.5 h-5 w-5 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start gap-5 border-t-2 border-ink pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl font-bold tracking-tight md:text-3xl">Don&rsquo;t see what you need?</p>
          <WhatsAppAction message="do you offer a service that isn't on your website? I need help with: ">Ask us on WhatsApp</WhatsAppAction>
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
