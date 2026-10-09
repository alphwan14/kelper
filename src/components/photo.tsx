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
  crop?: boolean;
  lightCrop?: boolean;
};

/** Art-directed photo with optional printer's crop marks. */
export function Photo({
  image,
  aspect = "aspect-[4/3]",
  sizes,
  preload = false,
  position = "50% 50%",
  className = "",
  crop = true,
  lightCrop = false,
}: PhotoProps) {
  return (
    <div className={`${crop ? "crop" : ""} ${lightCrop ? "crop-light" : ""} ${className}`}>
      <div className={`relative overflow-hidden bg-stone ${aspect}`}>
        <Image
          src={image.file}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}
