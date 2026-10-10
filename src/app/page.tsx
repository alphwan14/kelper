import type { Metadata } from "next";
import Link from "next/link";
import { QuoteAction, WhatsAppAction } from "@/components/actions";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { Photo } from "@/components/photo";
import { SectionHead } from "@/components/section-head";
import { business } from "@/config/business";
import { imageFor } from "@/content/images";
import { quoteHref } from "@/content/nav";
import { services } from "@/content/services";
import { telHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  description: `${business.legalName} is a Mombasa company offering construction, engineering services and building materials supply. Send your drawings, BoQ or materials list for a quotation.`,
  path: "/",
});

const clients = [
  { title: "Homeowners and developers", body: "New houses, rental blocks, extensions and renovations." },
  { title: "Contractors and fundis", body: "Materials for a site, quoted as one list and delivered to it." },
  { title: "Businesses", body: "Premises repairs, fit-outs, and supplies bought on purchase orders." },
  { title: "Schools and institutions", body: "Planned works and supplies procured by RFQ or tender." },
];

const steps = [
  { title: "Send the details", body: "Drawings, a bill of quantities, a materials list or photos, plus the location and your dates." },
  { title: "We review and ask", body: "We come back with any questions, and arrange a site visit where the work needs one." },
  { title: "You get an itemised quotation", body: "Items, specifications, quantities, rates and exclusions written out, so you can compare like for like." },
  { title: "Agree and schedule", body: "Scope, payment terms and the programme or delivery dates are agreed in writing before work starts." },
];

const principles = [
  {
    title: "We quote what you ask for.",
    body: "Your specification, your quantities. If we suggest an alternative product or method, the quotation says so plainly.",
  },
  {
    title: "We say when a job is outside our scope.",
    body: "If work needs a licence class, a registered engineer or an approval we can't provide, you'll hear it before you get a price.",
  },
  {
    title: "No published prices.",
    body: "Material prices in Kenya move week to week. Every order is quoted on its own, with how long the price holds.",
  },
  {
    title: "Check us like any supplier.",
    body: `Ask for our company documents before you sign or place an order. ${business.legalName} is a registered limited company.`,
  },
];

