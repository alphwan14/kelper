import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { activeEmail, business } from "@/config/business";
import { telHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: `How the ${business.legalName} website handles your information. Short version: the site doesn't collect or store it.`,
  path: "/privacy",
});

const sections: { title: string; body: string[] }[] = [
  {
    title: "What this website collects",
    body: [
      "Nothing that identifies you. There are no accounts, no forms that submit to a server, no file uploads, no advertising trackers and no analytics cookies.",
      "Our hosting provider (Vercel) keeps standard technical logs, such as IP addresses and pages requested, to run and protect the site.",
    ],
  },
  {
    title: "The quotation request and WhatsApp buttons",
    body: [
      "The quotation request runs entirely in your browser. When you press send, your browser opens WhatsApp (or your email app) with the message you wrote. Nothing is sent until you press send there yourself, and the website never sees it.",
      "Messages and files you send us on WhatsApp are handled by WhatsApp (Meta) under its terms, and we receive them on our business phone.",
    ],
  },
  {
    title: "Information you send us",
    body: [
      "We use what you send, such as drawings, bills of quantities, site locations and contact details, only to respond to your enquiry, prepare quotations and carry out work you instruct.",
      "Ask us at any time to delete files and messages you have sent that we no longer need.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "Under Kenya's Data Protection Act, 2019, you can ask what information we hold about you, ask us to correct it, or ask us to delete it. Contact us to make a request.",
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
              {activeEmail ? (
                <>
                  {" "}or email{" "}
                  <a href={`mailto:${activeEmail}`} className="font-semibold text-ink underline underline-offset-4">
                    {activeEmail}
                  </a>
                </>
              ) : null}
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
