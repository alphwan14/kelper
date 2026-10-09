"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { enquiry, whatsappHref } from "@/lib/contact";
import { ChatIcon, CheckIcon, ChevronIcon, CopyIcon } from "./icons";

type Choice<T extends string> = { value: T; label: string; hint?: string };

const WHAT = ["Document", "School work", "CV / application", "Photos", "Business materials", "Other"] as const;
type What = (typeof WHAT)[number];

type Colour = "bw" | "colour" | "mixed";
type Size = "A4" | "A5" | "A3" | "other";
type Sides = "single" | "double";
type Finish = "none" | "staple" | "spiral" | "laminate";
type FileVia = "whatsapp" | "bring" | "sent";
type When = "asap" | "today" | "later";
type PageScope = "all" | "some";

type Job = {
  what: What;
  pageScope: PageScope;
  pageRange: string;
  pageCount: string;
  copies: string;
  colour: Colour;
  size: Size;
  sides: Sides;
  finish: Finish;
  fileVia: FileVia;
  when: When;
  time: string;
  date: string;
  name: string;
  notes: string;
};

const initialJob: Job = {
  what: "Document",
  pageScope: "all",
  pageRange: "",
  pageCount: "",
  copies: "1",
  colour: "bw",
  size: "A4",
  sides: "single",
  finish: "none",
  fileVia: "whatsapp",
  when: "asap",
  time: "",
  date: "",
  name: "",
  notes: "",
};

const colourChoices: Choice<Colour>[] = [
  { value: "bw", label: "Black & white" },
  { value: "colour", label: "Colour" },
  { value: "mixed", label: "Mixed", hint: "Say which pages in notes" },
];
const sizeChoices: Choice<Size>[] = [
  { value: "A4", label: "A4" },
  { value: "A5", label: "A5" },
  { value: "A3", label: "A3" },
  { value: "other", label: "Other" },
];
const sideChoices: Choice<Sides>[] = [
  { value: "single", label: "Single-sided" },
  { value: "double", label: "Double-sided" },
];
const finishChoices: Choice<Finish>[] = [
  { value: "none", label: "Loose" },
  { value: "staple", label: "Stapled" },
  { value: "spiral", label: "Spiral bound" },
  { value: "laminate", label: "Laminated" },
];
const fileChoices: Choice<FileVia>[] = [
  { value: "whatsapp", label: "I'll attach it in WhatsApp" },
  { value: "bring", label: "I'll bring it (phone / flash)" },
  { value: "sent", label: "Already sent it" },
];
const whenChoices: Choice<When>[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "today", label: "Today, by a time" },
  { value: "later", label: "Another day" },
];

const labelOf = <T extends string>(choices: Choice<T>[], v: T) => choices.find((c) => c.value === v)?.label ?? v;

type Errors = Partial<Record<"copies" | "pageCount" | "pageRange" | "time" | "date", string>>;

const isWholeNumber = (s: string) => /^\d+$/.test(s.trim());

function validate(job: Job, today: string): Errors {
  const errors: Errors = {};
  const copies = Number(job.copies);
  if (!isWholeNumber(job.copies) || copies < 1) errors.copies = "Enter how many copies (1 or more).";
  else if (copies > 5000) errors.copies = "For more than 5,000 copies, message us directly for a quote.";
  if (job.pageCount.trim() && (!isWholeNumber(job.pageCount) || Number(job.pageCount) < 1))
    errors.pageCount = "Use a whole number, or leave it blank.";
  if (job.pageScope === "some" && !job.pageRange.trim()) errors.pageRange = "Which pages? e.g. 1–5, 8";
  if (job.when === "today" && !job.time) errors.time = "Pick a time.";
  if (job.when === "later") {
    if (!job.date) errors.date = "Pick a date.";
    else if (job.date < today) errors.date = "That date has passed.";
  }
  return errors;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" });
}

