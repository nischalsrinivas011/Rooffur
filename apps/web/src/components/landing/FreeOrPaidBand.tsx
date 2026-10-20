import { Container } from "@/components/layout/Container";
import { sectionIds } from "@/config/navigation";
import { freeOrPaid } from "@/content/home";

/**
 * "Hosting can be free or paid": a visual ₹0 vs ₹ You decide comparison and
 * a prominent "Rooffur commission: ₹0" strip, on a compact navy band before
 * the FAQs.
 */
export function FreeOrPaidBand() {
  const id = sectionIds.freeOrPaid;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate overflow-hidden bg-navy-600 py-16 text-white sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--amber-500)_12%,transparent)_0%,transparent_70%)]"
      />
      <Container>
        <h2
          id={`${id}-title`}
          className="text-center font-display text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl"
        >
          {freeOrPaid.heading}
        </h2>

        <ul
          data-testid="hosting-options"
          className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          {freeOrPaid.options.map(({ amount, title, caption, icon: Icon }) => (
            <li
              key={title}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center transition-[transform,background-color] duration-(--duration-base) ease-standard hover:-translate-y-0.5 hover:bg-white/8 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-300"
              >
                <Icon className="size-6" strokeWidth={2} />
              </span>
              <p className="mt-4 font-display text-5xl leading-none font-semibold text-amber-300">
                {amount}
              </p>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-white/75">{caption}</p>
            </li>
          ))}
        </ul>

        <div data-testid="commission-strip" className="mx-auto mt-6 max-w-3xl text-center">
          <p className="rounded-xl bg-amber-500 px-6 py-4 text-xl font-bold text-navy-800 sm:text-2xl">
            {freeOrPaid.commission}
          </p>
          <p className="mt-3 text-sm text-white/75">{freeOrPaid.clarification}</p>
        </div>
      </Container>
    </section>
  );
}
