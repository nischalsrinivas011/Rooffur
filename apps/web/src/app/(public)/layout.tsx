import type { ReactNode } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";

/** Standard public pages: solid header from the start. */
export default function SolidHeaderLayout({ children }: { children: ReactNode }) {
  return <PublicLayout headerVariant="solid">{children}</PublicLayout>;
}