function summaryRows(job: Job): [string, string][] {
  const pages =
    job.pageScope === "all"
      ? `All${job.pageCount.trim() ? ` (${job.pageCount.trim()} pages)` : ""}`
      : `Pages ${job.pageRange.trim() || "…"}`;
  const collect =
    job.when === "asap"
      ? "As soon as possible"
      : job.when === "today"
        ? `Today by ${job.time || "…"}`
        : job.date
          ? formatDate(job.date)
          : "Another day (…)";

  const rows: [string, string][] = [
    ["What", job.what],
    ["Pages", pages],
    ["Copies", job.copies.trim() || "…"],
    ["Colour", labelOf(colourChoices, job.colour)],
    ["Paper", `${labelOf(sizeChoices, job.size)}, ${labelOf(sideChoices, job.sides).toLowerCase()}`],
    ["Finish", labelOf(finishChoices, job.finish)],
    ["Collect", collect],
    ["File", labelOf(fileChoices, job.fileVia)],
  ];
  if (job.name.trim()) rows.push(["Name", job.name.trim()]);
  if (job.notes.trim()) rows.push(["Notes", job.notes.trim()]);
  return rows;
}

function buildMessage(job: Job): string {
  const lines = summaryRows(job).map(([k, v]) => `${k}: ${v}`);
  return enquiry(
    ["I'd like to send a print job.", "", "PRINT JOB", ...lines, "", "Please confirm the price and when it will be ready."].join("\n"),
  );
}

function localToday() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* ─── UI primitives ────────────────────────────────────────── */

