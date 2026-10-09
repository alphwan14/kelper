"use client";

import { useMemo, useSyncExternalStore } from "react";
import { whatsappShareHref } from "@/lib/contact";
import { ChatIcon, CheckIcon, PrinterIcon } from "./icons";

type Item = { id: string; label: string; note?: string };

/* Tiny localStorage store: ticks survive a reload on this device only. */
const EVENT = "kelper-checklist";
const memory = new Map<string, string>();

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    if (value === null) memory.delete(key);
    else memory.set(key, value);
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function Checklist({ storageKey, title, items }: { storageKey: string; title: string; items: Item[] }) {
  const key = `kelper:checklist:${storageKey}`;
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );
  const done = useMemo(() => {
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : []);
    } catch {
      return new Set<string>();
    }
  }, [raw]);

  const toggle = (id: string) => {
    const next = new Set(done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    write(key, next.size ? JSON.stringify([...next]) : null);
  };

  const count = items.filter((i) => done.has(i.id)).length;
  const shareText = [
    `${title}: what to bring`,
    "",
    ...items.map((i) => `${done.has(i.id) ? "[x]" : "[ ]"} ${i.label}`),
    "",
    "From kelper.co.ke",
  ].join("\n");

  return (
    <div className="ticket">
      <div className="flex items-center justify-between gap-4 px-5 pt-5 md:px-7">
        <h2 className="label text-ink!">Bring with you</h2>
        <p className="label" aria-live="polite">
          {count} of {items.length} ready
        </p>
      </div>
      <div className="mx-5 mt-3 h-1.5 bg-paper-2 md:mx-7" aria-hidden="true">
        <div className="h-full bg-ocean transition-[width] duration-300" style={{ width: `${(count / items.length) * 100}%` }} />
      </div>

      <ul className="px-5 pt-3 pb-5 md:px-7">
        {items.map((item) => {
          const checked = done.has(item.id);
          return (
            <li key={item.id} className="border-b border-line last:border-b-0">
              <label className="flex min-h-12 cursor-pointer gap-3.5 py-3.5">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(item.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ocean ${
                    checked ? "border-ocean bg-ocean text-paper" : "border-ink/60 bg-paper"
                  }`}
                >
                  {checked ? <CheckIcon className="h-4 w-4" strokeWidth={3} /> : null}
                </span>
                <span>
                  <span className={`font-medium ${checked ? "text-ink-3 line-through decoration-ink/40" : ""}`}>{item.label}</span>
                  {item.note ? <span className="mt-0.5 block text-sm text-ink-3">{item.note}</span> : null}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="perforation no-print" aria-hidden="true" />
      <div className="no-print flex flex-col gap-2 px-5 py-4 sm:flex-row sm:flex-wrap md:px-7">
        <a
          href={whatsappShareHref(shareText)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink px-4 text-sm font-semibold hover:bg-ink hover:text-paper"
        >
          <ChatIcon className="h-4 w-4" /> Send list to myself
          <span className="sr-only"> (opens WhatsApp)</span>
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink px-4 text-sm font-semibold hover:bg-ink hover:text-paper"
        >
          <PrinterIcon className="h-4 w-4" /> Print
        </button>
        {count > 0 ? (
          <button type="button" onClick={() => write(key, null)} className="min-h-11 px-2 text-sm text-ink-3 underline underline-offset-4 sm:ml-auto">
            Clear ticks
          </button>
        ) : null}
      </div>
    </div>
  );
}
