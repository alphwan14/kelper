import { ImageResponse } from "next/og";
import { MARK_PATHS } from "@/components/wordmark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#13263d" }}>
        <svg width="150" height="150" viewBox="0 0 32 32">
          <path d={MARK_PATHS.column} fill="#f5f3ee" />
          <path d={MARK_PATHS.upper} fill="#f5f3ee" />
          <path d={MARK_PATHS.lower} fill="#e2702f" />
        </svg>
      </div>
    ),
    size,
  );
}