function Segmented<T extends string>({
  legend,
  name,
  value,
  choices,
  onChange,
  columns = "grid-cols-2 sm:grid-cols-4",
}: {
  legend: string;
  name: string;
  value: T;
  choices: Choice<T>[];
  onChange: (v: T) => void;
  columns?: string;
}) {
  return (
    <fieldset>
      <legend className="label mb-2">{legend}</legend>
      <div className={`grid gap-2 ${columns}`}>
        {choices.map((c) => (
          <label
            key={c.value}
            className="relative flex min-h-12 cursor-pointer flex-col justify-center border border-line-strong bg-paper px-3 py-2 text-[0.95rem] font-medium transition-colors hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-ocean"
          >
            <input
              type="radio"
              name={name}
              value={c.value}
              checked={value === c.value}
              onChange={() => onChange(c.value)}
              className="sr-only"
            />
            <span>{c.label}</span>
            {c.hint ? <span className="text-xs font-normal opacity-70">{c.hint}</span> : null}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label mb-2 block">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-sm text-ink-3">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm font-semibold text-stamp">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass = (invalid?: boolean) =>
  `block w-full min-h-12 border bg-paper px-3 text-base outline-none focus-visible:border-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ocean ${
    invalid ? "border-stamp" : "border-line-strong"
  }`;

/* ─── Builder ──────────────────────────────────────────────── */

export function PrintBuilder() {
  const [job, setJob] = useState<Job>(initialJob);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "copied" | "copy-failed">("idle");
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const formId = `${id}-form`;

  const set = <K extends keyof Job>(key: K, value: Job[K]) => {
    setJob((j) => ({ ...j, [key]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const message = buildMessage(job);
  const href = whatsappHref(message);
  const rows = summaryRows(job);
  // Only validated after the first send attempt (client-side, so Date is safe here).
  const visibleErrors: Errors = showErrors ? validate(job, localToday()) : {};
  const errorList = Object.values(visibleErrors);

  const check = () => {
    const found = validate(job, localToday());
    setShowErrors(true);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return false;
    }
    return true;
  };

  const onCopy = async () => {
    if (!check()) return;
    try {
      await navigator.clipboard.writeText(message);
      setStatus("copied");
    } catch {
      setStatus("copy-failed");
    }
  };

  const fid = (name: string) => `${id}-${name}`;
  const describedBy = (name: keyof Errors, hint = false) =>
    visibleErrors[name] ? `${fid(name)}-error` : hint ? `${fid(name)}-hint` : undefined;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
      <form
        id={formId}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (check()) {
            window.open(href, "_blank", "noopener,noreferrer");
            setStatus("sent");
          }
        }}
        className="space-y-9"
        aria-describedby={`${id}-privacy`}
      >
        {errorList.length ? (
          <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="border-2 border-stamp bg-paper p-4 text-stamp outline-none">
            <p className="font-semibold">Check {errorList.length === 1 ? "this" : "these"} before sending:</p>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {errorList.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <Field label="1 · What are you printing?" htmlFor={fid("what")}>
          <div className="relative">
            <select
              id={fid("what")}
              value={job.what}
              onChange={(e) => set("what", e.target.value as What)}
              className={`${inputClass()} appearance-none pr-10`}
            >
              {WHAT.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select>
            <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2" />
          </div>
        </Field>

        <fieldset className="space-y-4">
          <legend className="label mb-2">2 · Pages & copies</legend>
          <Segmented
            legend="Which pages"
            name={fid("scope")}
            value={job.pageScope}
            onChange={(v) => set("pageScope", v)}
            choices={[
              { value: "all", label: "The whole file" },
              { value: "some", label: "Only some pages" },
            ]}
            columns="grid-cols-2"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {job.pageScope === "some" ? (
              <Field label="Page numbers" htmlFor={fid("pageRange")} error={visibleErrors.pageRange} hint="e.g. 1–5, 8, 10">
                <input
                  id={fid("pageRange")}
                  value={job.pageRange}
                  onChange={(e) => set("pageRange", e.target.value.slice(0, 60))}
                  aria-invalid={!!visibleErrors.pageRange}
                  aria-describedby={describedBy("pageRange", true)}
                  className={inputClass(!!visibleErrors.pageRange)}
                  autoComplete="off"
                />
              </Field>
            ) : (
              <Field label="Pages in the file (optional)" htmlFor={fid("pageCount")} error={visibleErrors.pageCount} hint="Helps us quote faster">
                <input
                  id={fid("pageCount")}
                  inputMode="numeric"
                  value={job.pageCount}
                  onChange={(e) => set("pageCount", e.target.value.replace(/[^\d]/g, "").slice(0, 5))}
                  aria-invalid={!!visibleErrors.pageCount}
                  aria-describedby={describedBy("pageCount", true)}
                  className={inputClass(!!visibleErrors.pageCount)}
                  autoComplete="off"
                />
              </Field>
            )}
            <Field label="Copies" htmlFor={fid("copies")} error={visibleErrors.copies}>
              <div className="flex">
                <button
                  type="button"
                  aria-label="One fewer copy"
                  onClick={() => set("copies", String(Math.max(1, (Number(job.copies) || 1) - 1)))}
                  className="min-h-12 w-12 shrink-0 border border-r-0 border-line-strong text-xl hover:bg-paper-2"
                >
                  −
                </button>
                <input
                  id={fid("copies")}
                  inputMode="numeric"
                  value={job.copies}
                  onChange={(e) => set("copies", e.target.value.replace(/[^\d]/g, "").slice(0, 5))}
                  aria-invalid={!!visibleErrors.copies}
                  aria-describedby={describedBy("copies")}
                  className={`${inputClass(!!visibleErrors.copies)} text-center font-mono`}
                  autoComplete="off"
                />
                <button
                  type="button"
                  aria-label="One more copy"
                  onClick={() => set("copies", String((Number(job.copies) || 0) + 1))}
                  className="min-h-12 w-12 shrink-0 border border-l-0 border-line-strong text-xl hover:bg-paper-2"
                >
                  +
                </button>
              </div>
            </Field>
          </div>
        </fieldset>

        <div className="space-y-6">
          <p className="label">3 · How it should look</p>
          <Segmented legend="Colour" name={fid("colour")} value={job.colour} onChange={(v) => set("colour", v)} choices={colourChoices} columns="grid-cols-3" />
          <Segmented legend="Paper size" name={fid("size")} value={job.size} onChange={(v) => set("size", v)} choices={sizeChoices} />
          <Segmented legend="Sides" name={fid("sides")} value={job.sides} onChange={(v) => set("sides", v)} choices={sideChoices} columns="grid-cols-2" />
          <Segmented legend="Finish" name={fid("finish")} value={job.finish} onChange={(v) => set("finish", v)} choices={finishChoices} />
          {job.size !== "A4" || job.finish === "spiral" || job.finish === "laminate" ? (
            <p className="border-l-4 border-marker bg-paper-2 px-3 py-2 text-sm">
              We&rsquo;ll confirm we can do {job.size !== "A4" ? `${labelOf(sizeChoices, job.size)} paper` : "this finish"} when we reply.
            </p>
          ) : null}
        </div>

        <div className="space-y-6">
          <p className="label">4 · File & collection</p>
          <Segmented legend="Your file" name={fid("file")} value={job.fileVia} onChange={(v) => set("fileVia", v)} choices={fileChoices} columns="grid-cols-1 sm:grid-cols-3" />
          <Segmented legend="When do you need it?" name={fid("when")} value={job.when} onChange={(v) => set("when", v)} choices={whenChoices} columns="grid-cols-1 sm:grid-cols-3" />
          {job.when === "today" ? (
            <Field label="Collect by" htmlFor={fid("time")} error={visibleErrors.time}>
              <input
                id={fid("time")}
                type="time"
                value={job.time}
                onChange={(e) => set("time", e.target.value)}
                aria-invalid={!!visibleErrors.time}
                aria-describedby={describedBy("time")}
                className={`${inputClass(!!visibleErrors.time)} max-w-48`}
              />
            </Field>
          ) : null}
          {job.when === "later" ? (
            <Field label="Collection date" htmlFor={fid("date")} error={visibleErrors.date}>
              <input
                id={fid("date")}
                type="date"
                value={job.date}
                onChange={(e) => set("date", e.target.value)}
                aria-invalid={!!visibleErrors.date}
                aria-describedby={describedBy("date")}
                className={`${inputClass(!!visibleErrors.date)} max-w-56`}
              />
            </Field>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-[1fr_2fr]">
          <Field label="First name (optional)" htmlFor={fid("name")} hint="To label your job">
            <input
              id={fid("name")}
              value={job.name}
              onChange={(e) => set("name", e.target.value.slice(0, 40))}
              aria-describedby={`${fid("name")}-hint`}
              className={inputClass()}
              autoComplete="given-name"
            />
          </Field>
          <Field label="Notes (optional)" htmlFor={fid("notes")} hint={`${300 - job.notes.length} characters left`}>
            <textarea
              id={fid("notes")}
              value={job.notes}
              onChange={(e) => set("notes", e.target.value.slice(0, 300))}
              aria-describedby={`${fid("notes")}-hint`}
              rows={3}
              className={`${inputClass()} py-3`}
            />
          </Field>
        </div>

        <p id={`${id}-privacy`} className="text-sm text-ink-3">
          Nothing here is saved or sent to a server. The button opens WhatsApp with your message so you can check it before
          sending. Don&rsquo;t include ID numbers or passwords.
        </p>
      </form>

      <aside aria-label="Your print job" className="lg:sticky lg:top-24 lg:self-start">
        <div className="ticket font-mono text-sm">
          <div className="flex justify-between px-5 pt-5">
            <span className="label">Print job</span>
            <span className="label">Preview</span>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 px-5 pt-4 pb-5" aria-live="polite">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-ink-3 uppercase">{k}</dt>
                <dd className="font-medium break-words">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="perforation" aria-hidden="true" />
          <div className="px-5 py-5">
            <Actions formId={formId} status={status} onCopy={onCopy} />
          </div>
          <p className="px-5 pb-5 text-ink-3">We reply with the price and ready time before we print.</p>
        </div>
      </aside>
    </div>
  );
}

function Actions({
  formId,
  status,
  onCopy,
}: {
  formId: string;
  status: "idle" | "sent" | "copied" | "copy-failed";
  onCopy: () => void;
}) {
  return (
    <div className="font-sans">
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
        <button
          type="submit"
          form={formId}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-ink px-5 font-semibold text-paper transition-colors hover:bg-ocean-deep"
        >
          <ChatIcon /> Send on WhatsApp
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink px-5 font-semibold hover:bg-ink hover:text-paper"
        >
          <CopyIcon /> Copy details
        </button>
      </div>
      <div aria-live="polite" className="mt-3 text-sm">
        {status === "sent" ? (
          <p className="flex gap-2 text-ocean">
            <CheckIcon className="h-5 w-5 shrink-0" />
            <span>
              WhatsApp should now be open with your job. Press send, then attach your file in the same chat. Didn&rsquo;t open?
              Use &ldquo;Copy details&rdquo; and paste it into WhatsApp.
            </span>
          </p>
        ) : null}
        {status === "copied" ? (
          <p className="flex gap-2 text-ocean">
            <CheckIcon className="h-5 w-5 shrink-0" /> Copied. Paste it into WhatsApp or an SMS.
          </p>
        ) : null}
        {status === "copy-failed" ? (
          <p className="text-stamp">Couldn&rsquo;t copy automatically. Select the job preview text and copy it by hand.</p>
        ) : null}
      </div>
    </div>
  );
}
