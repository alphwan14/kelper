/**
 * Stock photography registry. Licences and sources are in image-credits.json
 * and published on /credits. These are stock photos, NOT Kelper's premises,
 * staff or customers. Replace with real shop photos when available.
 */
import credits from "./image-credits.json";

export type ImageSlot = "hero" | "printing" | "student" | "jobseeker" | "phone" | "mombasa" | "business" | "documents";

export type StockImage = {
  file: string;
  subject: string;
  alt: string;
  photographer: string;
  source: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  width: number;
  height: number;
  slot: string;
};

export const stockImages = credits as StockImage[];

/** Preferred file per slot; falls back to the first image registered for that slot. */
const preferred: Partial<Record<ImageSlot, string>> = {
  hero: "/images/hero-computer-printer-desk.jpg",
  student: "/images/student-laptop-home.jpg",
  jobseeker: "/images/jobseeker-typing-laptop.jpg",
  mombasa: "/images/mombasa-street.jpg",
};

export function imageFor(slot: ImageSlot): StockImage {
  const file = preferred[slot];
  const found =
    (file && stockImages.find((i) => i.file === file)) || stockImages.find((i) => i.slot === slot);
  if (!found) throw new Error(`No image registered for slot "${slot}"`);
  return found;
}

export const imageByFile = (file: string) => {
  const found = stockImages.find((i) => i.file === file);
  if (!found) throw new Error(`Unknown image ${file}`);
  return found;
};
