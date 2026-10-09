/**
 * Intent-led entry points for the task finder on the home page.
 * Written from the customer's side of the counter: "I need to…"
 */
import type { GuideSlug } from "./guides";

export type Task = {
  id: string;
  /** Completes "I need to…" */
  label: string;
  answer: string;
  help: string[];
  bring: string[];
  services: string[];
  guide?: GuideSlug;
  /** Body of the WhatsApp message (after "Hello Kelper, ") */
  whatsapp: string;
  /** Optional dedicated tool */
  tool?: { href: string; label: string };
};

export const tasks: Task[] = [
  {
    id: "print",
    label: "print or copy something",
    answer: "Send the file on WhatsApp or bring it on your phone or a flash disk.",
    help: ["Black & white and colour printing", "Photocopies, including ID copies", "Scans to PDF"],
    bring: ["The file, or the original to copy", "Number of copies"],
    services: ["printing", "photocopying", "scanning"],
    guide: "printing-files",
    whatsapp: "I'd like to print something. Can I send the file here?",
    tool: { href: "/print", label: "Build a print job" },
  },
  {
    id: "job",
    label: "apply for a job",
    answer: "Get your CV right, write a cover letter, and get the application in properly.",
    help: ["CV written or rewritten", "Cover letter for the advert", "Online application and uploads"],
    bring: ["Old CV (if any)", "Certificates", "The job advert"],
    services: ["cv-writing", "job-applications"],
    guide: "job-application",
    whatsapp: "I'm applying for a job and need help with my CV and application.",
  },
  {
    id: "kra",
    label: "sort out KRA",
    answer: "PIN registration, nil returns and employment returns, done with you on iTax.",
    help: ["New KRA PIN", "Nil or P9 returns", "Compliance certificate"],
    bring: ["ID or Maisha card", "Access to your email", "P9 if employed"],
    services: ["kra-services"],
    guide: "nil-returns",
    whatsapp: "I need help with KRA (PIN or returns).",
  },
  {
    id: "ecitizen",
    label: "apply on eCitizen",
    answer: "Passport, good conduct and birth certificate applications, plus printing what you need to take in.",
    help: ["Account set-up", "Filling the form", "Printing forms and receipts"],
    bring: ["ID or Maisha card", "Your phone", "Supporting documents"],
    services: ["ecitizen"],
    guide: "passport",
    whatsapp: "I need help with an eCitizen application.",
  },
  {
    id: "uni",
    label: "apply for university or funding",
    answer: "KUCCPS choices and HEF (scholarship & HELB loan) applications, in before the deadline.",
    help: ["KUCCPS course application", "HEF portal application", "Scanning documents to PDF"],
    bring: ["KCSE index number", "Admission letter", "Parents' & guarantors' ID numbers"],
    services: ["student-funding"],
    guide: "hef-funding",
    whatsapp: "I need help with a KUCCPS / HEF (HELB) application.",
  },
  {
    id: "school",
    label: "help my child with homework",
    answer: "Research, typing and printing for school assignments and projects.",
    help: ["Finding suitable material", "Printing pictures and notes", "Typing projects"],
    bring: ["The assignment sheet, or a photo of it"],
    services: ["school-printing", "typing"],
    whatsapp: "I need help with my child's school assignment (research and printing).",
  },
  {
    id: "business",
    label: "print for my business",
    answer: "Price lists, menus, flyers and forms in quantity. We quote before we print.",
    help: ["Bulk printing", "Typing invoices and letterheads", "Repeat orders"],
    bring: ["The file or a sample", "Quantity and paper size"],
    services: ["business-printing"],
    whatsapp: "I'd like a quote for bulk printing for my business.",
    tool: { href: "/print", label: "Send the job details" },
  },
];
