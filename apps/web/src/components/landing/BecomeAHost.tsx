import { Cat, House, Sofa } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { buttonClasses } from "@/components/ui/button-styles";
import { WhatsAppCta } from "@/components/whatsapp/WhatsAppCta";
import { sectionIds } from "@/config/navigation";
import { becomeAHost } from "@/content/home";
import { LifestyleImage } from "./LifestyleImage";
import { SectionHeading } from "./SectionHeading";

/**
 * "Become a Host": content | photo on desktop (mirroring Find Pet Care),
 * with four icon benefit cards instead of explanatory paragraphs.
 */
export function BecomeAHost() {
  const id = sectionIds.becomeAHost;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-navy-50 py-20 sm:py-24 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id={`${id}-title`}
            eyebrow={becomeAHost.eyebrow}
            heading={becomeAHost.heading}
            supporting={becomeAHost.supporting}
            align="left"
          />

          <ul data-testid="host-benefits" className="mt-8 grid gap-3 sm:grid-cols-2">
            {becomeAHost.benefits.map(({ title, caption, icon: Icon }) => (
              <li
                key={title}
                className="rounded-xl border border-navy-100 bg-white p-5 transition-[transform,box-shadow] duration-(--duration-base) ease-standard hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-lg bg-amber-50 text-amber-700"
                >
                  <Icon className="size-6" strokeWidth={2} />
                </span>
                <h3 className="mt-3 text-base font-bold text-navy-600">{title}</h3>
                <p className="mt-1 text-sm leading-snug text-neutral-600">{caption}</p>
              </li>
            ))}
          </ul>

          <WhatsAppCta
            source="BECOME_A_HOST"
            className={buttonClasses({
              variant: "primary",
              size: "lg",
              className: "mt-8 w-full sm:w-auto",
            })}
          >
            {becomeAHost.cta}
          </WhatsAppCta>
        </div>

        <LifestyleImage
          slot="host"
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder={{ tone: "navy", icons: [House, Cat, Sofa] }}
          className="aspect-4/3 w-full"
        />
      </Container>
    </section>
  );
}
