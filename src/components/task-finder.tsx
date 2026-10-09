"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { enquiry, whatsappHref } from "@/lib/contact";
import { ArrowIcon, ChatIcon, CheckIcon } from "./icons";

export type TaskFinderItem = {
  id: string;
  label: string;
  answer: string;
  help: string[];
  bring: string[];
  whatsapp: string;
  services: { slug: string; name: string }[];
  guide?: { slug: string; title: string; count: number };
  tool?: { href: string; label: string };
};

export function TaskFinder({ items }: { items: TaskFinderItem[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const task = items[active];

  const focusTab = (i: number) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusTab(active + 1),
      ArrowRight: () => focusTab(active + 1),
      ArrowUp: () => focusTab(active - 1),
      ArrowLeft: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(items.length - 1),
    };
    const action = keys[e.key];
    if (action) {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      <div>
        <p className="font-display text-2xl font-bold tracking-tight text-ink-3 md:text-3xl" id={`${baseId}-lead`}>
          I need to…
        </p>
        <div
          role="tablist"
          aria-labelledby={`${baseId}-lead`}
          aria-orientation="vertical"
          className="mt-3 flex flex-wrap gap-2 lg:mt-4 lg:block lg:space-y-0"
        >
          {items.map((t, i) => {
            const selected = i === active;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${baseId}-tab-${t.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
                className={[
                  "group text-left transition-colors",
                  // phones: wrapping chips
                  "min-h-11 border px-3.5 py-2 text-[0.95rem] font-medium",
                  // desktop: an index of big lines
                  "lg:flex lg:w-full lg:items-baseline lg:gap-4 lg:border-0 lg:border-t lg:border-line lg:px-0 lg:py-3 lg:font-display lg:text-[1.9rem] lg:leading-tight lg:font-bold lg:tracking-tight",
                  selected
                    ? "border-ink bg-ink text-paper lg:bg-transparent lg:text-ink"
                    : "border-line-strong bg-paper text-ink hover:border-ink lg:text-ink/55 lg:hover:text-ink",
                ].join(" ")}
              >
                <span className="label hidden w-7 shrink-0 lg:inline">{String(i + 1).padStart(2, "0")}</span>
                <span className={selected ? "lg:marker" : ""}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${task.id}`}
        tabIndex={0}
        className="ticket self-start"
      >
        <div className="flex items-center justify-between gap-4 px-5 pt-5 md:px-7 md:pt-6">
          <span className="label">Job · {String(active + 1).padStart(2, "0")}</span>
          <span className="label">Kelper · Mombasa</span>
        </div>
        <div key={task.id} className="rise px-5 pt-4 pb-6 md:px-7">
          <p className="font-display text-2xl leading-tight font-bold tracking-tight md:text-[1.75rem]">{task.answer}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="label">We help with</p>
              <ul className="mt-2 space-y-1.5">
                {task.help.map((h) => (
                  <li key={h} className="flex gap-2">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-ocean" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label">Bring</p>
              <ul className="mt-2 space-y-1.5">
                {task.bring.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-ink" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {task.guide ? (
                <Link
                  href={`/prepare/${task.guide.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ocean underline underline-offset-4"
                >
                  Full checklist ({task.guide.count} items) <ArrowIcon className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="perforation" aria-hidden="true" />

        <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:flex-wrap sm:items-center md:px-7">
          <a
            href={whatsappHref(enquiry(task.whatsapp))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-5 font-semibold text-paper transition-colors hover:bg-ocean-deep"
          >
            <ChatIcon /> Ask about this on WhatsApp
            <span className="sr-only"> (opens WhatsApp)</span>
          </a>
          {task.tool ? (
            <Link
              href={task.tool.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink px-5 font-semibold hover:bg-ink hover:text-paper"
            >
              {task.tool.label} <ArrowIcon className="h-4 w-4" />
            </Link>
          ) : null}
          <p className="text-sm text-ink-3 sm:basis-full">
            Related:{" "}
            {task.services.map((s, i) => (
              <span key={s.slug}>
                {i > 0 ? " · " : ""}
                <Link href={`/services/${s.slug}`} className="underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                  {s.name}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
