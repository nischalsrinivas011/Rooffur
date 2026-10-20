import { Container } from "@/components/layout/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/watermelon-ui/accordion";
import { sectionIds } from "@/config/navigation";
import { faqs } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

/** FAQPage structured data built from the same approved copy the page shows. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/**
 * FAQs (E1 §15) using the Watermelon UI accordion (Radix). Behaviour is
 * consistent: any number of answers can be open at once; all start closed.
 * Triggers expose aria-expanded; answers are in the server-rendered HTML.
 */
export function Faqs() {
  const id = sectionIds.faqs;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading id={`${id}-title`} eyebrow={faqs.eyebrow} heading={faqs.heading} />

        <Accordion
          type="multiple"
          data-testid="faq-accordion"
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-neutral-200 bg-white px-5 sm:px-8"
        >
          {faqs.items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index + 1}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>

      <script
        type="application/ld+json"
        // Static, trusted content from src/content/home.ts.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
