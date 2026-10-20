import { Container } from "@/components/layout/Container";
import { buttonClasses } from "@/components/ui/button-styles";
import { WhatsAppCta } from "@/components/whatsapp/WhatsAppCta";
import { sectionIds } from "@/config/navigation";
import { community } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

/**
 * "Rooffur Community": illustrative conversation bubbles under an explicit
 * "Example community conversations" label. No usernames, photos, timestamps,
 * likes, reply counts or member numbers.
 */
export function CommunitySection() {
  const id = sectionIds.community;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          id={`${id}-title`}
          eyebrow={community.eyebrow}
          heading={community.heading}
          supporting={community.supporting}
        />

        <h3 className="mt-12 text-center">
          <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold tracking-[0.14em] text-neutral-600 uppercase">
            {community.examplesLabel}
          </span>
        </h3>

        <ul
          data-testid="community-examples"
          className="mx-auto mt-6 grid max-w-4xl gap-x-8 gap-y-5 md:grid-cols-2"
        >
          {community.examples.map(({ text, icon: Icon }, index) => (
            <li
              key={text}
              className={
                "flex items-end gap-3 " +
                (index % 2 === 1 ? "md:translate-y-6 md:flex-row-reverse" : "")
              }
            >
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700"
              >
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <p
                className={
                  "rounded-2xl border border-neutral-200 bg-off-white px-5 py-4 font-display text-xl leading-snug font-semibold text-navy-600 " +
                  (index % 2 === 1
                    ? "rounded-bl-sm md:rounded-bl-2xl md:rounded-br-sm"
                    : "rounded-bl-sm")
                }
              >
                {text}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 text-center">
          <WhatsAppCta
            source="COMMUNITY"
            className={buttonClasses({
              variant: "navy",
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            {community.cta}
          </WhatsAppCta>
        </div>
      </Container>
    </section>
  );
}
