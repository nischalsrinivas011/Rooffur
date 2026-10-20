import type { ReactNode } from "react";
import { BackToTop } from "./BackToTop";
import { DevConfigWarning } from "./DevConfigWarning";
import { GlobalFooter } from "./GlobalFooter";
import { GlobalHeader } from "./GlobalHeader";
import type { HeaderVariant } from "./HeaderFrame";
import { MAIN_CONTENT_ID, SkipLink } from "./SkipLink";

type PublicLayoutProps = {
  children: ReactNode;
  /**
   * Pages opt into the hero-compatible header through their layout,
   * not through URL checks (E1-S01 §9). Defaults to solid.
   */
  headerVariant?: HeaderVariant;
};

/** Shared public page shell: header, the single <main>, footer (E1-S01 §19). */
export function PublicLayout({ children, headerVariant = "solid" }: PublicLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <GlobalHeader variant={headerVariant} />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <GlobalFooter />
      <BackToTop />
      <DevConfigWarning />
    </div>
  );
}
