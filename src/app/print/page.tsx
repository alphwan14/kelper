import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { PrintBuilder } from "@/components/print-builder";
import { business } from "@/config/business";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Send a print job on WhatsApp",
  description: `Tell ${business.name} exactly what to print (pages, copies, colour, paper, binding, collection time) in one WhatsApp message. Printing in ${business.city}.`,
  path: "/print",
});

export default function PrintPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Send a print job", href: "/print" },
        ]}
        kicker="Print job builder"
        title={
          <>
            Print job, <span className="marker">one message.</span>
          </>
        }
        intro={
          <p>
            Fill this in, press send, and WhatsApp opens with your job written out. Attach the file in the same chat and
            we&rsquo;ll reply with the price and ready time. Not sure about your file?{" "}
            <Link href="/prepare/printing-files" className="underline underline-offset-4">
              Get it print-ready
            </Link>
            .
          </p>
        }
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <PrintBuilder />
      </div>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Send a print job", path: "/print" },
        ])}
      />
    </>
  );
}
