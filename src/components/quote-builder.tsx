"use client";

import { useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { enquiry, mailtoHref, whatsappHref } from "@/lib/contact";
import { ChatIcon, CheckIcon, ChevronIcon, CopyIcon, MailIcon, PlusIcon, TrashIcon } from "./icons";

/* ─── Model ────────────────────────────────────────────────── */

type Kind = "construction" | "engineering" | "supplies" | "general";
type Stage = "idea" | "drawings" | "approved" | "underway";
type Doc = "drawings" | "boq" | "photos" | "specs";

type Row = { id: number; item: string; spec: string; qty: string; unit: string };

type Request = {
  kind: Kind;
  workType: string;
  description: string;
  scale: string;
  stage: Stage;
  docs: Doc[];
  rows: Row[];
  listToFollow: boolean;
  location: string;
  neededBy: string;
  name: string;
  organisation: string;
  phone: string;
  notes: string;
};

type Choice<T extends string> = { value: T; label: string; hint?: string };

const kindChoices: Choice<Kind>[] = [
  { value: "construction", label: "Construction", hint: "Building, renovation, site works" },
  { value: "engineering", label: "Engineering support", hint: "Assessment, setting out, installation" },
  { value: "supplies", label: "Materials & supplies", hint: "Priced against your list or BoQ" },
  { value: "general", label: "Not sure", hint: "Describe it and we'll route it" },
];

const workTypes: Record<Exclude<Kind, "supplies">, string[]> = {
  construction: ["New building", "Extension or additional floor", "Renovation or repairs", "Finishing works", "Boundary wall, paving or drainage", "Other"],
  engineering: ["Site visit and assessment", "Setting out and levels", "Site supervision", "Plumbing, water or drainage installation", "Steel fabrication and installation", "Other"],
  general: ["Project", "Supplies", "Both", "Other"],
};

const stageChoices: Choice<Stage>[] = [
  { value: "idea", label: "Early idea" },
  { value: "drawings", label: "Drawings ready" },
  { value: "approved", label: "Approved, ready to start" },
  { value: "underway", label: "Already under way" },
];

const docChoices: Choice<Doc>[] = [
  { value: "drawings", label: "Drawings" },
  { value: "boq", label: "Bill of quantities" },
  { value: "photos", label: "Photos of the site" },
  { value: "specs", label: "Specifications" },
];

const UNITS = ["pcs", "bags", "tonnes", "lengths", "m", "m²", "m³", "litres", "sets", "lorry loads"];
const MAX_ROWS = 40;

// Initial rows use fixed ids so server and client markup match; added rows count up from 100.
let nextRowId = 100;
const blankRow = (id: number): Row => ({ id, item: "", spec: "", qty: "", unit: "pcs" });
const newRow = (): Row => blankRow(nextRowId++);

const initial = (kind: Kind): Request => ({
  kind,
  workType: "",
  description: "",
  scale: "",
  stage: "drawings",
  docs: [],
  rows: [blankRow(1), blankRow(2), blankRow(3)],
  listToFollow: false,
  location: "",
  neededBy: "",
  name: "",
  organisation: "",
  phone: "",
  notes: "",
});

const labelOf = <T extends string>(choices: Choice<T>[], v: T) => choices.find((c) => c.value === v)?.label ?? v;
const filledRows = (r: Request) => r.rows.filter((row) => row.item.trim() || row.qty.trim());

type ErrorKey = "description" | "rows" | "location" | "neededBy" | "name" | "phone" | `row-${number}`;
type Errors = Partial<Record<ErrorKey, string>>;

function validate(r: Request, today: string): Errors {
  const errors: Errors = {};
  if (r.kind === "supplies") {
    const filled = filledRows(r);
    if (!filled.length && !r.listToFollow) errors.rows = "Add at least one item, or tick that you'll send your list or BoQ in the chat.";
    filled.forEach((row, i) => {
      if (!row.item.trim()) errors[`row-${row.id}`] = `Item ${i + 1}: say what the item is.`;
      else if (!/^\d+(\.\d+)?$/.test(row.qty.trim()) || Number(row.qty) <= 0) errors[`row-${row.id}`] = `Item ${i + 1}: enter a quantity.`;
    });
  } else if (r.description.trim().length < 10) {
    errors.description = "Describe the work in a sentence or two.";
  }
  if (!r.location.trim()) errors.location = r.kind === "supplies" ? "Where should materials be delivered?" : "Where is the site?";
  if (r.neededBy && r.neededBy < today) errors.neededBy = "That date has passed.";
  if (!r.name.trim()) errors.name = "Enter your name.";
  if (r.phone.trim() && r.phone.replace(/[^\d]/g, "").length < 9) errors.phone = "Check the phone number, or leave it blank.";
  return errors;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function summary(r: Request): { rows: [string, string][]; items: string[] } {
  const rows: [string, string][] = [["Service", labelOf(kindChoices, r.kind)]];
  if (r.kind !== "supplies") {
    if (r.workType) rows.push(["Type of work", r.workType]);
    rows.push(["Stage", labelOf(stageChoices, r.stage)]);
    if (r.scale.trim()) rows.push(["Size / scale", r.scale.trim()]);
    rows.push(["Documents", r.docs.length ? r.docs.map((d) => labelOf(docChoices, d)).join(", ") : "None yet"]);
  }
  rows.push([r.kind === "supplies" ? "Deliver to" : "Site", r.location.trim() || "…"]);
  rows.push([r.kind === "supplies" ? "Needed on site" : "Target start", r.neededBy ? formatDate(r.neededBy) : "Flexible"]);
  rows.push(["Name", r.name.trim() || "…"]);
  if (r.organisation.trim()) rows.push(["Organisation", r.organisation.trim()]);
  if (r.phone.trim()) rows.push(["Phone", r.phone.trim()]);

  const items =
    r.kind === "supplies"
      ? filledRows(r).map(
          (row, i) =>
            `${i + 1}. ${row.item.trim() || "…"}${row.spec.trim() ? `, ${row.spec.trim()}` : ""}: ${row.qty.trim() || "…"} ${row.unit}`,
        )
      : [];
  return { rows, items };
}

function buildMessage(r: Request): string {
  const { rows, items } = summary(r);
  const lines = ["I'd like a quotation.", "", "QUOTATION REQUEST", ...rows.map(([k, v]) => `${k}: ${v}`)];
  if (r.kind !== "supplies") lines.push("", "WORK", r.description.trim());
  if (items.length) lines.push("", "MATERIALS", ...items);
  if (r.kind === "supplies" && r.listToFollow) lines.push("", "I'll send my full materials list / BoQ in this chat.");
  if (r.notes.trim()) lines.push("", `Notes: ${r.notes.trim()}`);
  return enquiry(lines.join("\n"));
}

function localToday() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* The ?type= preset is read on the client so the page stays fully static. */
const KINDS: Kind[] = ["construction", "engineering", "supplies", "general"];
const noopSubscribe = () => () => {};
function useUrlKind(): Kind | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const t = new URLSearchParams(window.location.search).get("type");
      return KINDS.includes(t as Kind) ? (t as Kind) : null;
    },
    () => null,
  );
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
            className="relative flex min-h-12 cursor-pointer flex-col justify-center border border-line-strong bg-paper px-3 py-2 text-[0.95rem] font-medium transition-colors hover:border-ink has-checked:border-navy has-checked:bg-navy has-checked:text-paper has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-signal-ink"
          >
            <input type="radio" name={name} value={c.value} checked={value === c.value} onChange={() => onChange(c.value)} className="sr-only" />
            <span>{c.label}</span>
            {c.hint ? <span className="text-xs font-normal opacity-75">{c.hint}</span> : null}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({ label, htmlFor, error, hint, children }: { label: string; htmlFor: string; error?: string; hint?: string; children: ReactNode }) {
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
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass = (invalid?: boolean) =>
  `block w-full min-h-12 border bg-[#fffefb] px-3 text-base outline-none focus-visible:border-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-signal-ink ${
    invalid ? "border-danger" : "border-line-strong"
  }`;

/* ─── Builder ──────────────────────────────────────────────── */

type Status = "idle" | "sent" | "copied" | "copy-failed" | "emailed";

export function QuoteBuilder() {
  const urlKind = useUrlKind();
  // null = untouched; the URL preset (if any) applies until the visitor edits the form.
  const [draft, setDraft] = useState<Request | null>(null);
  const req = draft ?? initial(urlKind ?? "construction");
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const formId = `${id}-form`;
  const fid = (name: string) => `${id}-${name}`;

  const set = <K extends keyof Request>(key: K, value: Request[K]) => {
    setDraft((d) => ({ ...(d ?? req), [key]: value }));
    if (status !== "idle") setStatus("idle");
  };
  const setRow = (rowId: number, patch: Partial<Row>) => set("rows", req.rows.map((r) => (r.id === rowId ? { ...r, ...patch } : r)));
  const toggleDoc = (doc: Doc) => set("docs", req.docs.includes(doc) ? req.docs.filter((d) => d !== doc) : [...req.docs, doc]);

  const message = buildMessage(req);
  const { rows, items } = summary(req);
  const visibleErrors: Errors = showErrors ? validate(req, localToday()) : {};
  const errorList = Object.values(visibleErrors);
  const email = mailtoHref(`Quotation request: ${labelOf(kindChoices, req.kind)}`, message);

  const check = () => {
    const found = validate(req, localToday());
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

  const onEmail = () => {
    if (!email || !check()) return;
    window.location.href = email;
    setStatus("emailed");
  };

  const describedBy = (name: ErrorKey, hint = false) => (visibleErrors[name] ? `${fid(name)}-error` : hint ? `${fid(name)}-hint` : undefined);
  const isSupplies = req.kind === "supplies";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14">
      <form
        id={formId}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (check()) {
            window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
            setStatus("sent");
          }
        }}
        className="space-y-10"
        aria-describedby={`${id}-privacy`}
      >
        {errorList.length ? (
          <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="border-2 border-danger bg-paper p-4 text-danger outline-none">
            <p className="font-semibold">Check {errorList.length === 1 ? "this" : "these"} before sending:</p>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {errorList.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <Segmented
          legend="1 · What do you need?"
          name={fid("kind")}
          value={req.kind}
          onChange={(v) => setDraft({ ...req, kind: v, workType: "" })}
          choices={kindChoices}
          columns="grid-cols-1 sm:grid-cols-2"
        />

        {isSupplies ? (
          <fieldset aria-describedby={visibleErrors.rows ? `${fid("rows")}-error` : `${fid("rows")}-hint`}>
            <legend className="label mb-2">2 · Materials list</legend>
            <p id={`${fid("rows")}-hint`} className="mb-4 text-sm text-ink-3">
              One line per item. Include the grade or specification where you know it, for example &ldquo;Cement, 42.5N&rdquo; or
              &ldquo;Y12 high-yield bar, 12 m&rdquo;.
            </p>
            <ol className="space-y-3">
              {req.rows.map((row, i) => {
                const err = visibleErrors[`row-${row.id}`];
                return (
                  <li key={row.id} className={`border bg-paper p-3 ${err ? "border-danger" : "border-line-strong"}`}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="label">Item {String(i + 1).padStart(2, "0")}</span>
                      {req.rows.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => set("rows", req.rows.filter((r) => r.id !== row.id))}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center text-ink-3 hover:text-danger"
                          aria-label={`Remove item ${i + 1}`}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      ) : null}
                    </div>
                    <div className="grid gap-2 sm:grid-cols-[1.4fr_1.2fr]">
                      <label className="sr-only" htmlFor={fid(`item-${row.id}`)}>{`Item ${i + 1}: description`}</label>
                      <input
                        id={fid(`item-${row.id}`)}
                        placeholder="Item, e.g. Cement"
                        value={row.item}
                        onChange={(e) => setRow(row.id, { item: e.target.value.slice(0, 80) })}
                        aria-invalid={!!err}
                        className={inputClass(!!err && !row.item.trim())}
                        autoComplete="off"
                      />
                      <label className="sr-only" htmlFor={fid(`spec-${row.id}`)}>{`Item ${i + 1}: specification or grade`}</label>
                      <input
                        id={fid(`spec-${row.id}`)}
                        placeholder="Spec / grade (optional)"
                        value={row.spec}
                        onChange={(e) => setRow(row.id, { spec: e.target.value.slice(0, 80) })}
                        className={inputClass()}
                        autoComplete="off"
                      />
                    </div>
                    <div className="mt-2 grid grid-cols-[1fr_1fr] gap-2 sm:max-w-sm">
                      <label className="sr-only" htmlFor={fid(`qty-${row.id}`)}>{`Item ${i + 1}: quantity`}</label>
                      <input
                        id={fid(`qty-${row.id}`)}
                        inputMode="decimal"
                        placeholder="Quantity"
                        value={row.qty}
                        onChange={(e) => setRow(row.id, { qty: e.target.value.replace(/[^\d.]/g, "").slice(0, 8) })}
                        aria-invalid={!!err}
                        className={`${inputClass(!!err && !!row.item.trim())} font-mono`}
                        autoComplete="off"
                      />
                      <label className="sr-only" htmlFor={fid(`unit-${row.id}`)}>{`Item ${i + 1}: unit`}</label>
                      <div className="relative">
                        <select
                          id={fid(`unit-${row.id}`)}
                          value={row.unit}
                          onChange={(e) => setRow(row.id, { unit: e.target.value })}
                          className={`${inputClass()} appearance-none pr-9`}
                        >
                          {UNITS.map((u) => (
                            <option key={u}>{u}</option>
                          ))}
                        </select>
                        <ChevronIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                      </div>
                    </div>
                    {err ? (
                      <p id={`${fid(`row-${row.id}`)}-error`} className="mt-2 text-sm font-semibold text-danger">
                        {err}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
            {req.rows.length < MAX_ROWS ? (
              <button
                type="button"
                onClick={() => set("rows", [...req.rows, newRow()])}
                className="mt-3 inline-flex min-h-11 items-center gap-2 border border-ink px-4 text-sm font-semibold hover:bg-ink hover:text-paper"
              >
                <PlusIcon className="h-4 w-4" /> Add another item
              </button>
            ) : (
              <p className="mt-3 text-sm text-ink-3">For longer lists, tick the box below and send your BoQ in the chat.</p>
            )}
            <label className="mt-5 flex min-h-11 cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={req.listToFollow}
                onChange={(e) => set("listToFollow", e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-navy"
              />
              <span>I&rsquo;ll send my full materials list or BoQ as a file in the chat.</span>
            </label>
            {visibleErrors.rows ? (
              <p id={`${fid("rows")}-error`} className="mt-2 text-sm font-semibold text-danger">
                {visibleErrors.rows}
              </p>
            ) : null}
          </fieldset>
        ) : (
          <div className="space-y-6">
            <p className="label">2 · The work</p>
            <Field label="Type of work" htmlFor={fid("workType")}>
              <div className="relative">
                <select
                  id={fid("workType")}
                  value={req.workType}
                  onChange={(e) => set("workType", e.target.value)}
                  className={`${inputClass()} appearance-none pr-10`}
                >
                  <option value="">Choose one (optional)</option>
                  {workTypes[req.kind as Exclude<Kind, "supplies">].map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
                <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2" />
              </div>
            </Field>
            <Field
              label="Describe the work"
              htmlFor={fid("description")}
              error={visibleErrors.description}
              hint="What you want done, and anything we should know about the site."
            >
              <textarea
                id={fid("description")}
                value={req.description}
                onChange={(e) => set("description", e.target.value.slice(0, 800))}
                aria-invalid={!!visibleErrors.description}
                aria-describedby={describedBy("description", true)}
                rows={4}
                className={`${inputClass(!!visibleErrors.description)} py-3`}
              />
            </Field>
            <Field label="Approximate size or scale (optional)" htmlFor={fid("scale")} hint="e.g. 3-bedroom bungalow, 120 m² slab, 40 m of wall">
              <input
                id={fid("scale")}
                value={req.scale}
                onChange={(e) => set("scale", e.target.value.slice(0, 100))}
                aria-describedby={`${fid("scale")}-hint`}
                className={inputClass()}
                autoComplete="off"
              />
            </Field>
            <Segmented legend="Project stage" name={fid("stage")} value={req.stage} onChange={(v) => set("stage", v)} choices={stageChoices} />
            <fieldset>
              <legend className="label mb-2">Documents you can share</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {docChoices.map((d) => (
                  <label
                    key={d.value}
                    className="flex min-h-12 cursor-pointer items-center gap-2.5 border border-line-strong bg-paper px-3 py-2 text-[0.95rem] font-medium hover:border-ink has-checked:border-navy has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-signal-ink"
                  >
                    <input type="checkbox" checked={req.docs.includes(d.value)} onChange={() => toggleDoc(d.value)} className="h-4 w-4 shrink-0 accent-navy" />
                    {d.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        <div className="space-y-6">
          <p className="label">3 · Location and timing</p>
          <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
            <Field
              label={isSupplies ? "Delivery location" : "Site location"}
              htmlFor={fid("location")}
              error={visibleErrors.location}
              hint="Town and area, e.g. Nyali, Mombasa"
            >
              <input
                id={fid("location")}
                value={req.location}
                onChange={(e) => set("location", e.target.value.slice(0, 100))}
                aria-invalid={!!visibleErrors.location}
                aria-describedby={describedBy("location", true)}
                className={inputClass(!!visibleErrors.location)}
                autoComplete="address-level2"
              />
            </Field>
            <Field
              label={isSupplies ? "Needed on site by (optional)" : "Target start (optional)"}
              htmlFor={fid("neededBy")}
              error={visibleErrors.neededBy}
            >
              <input
                id={fid("neededBy")}
                type="date"
                value={req.neededBy}
                onChange={(e) => set("neededBy", e.target.value)}
                aria-invalid={!!visibleErrors.neededBy}
                aria-describedby={describedBy("neededBy")}
                className={inputClass(!!visibleErrors.neededBy)}
              />
            </Field>
          </div>
        </div>

        <div className="space-y-6">
          <p className="label">4 · Your details</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" htmlFor={fid("name")} error={visibleErrors.name}>
              <input
                id={fid("name")}
                value={req.name}
                onChange={(e) => set("name", e.target.value.slice(0, 60))}
                aria-invalid={!!visibleErrors.name}
                aria-describedby={describedBy("name")}
                className={inputClass(!!visibleErrors.name)}
                autoComplete="name"
              />
            </Field>
            <Field label="Company or organisation (optional)" htmlFor={fid("organisation")}>
              <input
                id={fid("organisation")}
                value={req.organisation}
                onChange={(e) => set("organisation", e.target.value.slice(0, 80))}
                className={inputClass()}
                autoComplete="organization"
              />
            </Field>
            <Field label="Phone (optional)" htmlFor={fid("phone")} error={visibleErrors.phone} hint="If different from the number you message from">
              <input
                id={fid("phone")}
                type="tel"
                value={req.phone}
                onChange={(e) => set("phone", e.target.value.slice(0, 20))}
                aria-invalid={!!visibleErrors.phone}
                aria-describedby={describedBy("phone", true)}
                className={inputClass(!!visibleErrors.phone)}
                autoComplete="tel"
              />
            </Field>
            <Field label="Other notes (optional)" htmlFor={fid("notes")} hint={`${400 - req.notes.length} characters left`}>
              <textarea
                id={fid("notes")}
                value={req.notes}
                onChange={(e) => set("notes", e.target.value.slice(0, 400))}
                aria-describedby={`${fid("notes")}-hint`}
                rows={3}
                className={`${inputClass()} py-3`}
              />
            </Field>
          </div>
        </div>

        <p id={`${id}-privacy`} className="text-sm text-ink-3">
          Nothing on this page is saved or sent to a server. The buttons open WhatsApp{email ? " or your email app" : ""} with your
          request so you can check it before sending. Attach drawings, BoQs or photos in the chat.
        </p>
      </form>

      <aside aria-label="Your quotation request" className="lg:sticky lg:top-24 lg:self-start">
        <div className="title-block text-sm">
          <div className="flex items-center justify-between bg-navy px-5 py-3 text-paper">
            <span className="font-mono text-xs tracking-[0.12em] uppercase">Request for quotation</span>
            <span className="font-mono text-xs tracking-[0.12em] text-steel-light uppercase">Preview</span>
          </div>
          <dl className="font-mono" aria-live="polite">
            {rows.map(([k, v]) => (
              <div key={k} className="title-block-row grid grid-cols-[7.5rem_1fr] gap-3 px-5 py-2.5 first:border-t-0">
                <dt className="text-xs tracking-wide text-ink-3 uppercase">{k}</dt>
                <dd className="font-medium break-words">{v}</dd>
              </div>
            ))}
          </dl>
          {!isSupplies && req.description.trim() ? (
            <div className="title-block-row px-5 py-3">
              <p className="font-mono text-xs tracking-wide text-ink-3 uppercase">Work</p>
              <p className="mt-1 break-words whitespace-pre-line">{req.description.trim()}</p>
            </div>
          ) : null}
          {isSupplies ? (
            <div className="title-block-row px-5 py-3">
              <p className="font-mono text-xs tracking-wide text-ink-3 uppercase">Materials ({items.length})</p>
              {items.length ? (
                <ul className="mt-1 space-y-0.5 font-mono text-[0.8rem] break-words">
                  {items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-ink-3">{req.listToFollow ? "Full list to follow in the chat." : "No items yet."}</p>
              )}
            </div>
          ) : null}
          <div className="title-block-row px-5 py-5">
            <Actions formId={formId} status={status} onCopy={onCopy} onEmail={email ? onEmail : undefined} />
          </div>
        </div>
      </aside>
    </div>
  );
}

function Actions({ formId, status, onCopy, onEmail }: { formId: string; status: Status; onCopy: () => void; onEmail?: () => void }) {
  const secondary = "inline-flex min-h-12 items-center justify-center gap-2 border border-ink px-4 font-semibold hover:bg-ink hover:text-paper";
  return (
    <div>
      <button
        type="submit"
        form={formId}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-navy px-5 font-semibold text-paper transition-colors hover:bg-navy-deep"
      >
        <ChatIcon /> Send on WhatsApp
      </button>
      <div className={`mt-3 grid gap-3 ${onEmail ? "grid-cols-2" : "grid-cols-1"}`}>
        <button type="button" onClick={onCopy} className={secondary}>
          <CopyIcon /> Copy details
        </button>
        {onEmail ? (
          <button type="button" onClick={onEmail} className={secondary}>
            <MailIcon /> Email
          </button>
        ) : null}
      </div>
      <div aria-live="polite" className="mt-3 text-sm">
        {status === "sent" ? (
          <p className="flex gap-2 text-navy">
            <CheckIcon className="h-5 w-5 shrink-0 text-signal-ink" />
            <span>
              WhatsApp should now be open with your request. Press send, then attach any drawings or BoQ in the same chat.
              Didn&rsquo;t open? Use &ldquo;Copy details&rdquo; and paste it into WhatsApp.
            </span>
          </p>
        ) : null}
        {status === "emailed" ? (
          <p className="flex gap-2 text-navy">
            <CheckIcon className="h-5 w-5 shrink-0 text-signal-ink" />
            <span>Your email app should open with the request. Attach your files there before sending.</span>
          </p>
        ) : null}
        {status === "copied" ? (
          <p className="flex gap-2 text-navy">
            <CheckIcon className="h-5 w-5 shrink-0 text-signal-ink" /> Copied. Paste it into WhatsApp, an SMS or an email.
          </p>
        ) : null}
        {status === "copy-failed" ? <p className="text-danger">Couldn&rsquo;t copy automatically. Select the preview text and copy it by hand.</p> : null}
      </div>
    </div>
  );
}
