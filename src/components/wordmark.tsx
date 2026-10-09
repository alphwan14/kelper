/**
 * Proposed Kelper mark: a dog-eared page (the thing the shop handles all day)
 * beside a lowercase wordmark. Pending client approval.
 */
export function PageMark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path d="M6 3h14l7 7v19H6z" fill="currentColor" />
      <path d="M20 3v7h7" fill="var(--color-marker)" />
      <path
        d="M11 17.5h11M11 22h7"
        stroke={inverse ? "var(--color-ink)" : "var(--color-paper)"}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <PageMark className="h-7 w-7 shrink-0" inverse={inverse} />
      <span className="font-display text-[1.6rem] font-extrabold leading-none tracking-[-0.04em]">kelper</span>
    </span>
  );
}
