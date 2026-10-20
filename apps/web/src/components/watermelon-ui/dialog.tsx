"use client";

/**
 * Dialog — from Watermelon UI (https://ui.watermelon.sh, registry item
 * `dialog`), copied in per Watermelon's copy-paste model and adapted for
 * Rooffur:
 *   - built on @radix-ui/react-dialog (already used for the mobile drawer)
 *     instead of the `radix-ui` umbrella package;
 *   - Watermelon's `motion` (Framer Motion) enter/exit animation replaced by
 *     a short CSS fade/scale (globals.css: .dialog-overlay / .dialog-content)
 *     that respects prefers-reduced-motion — no animation library;
 *   - shadcn theme classes replaced with Rooffur design tokens.
 * Radix provides focus trapping, Escape/overlay dismissal and focus return.
 */

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/cn";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { showCloseButton?: boolean }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        className="dialog-overlay fixed inset-0 z-50 bg-navy-900/55"
      />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "dialog-content fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-1/2 gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl sm:max-w-md sm:p-8",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-navy-600"
          >
            <XIcon aria-hidden="true" className="size-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 pr-8", className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-display text-3xl leading-tight font-semibold text-navy-600", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-[0.9375rem] leading-relaxed text-neutral-600", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
