/**
 * Kelper's service catalogue.
 *
 * LAUNCH CHECK: the client hasn't confirmed this list yet. These are the
 * standard services of a Kenyan cybercafé (see docs/kelper-research.md).
 * Before launch, delete anything Kelper doesn't offer. Services marked
 * `needsEquipment` depend on machines the client must confirm they have.
 *
 * Copy rules: no prices, no turnaround promises, no official affiliation.
 */

import type { GuideSlug } from "./guides";
import type { ImageSlot } from "./images";

export type CategoryId = "print" | "documents" | "careers" | "online" | "study" | "business";

export type Category = {
  id: CategoryId;
  name: string;
  /** One line shown in the directory */
  line: string;
};

export const categories: Category[] = [
  { id: "print", name: "Print, copy & scan", line: "From your phone, flash disk or the original." },
  { id: "documents", name: "Typing & documents", line: "Handwritten to typed, messy to tidy." },
  { id: "careers", name: "CVs & job applications", line: "Get the application in, properly." },
  { id: "online", name: "Online forms & portals", line: "KRA, eCitizen and other sites, with someone beside you." },
  { id: "study", name: "Students & parents", line: "Assignments, admissions and funding forms." },
  { id: "business", name: "For businesses", line: "Bulk runs and everyday paperwork." },
];

export type Service = {
  slug: string;
  name: string;
  category: CategoryId;
  /** ≤ 90 chars — directory line & meta description lead */
  short: string;
  /** Page intro, 1–2 sentences */
  intro: string;
  includes: string[];
  bring: string[];
  goodToKnow: string[];
  /** Pre-filled WhatsApp text (after "Hello Kelper, "). Never asks for sensitive data. */
  whatsapp: string;
  guide?: GuideSlug;
  image?: ImageSlot;
  /** Involves a government portal → show the independence note */
  government?: boolean;
  /** Requires machines the client must confirm (binding, lamination, A3, colour) */
  needsEquipment?: boolean;
  /** SEO title fragment */
  seoTitle: string;
};

