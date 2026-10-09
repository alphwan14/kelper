import Link from "next/link";
import { business } from "@/config/business";
import { serviceBySlug } from "@/content/services";
import { enquiry, telHref, whatsappHref } from "@/lib/contact";
import { Wordmark } from "./wordmark";

const serviceLinks = (slugs: string[]) =>
  slugs.flatMap((slug) => {
    const s = serviceBySlug(slug);
    return s ? [{ href: `/services/${s.slug}`, label: s.name }] : [];
  });

const footerGroups = [
  { title: "Print & documents", links: serviceLinks(["printing", "photocopying", "scanning", "binding-lamination", "typing"]) },
  {
    title: "Applications",
    links: serviceLinks(["cv-writing", "job-applications", "kra-services", "ecitizen", "student-funding"]),
  },
  {
    title: "More",
    links: [
      ...serviceLinks(["school-printing", "business-printing", "computer-internet"]),
      { href: "/services", label: "All services" },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/print", label: "Print job builder" },
      { href: "/prepare", label: "What to bring" },
      { href: "/contact", label: "Find us" },
    ],
  },
  {
    title: "About this site",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/credits", label: "Photo credits" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="no-print bg-ink pb-24 text-paper md:pb-0">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Wordmark inverse className="text-paper" />
            <p className="mt-5 max-w-sm text-paper/75">
              Printing, typing, CVs and online forms in {business.city}. Message first, come prepared, leave sorted.
            </p>

            <dl className="mt-8 space-y-4">
              <div>
                <dt className="label text-paper/55!">Call or WhatsApp</dt>
                <dd className="mt-1 font-display text-2xl font-bold tracking-tight">
                  <a href={telHref} className="hover:text-marker">
                    {business.phone.display}
                  </a>
                </dd>
                <dd className="mt-1">
                  <a
                    href={whatsappHref(enquiry("I have a question."))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-marker underline underline-offset-4"
                  >
                    Open WhatsApp chat
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-paper/55!">Where</dt>
                <dd className="mt-1 text-paper/85">
                  {business.streetAddress ? `${business.streetAddress}, ` : ""}
                  {business.city}, Kenya
                  {business.landmark ? <span className="block text-paper/65">{business.landmark}</span> : null}
                </dd>
              </div>
              {business.email ? (
                <div>
                  <dt className="label text-paper/55!">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${business.email}`} className="underline underline-offset-4">
                      {business.email}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="label text-paper/55!">{group.title}</p>
                <ul className="mt-3 space-y-2 text-[0.95rem]">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-paper/85 hover:text-marker">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-paper/15 pt-6 text-sm text-paper/60">
          <p className="max-w-3xl">
            {business.name} is an independent business. We are not a government office and are not affiliated with KRA,
            eCitizen, HEF/HELB, KUCCPS or the Department of Immigration. Official fees are paid to the government through
            its portals, and decisions on applications are made by the agency concerned.
          </p>
          <p className="mt-4">© {business.name}, {business.city}</p>
        </div>
      </div>
    </footer>
  );
}
