import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteAction, WhatsAppAction } from "@/components/actions";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { business } from "@/config/business";
import { imageFor } from "@/content/images";
import { serviceBySlug, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
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
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const image = imageFor(service.image);
  const others = services.filter((s) => s.slug !== service.slug);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.name, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <PageIntro crumbs={crumbs} kicker={`${service.ref} · ${service.name} · ${business.city}`} title={service.headline} intro={<p>{service.intro}</p>}>
        <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row">
          <QuoteAction type={service.slug} />
          <WhatsAppAction message={service.whatsapp}>Ask on WhatsApp</WhatsAppAction>
        </div>
      </PageIntro>

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-16">
          <section aria-labelledby="for-who">
            <h2 id="for-who" className="text-3xl font-extrabold tracking-tight">
              Who it&rsquo;s for
            </h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {service.forWho.map((f) => (
                <li key={f.title} className="border-t-2 border-navy pt-4">
                  <h3 className="text-lg font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-ink-2">{f.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="scope">
            <h2 id="scope" className="text-3xl font-extrabold tracking-tight">
              Scope we quote for
            </h2>
            <p className="mt-3 max-w-2xl text-ink-2">
              If your project needs something not listed, ask. We&rsquo;ll tell you whether it&rsquo;s within our scope before we
              quote.
            </p>
            <div className="mt-8 space-y-8">
              {service.scope.map((group, gi) => (
                <div key={group.title} className="border border-line-strong bg-paper">
                  <div className="flex items-center justify-between gap-4 border-b border-line-strong bg-paper-2 px-5 py-3">
                    <h3 className="font-display text-lg font-bold tracking-tight [font-stretch:87.5%]">{group.title}</h3>
                    <span className="label">
                      {service.ref}.{gi + 1}
                    </span>
                  </div>
                  <ul className="px-5">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-line py-3 last:border-b-0">
                        <span className="datum mt-2" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="send">
            <h2 id="send" className="text-3xl font-extrabold tracking-tight">
              What to include in your enquiry
            </h2>
            <p className="mt-3 max-w-2xl text-ink-2">The more of this you send, the faster and more accurate the quotation.</p>
            <ul className="mt-6">
              {service.enquiry.map((item) => (
                <li key={item} className="index-row flex gap-3 py-3.5 text-lg">
                  <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-signal-ink" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="no-print mt-8">
              <QuoteAction type={service.slug}>Request a {service.name.toLowerCase()} quotation</QuoteAction>
            </div>
          </section>

          <aside className="border-l-4 border-signal bg-paper-2 px-5 py-4">
            <p className="font-semibold">{service.note.title}</p>
            <p className="mt-1.5 text-ink-2">{service.note.body}</p>
          </aside>
        </div>

        <div className="space-y-10 lg:sticky lg:top-24 lg:self-start">
          <Photo
            image={image}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1024px) 30vw, 100vw"
            position={service.imagePosition}
            dimension="Illustrative photo"
          />
          <nav aria-labelledby="other-services" className="no-print">
            <p id="other-services" className="label">
              Other services
            </p>
            <ul className="mt-3">
              {others.map((o) => (
                <li key={o.slug} className="index-row">
                  <Link href={`/services/${o.slug}`} className="group flex items-start justify-between gap-4 py-4">
                    <span>
                      <span className="block font-semibold group-hover:underline group-hover:decoration-signal group-hover:decoration-2 group-hover:underline-offset-4">
                        {o.name}
                      </span>
                      <span className="mt-0.5 block text-[0.95rem] text-ink-3">{o.short}</span>
                    </span>
                    <ArrowIcon className="mt-1 h-5 w-5 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
    </>
  );
}
