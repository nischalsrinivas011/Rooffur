"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { scrollToTop } from "@/lib/scroll-to-top";

/**
 * A link to the homepage. On other pages it navigates to "/". On the
 * homepage itself (e.g. after jumping to /#faqs) a plain link to "/" leaves
 * the scroll position unchanged, so it scrolls back to the top instead.
 */
export function HomeLink({ onClick, ...props }: Omit<ComponentProps<typeof Link>, "href">) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const plainLeftClick =
      event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    if (plainLeftClick && window.location.pathname === "/") {
      event.preventDefault();
      scrollToTop();
    }
  };

  return <Link href="/" {...props} onClick={handleClick} />;
}
