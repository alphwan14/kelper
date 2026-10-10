/**
 * Stock photography registry. Licences and sources are in image-credits.json
 * and published on /credits. These are illustrative stock photos, NOT Kelper's
 * projects, sites, staff, yard or equipment. Replace with genuine company
 * photos when available (add an entry with source "Kelper Investments Ltd").
 */
import credits from "./image-credits.json";

export type ImageSlot =
  | "hero"
  | "frame"
  | "construction"
  | "engineering"
  | "supplies"
  | "steel"
  | "plans"
  | "coast"
  | "finishing";

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

export function imageFor(slot: ImageSlot): StockImage {
  const found = stockImages.find((i) => i.slot === slot);
  if (!found) throw new Error(`No image registered for slot "${slot}"`);
  return found;
}
