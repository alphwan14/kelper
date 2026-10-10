import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { QuoteBuilder } from "@/components/quote-builder";
import { business } from "@/config/business";
import { telHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Request a Quotation: Construction, Engineering & Materials",
  description: `Request a quotation from ${business.legalName} in ${business.city}. Describe your project or list the materials you need, with specifications, quantities and delivery location.`,
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Request a quotation", href: "/quote" },
        ]}
        kicker="Request for quotation"
        title="Request a quotation."
        intro={
          <p>
            Fill in what you know. The preview shows the request as we&rsquo;ll receive it. Send it on WhatsApp and attach any
            drawings, BoQ or photos in the chat. Prefer to talk it through? Call{" "}
            <a href={telHref} className="font-semibold whitespace-nowrap text-ink underline underline-offset-4">
              {business.phone.display}
            </a>
            .
          </p>
        }
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <QuoteBuilder />
      </div>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Request a quotation", path: "/quote" },
        ])}
      />
    </>
  );
}
