import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { communityGuidelines } from "@/content/legal";

export const metadata: Metadata = {
  title: communityGuidelines.title,
  alternates: { canonical: "/community-guidelines" },
};

export default function CommunityGuidelinesPage() {
  return <LegalPage document={communityGuidelines} />;
}
