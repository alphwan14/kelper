import { business } from "@/config/business";

export const telHref = `tel:${business.phone.e164}`;

/** Opens a WhatsApp chat with Kelper, optionally with a pre-filled message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${business.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Opens WhatsApp's contact picker so a visitor can send text to anyone (incl. themselves). */
export function whatsappShareHref(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/** Standard opening line used in every pre-filled enquiry. */
export function enquiry(body: string): string {
  return `Hello ${business.name}, ${body}`;
}
