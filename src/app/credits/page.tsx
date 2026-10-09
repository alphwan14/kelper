import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { stockImages } from "@/content/images";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Photo credits",
    description: "Credits and licences for the photography used on this website.",
    path: "/credits",
  }),
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Photo credits", href: "/credits" },
        ]}
        kicker="Credits"
        title="Photo credits"
        intro={
          <p>
            The photographs on this site are licensed stock images by the photographers below. They don&rsquo;t show
            Kelper&rsquo;s premises, staff or customers.
          </p>
        }
      />
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {stockImages.map((img) => (
            <li key={img.file}>
              <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                <Image src={img.file} alt={img.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-3 font-semibold">{img.photographer}</p>
              <p className="text-sm text-ink-3">
                <a href={img.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  {img.source}
                </a>{" "}
                ·{" "}
                <a href={img.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  {img.license}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
