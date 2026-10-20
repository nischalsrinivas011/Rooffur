import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { termsAndConditions } from "@/content/legal";

export const metadata: Metadata = {
  title: termsAndConditions.title,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage document={termsAndConditions} />;
}
