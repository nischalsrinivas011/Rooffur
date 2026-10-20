import type { ReactNode } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";

/** Public pages with a hero: header starts transparent, turns solid on scroll. */
export default function HeroHeaderLayout({ children }: { children: ReactNode }) {
  return <PublicLayout headerVariant="transparent">{children}</PublicLayout>;
}