export const services: Service[] = [
  {
    slug: "printing",
    name: "Printing",
    category: "print",
    short: "Black & white or colour, from your phone, flash disk or WhatsApp.",
    intro:
      "Send the file, tell us how many copies and how you want them, and collect them printed. Works for one page or a full report.",
    includes: [
      "Black & white and colour printing",
      "Single- or double-sided",
      "Documents, photos, tickets, forms and boarding passes",
      "Printing straight from your phone or a flash disk",
    ],
    bring: [
      "The file on your phone or a flash disk, or send it to us on WhatsApp",
      "PDF is best: it keeps your layout exactly as it is",
    ],
    goodToKnow: [
      "Tell us page numbers if you don't need the whole document.",
      "Use the print job builder to send all the details in one message.",
    ],
    whatsapp: "I'd like to print a document. Can I send the file here?",
    guide: "printing-files",
    image: "printing",
    seoTitle: "Printing in Mombasa: black & white and colour",
  },
  {
    slug: "photocopying",
    name: "Photocopying",
    category: "print",
    short: "ID copies, certificates, notes and bulk copies of anything on paper.",
    intro: "Bring the original and we'll copy it, whether it's one ID card or a class set of notes.",
    includes: [
      "National ID and Maisha card copies (both sides on one page)",
      "Certificates, transcripts and letters",
      "Bulk copies of notes, exam papers and forms",
      "Reduce or enlarge to fit",
    ],
    bring: ["The original document", "How many copies you need"],
    goodToKnow: [
      "Copying your ID? Write what the copy is for across it (e.g. \"For HEF application only\") so it can't be reused.",
    ],
    whatsapp: "I need some photocopies. Can you help?",
    image: "documents",
    seoTitle: "Photocopying in Mombasa: ID copies, certificates & bulk",
  },
  {
    slug: "scanning",
    name: "Scanning & file fixes",
    category: "print",
    short: "Scan to PDF, merge pages, and shrink files to fit portal upload limits.",
    intro:
      "Many portals reject uploads that are too big or in the wrong format. We scan your papers and turn them into a clean PDF that fits the limit.",
    includes: [
      "Scan documents and photos to PDF or image",
      "Merge several pages into one PDF",
      "Convert Word ↔ PDF and photos → PDF",
      "Compress files to a portal's size limit",
    ],
    bring: [
      "The original papers",
      "The upload limit, if the portal states one (e.g. \"PDF, max 2MB\")",
    ],
    goodToKnow: [
      "Scans are handed to you on your phone, flash disk or WhatsApp. Ask us to delete our copy when you're done.",
    ],
    whatsapp: "I need some documents scanned to PDF. Can you help?",
    image: "documents",
    seoTitle: "Scanning & PDF conversion in Mombasa",
  },
  {
    slug: "binding-lamination",
    name: "Binding & lamination",
    category: "print",
    short: "Finish reports and protect certificates.",
    intro: "Turn loose pages into a bound report, or protect a document you'll handle often.",
    includes: ["Spiral binding for reports, projects and proposals", "Lamination for certificates, cards and notices"],
    bring: ["The printed pages, or send the file and we'll print and bind"],
    goodToKnow: [
      "Don't laminate an original certificate you may need to have certified later. Laminate a copy instead.",
    ],
    whatsapp: "I'd like to ask about binding or lamination.",
    needsEquipment: true,
    image: "printing",
    seoTitle: "Binding & lamination in Mombasa",
  },
  {
    slug: "typing",
    name: "Typing & formatting",
    category: "documents",
    short: "Handwritten notes, letters and reports typed and laid out properly.",
    intro:
      "Give us your handwritten pages or a messy draft. We type it up, fix the layout and give it back ready to print or send.",
    includes: [
      "Typing from handwritten or printed pages",
      "Official letters, applications and minutes",
      "Reports, projects and proposals formatted with headings, page numbers and a contents page",
      "Tables and simple forms",
    ],
    bring: ["Your handwritten pages or draft", "Any format your school or office requires"],
    goodToKnow: ["Longer jobs take time. Ask on WhatsApp when you can collect."],
    whatsapp: "I need a document typed. Can I send you what I have?",
    image: "student",
    seoTitle: "Typing & document formatting in Mombasa",
  },
  {
    slug: "cv-writing",
    name: "CVs & cover letters",
    category: "careers",
    short: "A clear, one-to-two-page CV and a cover letter written for the job.",
    intro:
      "We sit with you, get your experience down clearly, and lay it out so an employer can read it in a minute. Then we write a cover letter for the job you're applying for.",
    includes: [
      "New CV from scratch, or a rewrite of your old one",
      "Cover letter for a specific job advert",
      "Saved as Word and PDF so you can edit it later",
      "Printing, if you need hard copies",
    ],
    bring: [
      "Your old CV, if you have one",
      "Your certificates (or their names, years and grades)",
      "Your work history: employers, dates and duties",
      "The job advert",
      "Two referees' names and contacts (ask them first)",
    ],
    goodToKnow: ["We don't write false qualifications or experience. Employers check."],
    whatsapp: "I'd like help with my CV.",
    guide: "job-application",
    image: "jobseeker",
    seoTitle: "CV writing & cover letters in Mombasa",
  },
  {
    slug: "job-applications",
    name: "Online job applications",
    category: "careers",
    short: "Portal sign-ups, uploads and email applications, done right first time.",
    intro:
      "Government and company job portals can be fiddly. We help you register, fill in each section and upload your documents in the right format.",
    includes: [
      "Registering on job and recruitment portals",
      "Filling application forms",
      "Scanning and uploading certificates",
      "Writing and sending email applications",
    ],
    bring: [
      "Your CV and certificates",
      "Your ID",
      "Your email address, plus access to it on your phone",
      "The job advert or link",
    ],
    goodToKnow: [
      "You type your own passwords. We never need them.",
      "Real employers don't charge for a job. Be careful with adverts that ask for money.",
    ],
    whatsapp: "I need help applying for a job online.",
    guide: "job-application",
    image: "jobseeker",
    seoTitle: "Online job application help in Mombasa",
  },
  {
    slug: "kra-services",
    name: "KRA PIN & tax returns",
    category: "online",
    short: "Get a KRA PIN, file nil or employment returns, download certificates.",
    intro:
      "We help you through iTax step by step: registering a PIN, filing your annual return, or getting a compliance certificate.",
    includes: [
      "New KRA PIN registration (individuals)",
      "Nil returns",
      "Employment (P9) returns",
      "Tax Compliance Certificate applications",
      "iTax password reset through your email",
    ],
    bring: [
      "Your National ID or Maisha card",
      "Your phone, plus access to the email linked to iTax",
      "Your P9 form if you're employed",
    ],
    goodToKnow: [
      "KRA doesn't charge for PIN registration or filing. Any fee you pay us is for our assistance.",
      "From the 2026 income year, nil returns are due by 31 January.",
    ],
    whatsapp: "I need help with KRA (PIN or returns).",
    guide: "nil-returns",
    government: true,
    image: "phone",
    seoTitle: "KRA PIN & nil returns help in Mombasa",
  },
  {
    slug: "ecitizen",
    name: "eCitizen applications",
    category: "online",
    short: "Passport forms, good conduct, birth certificates and appointments.",
    intro:
      "eCitizen covers hundreds of services. We help you find the right form, fill it in, pay through the portal and print what you need to take in.",
    includes: [
      "eCitizen account set-up",
      "Passport application forms and appointment booking",
      "Police clearance (certificate of good conduct) applications",
      "Birth certificate applications",
      "Printing forms, receipts and invoices",
    ],
    bring: [
      "Your National ID or Maisha card",
      "Your phone (for the eCitizen code)",
      "Documents the service asks for: check the guide",
    ],
    goodToKnow: [
      "Official fees are paid to the government through eCitizen. The agency decides on your application, not us.",
    ],
    whatsapp: "I need help with an eCitizen application.",
    guide: "passport",
    government: true,
    image: "phone",
    seoTitle: "eCitizen application help in Mombasa",
  },
  {
    slug: "student-funding",
    name: "HEF, HELB & KUCCPS",
    category: "study",
    short: "University placement and funding applications for students.",
    intro:
      "KUCCPS course choices and Higher Education Financing (HEF) applications open once a year and close on fixed dates. We help students and parents get them in correctly.",
    includes: [
      "KUCCPS course application and revision",
      "HEF portal applications (scholarships and HELB loans)",
      "Scanning and uploading supporting documents",
      "Printing admission letters and forms",
    ],
    bring: [
      "KCSE (and KCPE) index numbers and exam years",
      "Student's ID or Maisha card, if 18 or over",
      "Admission number and letter",
      "Parents' and two guarantors' ID numbers and phone numbers",
    ],
    goodToKnow: [
      "Funding results are decided by the HEF/HELB system, not by us.",
      "The phone number must be registered in the student's own name.",
    ],
    whatsapp: "I need help with a KUCCPS / HEF (HELB) application.",
    guide: "hef-funding",
    government: true,
    image: "student",
    seoTitle: "HELB, HEF & KUCCPS application help in Mombasa",
  },
  {
    slug: "school-printing",
    name: "School assignments & research",
    category: "study",
    short: "Find, format and print what the teacher asked for.",
    intro:
      "Got a homework sheet that says \"research and print\"? Bring it. We'll help find suitable material, format it and print it.",
    includes: [
      "Researching and printing assignment material",
      "Printing pictures for projects and charts",
      "Typing and printing school projects",
    ],
    bring: ["The assignment sheet or a photo of it", "Any notes from the teacher"],
    goodToKnow: ["Colour prints cost more than black & white. Tell us which you'd prefer."],
    whatsapp: "I need help with my child's school assignment (research and printing).",
    image: "student",
    seoTitle: "School assignment printing & research in Mombasa",
  },
  {
    slug: "business-printing",
    name: "Bulk & business printing",
    category: "business",
    short: "Price lists, menus, flyers, invoices and notices, in quantity.",
    intro:
      "For shops, offices, churches and schools nearby: send what you need printed and how many, and we'll confirm a quote before we start.",
    includes: [
      "Bulk black & white and colour runs",
      "Price lists, menus, notices and flyers",
      "Typing up invoices, receipts and letterheads",
      "Repeat orders: send the same file again any time",
    ],
    bring: ["Your file, or a sample of what you want", "Quantity and paper size", "When you need it"],
    goodToKnow: ["Large orders are quoted before printing. Nothing runs until you've agreed the price."],
    whatsapp: "I'd like a quote for bulk printing for my business.",
    image: "business",
    seoTitle: "Bulk & business printing in Mombasa",
  },
  {
    slug: "computer-internet",
    name: "Computer & internet use",
    category: "business",
    short: "A computer and a connection when you need one, with help if you want it.",
    intro: "Need a proper screen and keyboard for an hour? Use one of our computers, and ask for a hand if you get stuck.",
    includes: ["Browsing, email and online forms", "Typing your own documents", "Help on hand if you need it"],
    bring: ["Your flash disk, if you're saving work", "Your own login details: we never ask for them"],
    goodToKnow: ["Always log out of your email and portals before you leave a shared computer."],
    whatsapp: "do you have a computer free to use?",
    image: "hero",
    seoTitle: "Computer & internet access in Mombasa",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const servicesInCategory = (id: CategoryId) => services.filter((s) => s.category === id);
