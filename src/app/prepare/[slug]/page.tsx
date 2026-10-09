import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppAction } from "@/components/actions";
import { Checklist } from "@/components/checklist";
import { GovNote } from "@/components/gov-note";
import { ArrowIcon, ExternalIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { guideBySlug, guides } from "@/content/guides";
import { serviceBySlug } from "@/content/services";
import { breadcrumbSchema, guideSchema } from "@/lib/schema";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/prepare/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  return pageMetadata({
    title: `${guide.title}: what to bring`,
    description: guide.summary,
    path: `/prepare/${guide.slug}`,
    type: "article",
  });
}

export default async function GuidePage({ params }: PageProps<"/prepare/[slug]">) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();
  const service = serviceBySlug(guide.service);
  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "What to bring", href: "/prepare" },
          { name: guide.short, href: `/prepare/${guide.slug}` },
        ]}
        kicker={`Checklist · checked ${guide.checked}`}
        title={guide.title}
        intro={<p>{guide.summary}</p>}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 md:px-8 md:py-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="space-y-10 lg:order-2">
          <Checklist storageKey={guide.slug} title={guide.title} items={guide.checklist} />
          {service ? (
            <div className="no-print">
              <p className="font-display text-2xl font-bold tracking-tight">Want us to do it with you?</p>
              <p className="mt-2 text-ink-2">Bring the list above. Message first and we&rsquo;ll confirm anything you&rsquo;re unsure about.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <WhatsAppAction message={service.whatsapp}>Ask on WhatsApp</WhatsAppAction>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink px-5 font-semibold hover:bg-ink hover:text-paper"
                >
                  {service.name} <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <article className="space-y-10 lg:order-1">
          <section aria-labelledby="context" className="prose-kelper text-lg leading-relaxed">
            <h2 id="context" className="sr-only">
              Background
            </h2>
            {guide.context.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>

          {guide.steps ? (
            <section aria-labelledby="steps">
              <h2 id="steps" className="text-2xl font-extrabold tracking-tight md:text-3xl">
                How it goes
              </h2>
              <ol className="mt-4">
                {guide.steps.map((s, i) => (
                  <li key={s} className="index-row grid grid-cols-[2.25rem_1fr] gap-2 py-3.5">
                    <span className="font-display text-xl font-extrabold text-ocean">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <section aria-labelledby="tips">
            <h2 id="tips" className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Tips from the counter
            </h2>
            <ul className="mt-4 space-y-3">
              {guide.tips.map((t) => (
                <li key={t} className="border-l-4 border-marker pl-4">
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {guide.government ? <GovNote /> : null}

          {guide.official.length || guide.sources.length ? (
            <section aria-labelledby="sources" className="border-t border-line pt-6 text-sm">
              <h2 id="sources" className="label">
                Official links & sources
              </h2>
              <ul className="mt-3 space-y-2">
                {[...guide.official.map((o) => ({ ...o, official: true })), ...guide.sources.map((s) => ({ ...s, official: false }))].map(
                  (l) => (
                    <li key={l.url + l.label}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 underline underline-offset-4">
                        <ExternalIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>
                          {l.official ? <strong>Official: </strong> : null}
                          {l.label}
                        </span>
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </section>
          ) : null}
        </article>
      </div>

      <nav aria-labelledby="more-guides" className="no-print border-t border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <p id="more-guides" className="label">
            More checklists
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((g) => (
              <li key={g.slug}>
                <Link href={`/prepare/${g.slug}`} className="inline-flex min-h-11 items-center border border-line-strong bg-paper px-4 font-medium hover:border-ink">
                  {g.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <JsonLd data={guideSchema(guide)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "What to bring", path: "/prepare" },
          { name: guide.title, path: `/prepare/${guide.slug}` },
        ])}
      />
    </>
  );
}
