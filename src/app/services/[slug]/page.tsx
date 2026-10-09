import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallAction, WhatsAppAction } from "@/components/actions";
import { GovNote } from "@/components/gov-note";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { business } from "@/config/business";
import { guideBySlug } from "@/content/guides";
import { imageFor } from "@/content/images";
import { categories, serviceBySlug, services, servicesInCategory } from "@/content/services";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: `${service.short} ${business.name}, ${business.city}. Call or WhatsApp ${business.phone.display}.`,
    path: `/services/${service.slug}`,
    socialTitle: `${service.name} · ${business.name} ${business.city}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const category = categories.find((c) => c.id === service.category);
  const guide = service.guide ? guideBySlug(service.guide) : undefined;
  const related = servicesInCategory(service.category).filter((s) => s.slug !== service.slug);
  const image = service.image ? imageFor(service.image) : undefined;

  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
        kicker={`${category?.name ?? "Service"} · ${business.city}`}
        title={service.name}
        intro={<p>{service.intro}</p>}
      >
        <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsAppAction message={service.whatsapp}>Ask on WhatsApp</WhatsAppAction>
          <CallAction />
        </div>
      </PageIntro>

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-14">
          <section aria-labelledby="includes">
            <h2 id="includes" className="text-3xl font-extrabold tracking-tight">
              What we can do
            </h2>
            <ul className="mt-5">
              {service.includes.map((item) => (
                <li key={item} className="index-row flex gap-3 py-3.5 text-lg">
                  <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-ocean" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="bring">
            <h2 id="bring" className="text-3xl font-extrabold tracking-tight">
              What to bring
            </h2>
            <ol className="mt-5 space-y-3">
              {service.bring.map((item, i) => (
                <li key={item} className="grid grid-cols-[2rem_1fr] gap-2 text-lg">
                  <span className="font-mono text-sm leading-7 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
            {guide ? (
              <Link
                href={`/prepare/${guide.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-ocean underline underline-offset-4"
              >
                Full checklist: {guide.title} <ArrowIcon className="h-4 w-4" />
              </Link>
            ) : null}
          </section>

          <section aria-labelledby="know" className="space-y-4">
            <h2 id="know" className="text-3xl font-extrabold tracking-tight">
              Good to know
            </h2>
            <ul className="space-y-3">
              {service.goodToKnow.map((item) => (
                <li key={item} className="border-l-4 border-marker pl-4 text-lg">
                  {item}
                </li>
              ))}
            </ul>
            {service.government ? <GovNote /> : null}
          </section>
        </div>

        <aside className="space-y-10 lg:pt-2">
          {image ? (
            <Photo image={image} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 32vw, 100vw" />
          ) : null}

          <div className="ticket no-print">
            <div className="px-5 pt-5">
              <p className="label">How to start</p>
            </div>
            <ol className="space-y-3 px-5 pt-3 pb-5">
              <li>
                <span className="font-semibold">1. Message or call.</span> Tell us what you need. We&rsquo;ll tell you
                what it costs and what to bring.
              </li>
              <li>
                <span className="font-semibold">2. Send the file or come in.</span> Bring your originals and your phone.
              </li>
              <li>
                <span className="font-semibold">3. Collect.</span> Check it before you leave.
              </li>
            </ol>
            <div className="perforation" aria-hidden="true" />
            <div className="flex flex-col gap-2 p-5">
              <WhatsAppAction message={service.whatsapp}>WhatsApp {business.name}</WhatsAppAction>
              <CallAction />
            </div>
          </div>

          {related.length ? (
            <nav aria-labelledby="related">
              <p id="related" className="label">
                Also in {category?.name}
              </p>
              <ul className="mt-3">
                {related.map((s) => (
                  <li key={s.slug} className="index-row">
                    <Link href={`/services/${s.slug}`} className="group flex items-center justify-between gap-3 py-3 font-semibold">
                      {s.name}
                      <ArrowIcon className="h-4 w-4 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </aside>
      </div>

      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
    </>
  );
}
