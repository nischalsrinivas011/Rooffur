import { Fragment, type ReactNode } from "react";
import type { LegalDocument } from "@/content/legal";
import { Container } from "./Container";

const EMAIL = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

/** Renders text with any email addresses turned into mailto links. */
function withEmailLinks(text: string): ReactNode {
  return text.split(EMAIL).map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={`mailto:${part}`}
        className="font-semibold break-all text-navy-500 underline decoration-navy-200 underline-offset-2 hover:decoration-navy-500"
      >
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** A long-form legal document page: title, last-updated date and readable prose. */
export function LegalPage({ document }: { document: LegalDocument }) {
  const [principleIntro, principle, ...afterPrinciple] = document.closing ?? [];

  return (
    <Container className="py-16 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <div className="border-b border-neutral-200 pb-6">
          <h1 className="font-display text-4xl font-semibold text-navy-600 sm:text-5xl">
            {document.title}
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Last updated: <time>{document.lastUpdated}</time>
          </p>
        </div>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-700">
          {document.paragraphs.map((paragraph, i) => (
            <p key={i}>{withEmailLinks(paragraph)}</p>
          ))}
        </div>

        {principleIntro ? (
          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base leading-relaxed text-neutral-700 sm:p-8">
            <p>{principleIntro}</p>
            {principle ? (
              <p className="mt-2 font-display text-2xl font-semibold text-navy-600 italic sm:text-3xl">
                {principle}
              </p>
            ) : null}
            {afterPrinciple.map((line) => (
              <p key={line} className="mt-4">
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </article>
    </Container>
  );
}
