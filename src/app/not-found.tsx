import Link from "next/link";
import type { Metadata } from "next";
import { QuoteAction, buttonClass } from "@/components/actions";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="sheet-grid-light">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32">
        <div className="title-block max-w-xl">
          <div className="flex items-center justify-between bg-navy px-6 py-3 font-mono text-xs tracking-[0.12em] text-paper uppercase">
            <span>Sheet 404</span>
            <span className="text-steel-light">Not found</span>
          </div>
          <div className="px-6 pt-6 pb-8">
            <h1 className="text-5xl leading-[0.95] font-extrabold tracking-[-0.02em] md:text-6xl">This page isn&rsquo;t on the drawings.</h1>
            <p className="mt-4 text-lg text-ink-2">The link may be old or mistyped. Here&rsquo;s where to go instead.</p>
          </div>
          <div className="title-block-row flex flex-col gap-3 p-6 sm:flex-row sm:flex-wrap">
            <Link href="/" className={buttonClass("primary")}>
              Home page
            </Link>
            <Link href="/services" className={buttonClass("secondary")}>
              Services
            </Link>
            <QuoteAction variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  );
}
