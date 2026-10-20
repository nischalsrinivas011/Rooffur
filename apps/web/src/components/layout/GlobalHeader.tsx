import { buttonClasses } from "@/components/ui/button-styles";
import { WhatsAppCta } from "@/components/whatsapp/WhatsAppCta";
import { Container } from "./Container";
import { HeaderFrame, type HeaderVariant } from "./HeaderFrame";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";
import { PrimaryNavigation } from "./PrimaryNavigation";

/**
 * Global header (E1 §4–§5):
 *   desktop  Logo ── section links ── [Join WhatsApp]
 *   mobile   ☰ Logo ─────────────────────── [Join]
 * The short mobile label keeps "Join WhatsApp" as its accessible name.
 */
export function GlobalHeader({ variant = "solid" }: { variant?: HeaderVariant }) {
  return (
    <HeaderFrame variant={variant}>
      <Container className="flex h-full items-center gap-2 lg:gap-5">
        <MobileNavigation />
        <Logo className="shrink-0" />
        <PrimaryNavigation />
        <WhatsAppCta
          source="HEADER"
          className={buttonClasses({ variant: "primary", className: "ml-auto px-4 lg:px-5" })}
        >
          {/* Visible "Join" on mobile; the accessible name is always "Join WhatsApp". */}
          <span aria-hidden="true" className="lg:hidden">
            Join
          </span>
          <span className="sr-only lg:not-sr-only">Join WhatsApp</span>
        </WhatsAppCta>
      </Container>
    </HeaderFrame>
  );
}
