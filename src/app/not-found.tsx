import Link from "next/link";
import { WhatsAppAction, buttonClass } from "@/components/actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32">
        <div className="relative max-w-xl">
          <div className="ticket -rotate-1">
            <div className="flex justify-between px-6 pt-5">
              <span className="label">Job · 404</span>
              <span className="label">Not found</span>
            </div>
            <div className="px-6 pt-4 pb-8">
              <h1 className="text-5xl leading-[0.95] font-extrabold tracking-[-0.03em] md:text-6xl">
                This page didn&rsquo;t <span className="marker">print.</span>
              </h1>
              <p className="mt-4 text-lg text-ink-2">The link may be old or mistyped. Here&rsquo;s where to go instead.</p>
            </div>
            <div className="perforation" aria-hidden="true" />
            <div className="flex flex-col gap-3 p-6 sm:flex-row sm:flex-wrap">
              <Link href="/" className={buttonClass("primary")}>
                Go to the home page
              </Link>
              <Link href="/services" className={buttonClass("secondary")}>
                See services
              </Link>
              <WhatsAppAction variant="ghost" message="I couldn't find something on your website. I was looking for: ">
                Ask us
              </WhatsAppAction>
            </div>
          </div>
          <p aria-hidden="true" className="stamp absolute -top-4 -right-2 rotate-6 bg-paper text-sm">
            Void
          </p>
        </div>
      </div>
    </section>
  );
}
