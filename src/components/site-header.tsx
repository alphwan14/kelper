import Link from "next/link";
import { business } from "@/config/business";
import { primaryNav } from "@/content/nav";
import { telHref } from "@/lib/contact";
import { PhoneIcon } from "./icons";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="-ml-1 p-1" aria-label={`${business.name}: home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem] font-medium">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="py-2 hover:underline hover:decoration-marker hover:decoration-[3px] hover:underline-offset-6">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden items-center gap-2 font-mono text-sm font-medium tracking-tight sm:inline-flex sm:min-h-11 sm:px-2 hover:text-ocean"
          >
            <PhoneIcon className="h-4 w-4" />
            {business.phone.display}
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
