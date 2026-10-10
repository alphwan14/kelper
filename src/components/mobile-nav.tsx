"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { business } from "@/config/business";
import { primaryNav, quoteHref } from "@/content/nav";
import { enquiry, telHref, whatsappHref } from "@/lib/contact";
import { ArrowIcon, ChatIcon, CloseIcon, MenuIcon, PhoneIcon } from "./icons";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [{ href: "/", label: "Home" }, ...primaryNav];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-ink px-3 text-sm font-semibold"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper md:top-[4.5rem]"
      >
        <nav aria-label="Main" className="px-4 pt-4 pb-10">
          <ul>
            {links.map((item, i) => (
              <li key={item.href} className="index-row">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-display text-[1.75rem] font-bold tracking-tight [font-stretch:87.5%]"
                >
                  <span className="label w-6">{String(i).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link
              href={quoteHref}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-navy px-5 font-semibold text-paper"
            >
              Request a quotation <ArrowIcon className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref(enquiry("I have an enquiry."))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink px-5 font-semibold"
            >
              <ChatIcon /> WhatsApp
              <span className="sr-only"> (opens WhatsApp)</span>
            </a>
            <a href={telHref} className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink px-5 font-semibold">
              <PhoneIcon /> Call {business.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
