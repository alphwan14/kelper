import Link from "next/link";
import type { ReactNode } from "react";
import { business } from "@/config/business";
import { quoteHref } from "@/content/nav";
import { enquiry, telHref, whatsappHref } from "@/lib/contact";
import { ArrowIcon, ChatIcon, PhoneIcon } from "./icons";

type Variant = "primary" | "secondary" | "ghost" | "signal" | "inverse";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-paper hover:bg-navy-deep",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink px-0!",
  signal: "bg-signal text-navy-deep hover:bg-paper",
  inverse: "border border-paper/60 text-paper hover:bg-paper hover:text-navy-deep",
};

export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `inline-flex min-h-12 items-center justify-center gap-2 px-5 text-[0.95rem] font-semibold transition-colors duration-150 ${variants[variant]} ${extra}`;

type ActionProps = {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
};

/** The primary call to action everywhere: the structured quotation request. */
export function QuoteAction({ variant = "primary", className = "", children, type }: ActionProps & { type?: string }) {
  return (
    <Link href={type ? `${quoteHref}?type=${type}` : quoteHref} className={buttonClass(variant, className)}>
      <span>{children ?? "Request a quotation"}</span>
      <ArrowIcon className="h-4 w-4" />
    </Link>
  );
}

/**
 * WhatsApp enquiry. `message` is the body after "Hello Kelper Investments Ltd, ".
 */
export function WhatsAppAction({
  message,
  variant = "secondary",
  className = "",
  children,
}: ActionProps & { message?: string }) {
  return (
    <a
      href={whatsappHref(message ? enquiry(message) : undefined)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass(variant, className)}
    >
      <ChatIcon />
      <span>{children ?? "WhatsApp"}</span>
      <span className="sr-only"> (opens WhatsApp)</span>
    </a>
  );
}

export function CallAction({ variant = "secondary", className = "", children }: ActionProps) {
  return (
    <a href={telHref} className={buttonClass(variant, className)}>
      <PhoneIcon />
      <span>{children ?? `Call ${business.phone.display}`}</span>
    </a>
  );
}
