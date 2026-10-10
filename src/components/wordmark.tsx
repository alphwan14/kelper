/**
 * Kelper Investments mark: a "K" built like a braced frame, one column and two
 * braces, the lower brace in signal orange. Standalone SVG versions live in
 * public/brand/. Proposed identity, pending owner approval.
 */
export const MARK_PATHS = {
  column: "M8 7h4.5v18H8z",
  upper: "M12.5 13.6 19.1 7h6.3L12.5 19.9z",
  lower: "M16 16.4 25.4 25h-6.2l-6.3-5.5z",
} as const;

export function Mark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  const plate = inverse ? "var(--color-paper)" : "var(--color-navy)";
  const frame = inverse ? "var(--color-navy)" : "var(--color-paper)";
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="2" fill={plate} />
      <path d={MARK_PATHS.column} fill={frame} />
      <path d={MARK_PATHS.upper} fill={frame} />
      <path d={MARK_PATHS.lower} fill="var(--color-signal)" />
    </svg>
  );
}

export function Wordmark({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-9 w-9 shrink-0" inverse={inverse} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-extrabold tracking-[0.01em] [font-stretch:87.5%]">KELPER</span>
        <span className={`mt-1 font-mono text-[0.6rem] tracking-[0.2em] ${inverse ? "text-steel-light" : "text-ink-3"}`}>
          INVESTMENTS LTD
        </span>
      </span>
    </span>
  );
}
