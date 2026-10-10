import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { MARK_PATHS } from "@/components/wordmark";
import { business } from "@/config/business";
import { imageFor } from "@/content/images";

export const alt = `${business.legalName}: ${business.descriptor}, ${business.city}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read at module scope so the image is generated once at build time.
const photo = await readFile(join(process.cwd(), "public", imageFor("hero").file));
const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
// Static semi-condensed cuts of Archivo (SIL OFL 1.1); satori cannot read variable fonts.
const extraBold = await readFile(join(process.cwd(), "src", "assets", "Archivo-SemiCondensed-ExtraBold.woff"));
const semiBold = await readFile(join(process.cwd(), "src", "assets", "Archivo-SemiCondensed-SemiBold.woff"));

const grid =
  "linear-gradient(rgba(195,204,214,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(195,204,214,0.08) 1px, transparent 1px)";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#13263d", backgroundImage: grid, backgroundSize: "48px 48px", color: "#f5f3ee", fontFamily: "Archivo" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 56px", width: 700 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="64" height="64" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="2" fill="#f5f3ee" />
              <path d={MARK_PATHS.column} fill="#13263d" />
              <path d={MARK_PATHS.upper} fill="#13263d" />
              <path d={MARK_PATHS.lower} fill="#e2702f" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: 0.5, lineHeight: 1 }}>KELPER</span>
              <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: 5, color: "#c3ccd6", marginTop: 6 }}>INVESTMENTS LTD</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 66, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.02 }}>Construction, engineering support and materials,</span>
            <span style={{ fontSize: 66, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.05, color: "#e2702f" }}>quoted clearly.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, fontWeight: 600, color: "#c3ccd6" }}>
            <div style={{ width: 14, height: 14, background: "#e2702f" }} />
            {business.city}, Kenya · {business.phone.display}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, padding: "40px 40px 40px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" width={460} height={550} style={{ objectFit: "cover", objectPosition: "40% 50%", width: 460, height: 550 }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: extraBold, weight: 800, style: "normal" },
        { name: "Archivo", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
