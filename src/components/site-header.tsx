import Link from "next/link";
import { business } from "@/config/business";
import { primaryNav, quoteHref } from "@/content/nav";
import { telHref } from "@/lib/contact";
import { PhoneIcon } from "./icons";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-8">
        <Link href="/" className="-ml-1 p-1" aria-label={`${business.legalName}: home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem] font-medium">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="py-2 hover:underline hover:decoration-signal hover:decoration-2 hover:underline-offset-8"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden min-h-11 items-center gap-2 px-2 font-mono text-sm font-medium tracking-tight hover:text-signal-ink xl:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {business.phone.display}
          </a>
          <Link
            href={quoteHref}
            className="hidden min-h-11 items-center bg-navy px-4 text-sm font-semibold text-paper transition-colors hover:bg-navy-deep sm:inline-flex"
          >
            Request a quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
