import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ActionBar } from "@/components/action-bar";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { business } from "@/config/business";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

/** The whole site is static — fail the build if anything makes it request-time. */
export const ensureStatic = "navigation";

// Variable font: weight and width axes. Headings use the semi-condensed width (87.5%).
const display = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
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
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: `${business.legalName} | Construction, Engineering & Supplies, Mombasa`,
    template: `%s | ${business.legalName}`,
  },
  description: `${business.legalName}: ${business.descriptor.toLowerCase()} in ${business.city}, Kenya. Request a quotation for building works, engineering support or construction materials.`,
  applicationName: business.legalName,
  // Canonicals are set per page; a root canonical would leak onto every route.
  // openGraph/twitter are set per page via pageMetadata() (Next replaces, not merges, these objects).
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#13263d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-50 bg-signal px-4 py-3 font-semibold text-navy-deep focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ActionBar />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
