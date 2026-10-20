import {
  Handshake,
  Heart,
  MapPin,
  MessageCircle,
  PawPrint,
  Search,
  User,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { sectionIds } from "@/config/navigation";
import { howItWorks } from "@/content/home";
import { cn } from "@/lib/cn";
import styles from "./HowItWorks.module.css";
import { JourneyAnimator } from "./JourneyAnimator";
import { LifestyleImage } from "./LifestyleImage";
import { SectionHeading } from "./SectionHeading";

/**
 * Journey timing — must match the line in HowItWorks.module.css
 * (starts at LINE_START, takes 4 × STEP_GAP to reach the last step).
 */
const LINE_START = 200;
const STEP_GAP = 1000;
/** When the amber line reaches step i (ms). */
const stepDelay = (i: number) => (i === 0 ? 0 : LINE_START + i * STEP_GAP);
/** Paw-trail marks sit halfway between steps. */
const TRAIL = [12.5, 37.5, 62.5, 87.5];

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * "How Rooffur Works" — Join → Share → Discover → Meet → Decide as a single
 * journey that draws itself once when it scrolls into view (horizontal on
 * desktop, vertical on mobile), followed by a wide Meet & Greet photo.
 *
 * Server-rendered in its final state; JourneyAnimator (tiny client leaf)
 * only toggles data-journey so CSS can play the one-time entrance. MEET is
 * emphasised as Rooffur's core trust step. Ordered list, so the sequence
 * reads without visuals.
 */
export function HowItWorks() {
  const id = sectionIds.howItWorks;
  const journeyId = `${id}-journey`;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-white-warm py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          id={`${id}-title`}
          eyebrow={howItWorks.eyebrow}
          heading={howItWorks.heading}
          supporting={howItWorks.supporting}
        />

        <ol
          id={journeyId}
          data-testid="how-it-works-steps"
          className={cn(
            styles.journey,
            "relative mx-auto mt-12 flex max-w-sm flex-col lg:mt-16 lg:grid lg:max-w-none lg:grid-cols-5",
          )}
        >
          {howItWorks.steps.map((step, index) => {
            const featured = step.title === howItWorks.featuredStep;
            return (
              <li
                key={step.title}
                style={{ "--d": `${stepDelay(index)}ms` } as Vars}
                className={cn(
                  "relative z-10 grid h-28 grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-x-3",
                  "lg:flex lg:h-auto lg:flex-col lg:items-center lg:px-2 lg:text-center",
                  "transition-transform duration-(--duration-base) ease-standard motion-reduce:transition-none lg:hover:-translate-y-1 motion-reduce:lg:hover:translate-y-0",
                )}
              >
                <div className="flex justify-center lg:h-24 lg:items-center">
                  <StepNode index={index} featured={featured}>
                    <StepIcon index={index} icon={step.icon} />
                  </StepNode>
                </div>
                <div className="lg:mt-3">
                  <h3 className="text-lg font-bold tracking-wide text-navy-600 uppercase">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-[0.9375rem] leading-snug text-neutral-600">
                    {step.caption}
                  </p>
                  {featured ? (
                    <span className="mt-1.5 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                      {howItWorks.featuredLabel}
                    </span>
                  ) : null}
                </div>
              </li>
            );
          })}

          {/* Rail: first node centre → last node centre. Decorative. */}
          <li
            aria-hidden="true"
            data-testid="how-it-works-rail"
            className={cn(
              "pointer-events-none absolute top-14 bottom-14 left-[2.75rem] w-0",
              "lg:top-12 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-0 lg:w-auto",
            )}
          >
            <span className="absolute inset-y-0 -left-px w-0.5 bg-amber-100 lg:inset-x-0 lg:inset-y-auto lg:-top-px lg:left-0 lg:h-0.5 lg:w-auto" />
            <span
              className={cn(
                styles.fill,
                "absolute inset-y-0 -left-px w-0.5 bg-amber-500 lg:inset-x-0 lg:inset-y-auto lg:-top-px lg:left-0 lg:h-0.5 lg:w-auto",
              )}
            />
            {TRAIL.map((f, i) => (
              <span
                key={f}
                style={{ "--f": `${f}%`, "--d": `${LINE_START + (i + 0.5) * STEP_GAP}ms` } as Vars}
                className={cn(
                  styles.trailPaw,
                  "absolute top-(--f) left-0 flex size-6 -translate-1/2 items-center justify-center rounded-full bg-white-warm text-amber-500",
                  "lg:top-0 lg:left-(--f)",
                )}
              >
                <PawPrint className="size-3.5" strokeWidth={2} />
              </span>
            ))}
            <span
              className={cn(
                styles.runner,
                "absolute left-0 flex size-7 -translate-1/2 items-center justify-center rounded-full bg-amber-500 text-navy-800 shadow-md",
              )}
            >
              <PawPrint className="size-4" strokeWidth={2.25} />
            </span>
          </li>
        </ol>

        <JourneyAnimator targetId={journeyId} />

        <figure className="relative mt-14 aspect-16/9 overflow-hidden rounded-2xl shadow-lg sm:aspect-2/1 lg:mt-20 lg:aspect-3/1">
          <LifestyleImage
            slot="howMeet"
            sizes="(min-width: 1280px) 1176px, 100vw"
            placeholder={{ tone: "warm", icons: [Handshake, PawPrint, Heart] }}
            className="absolute inset-0 size-full rounded-none shadow-none"
            imageClassName="object-[50%_18%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-l from-navy-800/85 via-navy-800/30 to-transparent"
          />
          <figcaption className="absolute right-5 bottom-4 max-w-[60%] text-right font-display text-2xl leading-tight font-semibold text-white italic sm:right-8 sm:bottom-7 sm:text-4xl lg:right-12 lg:bottom-10 lg:text-5xl">
            {howItWorks.photoCaption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

function StepNode({
  index,
  featured,
  children,
}: {
  index: number;
  featured: boolean;
  children: ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        styles.node,
        "relative flex items-center justify-center rounded-full border-2 bg-white text-amber-700 shadow-sm",
        featured ? "size-20 border-amber-500 shadow-md" : "size-18 border-amber-300",
      )}
    >
      {children}
      <span className="absolute -top-1 -right-1 flex size-7 items-center justify-center rounded-full bg-navy-600 text-xs font-bold text-white">
        {String(index + 1).padStart(2, "0")}
      </span>
    </span>
  );
}

/** Each step's icon and its one-time micro-animation (see HowItWorks.module.css). */
function StepIcon({ index, icon: Icon }: { index: number; icon: LucideIcon }) {
  switch (index) {
    case 0: // Join — a conversation begins
      return (
        <span className="relative">
          <MessageCircle
            className={cn(styles.joinBubble, "absolute -top-2.5 -right-3 size-4 text-amber-400")}
            strokeWidth={2}
          />
          <MessageCircle className={cn(styles.joinIcon, "size-9")} strokeWidth={1.75} />
        </span>
      );
    case 1: // Share — pin drops in with a single ripple
      return (
        <>
          <span
            className={cn(
              styles.shareRipple,
              "absolute inset-2 rounded-full border-2 border-amber-300",
            )}
          />
          <MapPin className={cn(styles.shareIcon, "size-9")} strokeWidth={1.75} />
        </>
      );
    case 2: // Discover — magnifier sweeps; dots trail behind it
      return (
        <span className="relative">
          <span
            className={cn(
              styles.discoverDots,
              "absolute top-1/2 -left-4 flex -translate-y-1/2 gap-0.5",
            )}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{ "--i": i } as Vars}
                className="size-1 rounded-full bg-amber-300"
              />
            ))}
          </span>
          <Search className={cn(styles.discoverIcon, "size-9")} strokeWidth={1.75} />
        </span>
      );
    case 3: // Meet — person and pet come together; handshake appears between
      return (
        <span className="flex items-center gap-0.5">
          <span
            className={cn(
              styles.meetLeft,
              "flex size-5 items-center justify-center rounded-full bg-navy-50 text-navy-500",
            )}
          >
            <User className="size-3" strokeWidth={2.5} />
          </span>
          <Handshake className={cn(styles.meetHand, "size-8")} strokeWidth={1.75} />
          <span
            className={cn(
              styles.meetRight,
              "flex size-5 items-center justify-center rounded-full bg-amber-100 text-amber-700",
            )}
          >
            <PawPrint className="size-3" strokeWidth={2.5} />
          </span>
        </span>
      );
    case 4: // Decide — heart fills with amber, one pulse
      return <Heart className={cn(styles.heart, "size-9")} strokeWidth={1.75} />;
    default:
      return <Icon className="size-9" strokeWidth={1.75} />;
  }
}
