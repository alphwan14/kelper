import Link from "next/link";
import { activeEmail, business } from "@/config/business";
import { quoteHref } from "@/content/nav";
import { services } from "@/content/services";
import { enquiry, telHref, whatsappHref } from "@/lib/contact";
import { Wordmark } from "./wordmark";

const footerGroups = [
  {
    title: "Services",
    links: [...services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })), { href: "/services", label: "All services" }],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Kelper" },
      { href: quoteHref, label: "Request a quotation" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "This site",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/credits", label: "Photo credits" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="no-print on-dark sheet-grid bg-navy-deep pb-20 text-paper md:pb-0">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.6fr]">
          <div>
            <Wordmark inverse />
            <p className="mt-5 max-w-sm text-steel-light">{business.descriptor}. Based in {business.city}, Kenya.</p>

            <dl className="mt-8 space-y-5">
              <div>
                <dt className="label text-steel!">Call or WhatsApp</dt>
                <dd className="mt-1 font-display text-2xl font-bold tracking-tight [font-stretch:87.5%]">
                  <a href={telHref} className="hover:text-signal">
                    {business.phone.display}
                  </a>
                </dd>
                <dd className="mt-1">
                  <a
                    href={whatsappHref(enquiry("I have an enquiry."))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-signal underline underline-offset-4"
                  >
                    Open a WhatsApp chat
                  </a>
                </dd>
              </div>
              {activeEmail ? (
                <div>
                  <dt className="label text-steel!">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${activeEmail}`} className="underline underline-offset-4 hover:text-signal">
                      {activeEmail}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="label text-steel!">Office</dt>
                <dd className="mt-1 text-steel-light">
                  {business.streetAddress ? `${business.streetAddress}, ` : ""}
                  {business.city}, Kenya
                  {business.postalAddress ? <span className="block">{business.postalAddress}</span> : null}
                </dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="label text-steel!">{group.title}</p>
                <ul className="mt-3 space-y-2.5 text-[0.95rem]">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-paper/85 hover:text-signal">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Title block: the sign-off strip of a drawing sheet */}
        <div className="mt-14 grid border border-steel/30 font-mono text-xs text-steel sm:grid-cols-[1.4fr_1fr_1fr]">
          <p className="border-b border-steel/30 px-4 py-3 sm:border-r sm:border-b-0">
            <span className="block text-[0.65rem] tracking-[0.12em] uppercase">Company</span>
            <span className="mt-1 block text-paper/85">© {business.legalName}</span>
          </p>
          <p className="border-b border-steel/30 px-4 py-3 sm:border-r sm:border-b-0">
            <span className="block text-[0.65rem] tracking-[0.12em] uppercase">Location</span>
            <span className="mt-1 block text-paper/85">
              {business.city}, {business.region}
            </span>
          </p>
          <p className="px-4 py-3">
            <span className="block text-[0.65rem] tracking-[0.12em] uppercase">Web</span>
            <span className="mt-1 block text-paper/85">kelper.co.ke</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
