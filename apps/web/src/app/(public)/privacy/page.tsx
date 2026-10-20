import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { privacyAndSafetyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacyAndSafetyPolicy.title,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage document={privacyAndSafetyPolicy} />;
}
