import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CallAction, WhatsAppAction } from "@/components/actions";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { business } from "@/config/business";
import { imageFor } from "@/content/images";
import { enquiry, telHref, whatsappHref } from "@/lib/contact";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: `Find us: call or WhatsApp ${business.phone.display}`,
  description: `Contact ${business.name} in ${business.city}. Call or WhatsApp ${business.phone.display} for printing, typing, CVs and online application help.`,
  path: "/contact",
});

export default function ContactPage() {
  const image = imageFor("mombasa");

  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Find us", href: "/contact" },
        ]}
        kicker={`Contact · ${business.city}`}
        title="Message first. Come in ready."
        intro={<p>The quickest way to reach us is WhatsApp. Tell us the job and we&rsquo;ll reply with what to bring.</p>}
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="label">Call or WhatsApp</p>
          <a
            href={telHref}
            className="mt-2 block font-display text-[clamp(2.25rem,1.3rem+4.5vw,4.5rem)] leading-none font-extrabold tracking-[-0.03em] hover:text-ocean"
          >
            {business.phone.display}
          </a>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppAction message="I have a question.">WhatsApp us</WhatsAppAction>
            <CallAction>Call now</CallAction>
          </div>

          <dl className="mt-14 divide-y divide-line border-y border-line">
            <div className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
              <dt className="label pt-1">Location</dt>
              <dd>
                <p className="text-lg">
                  {business.streetAddress ? `${business.streetAddress}, ` : ""}
                  {business.city}, Kenya
                </p>
                {business.landmark ? <p className="text-ink-3">{business.landmark}</p> : null}
                {business.mapUrl ? (
                  <a href={business.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-ocean underline underline-offset-4">
                    Open in Google Maps
                  </a>
                ) : (
                  <a
                    href={whatsappHref(enquiry("please send me your location pin so I can find you."))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-semibold text-ocean underline underline-offset-4"
                  >
                    Ask for a location pin on WhatsApp
                  </a>
                )}
              </dd>
            </div>
            <div className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
              <dt className="label pt-1">Opening hours</dt>
              <dd>
                {business.hours ? (
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
                ) : (
                  <a
                    href={whatsappHref(enquiry("what time are you open today?"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ocean underline underline-offset-4"
                  >
                    Ask what time we&rsquo;re open today
                  </a>
                )}
              </dd>
            </div>
            {business.email ? (
              <div className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
                <dt className="label pt-1">Email</dt>
                <dd>
                  <a href={`mailto:${business.email}`} className="text-lg underline underline-offset-4">
                    {business.email}
                  </a>
                </dd>
              </div>
            ) : null}
            <div className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
              <dt className="label pt-1">Before you message</dt>
              <dd className="text-ink-2">
                Say what the job is and when you need it. Please don&rsquo;t send ID numbers, KRA PINs or passwords on
                WhatsApp. Bring them in person.
              </dd>
            </div>
          </dl>
        </div>

        <Photo image={image} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 40vw, 100vw" position="50% 35%" />
      </div>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Find us", path: "/contact" },
        ])}
      />
    </>
  );
}
