import type { ReactNode } from "react";

type Props = {
  index?: string;
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  inverse?: boolean;
  as?: "h1" | "h2";
};

/** Form-style section heading: mono field number, then a confident headline. */
export function SectionHead({ index, kicker, title, intro, id, inverse = false, as: Tag = "h2" }: Props) {
  return (
    <div className="max-w-3xl">
      <p className={`label ${inverse ? "text-paper/60!" : ""}`}>
        {index ? <span className="mr-3">§{index}</span> : null}
        {kicker}
      </p>
      <Tag id={id} className="mt-3 text-4xl leading-[0.98] font-extrabold tracking-[-0.03em] md:text-6xl">
        {title}
      </Tag>
      {intro ? (
        <p className={`mt-4 max-w-2xl text-lg ${inverse ? "text-paper/75" : "text-ink-2"}`}>{intro}</p>
      ) : null}
    </div>
  );
}
