import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { CallAction, WhatsAppAction, buttonClass } from "@/components/actions";
import { ArrowDownIcon, ArrowIcon, PinIcon } from "@/components/icons";
import { Photo } from "@/components/photo";
import { SectionHead } from "@/components/section-head";
import { TaskFinder } from "@/components/task-finder";
import { business } from "@/config/business";
import { guides } from "@/content/guides";
import { imageFor } from "@/content/images";
import { categories, servicesInCategory } from "@/content/services";
import { enquiry, telHref, whatsappHref } from "@/lib/contact";
import { taskFinderItems } from "@/lib/task-items";

export const metadata: Metadata = pageMetadata({
  description:
    "Printing, photocopying, typing, CVs, and help with KRA, eCitizen and HEF applications in Mombasa. WhatsApp or call Kelper on +254 723 938401.",
  path: "/",
  socialTitle: "Kelper: paperwork, sorted. Mombasa",
});

const strip = ["Print", "Copy", "Scan", "Type", "CVs", "KRA", "eCitizen", "HEF & KUCCPS", "Bulk print"];

export default function HomePage() {
  const hero = imageFor("hero");
  const printing = imageFor("printing");
  const phone = imageFor("phone");
  const mombasa = imageFor("mombasa");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section aria-labelledby="hero-title" className="grain border-b border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-12 md:px-8 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pt-20 lg:pb-20">
          <div className="rise">
            <p className="label">Cybercafé & document desk · {business.city}</p>
            <h1 id="hero-title" className="mt-4 text-display font-extrabold">
              Paperwork, <span className="marker marker-draw">sorted.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">
              Printing, typing, CVs, and help with KRA, eCitizen and university applications. Tell us what you need on
              WhatsApp and we&rsquo;ll tell you what to bring.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppAction message="I have a question.">WhatsApp us</WhatsAppAction>
              <CallAction />
            </div>
            <a
              href="#get-done"
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-marker decoration-[3px] underline-offset-6"
            >
              Not sure what you need? Start here <ArrowDownIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="relative rise [animation-delay:120ms]">
            <Photo
              image={hero}
              aspect="aspect-[4/3] lg:aspect-[5/6]"
              sizes="(min-width: 1024px) 42vw, 100vw"
              position="30% 50%"
              preload
            />
            <p
              aria-hidden="true"
              className="stamp absolute -bottom-4 left-4 -rotate-6 bg-paper/85 text-lg md:-left-8 md:text-2xl"
            >
              Karibu
            </p>
          </div>
        </div>

        <div className="border-t border-line bg-paper-2/60">
          <ul className="mx-auto flex max-w-7xl flex-wrap gap-x-5 gap-y-1 px-4 py-3 font-mono text-[0.8rem] tracking-wide text-ink-2 uppercase md:px-8">
            {strip.map((s, i) => (
              <li key={s} className="whitespace-nowrap">
                {s}
                {i < strip.length - 1 ? (
                  <span aria-hidden="true" className="ml-5 text-ink/30">
                    /
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 01 Task finder ───────────────────────────────── */}
      <section aria-labelledby="get-done" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <SectionHead
          index="01"
          kicker="Start with the job"
          id="get-done"
          title="What do you need to get done?"
          intro="Pick one. You'll see what we help with, what to bring, and a ready-to-send WhatsApp message."
        />
        <div className="mt-10 md:mt-14">
          <TaskFinder items={taskFinderItems()} />
        </div>
      </section>

      {/* ── 02 Directory ─────────────────────────────────── */}
      <section aria-labelledby="counter" className="on-stone border-y border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <SectionHead
              index="02"
              kicker="Services"
              id="counter"
              title={
                <>
                  Everything at <span className="marker">the counter</span>
                </>
              }
              intro="Walk-in jobs and assisted online work. If you don't see it, ask."
            />
            <Photo
              image={printing}
              aspect="aspect-[16/9]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              position="40% 45%"
              className="hidden md:block"
            />
          </div>

          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, ci) => (
              <div key={cat.id}>
                <p className="label">{String.fromCharCode(65 + ci)}</p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight">{cat.name}</h3>
                <p className="mt-1 text-[0.95rem] text-ink-3">{cat.line}</p>
                <ul className="mt-4">
                  {servicesInCategory(cat.id).map((s) => (
                    <li key={s.slug} className="index-row">
                      <Link href={`/services/${s.slug}`} className="group flex items-start justify-between gap-4 py-3.5">
                        <span>
                          <span className="block font-semibold group-hover:underline group-hover:decoration-marker group-hover:decoration-[3px] group-hover:underline-offset-4">
                            {s.name}
                          </span>
                          <span className="mt-0.5 block text-[0.95rem] text-ink-3">{s.short}</span>
                        </span>
                        <ArrowIcon className="mt-1 h-5 w-5 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Print desk ────────────────────────────────── */}
      <section aria-labelledby="print-desk" className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHead
              index="03"
              kicker="Print job builder"
              id="print-desk"
              inverse
              title="Send the print job before you leave home."
              intro="Pages, copies, colour, paper, binding and collection time, in one clear WhatsApp message. Attach the file in the chat and we'll confirm."
            />
            <Link href="/print" className={buttonClass("inverse", "mt-8")}>
              Build a print job <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <figure className="relative mx-auto w-full max-w-md text-ink">
            <div className="ticket -rotate-1 font-mono text-sm">
              <div className="flex justify-between px-5 pt-5">
                <span className="label">Print job</span>
                <span className="label">Kelper · {business.city}</span>
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 px-5 pt-4 pb-5">
                {[
                  ["What", "School report"],
                  ["Pages", "All (14)"],
                  ["Copies", "3"],
                  ["Colour", "Black & white"],
                  ["Paper", "A4, double-sided"],
                  ["Finish", "Spiral binding"],
                  ["Collect", "Today by 16:00"],
                  ["File", "Attached in chat"],
                ].map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-ink-3 uppercase">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="perforation" aria-hidden="true" style={{ "--color-paper": "var(--color-ink)" } as CSSProperties} />
              <p className="px-5 py-4 text-ink-3">→ Opens WhatsApp to {business.phone.display}</p>
            </div>
            <p aria-hidden="true" className="stamp absolute -top-5 -right-2 rotate-6 bg-paper text-xs">
              Example
            </p>
            <figcaption className="sr-only">An example of the job ticket the print builder creates.</figcaption>
          </figure>
        </div>
      </section>

      {/* ── 04 Guides ────────────────────────────────────── */}
      <section aria-labelledby="prepare" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHead
            index="04"
            kicker="What to bring"
            id="prepare"
            title="Come prepared. Leave sorted."
            intro="Most wasted trips come down to one missing document. Tick off the list before you leave the house, or send it to yourself on WhatsApp."
          />
          <Link
            href="/prepare/nil-returns"
            className="group flex max-w-sm items-start gap-4 border-2 border-stamp p-4 text-stamp transition-colors hover:bg-stamp hover:text-paper"
          >
            <span className="label shrink-0 text-current! font-semibold">New</span>
            <span className="text-[0.95rem] font-semibold">
              Nil returns for 2026 are due by 31 January 2027, not June.{" "}
              <span className="underline underline-offset-4">What changed</span>
            </span>
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/prepare/${g.slug}`} className="ticket group flex h-full flex-col transition-transform hover:-translate-y-0.5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <span className="label">{g.checklist.length} items</span>
                  <span className="label">Checked {g.checked}</span>
                </div>
                <div className="flex-1 px-5 pt-3 pb-5">
                  <h3 className="text-xl font-bold tracking-tight group-hover:underline group-hover:decoration-marker group-hover:decoration-[3px] group-hover:underline-offset-4">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] text-ink-3">{g.summary}</p>
                </div>
                <div className="perforation" aria-hidden="true" />
                <span className="flex items-center justify-between px-5 py-3 text-sm font-semibold">
                  Open checklist <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 05 Straight talk ─────────────────────────────── */}
      <section aria-labelledby="straight" className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead index="05" kicker="Straight talk" id="straight" title="Your documents. Your passwords. Your call." />
            <Photo
              image={phone}
              aspect="aspect-square"
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="mt-10 hidden max-w-sm lg:block"
            />
          </div>
          <ol className="self-center">
            {[
              [
                "We're independent.",
                "Kelper is a private business, not a government office. We help you use KRA, eCitizen, HEF and other portals. The agency makes the decision.",
              ],
              [
                "Official fees go to the government.",
                "Government charges are paid through the official portal, and you get the official receipt. Anything you pay us is for our help, and we'll tell you what it is first.",
              ],
              [
                "You type your own passwords.",
                "We never need your iTax, eCitizen or email password, and we'll never ask for one on WhatsApp.",
              ],
              [
                "Only what's needed.",
                "Don't send ID numbers or PINs in a message. Bring them in person. Our WhatsApp templates never ask for them.",
              ],
            ].map(([title, body], i) => (
              <li key={title} className="index-row grid grid-cols-[2.5rem_1fr] gap-4 py-6 md:grid-cols-[4rem_1fr]">
                <span className="font-display text-3xl font-extrabold text-ocean md:text-4xl">{i + 1}</span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h3>
                  <p className="mt-1.5 text-ink-2">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 06 Find us ───────────────────────────────────── */}
      <section aria-labelledby="find-us" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <Photo
            image={mombasa}
            aspect="aspect-[4/3] md:aspect-[3/4]"
            sizes="(min-width: 768px) 40vw, 100vw"
            position="50% 40%"
          />
          <div>
            <SectionHead index="06" kicker="Find us" id="find-us" title={<>In {business.city}. On your phone.</>} />
            <a
              href={telHref}
              className="mt-8 block font-display text-[clamp(2rem,1.2rem+4vw,3.75rem)] leading-none font-extrabold tracking-[-0.03em] hover:text-ocean"
            >
              {business.phone.display}
            </a>
            <p className="mt-3 text-ink-2">Call, or WhatsApp the same number.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppAction message="please send me your location pin so I can find you.">
                Ask for directions
              </WhatsAppAction>
              <Link href="/contact" className={buttonClass("secondary")}>
                <PinIcon /> Visiting details
              </Link>
            </div>
            <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className="label">Location</dt>
                <dd className="mt-1">
                  {business.streetAddress ?? `${business.city}, Kenya`}
                  {business.mapUrl ? (
                    <a href={business.mapUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-ocean underline underline-offset-4">
                      Map
                    </a>
                  ) : (
                    <span className="block text-ink-3">Message us and we&rsquo;ll send a location pin.</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="label">Opening hours</dt>
                <dd className="mt-1">
                  {business.hours ? (
                    <ul>
                      {business.hours.map((h) => (
                        <li key={h.days}>
                          {h.days}: {h.opens}–{h.closes}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <a
                      href={whatsappHref(enquiry("what time are you open today?"))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      Ask what time we&rsquo;re open today
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
