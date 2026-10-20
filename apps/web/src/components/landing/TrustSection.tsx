import { Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { sectionIds } from "@/config/navigation";
import { trust } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

/**
 * "Trust & Safety": five icon-led principles (large icon, short title, one
 * line) and the always-visible responsibility notice. No unsupported safety
 * claims (guarantees, police verification, background checks, insurance,
 * certification).
 */
export function TrustSection() {
  const id = sectionIds.trust;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-white-warm py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          id={`${id}-title`}
          eyebrow={trust.eyebrow}
          heading={trust.heading}
          supporting={trust.supporting}
        />

        <ul
          data-testid="trust-principles"
          className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5"
        >
          {trust.principles.map(({ title, caption, icon: Icon }, index) => (
            <li
              key={title}
              className={"text-center " + (index === 4 ? "sm:col-span-2 lg:col-span-1" : "")}
            >
              <span
                aria-hidden="true"
                className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-navy-600 text-amber-300 shadow-md"
              >
                <Icon className="size-8" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy-600">{title}</h3>
              <p className="mx-auto mt-1 max-w-56 text-sm leading-snug text-neutral-600">
                {caption}
              </p>
            </li>
          ))}
        </ul>

        <p
          data-testid="trust-notice"
          className="mx-auto mt-14 flex max-w-3xl gap-3 rounded-xl border border-neutral-200 bg-white/70 p-5 text-[0.9375rem] leading-relaxed text-neutral-600"
        >
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-navy-400" />
          <span>{trust.notice}</span>
        </p>
      </Container>
    </section>
  );
}
