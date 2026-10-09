import { business } from "@/config/business";

/** Plain disclosure for any service or guide that touches a government portal. */
export function GovNote() {
  return (
    <aside className="border-l-4 border-ocean bg-paper-2 px-4 py-3 text-[0.95rem]">
      <p className="font-semibold">Assistance, not approval.</p>
      <p className="mt-1 text-ink-2">
        {business.name} is an independent business, not a government office. We help you use the official portal. Official
        fees are paid to the government there, and the agency decides on your application.
      </p>
    </aside>
  );
}
