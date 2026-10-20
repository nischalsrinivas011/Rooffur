"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { buttonClasses } from "@/components/ui/button-styles";
import { WhatsAppCta } from "@/components/whatsapp/WhatsAppCta";
import { primaryNavigation } from "@/config/navigation";
import { scrollToTop } from "@/lib/scroll-to-top";
import { Logo } from "./Logo";

const DRAWER_ID = "mobile-navigation-drawer";
const TOP = "__top__";

/**
 * Mobile hamburger + left-side navigation drawer (E1 §5).
 *
 * Radix Dialog provides the focus trap, Escape and overlay dismissal, focus
 * return to the trigger, and aria-expanded wiring. The drawer also closes
 * when any link inside it is chosen.
 */
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  // Same-page anchor (e.g. "/#faqs" while on "/") to scroll to after closing.
  const pendingAnchorId = useRef<string | null>(null);

  const closeOnLinkClick = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as Element).closest("a");
    if (!link) return;
    const url = new URL(link.href);
    const samePage =
      url.origin === window.location.origin && url.pathname === window.location.pathname;
    // "/#faqs" on the homepage → that section; the logo ("/") on the homepage → the top.
    pendingAnchorId.current = !samePage
      ? null
      : url.hash
        ? decodeURIComponent(url.hash.slice(1))
        : TOP;
    setOpen(false);
  };

  // While open, the drawer locks page scrolling, so the router's own anchor
  // scroll on click is swallowed. Scroll to the anchor once the drawer has
  // closed and released the lock.
  const scrollToPendingAnchor = () => {
    const id = pendingAnchorId.current;
    pendingAnchorId.current = null;
    if (id === TOP) setTimeout(scrollToTop, 0);
    else if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="-ml-2 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-navy-600 hover:bg-neutral-100 group-data-[header-state=transparent]/header:text-white group-data-[header-state=transparent]/header:hover:bg-white/10 lg:hidden"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-controls={DRAWER_ID}
      >
        <Menu size={24} strokeWidth={2} aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          data-testid="mobile-nav-overlay"
          className="drawer-overlay fixed inset-0 z-50 bg-navy-900/50 lg:hidden"
        />
        <Dialog.Content
          id={DRAWER_ID}
          aria-describedby={undefined}
          onClick={closeOnLinkClick}
          onCloseAutoFocus={scrollToPendingAnchor}
          className="drawer-panel fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-85 flex-col overflow-y-auto bg-white shadow-xl lg:hidden"
        >
          <div className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-neutral-100 px-4">
            <Dialog.Close
              className="-ml-2 inline-flex size-11 items-center justify-center rounded-md text-navy-600 hover:bg-neutral-100"
              aria-label="Close navigation menu"
            >
              <X size={24} strokeWidth={2} aria-hidden="true" />
            </Dialog.Close>
            <Logo />
          </div>

          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>

          <nav aria-label="Main" className="px-3 py-4">
            <ul className="flex flex-col gap-1">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center rounded-lg px-3 text-base font-semibold text-navy-600 hover:bg-neutral-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto border-t border-neutral-100 px-4 py-5">
            <WhatsAppCta
              source="MOBILE_DRAWER"
              className={buttonClasses({ variant: "primary", size: "lg", className: "w-full" })}
            >
              Join WhatsApp
            </WhatsAppCta>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
