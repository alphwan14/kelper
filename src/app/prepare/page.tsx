import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { guides } from "@/content/guides";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "What to bring: KRA, passport, HEF & job application checklists",
  description:
    "Checklists for KRA PIN, nil returns, passport applications, HEF/HELB funding, job applications and printing. Tick them off before you leave home.",
  path: "/prepare",
});

export default function PreparePage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "What to bring", href: "/prepare" },
        ]}
        kicker="Checklists"
        title={
          <>
            One missing document <span className="marker">wastes a trip.</span>
          </>
        }
        intro="Free checklists for the jobs people bring us most. Tick them off, print them, or send them to yourself on WhatsApp."
      />

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <ul className="grid gap-5 md:grid-cols-2">
          {guides.map((g, i) => (
            <li key={g.slug}>
              <Link href={`/prepare/${g.slug}`} className="ticket group flex h-full flex-col transition-transform hover:-translate-y-0.5">
                <div className="flex items-center justify-between px-5 pt-5 md:px-7">
                  <span className="label">No. {String(i + 1).padStart(2, "0")}</span>
                  <span className="label">Checked {g.checked}</span>
                </div>
                <div className="flex-1 px-5 pt-3 pb-6 md:px-7">
                  <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{g.title}</h2>
                  <p className="mt-2 text-ink-2">{g.summary}</p>
                </div>
                <div className="perforation" aria-hidden="true" />
                <span className="flex items-center justify-between px-5 py-4 font-semibold md:px-7">
                  {g.checklist.length}-item checklist
                  <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-sm text-ink-3">
          Requirements change. Each checklist links to the official source and shows when we last checked it. If the
          official portal says something different, the portal is right.
        </p>
      </div>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "What to bring", path: "/prepare" },
        ])}
      />
    </>
  );
}
