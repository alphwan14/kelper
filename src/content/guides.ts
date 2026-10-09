/**
 * "Prepare before you come" guides.
 *
 * Requirements change. Each guide records when it was checked and links to the
 * official source. Review these at least twice a year, and whenever KRA, HEF
 * or Immigration announce changes.
 */

export type GuideSlug = "kra-pin" | "nil-returns" | "passport" | "hef-funding" | "job-application" | "printing-files";

export type ChecklistItem = {
  id: string;
  label: string;
  note?: string;
};

export type Guide = {
  slug: GuideSlug;
  title: string;
  /** Short label for chips and lists */
  short: string;
  summary: string;
  checked: string;
  /** Plain-language context shown above the checklist */
  context: string[];
  checklist: ChecklistItem[];
  steps?: string[];
  tips: string[];
  official: { label: string; url: string }[];
  sources: { label: string; url: string }[];
  service: string;
  government?: boolean;
};

export const guides: Guide[] = [
  {
    slug: "nil-returns",
    title: "Filing KRA nil returns",
    short: "Nil returns",
    summary: "If you have a KRA PIN and earned no taxable income, you still file every year. The deadline has changed.",
    checked: "October 2026",
    context: [
      "Every resident individual with a KRA PIN must file a return each year, including students and people with no income. A nil return says you had no taxable income.",
      "Under the Finance Act 2026, nil returns for the 2026 income year are due by 31 January 2027, not 30 June. PAYE-only returns move to 30 April. Other individuals stay on 30 June.",
      "Filing late attracts a KES 2,000 penalty for individuals.",
    ],
    checklist: [
      { id: "pin", label: "Your KRA PIN", note: "It's on your PIN certificate. We can retrieve it with your ID if you've lost it." },
      { id: "id", label: "Your National ID or Maisha card" },
      { id: "email", label: "Access to the email linked to your iTax account", note: "Needed if you've forgotten your iTax password." },
      { id: "phone", label: "Your phone" },
    ],
    steps: [
      "Log in to iTax with your PIN and password. You type the password yourself.",
      "Choose Returns → File Nil Return → Income Tax – Resident Individual.",
      "Enter the return period and submit.",
      "Download the acknowledgement receipt. We can print it or send it to your phone.",
    ],
    tips: [
      "Not sure if your return is a nil return? If you were employed at any point in the year, it's an employment return, not nil. Bring your P9 form.",
      "Keep the acknowledgement receipt. It's your proof of filing.",
    ],
    official: [
      { label: "iTax portal", url: "https://itax.kra.go.ke" },
      { label: "KRA website", url: "https://www.kra.go.ke" },
    ],
    sources: [
      {
        label: "People Daily: New KRA filing deadlines explained",
        url: "https://peopledaily.digital/news/new-kra-tax-filing-deadlines-explained-who-files-by-april-30-and-who-files-by-june-30",
      },
      {
        label: "Kenyans.co.ke: KRA clarifies new filing deadline",
        url: "https://www.kenyans.co.ke/news/126943-kra-clarifies-new-tax-filing-deadline-amid-confusion-among-kenyans",
      },
    ],
    service: "kra-services",
    government: true,
  },
  {
    slug: "kra-pin",
    title: "Getting a KRA PIN",
    short: "KRA PIN",
    summary: "You need a KRA PIN for jobs, bank accounts, SIM-linked services and HEF applications. Registration is free from KRA.",
    checked: "October 2026",
    context: [
      "Kenyan residents register for a PIN on iTax. The system pulls your name from the national ID database, so your ID number and date of birth must match exactly.",
      "The PIN certificate is issued immediately and sent to your email.",
    ],
    checklist: [
      { id: "id", label: "Your National ID or Maisha card (original)" },
      { id: "email", label: "An email address you can open on your phone right now", note: "Your PIN certificate and iTax password go here. No email? We can help you create one." },
      { id: "phone", label: "Your phone number" },
      { id: "employer", label: "Your employer's KRA PIN, if you're employed", note: "It's usually on your payslip." },
      { id: "business", label: "Your business registration certificate, if you run a registered business" },
    ],
    tips: [
      "Use an email you'll keep for years. Losing access to it is the most common reason people get locked out of iTax.",
      "Write your PIN somewhere safe. You'll be asked for it often.",
    ],
    official: [
      { label: "iTax portal", url: "https://itax.kra.go.ke" },
      {
        label: "KRA: PIN registration requirements",
        url: "https://www.kra.go.ke/individual/individual-pin-registration/learn-about-pin/requirements-for-kra-pin-registration",
      },
    ],
    sources: [
      {
        label: "KRA: Requirements for KRA PIN registration",
        url: "https://www.kra.go.ke/individual/individual-pin-registration/learn-about-pin/requirements-for-kra-pin-registration",
      },
    ],
    service: "kra-services",
    government: true,
  },
  {
    slug: "passport",
    title: "Kenyan passport application paperwork",
    short: "Passport",
    summary: "You apply on eCitizen and then attend an immigration centre. Arrive with everything printed and copied.",
    checked: "October 2026",
    context: [
      "You start the application on eCitizen, pay the official fee there, and book an appointment at the immigration centre you choose.",
      "At the appointment, officers take your fingerprints, photo and signature and check your documents. Missing copies are the usual reason people get turned back.",
    ],
    checklist: [
      { id: "form", label: "Printed eCitizen application form and payment receipt" },
      { id: "birth", label: "Birth certificate: original and a copy" },
      { id: "id", label: "National ID or Maisha card: original and a copy" },
      { id: "photos", label: "Three recent passport-size photos", note: "One endorsed on the back by your recommender." },
      { id: "recommender", label: "A copy of your recommender's ID" },
      { id: "old", label: "Your old passport, if you're replacing one" },
      { id: "minor", label: "For a child: parents' IDs and a consent letter" },
    ],
    tips: [
      "Check the fee and requirements on eCitizen on the day you apply. Official fees change and are paid only through the portal.",
      "Make two copies of everything. It costs little and saves a second trip.",
    ],
    official: [
      { label: "eCitizen", url: "https://accounts.ecitizen.go.ke" },
      { label: "Department of Immigration", url: "https://immigration.go.ke" },
    ],
    sources: [
      {
        label: "HapaKenya: How to apply for a Kenyan passport on eCitizen",
        url: "https://hapakenya.com/2025/02/08/to-apply-for-a-kenyan-passport-on-ecitizen/",
      },
    ],
    service: "ecitizen",
    government: true,
  },
  {
    slug: "hef-funding",
    title: "HEF (HELB & scholarship) application",
    short: "HEF / HELB",
    summary: "First-year students apply for university and TVET funding on the HEF portal. The window opens once a year for about 60 days.",
    checked: "October 2026",
    context: [
      "After KUCCPS placement, students apply on the Higher Education Financing (HEF) portal for scholarships and HELB loans. The 2026 window closed on 8 September 2026.",
      "Most applications go wrong on phone numbers. The student, both parents and both guarantors each need a number registered in their own name.",
    ],
    checklist: [
      { id: "index", label: "KCPE and KCSE index numbers and exam years" },
      { id: "id", label: "Student's National ID or Maisha card (if 18 or over)" },
      { id: "email", label: "Student's email address and phone number (registered in the student's name)" },
      { id: "admission", label: "Admission number and admission letter" },
      { id: "photo", label: "A passport-size photo of the student" },
      { id: "parents", label: "Both parents' ID numbers and registered phone numbers" },
      { id: "guarantors", label: "Two guarantors' ID numbers and registered phone numbers" },
      { id: "death", label: "Death certificate as a PDF, if a parent has died" },
      { id: "sponsor", label: "Secondary-school sponsorship letter as a PDF, if you were sponsored" },
    ],
    tips: [
      "Bring paper documents and we'll scan them to PDF at the right size.",
      "Don't wait for the last week. The portal slows down as the deadline nears.",
    ],
    official: [
      { label: "HEF portal", url: "https://www.hef.co.ke" },
      { label: "HELB", url: "https://www.helb.co.ke" },
      { label: "KUCCPS", url: "https://students.kuccps.ac.ke" },
    ],
    sources: [
      {
        label: "Kenyans.co.ke: University Fund lists documents students must submit",
        url: "https://www.kenyans.co.ke/news/125199-university-fund-lists-documents-students-must-submit-get-scholarships-ahead-september",
      },
      {
        label: "K24: How to apply for a HELB first-time loan in 2026",
        url: "https://k24.digital/lifestyle/money/how-to-apply-for-a-helb-first-time-loan-in-2026",
      },
    ],
    service: "student-funding",
    government: true,
  },
  {
    slug: "job-application",
    title: "Applying for a job",
    short: "Job application",
    summary: "What to bring so your CV, cover letter and online application get done in one visit.",
    checked: "October 2026",
    context: [
      "Most applications ask for a CV, a cover letter, and scanned certificates uploaded as PDFs. Many portals reject files over a set size, so compression matters.",
    ],
    checklist: [
      { id: "advert", label: "The job advert, link or a screenshot", note: "Including the deadline." },
      { id: "cv", label: "Your current CV, if you have one" },
      { id: "certs", label: "Your certificates and transcripts (originals for scanning)" },
      { id: "id", label: "Your National ID or Maisha card" },
      { id: "history", label: "Your work history: employers, dates and main duties" },
      { id: "referees", label: "Two or three referees' names, roles and phone numbers", note: "Ask them before you list them." },
      { id: "email", label: "Access to your email on your phone" },
    ],
    tips: [
      "Some government applications also ask for clearance certificates (KRA, HELB, police, EACC, CRB). Check the advert early, because these take time.",
      "A genuine employer will never ask you to pay to be considered.",
    ],
    official: [],
    sources: [],
    service: "cv-writing",
  },
  {
    slug: "printing-files",
    title: "Getting a file ready to print",
    short: "Print-ready files",
    summary: "Avoid reprints: send the right format and the right details the first time.",
    checked: "October 2026",
    context: [
      "PDF keeps your fonts and layout exactly as you see them. Word files can shift when opened on another computer.",
    ],
    checklist: [
      { id: "format", label: "Saved as PDF where possible (Word and photos are fine too)" },
      { id: "name", label: "File named with your name, e.g. \"Amina-report.pdf\"" },
      { id: "pages", label: "Which pages, if not all" },
      { id: "copies", label: "How many copies" },
      { id: "colour", label: "Black & white or colour" },
      { id: "sides", label: "Single- or double-sided" },
      { id: "finish", label: "Stapled, bound or loose" },
      { id: "when", label: "When you need to collect it" },
    ],
    tips: [
      "The print job builder puts all these details into one WhatsApp message.",
      "Printing from a phone photo of a document? Take it flat, in good light, from straight above.",
    ],
    official: [],
    sources: [],
    service: "printing",
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
