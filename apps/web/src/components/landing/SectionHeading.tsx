import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** id for the <h2>, referenced by the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  heading: string;
  supporting?: string;
  align?: "center" | "left";
  className?: string;
};

/**
 * Landing-section heading block: small uppercase eyebrow, Cormorant H2 and
 * supporting copy. Eyebrows are stored in sentence case and uppercased with
 * CSS so screen readers don't spell them out.
 */
export function SectionHeading({
  id,
  eyebrow,
  heading,
  supporting,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      <p className="text-xs font-bold tracking-[0.18em] text-amber-700 uppercase">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 font-display text-4xl leading-[1.1] font-semibold text-balance text-navy-600 sm:text-5xl"
      >
        {heading}
      </h2>
      {supporting ? (
        <p className="mt-5 text-base leading-relaxed text-pretty text-neutral-600 sm:text-lg">
          {supporting}
        </p>
      ) : null}
    </div>
  );
}
