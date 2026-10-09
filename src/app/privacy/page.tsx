import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/page-intro";
import { business } from "@/config/business";
import { telHref } from "@/lib/contact";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: `How ${business.name}'s website handles your information. Short version: the site doesn't collect or store it.`,
  path: "/privacy",
});

const sections: { title: string; body: string[] }[] = [
  {
    title: "What this website collects",
    body: [
      "Nothing that identifies you. There are no accounts, no contact forms that send to a server, no file uploads, no advertising trackers and no analytics cookies.",
      "Our hosting provider (Vercel) keeps standard technical logs, such as IP addresses and pages requested, to run and protect the site.",
    ],
  },
  {
    title: "The print job builder and WhatsApp buttons",
    body: [
      "When you press a WhatsApp button, your browser opens WhatsApp with a pre-written message. Nothing is sent until you press send in WhatsApp yourself. The website never sees the message.",
      "Messages you send us on WhatsApp are handled by WhatsApp (Meta) under their terms, and we receive them on our business phone.",
    ],
  },
  {
    title: "Checklists",
    body: [
      "Ticks on our checklists are saved only in your own browser (local storage) so they're still there if you reload. They never leave your device. Use “Clear ticks” to remove them.",
    ],
  },
  {
    title: "Documents you give us",
    body: [
      "Only share what a job needs. Don't send ID numbers, KRA PINs or passwords by message. Bring originals in person, and type passwords yourself.",
      "If you send a file to print or scan, you can ask us to delete it from our devices once the job is done.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "Under Kenya's Data Protection Act, 2019, you can ask what information we hold about you, ask us to correct it, or ask us to delete it. Call or WhatsApp us to make a request.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy", href: "/privacy" },
        ]}
        kicker="Privacy"
        title="This site doesn't collect your information."
        intro={<p>Here&rsquo;s exactly what happens when you use it, in plain language.</p>}
      />
      <div className="mx-auto max-w-3xl px-4 py-14 md:px-8 md:py-20">
        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl font-extrabold tracking-tight">{s.title}</h2>
              <div className="prose-kelper mt-3 text-lg leading-relaxed text-ink-2">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
          <section className="border-t border-line pt-8">
            <h2 className="text-2xl font-extrabold tracking-tight">Questions</h2>
            <p className="mt-3 text-lg text-ink-2">
              Call or WhatsApp{" "}
              <a href={telHref} className="font-semibold text-ink underline underline-offset-4">
                {business.phone.display}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
