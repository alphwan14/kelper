import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ActionBar } from "@/components/action-bar";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { business } from "@/config/business";
import { localBusinessSchema } from "@/lib/schema";
import "./globals.css";

/** The whole site is static — fail the build if anything makes it request-time. */
export const ensureStatic = "navigation";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["500", "700", "800"],
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const description =
  "Printing, photocopying, typing, CVs, and help with KRA, eCitizen and HEF applications in Mombasa. WhatsApp or call Kelper on +254 723 938401.";

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: "Kelper: printing, CVs & online forms in Mombasa",
    template: "%s · Kelper Mombasa",
  },
  description,
  applicationName: business.name,
  // Canonicals are set per page; a root canonical would leak onto every route.
  // openGraph/twitter are set per page via pageMetadata() (Next replaces, not merges, these objects).
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f0e6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-50 bg-marker px-4 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ActionBar />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
