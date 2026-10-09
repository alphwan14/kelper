/**
 * Single source of truth for Kelper's business facts.
 *
 * Only `name`, `city` and the phone number are confirmed by the client.
 * Everything set to `null` is unknown: the UI hides it until it's filled in.
 * Never replace a `null` with a guess.
 */

export type OpeningHours = {
  /** e.g. "Mon–Fri" */
  days: string;
  /** 24h "HH:MM" */
  opens: string;
  closes: string;
  /** schema.org day names for structured data, e.g. ["Monday", "Tuesday"] */
  schemaDays: string[];
};

export type Business = {
  name: string;
  url: string;
  city: string;
  region: string;
  countryCode: string;
  phone: {
    /** Human-readable, as printed on the site */
    display: string;
    /** E.164 for tel: links */
    e164: string;
    /** Digits only, no plus, for wa.me links */
    whatsapp: string;
  };
  /** Street / building — unconfirmed */
  streetAddress: string | null;
  /** A landmark people actually use to give directions, e.g. "opposite …" */
  landmark: string | null;
  /** A Google Maps share link for the exact pin */
  mapUrl: string | null;
  geo: { lat: number; lng: number } | null;
  hours: OpeningHours[] | null;
  email: string | null;
  socials: { label: string; url: string }[];
  /** Whether staff serve customers in Kiswahili — confirm before advertising */
  speaksKiswahili: boolean | null;
};

export const business: Business = {
  name: "Kelper",
  url: "https://kelper.co.ke",
  city: "Mombasa",
  region: "Mombasa County",
  countryCode: "KE",
  phone: {
    display: "+254 723 938401",
    e164: "+254723938401",
    whatsapp: "254723938401",
  },
  streetAddress: null,
  landmark: null,
  mapUrl: null,
  geo: null,
  hours: null,
  email: null,
  socials: [],
  speaksKiswahili: null,
};
