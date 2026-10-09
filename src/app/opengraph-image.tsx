import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { business } from "@/config/business";
import { imageFor } from "@/content/images";

export const alt = "Kelper, Mombasa: paperwork, sorted. Printing, CVs and online forms.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read at module scope so the image is generated once at build time.
const photo = await readFile(join(process.cwd(), "public", imageFor("hero").file));
const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
// Static ExtraBold cut of Bricolage Grotesque (SIL OFL 1.1); satori cannot read variable fonts.
const display = await readFile(join(process.cwd(), "src", "assets", "BricolageGrotesque-ExtraBold.ttf"));

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f5f0e6", color: "#141414" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px", width: 640, fontFamily: "Bricolage" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="44" height="44" viewBox="0 0 32 32">
              <path d="M6 3h14l7 7v19H6z" fill="#141414" />
              <path d="M20 3v7h7z" fill="#ffc233" />
            </svg>
            <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2 }}>kelper</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 96, fontWeight: 800, letterSpacing: -4, lineHeight: 0.95 }}>Paperwork,</span>
            <span style={{ display: "flex", fontSize: 96, fontWeight: 800, letterSpacing: -4, lineHeight: 1.05 }}>
              <span style={{ background: "linear-gradient(transparent 58%, #ffc233 58%, #ffc233 92%, transparent 92%)" }}>sorted.</span>
            </span>
            <span style={{ marginTop: 24, fontSize: 30, color: "#3a3731" }}>Printing · CVs · KRA · eCitizen · HEF</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
            {business.city} · {business.phone.display}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, padding: "40px 40px 40px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" width={520} height={550} style={{ objectFit: "cover", objectPosition: "30% 50%", width: 520, height: 550 }} />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage", data: display, weight: 800, style: "normal" }] },
  );
}
