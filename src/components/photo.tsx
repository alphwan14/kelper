import Image from "next/image";
import type { StockImage } from "@/content/images";

type PhotoProps = {
  image: StockImage;
  /** Tailwind aspect class, e.g. "aspect-[4/3]" */
  aspect?: string;
  sizes: string;
  preload?: boolean;
  /** CSS object-position, for art-directed crops */
  position?: string;
  className?: string;
  /** Mono caption set on a dimension line under the photo */
  dimension?: string;
};

/** Art-directed photo, optionally annotated with a drawing-style dimension line. */
export function Photo({ image, aspect = "aspect-[4/3]", sizes, preload = false, position = "50% 50%", className = "", dimension }: PhotoProps) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-concrete ${aspect}`}>
        <Image
          src={image.file}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          quality={70}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      {dimension ? (
        <figcaption className="dimension mt-3" aria-hidden="true">
          {dimension}
        </figcaption>
      ) : null}
    </figure>
  );
}
