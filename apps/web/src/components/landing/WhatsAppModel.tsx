import { ArrowDown, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { buttonClasses } from "@/components/ui/button-styles";
import { WhatsAppCta } from "@/components/whatsapp/WhatsAppCta";
import { qrMatchesInvite, WHATSAPP_QR, whatsappUrl } from "@/config/external-links";
import { sectionIds } from "@/config/navigation";
import { whatsappModel } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

/**
 * "Rooffur on WhatsApp": a stylised phone with an example conversation beside
 * the Join → Share → Connect flow.
 *
 * The conversation is explicitly labelled as an example and shows no names,
 * photos, timestamps, read receipts or member counts. It is real text in the
 * DOM, so it reads correctly without images or CSS.
 */
export function WhatsAppModel() {
  const id = sectionIds.whatsapp;
  const { example } = whatsappModel;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-white-warm py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          id={`${id}-title`}
          eyebrow={whatsappModel.eyebrow}
          heading={whatsappModel.heading}
          supporting={whatsappModel.supporting}
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <figure
            data-testid="example-conversation"
            className="mx-auto w-full max-w-sm lg:mr-0 lg:ml-auto"
          >
            <figcaption className="mb-3 text-center">
              <span className="inline-flex rounded-full bg-navy-600 px-3 py-1 text-xs font-bold tracking-[0.14em] text-white uppercase">
                {example.label}
              </span>
            </figcaption>

            {/* Stylised phone */}
            <div className="rounded-[2.5rem] bg-navy-800 p-2.5 shadow-xl">
              <div className="overflow-hidden rounded-[2rem] bg-white">
                <div className="flex items-center gap-3 bg-navy-600 px-5 pt-6 pb-4 text-white">
                  <span
                    aria-hidden="true"
                    className="flex size-9 items-center justify-center rounded-full bg-white/15"
                  >
                    <Users className="size-5" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-semibold">{example.chatTitle}</span>
                </div>

                <div className="space-y-3 bg-white-warm px-4 py-5">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-3.5 text-[0.9375rem] leading-snug text-neutral-700 shadow-xs">
                    <span className="sr-only">A Pet Parent posts: </span>
                    {example.request}
                    <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-navy-500">
                      <MapPin aria-hidden="true" className="size-4 text-amber-600" />
                      {example.area}
                    </span>
                  </div>
                  {example.replies.map((reply, i) => (
                    <div
                      key={reply}
                      className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-sm bg-amber-100 p-3.5 text-[0.9375rem] leading-snug text-navy-700 shadow-xs"
                    >
                      {i === 0 ? <span className="sr-only">A pet lover replies: </span> : null}
                      {reply}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </figure>

          <div className="mx-auto w-full max-w-sm lg:mx-0">
            <ol data-testid="whatsapp-steps" className="space-y-2">
              {whatsappModel.steps.map(({ title, caption, icon: Icon }, index) => (
                <li key={title}>
                  {index > 0 ? (
                    <ArrowDown
                      aria-hidden="true"
                      className="mx-auto mb-2 size-5 text-amber-500 lg:ml-5"
                    />
                  ) : null}
                  <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4">
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber-500 text-navy-800"
                    >
                      <Icon className="size-5.5" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="text-base font-bold tracking-wide text-navy-600 uppercase">
                        {title}
                      </h3>
                      <p className="text-sm leading-snug text-neutral-600">{caption}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <WhatsAppCta
              source="WHATSAPP_SECTION"
              className={buttonClasses({
                variant: "primary",
                size: "lg",
                className: "mt-8 w-full",
              })}
            >
              {whatsappModel.cta}
            </WhatsAppCta>

            {/* Desktop visitors can join from their phone; phones just tap the button. */}
            {qrMatchesInvite(whatsappUrl) ? (
              <figure
                data-testid="whatsapp-qr"
                className="mt-5 hidden items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 lg:flex"
              >
                <Image
                  src={WHATSAPP_QR.src}
                  alt="QR code to join the Rooffur WhatsApp group"
                  width={WHATSAPP_QR.width}
                  height={WHATSAPP_QR.height}
                  sizes="112px"
                  className="size-28 shrink-0 rounded-md"
                />
                <figcaption className="text-sm leading-snug text-neutral-600">
                  <span className="block font-bold text-navy-600">On a computer?</span>
                  Scan with your phone&apos;s camera to join the Rooffur WhatsApp group.
                </figcaption>
              </figure>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
