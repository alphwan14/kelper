import type { Metadata } from "next";
import { CallAction, QuoteAction, WhatsAppAction } from "@/components/actions";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { activeEmail, business } from "@/config/business";
import { imageFor } from "@/content/images";
import { enquiry, telHref, whatsappHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Contact Kelper Investments Ltd, Mombasa",
  description: `Contact ${business.legalName} in ${business.city}. Call or WhatsApp ${business.phone.display} about construction, engineering services or building materials.`,
  path: "/contact",
});

export default function ContactPage() {
  const image = imageFor("coast");

  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        kicker={`Contact · ${business.city}`}
        title="Talk to us about your project."
        intro={<p>Call or WhatsApp for a first conversation. For a quotation, the request form collects everything we need in one message.</p>}
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="label">Call or WhatsApp</p>
          <a
            href={telHref}
            className="mt-2 block font-display text-[clamp(2.25rem,1.3rem+4vw,4.25rem)] leading-none font-extrabold tracking-[-0.02em] [font-stretch:87.5%] hover:text-signal-ink"
          >
            {business.phone.display}
          </a>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <QuoteAction />
            <WhatsAppAction message="I have an enquiry.">WhatsApp us</WhatsAppAction>
            <CallAction>Call now</CallAction>
          </div>

          <dl className="mt-14 divide-y divide-line border-y border-line">
            {activeEmail ? (
              <div className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
                <dt className="label pt-1">Email</dt>
                <dd>
                  <a href={`mailto:${activeEmail}`} className="text-lg underline underline-offset-4">
                    {activeEmail}
                  </a>
                </dd>
              </div>
            ) : null}
            <div className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
              <dt className="label pt-1">Office</dt>
              <dd>
                <p className="text-lg">
                  {business.streetAddress ? `${business.streetAddress}, ` : ""}
                  {business.city}, Kenya
                </p>
                {business.postalAddress ? <p className="text-ink-3">{business.postalAddress}</p> : null}
                {business.mapUrl ? (
                  <a href={business.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-signal-ink underline underline-offset-4">
                    Open in Google Maps
                  </a>
                ) : (
                  <p className="mt-1 text-ink-3">Meetings by appointment. Call or WhatsApp to arrange one.</p>
                )}
              </dd>
            </div>
            {business.hours ? (
              <div className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
                <dt className="label pt-1">Office hours</dt>
                <dd>
                  <ul className="space-y-1 text-lg">
                    {business.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-6 font-mono sm:max-w-xs">
                        <span>{h.days}</span>
                        <span>
                          {h.opens}–{h.closes}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
            <div className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
              <dt className="label pt-1">In your first message</dt>
              <dd className="text-ink-2">
                Say what the project or order is, where it is, and when you need it. Drawings, a BoQ or photos help us respond
                properly.{" "}
                <a
                  href={whatsappHref(enquiry("I'd like to send drawings / a BoQ for a quotation."))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline underline-offset-4"
                >
                  Send files on WhatsApp
                  <span className="sr-only"> (opens WhatsApp)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <Photo image={image} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" position="55% 50%" dimension={`${business.city} · Kenya`} />
      </div>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
