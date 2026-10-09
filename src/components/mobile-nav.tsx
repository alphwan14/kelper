"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { business } from "@/config/business";
import { primaryNav } from "@/content/nav";
import { enquiry, telHref, whatsappHref } from "@/lib/contact";
import { ChatIcon, CloseIcon, MenuIcon, PhoneIcon } from "./icons";

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
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper"
      >
        <nav aria-label="Main" className="px-4 pt-6 pb-10">
          <ul>
            {primaryNav.map((item, i) => (
              <li key={item.href} className="index-row">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-display text-3xl font-bold tracking-tight"
                >
                  <span className="label w-6">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a
              href={whatsappHref(enquiry("I have a question."))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-5 font-semibold text-paper"
            >
              <ChatIcon /> WhatsApp {business.name}
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
