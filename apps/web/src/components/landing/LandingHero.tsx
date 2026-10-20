import { Dog, Heart, House } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HEADER_BOUNDARY_ATTRIBUTE } from "@/components/layout/header-boundary";
import { buttonClasses } from "@/components/ui/button-styles";
import { sectionIds } from "@/config/navigation";
import { hero } from "@/content/home";
import { LifestyleImage } from "./LifestyleImage";

export const LANDING_HERO_ID = "landing-hero";

/**
 * Homepage hero: copy + CTAs (~45%) beside a large lifestyle photo (~55%).
 * On mobile the photo follows the CTAs. Both CTAs are plain in-page anchors.
 * The section slides behind the sticky header and marks itself as the
 * header boundary.
 */
export function LandingHero() {
  const boundary = { [HEADER_BOUNDARY_ATTRIBUTE]: "" };

  return (
    <section
      id={LANDING_HERO_ID}
      aria-labelledby="landing-hero-heading"
      {...boundary}
      className="relative isolate -mt-(--header-height) overflow-hidden bg-linear-135 from-navy-500 to-navy-700 pt-(--header-height) text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 -z-10 size-[28rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--amber-500)_15%,transparent)_0%,transparent_70%)]"
      />

      <Container className="grid items-center gap-12 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-14 lg:pt-16 lg:pb-20">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-amber-300 uppercase">
            {hero.eyebrow}
          </p>
          <h1
            id="landing-hero-heading"
            className="mt-4 font-display text-[2.5rem] leading-[1.05] font-semibold text-balance text-white sm:text-5xl lg:text-[3.5rem]"
          >
            {hero.heading}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-pretty text-white/80 sm:text-lg">
            {hero.supporting}
          </p>
          <p className="mt-4 font-display text-2xl text-amber-300 italic sm:text-[1.75rem]">
            {hero.emotionalLine}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href={`#${sectionIds.findPetCare}`}
              className={buttonClasses({
                variant: "primary",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              {hero.primaryCta}
            </a>
            <a
              href={`#${sectionIds.becomeAHost}`}
              className={buttonClasses({
                variant: "outline-inverse",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              {hero.secondaryCta}
            </a>
          </div>

          <p className="mt-6 text-sm text-white/75">{hero.channelNote}</p>
        </div>

        <LifestyleImage
          slot="hero"
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          placeholder={{ tone: "warm", icons: [House, Dog, Heart] }}
          className="aspect-4/3 w-full"
        />
      </Container>
    </section>
  );
}
