import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { buttonClasses } from "@/components/ui/button-styles";
import { WhatsAppCta } from "@/components/whatsapp/WhatsAppCta";
import { sectionIds } from "@/config/navigation";
import { finalCta } from "@/content/home";
import logoMark from "../../../public/brand/rooffur-mark.png";

/**
 * Final call to action: the navy bookend to the hero, with the official mark
 * as its single visual element and one short line of copy.
 */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative isolate overflow-hidden bg-linear-135 from-navy-500 to-navy-700 py-20 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--amber-500)_14%,transparent)_0%,transparent_70%)]"
      />
      <Container className="text-center">
        <span className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-white/95 shadow-lg">
          <Image src={logoMark} alt="" className="h-11 w-auto" />
        </span>
        <h2
          id="final-cta-title"
          className="mx-auto max-w-3xl font-display text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl"
        >
          {finalCta.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/80 sm:text-lg">
          {finalCta.supporting}
        </p>
        <div className="mt-10 flex flex-col items-center gap-5">
          <WhatsAppCta
            source="FINAL_CTA"
            className={buttonClasses({
              variant: "primary",
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            {finalCta.cta}
          </WhatsAppCta>
          <a
            href={`#${sectionIds.howItWorks}`}
            className="inline-flex min-h-11 items-center rounded-md px-2 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            {finalCta.secondaryLink}
          </a>
        </div>
      </Container>
    </section>
  );
}
