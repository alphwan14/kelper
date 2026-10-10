import type { Metadata } from "next";
import Link from "next/link";
import { QuoteAction } from "@/components/actions";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { SectionHead } from "@/components/section-head";
import { business } from "@/config/business";
import { imageFor } from "@/content/images";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "About Kelper Investments Ltd",
  description: `${business.legalName} is a ${business.city}-based company offering construction, engineering services and supplies. How we work, and what to ask us for.`,
  path: "/about",
});

/*
 * Facts only. No founding year, team size, project count or history is stated
 * because none has been confirmed. Add them here once the owner provides them.
 */
const approach = [
  {
    title: "Clear scope before price",
    body: "A quotation is only as good as the brief behind it. We ask questions first, so the price covers the work you actually need.",
  },
  {
    title: "The right people for regulated work",
    body: "Kenyan law sets out who may design, certify and contract for building works. We work within those rules and tell you where your project needs a registered professional.",
  },
  {
    title: "Written agreements",
    body: "Scope, specifications, payment terms and dates are written down before work starts or an order is placed.",
  },
];

export default function AboutPage() {
  const frame = imageFor("frame");

  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        kicker={`About · ${business.legalName}`}
        title="A Mombasa company for building projects and the materials behind them."
        intro={
          <p>
            {business.legalName} provides {business.descriptor.toLowerCase()} from {business.city}. We work with homeowners,
            developers, contractors, businesses and institutions.
          </p>
        }
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-16">
          <section aria-labelledby="what">
            <SectionHead index="01" kicker="What we do" id="what" title="Three related lines of work." />
            <ul className="mt-8">
              {services.map((s) => (
                <li key={s.slug} className="index-row grid gap-2 py-5 sm:grid-cols-[5rem_1fr]">
                  <span className="font-mono text-sm text-ink-3">{s.ref}</span>
                  <div>
                    <Link href={`/services/${s.slug}`} className="text-xl font-bold tracking-tight underline decoration-line-strong underline-offset-4 hover:decoration-signal">
                      {s.name}
                    </Link>
                    <p className="mt-1 text-ink-2">{s.short}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-lg text-ink-2">
              The three lines support each other. A client can buy materials for their own builder, bring us in to carry out the
              works, or ask for technical support alongside their existing team.
            </p>
          </section>

          <section aria-labelledby="approach">
            <SectionHead index="02" kicker="How we work" id="approach" title="An honest way to run a project." />
            <ol className="mt-8">
              {approach.map((a, i) => (
                <li key={a.title} className="index-row grid grid-cols-[2.75rem_1fr] gap-4 py-6">
                  <span className="font-mono text-sm text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{a.title}</h3>
                    <p className="mt-1.5 text-ink-2">{a.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="documents">
            <SectionHead index="03" kicker="Company documents" id="documents" title="Check us before you commit." />
            {business.credentials.length ? (
              <dl className="title-block mt-8 font-mono text-sm">
                {business.credentials.map((c) => (
                  <div key={c.label} className="title-block-row grid gap-1 px-5 py-3 first:border-t-0 sm:grid-cols-[14rem_1fr]">
                    <dt className="text-xs tracking-wide text-ink-3 uppercase">{c.label}</dt>
                    <dd className="font-medium">{c.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <p className="mt-6 max-w-2xl text-lg text-ink-2">
              Before you sign a contract or place a large order with any company, ask for its registration documents and tax
              compliance certificate. You can also check a construction contractor&rsquo;s registration with the National
              Construction Authority. Ask us, and we&rsquo;ll send ours.
            </p>
          </section>
        </div>

        <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <Photo image={frame} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 30vw, 100vw" position="50% 35%" dimension="Illustrative photo" />
          <div className="border border-ink p-6">
            <p className="label">Start a conversation</p>
            <p className="mt-3 text-lg">Tell us about the project or the materials you need.</p>
            <QuoteAction className="mt-5 w-full" />
          </div>
        </div>
      </div>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
