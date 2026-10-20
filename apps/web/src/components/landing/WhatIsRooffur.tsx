import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { sectionIds } from "@/config/navigation";
import { whatIsRooffur } from "@/content/home";
import type { PhotoSlot } from "@/content/images";
import logoMark from "../../../public/brand/rooffur-mark.png";
import { LifestyleImage } from "./LifestyleImage";
import { SectionHeading } from "./SectionHeading";

const arrowClasses = "size-7 shrink-0 rotate-90 self-center text-amber-500 md:rotate-0";

/**
 * "What is Rooffur?" — a connection diagram instead of paragraphs:
 * Pet Parent → Rooffur → Pet lover / Host, then Talk → Meet → Decide.
 * Horizontal on desktop, stacked on mobile. Built from real text in ordered
 * lists, so it still reads correctly without CSS or images.
 */
export function WhatIsRooffur() {
  const id = sectionIds.whatIsRooffur;
  const { petParent, host, journey } = whatIsRooffur;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          id={`${id}-title`}
          eyebrow={whatIsRooffur.eyebrow}
          heading={whatIsRooffur.heading}
        />

        <ol
          data-testid="connection-diagram"
          aria-label="How Rooffur connects people"
          className="mx-auto mt-14 flex max-w-4xl flex-col items-center gap-4 md:flex-row md:items-stretch md:justify-center"
        >
          <DiagramNode {...petParent} slot="diagramPetParent" />
          <li aria-hidden="true" className="flex">
            <ArrowRight className={arrowClasses} />
          </li>
          <li className="flex w-full max-w-60 flex-col items-center justify-center self-center rounded-2xl bg-navy-600 px-6 py-6 text-white shadow-md md:w-auto">
            <Image src={logoMark} alt="" className="h-12 w-auto" />
            <span className="mt-2 font-display text-2xl font-semibold">Rooffur</span>
          </li>
          <li aria-hidden="true" className="flex">
            <ArrowRight className={arrowClasses} />
          </li>
          <DiagramNode {...host} slot="diagramHost" />
        </ol>

        <ol
          data-testid="journey-flow"
          aria-label="Then"
          className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          {journey.map(({ label, icon: Icon }, index) => (
            <li key={label} className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              {index > 0 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 rotate-90 text-neutral-400 sm:rotate-0"
                />
              ) : null}
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-base font-bold text-navy-600">
                <Icon aria-hidden="true" className="size-5 text-amber-700" strokeWidth={2} />
                {label}
              </span>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-2xl text-center font-display text-2xl leading-snug font-semibold text-navy-600 italic sm:text-[1.75rem]">
          {whatIsRooffur.emphasis}
        </p>
      </Container>
    </section>
  );
}

function DiagramNode({
  label,
  caption,
  icon: Icon,
  slot,
}: {
  label: string;
  caption: string;
  icon: (typeof whatIsRooffur.petParent)["icon"];
  slot: PhotoSlot;
}) {
  return (
    <li className="flex w-full max-w-72 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-off-white text-center md:w-auto md:flex-1">
      <LifestyleImage
        slot={slot}
        sizes="(min-width: 768px) 288px, 90vw"
        placeholder={{ tone: "warm", icons: [Icon, Icon, Icon] }}
        className="aspect-4/3 w-full rounded-none shadow-none"
      />
      <div className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.16em] text-amber-700 uppercase">
          <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
          {label}
        </span>
        <span className="mt-1 block text-lg font-semibold text-navy-600">{caption}</span>
      </div>
    </li>
  );
}
