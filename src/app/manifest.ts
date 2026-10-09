import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${business.name}: printing, CVs & online forms`,
    short_name: business.name,
    description: `Printing, typing, CVs and online application help in ${business.city}.`,
    start_url: "/",
    display: "browser",
    background_color: "#f5f0e6",
    theme_color: "#141414",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
