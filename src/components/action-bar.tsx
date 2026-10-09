import { enquiry, telHref, whatsappHref } from "@/lib/contact";
import { ChatIcon, PhoneIcon } from "./icons";

/** Thumb-reach contact bar on phones only. One bar, two actions — nothing else sticks. */
export function ActionBar() {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-ink/80 bg-ink text-paper md:hidden pb-[env(safe-area-inset-bottom)]">
      <a href={telHref} className="flex min-h-14 items-center justify-center gap-2 border-r border-paper/20 font-semibold">
        <PhoneIcon /> Call
      </a>
      <a
        href={whatsappHref(enquiry("I have a question."))}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center justify-center gap-2 bg-marker font-semibold text-ink"
      >
        <ChatIcon /> WhatsApp
      </a>
    </div>
  );
}
