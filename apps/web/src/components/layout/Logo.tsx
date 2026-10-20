import Image from "next/image";
import { cn } from "@/lib/cn";
import logoMark from "../../../public/brand/rooffur-mark.png";
import { HomeLink } from "./HomeLink";

/**
 * Official Rooffur logo (supplied by the Product Owner; original kept at
 * docs/brand/rooffur-logo-original.png). Always goes to the top of the
 * homepage — including when you are already on it.
 * Do not recreate, redesign or recolor the logo.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <HomeLink className={cn("inline-flex min-h-11 items-center rounded-md", className)}>
      <Image src={logoMark} alt="Rooffur" priority className="h-10 w-auto" />
    </HomeLink>
  );
}
