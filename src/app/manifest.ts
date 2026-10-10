import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.legalName,
    short_name: business.name,
    description: `${business.descriptor}, ${business.city}.`,
    start_url: "/",
    display: "browser",
    background_color: "#f5f3ee",
    theme_color: "#13263d",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
