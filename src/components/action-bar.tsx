import Link from "next/link";
import { quoteHref } from "@/content/nav";
import { telHref } from "@/lib/contact";
import { PhoneIcon } from "./icons";

/** Thumb-reach contact bar on phones only. One bar, two actions — nothing else sticks. */
export function ActionBar() {
  return (
    <div className="no-print on-dark fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_1.4fr] border-t border-navy-deep bg-navy text-paper md:hidden pb-[env(safe-area-inset-bottom)]">
      <a href={telHref} className="flex min-h-14 items-center justify-center gap-2 border-r border-paper/20 font-semibold">
        <PhoneIcon /> Call
      </a>
      <Link href={quoteHref} className="flex min-h-14 items-center justify-center gap-2 bg-signal font-semibold text-navy-deep">
        Request a quotation
      </Link>
    </div>
  );
}
