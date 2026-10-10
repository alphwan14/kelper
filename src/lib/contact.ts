import { activeEmail, business } from "@/config/business";

export const telHref = `tel:${business.phone.e164}`;

/** Opens a WhatsApp chat with Kelper, optionally with a pre-filled message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${business.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** mailto: link, or null while the mailbox isn't confirmed working (see business.email.active). */
export function mailtoHref(subject?: string, body?: string): string | null {
  if (!activeEmail) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${activeEmail}${query ? `?${query}` : ""}`;
}

/** Standard opening line used in every pre-filled enquiry. */
export function enquiry(body: string): string {
  return `Hello ${business.legalName}, ${body}`;
}
