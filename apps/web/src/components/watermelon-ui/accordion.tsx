"use client";

/**
 * Accordion — from Watermelon UI (https://ui.watermelon.sh, registry item
 * `accordion`, built on Radix Accordion + Lucide), copied in per Watermelon's
 * copy-paste model and adapted for Rooffur:
 *   - shadcn theme classes (border-ring, text-muted-foreground, …) replaced
 *     with Rooffur design tokens;
 *   - Content is force-mounted and hidden when closed, so every answer is in
 *     the server-rendered HTML (SEO, find-in-page);
 *   - open/close motion uses Rooffur durations and respects reduced motion.
 */

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/cn";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-neutral-200 last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex min-h-14 flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-base font-semibold text-navy-600",
          "transition-colors duration-(--duration-fast) hover:text-navy-500",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none size-5 shrink-0 text-amber-600 transition-transform duration-(--duration-base) ease-standard group-data-[state=open]:rotate-180 motion-reduce:transition-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="accordion-content overflow-hidden text-[0.9375rem] leading-relaxed text-neutral-600 data-[state=closed]:hidden"
      {...props}
    >
      <div className={cn("pt-0 pr-9 pb-5", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
