/**
 * Single source of truth for Kelper Investments Ltd's business facts.
 *
 * Only the legal name, descriptor, domain, city and phone number come from the
 * owner's brief. Everything set to `null`, `false` or `[]` is unconfirmed: the UI
 * hides it until it's filled in. Never replace a blank with a guess. A blank is
 * handled gracefully; a wrong registration number or licence class is not.
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

/** A registration or licence the owner has confirmed and can produce on request. */
export type Credential = {
  /** e.g. "NCA registration" */
  label: string;
  /** e.g. "NCA 6 · Building works" (exactly as printed on the certificate) */
  value: string;
};

export type Business = {
  /** Short brand name used in running text */
  name: string;
  /** Registered company name, exactly as on the certificate of incorporation */
  legalName: string;
  /** The descriptor that always travels with the name */
  descriptor: string;
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
  email: {
    address: string;
    /**
     * Flip to `true` only after the mailbox exists and a test message has been
     * sent and received. While `false`, the address is not shown or linked anywhere.
     * (Checked 10 Oct 2026: kelper.co.ke has no MX record, so mail would bounce.)
     */
    active: boolean;
  };
  /** Street / building: unconfirmed */
  streetAddress: string | null;
  /** P.O. Box, if the company uses one */
  postalAddress: string | null;
  /** A Google Maps share link for the office or yard pin */
  mapUrl: string | null;
  geo: { lat: number; lng: number } | null;
  hours: OpeningHours[] | null;
  /** Counties or towns the company will actually travel to or deliver in */
  areaServed: string[] | null;
  /** Confirmed registrations only (NCA, EBK firm, AGPO, etc.). Shown on /about. */
  credentials: Credential[];
  socials: { label: string; url: string }[];
};

export const business: Business = {
  name: "Kelper",
  legalName: "Kelper Investments Ltd",
  descriptor: "Construction, Engineering Services & Supplies",
  url: "https://kelper.co.ke",
  city: "Mombasa",
  region: "Mombasa County",
  countryCode: "KE",
  phone: {
    display: "+254 723 938401",
    e164: "+254723938401",
    whatsapp: "254723938401",
  },
  email: {
    address: "info@kelper.co.ke",
    active: false,
  },
  streetAddress: null,
  postalAddress: null,
  mapUrl: null,
  geo: null,
  hours: null,
  areaServed: null,
  credentials: [],
  socials: [],
};

/** The email address, or null while the mailbox isn't confirmed working. */
export const activeEmail: string | null = business.email.active ? business.email.address : null;