export default function HomePage() {
  const hero = imageFor("hero");
  const coast = imageFor("coast");
  const plans = imageFor("plans");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section aria-labelledby="hero-title" className="sheet-grid-light border-b border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-12 md:px-8 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 lg:pt-20 lg:pb-20">
          <div className="rise">
            <p className="label flex items-center gap-3">
              <span className="datum" aria-hidden="true" />
              {business.legalName} · {business.city}
            </p>
            <h1 id="hero-title" className="mt-5 text-display font-extrabold">
              Construction, engineering support and materials, <span className="text-signal-ink">quoted clearly.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">
              {business.legalName} provides {business.descriptor.toLowerCase()} for homeowners, businesses and
              institutions in {business.city}. Send your drawings, bill of quantities or
              materials list, and get an itemised quotation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteAction />
              <WhatsAppAction message="I have an enquiry.">WhatsApp us</WhatsAppAction>
            </div>
          </div>

          <div className="rise [animation-delay:120ms]">
            <Photo
              image={hero}
              aspect="aspect-[4/3] lg:aspect-[6/5]"
              sizes="(min-width: 1024px) 45vw, 100vw"
              position="45% 40%"
              preload
              dimension="Build · Engineer · Supply"
            />
          </div>
        </div>

        {/* Service index: the three lines at a glance */}
        <div className="border-t border-line bg-paper">
          <ul className="mx-auto grid max-w-7xl md:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-line last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0">
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col gap-2 px-4 py-6 hover:bg-paper-2 md:px-8 md:py-8">
                  <span className="label">{s.ref}</span>
                  <span className="flex items-center justify-between gap-4 font-display text-2xl font-bold tracking-tight [font-stretch:87.5%]">
                    {s.name}
                    <ArrowIcon className="h-5 w-5 shrink-0 text-signal-ink transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[0.95rem] text-ink-3">{s.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 01 Services ──────────────────────────────────── */}
      <section aria-labelledby="services" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <SectionHead
          index="01"
          kicker="Services"
          id="services"
          title="Three lines of work, one point of contact."
          intro="Use one service or combine them. For example, materials supplied for works we carry out, or technical support alongside your own contractor."
        />
        <ol className="mt-12 md:mt-16">
          {services.map((s) => {
            const img = imageFor(s.image);
            return (
              <li key={s.slug} className="index-row grid gap-6 py-8 md:grid-cols-[5rem_1fr_16rem] md:gap-10 md:py-10 lg:grid-cols-[6rem_1fr_20rem]">
                <p className="font-mono text-sm text-ink-3">{s.ref}</p>
                <div>
                  <h3 className="text-3xl font-extrabold tracking-tight md:text-4xl">{s.name}</h3>
                  <p className="mt-3 max-w-xl text-lg text-ink-2">{s.intro}</p>
                  <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {s.scope.map((g) => (
                      <li key={g.title} className="flex items-start gap-2.5 text-[0.95rem]">
                        <span className="datum mt-1.5" aria-hidden="true" />
                        {g.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${s.slug}`}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-signal decoration-2 underline-offset-6"
                  >
                    {s.name}: scope and what to send <ArrowIcon className="h-4 w-4" />
                  </Link>
                </div>
                <Photo
                  image={img}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, 100vw"
                  position={s.imagePosition}
                />
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── 02 Clients ───────────────────────────────────── */}
      <section aria-labelledby="clients" className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHead index="02" kicker="Who we work with" id="clients" title="Built around how projects actually buy." />
          <ul className="mt-12 grid border-t border-l border-line-strong sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((c, i) => (
              <li key={c.title} className="border-r border-b border-line-strong bg-paper p-6 md:p-7">
                <p className="label">{String.fromCharCode(65 + i)}</p>
                <h3 className="mt-3 text-xl font-bold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-ink-2">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 03 Quotation process ─────────────────────────── */}
      <section aria-labelledby="process" className="on-dark sheet-grid bg-navy text-paper">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead
              index="03"
              kicker="How a quotation works"
              id="process"
              inverse
              title="From your drawings to a price you can compare."
            />
            <ol className="mt-10">
              {steps.map((s, i) => (
                <li key={s.title} className="index-row grid grid-cols-[2.75rem_1fr] gap-4 py-5">
                  <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                    <p className="mt-1 text-steel-light">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:pt-24">
            <div className="border border-steel/40 bg-navy-deep/60 p-6 md:p-8">
              <p className="label text-steel!">Checklist · send with your enquiry</p>
              <ul className="mt-5 space-y-3">
                {[
                  "Location of the site or delivery point",
                  "Drawings, BoQ, materials list or photos",
                  "Specifications or grades, where you know them",
                  "Quantities, or approximate sizes",
                  "When you need work to start or materials on site",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <QuoteAction variant="signal">Start a quotation request</QuoteAction>
              </div>
            </div>
            <Photo
              image={plans}
              aspect="aspect-[16/9]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              position="50% 45%"
              className="mt-8 hidden lg:block"
            />
          </div>
        </div>
      </section>

      {/* ── 04 Principles ────────────────────────────────── */}
      <section aria-labelledby="principles" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead index="04" kicker="Working with us" id="principles" title="Straightforward to deal with." />
          <ol>
            {principles.map((p, i) => (
              <li key={p.title} className="index-row grid grid-cols-[2.75rem_1fr] gap-4 py-6 md:grid-cols-[4rem_1fr]">
                <span className="font-mono text-sm text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight md:text-2xl">{p.title}</h3>
                  <p className="mt-1.5 text-ink-2">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 05 Contact ───────────────────────────────────── */}
      <section aria-labelledby="based" className="border-t border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-[1fr_1fr] md:items-center md:px-8 md:py-24">
          <Photo
            image={coast}
            aspect="aspect-[4/3]"
            sizes="(min-width: 768px) 45vw, 100vw"
            position="50% 50%"
            dimension={`${business.city} · ${business.region}`}
          />
          <div>
            <SectionHead index="05" kicker="Contact" id="based" title={<>Based in {business.city}.</>} />
            <p className="mt-4 max-w-md text-lg text-ink-2">
              Call or WhatsApp to discuss a project, or send a structured request and we&rsquo;ll reply with questions or a
              quotation.
            </p>
            <a
              href={telHref}
              className="mt-8 block font-display text-[clamp(2rem,1.2rem+3.5vw,3.5rem)] leading-none font-extrabold tracking-[-0.02em] [font-stretch:87.5%] hover:text-signal-ink"
            >
              {business.phone.display}
            </a>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteAction />
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink px-5 text-[0.95rem] font-semibold hover:bg-ink hover:text-paper">
                Contact details
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-3">
              Prefer a form?{" "}
              <Link href={quoteHref} className="underline underline-offset-4">
                The quotation request
              </Link>{" "}
              builds a structured message you can send by WhatsApp or copy into an email.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
