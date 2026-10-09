import type { ReactNode } from "react";
import { business } from "@/config/business";
import { enquiry, telHref, whatsappHref } from "@/lib/contact";
import { ChatIcon, PhoneIcon } from "./icons";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ocean-deep",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink px-0!",
  inverse: "bg-marker text-ink hover:bg-paper",
};

export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `inline-flex min-h-12 items-center justify-center gap-2 px-5 text-[0.95rem] font-semibold transition-colors duration-150 ${variants[variant]} ${extra}`;

type ActionProps = {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
};

/**
 * WhatsApp enquiry. `message` is the body after "Hello Kelper, ".
 * Keep messages free of sensitive data (IDs, PINs, passwords).
 */
export function WhatsAppAction({
  message,
  variant = "primary",
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
      <span>{children ?? "WhatsApp us"}</span>
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
