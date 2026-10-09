import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { name: string; href: string };

/** Header block for inner pages: breadcrumb, mono kicker, big title. */
export function PageIntro({
  crumbs,
  kicker,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="grain border-b border-line">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-12 md:px-8 md:pt-12 md:pb-16">
        <nav aria-label="Breadcrumb" className="no-print">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-3">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.href} className="underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="label mt-8">{kicker}</p>
        <h1 className="mt-3 max-w-4xl text-[clamp(2.4rem,1.5rem+4vw,4.75rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">
          {title}
        </h1>
        {intro ? <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">{intro}</div> : null}
        {children}
      </div>
    </div>
  );
}
