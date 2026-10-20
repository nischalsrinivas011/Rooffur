"use client";

import type { ReactNode } from "react";
import { whatsappUrl } from "@/config/external-links";
import { track, type WhatsAppCtaSource } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type WhatsAppCtaProps = {
  children: ReactNode;
  /** Where on the site this CTA sits, for conversion analytics. */
  source: WhatsAppCtaSource;
  className?: string;
  /** Override for tests; defaults to the configured invite URL. */
  href?: string | null;
};

/**
 * The one way to link to the Rooffur WhatsApp community (E1 §18). Every
 * WhatsApp CTA renders through this component so they all share the single
 * configured URL. Opens in a new tab.
 *
 * If no valid URL is configured, renders a visibly disabled control rather
 * than sending visitors somewhere invalid.
 */
export function WhatsAppCta({ children, source, className, href = whatsappUrl }: WhatsAppCtaProps) {
  if (!href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        data-whatsapp-cta="unconfigured"
        title="The WhatsApp invite link isn't configured yet."
        className={cn(className, "cursor-not-allowed opacity-60 hover:translate-y-0")}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-cta={source}
      className={className}
      onClick={() => track("whatsapp_cta_clicked", { source })}
    >
      {children} <span className="sr-only">(opens WhatsApp in a new tab)</span>
    </a>
  );
}
