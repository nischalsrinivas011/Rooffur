import { Dog, Heart, User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { buttonClasses } from "@/components/ui/button-styles";
import { WhatsAppCta } from "@/components/whatsapp/WhatsAppCta";
import { sectionIds } from "@/config/navigation";
import { findPetCare } from "@/content/home";
import { LifestyleImage } from "./LifestyleImage";
import { SectionHeading } from "./SectionHeading";

/**
 * "Find Pet Care" (Pet Parents): photo | content on desktop (content first on
 * mobile). Situations are icon chips; what to share is a compact icon/label
 * card. Nothing is collected on the website itself.
 */
export function FindPetCare() {
  const id = sectionIds.findPetCare;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-white py-20 sm:py-24 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">
          <SectionHeading
            id={`${id}-title`}
            eyebrow={findPetCare.eyebrow}
            heading={findPetCare.heading}
            supporting={findPetCare.supporting}
            align="left"
          />

          <ul
            aria-label={findPetCare.situationsLabel}
            data-testid="care-situations"
            className="mt-7 flex flex-wrap gap-2"
          >
            {findPetCare.situations.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-2 text-sm font-semibold text-amber-900"
              >
                <Icon aria-hidden="true" className="size-4.5 text-amber-700" strokeWidth={2} />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-2xl border border-neutral-200 bg-off-white p-5 sm:p-6">
            <h3 className="text-base font-bold text-navy-600">{findPetCare.shareHeading}</h3>
            <ul data-testid="share-checklist" className="mt-4 grid gap-x-4 gap-y-3 sm:grid-cols-2">
              {findPetCare.shareItems.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-[0.9375rem] text-neutral-700"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-navy-500 shadow-xs"
                  >
                    <Icon className="size-4.5" strokeWidth={2} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <WhatsAppCta
            source="FIND_PET_CARE"
            className={buttonClasses({
              variant: "primary",
              size: "lg",
              className: "mt-8 w-full sm:w-auto",
            })}
          >
            {findPetCare.cta}
          </WhatsAppCta>
        </div>

        <LifestyleImage
          slot="petParent"
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder={{ tone: "warm", icons: [User, Dog, Heart] }}
          className="aspect-4/3 w-full lg:order-1"
        />
      </Container>
    </section>
  );
}
