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

/** Drawing-style section heading: datum square, mono reference, then a firm headline. */
export function SectionHead({ index, kicker, title, intro, id, inverse = false, as: Tag = "h2" }: Props) {
  return (
    <div className="max-w-3xl">
      <p className={`label flex items-center gap-3 ${inverse ? "text-steel!" : ""}`}>
        <span className="datum" aria-hidden="true" />
        {index ? <span>{index}</span> : null}
        {index ? <span aria-hidden="true" className="h-px w-6 bg-current opacity-50" /> : null}
        <span>{kicker}</span>
      </p>
      <Tag id={id} className="mt-4 text-[2.15rem] leading-[1.02] font-extrabold tracking-[-0.02em] md:text-5xl">
        {title}
      </Tag>
      {intro ? <p className={`mt-4 max-w-2xl text-lg ${inverse ? "text-steel-light" : "text-ink-2"}`}>{intro}</p> : null}
    </div>
  );
}
