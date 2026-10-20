import type { Metadata } from "next";
import { BecomeAHost } from "@/components/landing/BecomeAHost";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { Faqs } from "@/components/landing/Faqs";
import { FinalCta } from "@/components/landing/FinalCta";
import { FindPetCare } from "@/components/landing/FindPetCare";
import { FreeOrPaidBand } from "@/components/landing/FreeOrPaidBand";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LandingHero } from "@/components/landing/LandingHero";
import { TrustSection } from "@/components/landing/TrustSection";
import { WhatIsRooffur } from "@/components/landing/WhatIsRooffur";
import { WhatsAppModel } from "@/components/landing/WhatsAppModel";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

/*
 * The Rooffur homepage (Epic E1 — Discovery & WhatsApp Community Website).
 * Section order is fixed by the PRD (§3) and identical on mobile and desktop.
 */
export default function HomePage() {
  return (
    <>
      <LandingHero />
      <WhatIsRooffur />
      <HowItWorks />
      <FindPetCare />
      <BecomeAHost />
      <WhatsAppModel />
      <FreeOrPaidBand />
      <CommunitySection />
      <TrustSection />
      <Faqs />
      <FinalCta />
    </>
  );
}
