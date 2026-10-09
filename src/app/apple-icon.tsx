import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#f5f0e6" }}>
        <svg width="128" height="128" viewBox="0 0 32 32">
          <path d="M6 3h14l7 7v19H6z" fill="#141414" />
          <path d="M20 3v7h7z" fill="#ffc233" />
          <path d="M11 17.5h11M11 22h7" stroke="#f5f0e6" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
