"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { HEADER_BOUNDARY_ATTRIBUTE } from "./header-boundary";

export type HeaderVariant = "transparent" | "solid";

/** Scroll distance (px) after which the header over a hero gets a backdrop. */
const SCROLLED_THRESHOLD = 4;

/**
 * The sticky <header> element and its visual state (E1-S01 §8–§9, E1-S02 §14).
 *
 * "solid" pages are always solid white. "transparent" pages sit over a dark
 * hero that marks itself with `data-header-boundary`, and move through three
 * looks as the visitor scrolls:
 *   1. At the very top: fully transparent over the hero, light text.
 *   2. Scrolled, hero still behind the header: opaque navy backdrop, light
 *      text — so hero content never shows through the navigation.
 *   3. Past the hero: solid white with navy text.
 * If a transparent page has no boundary element, the header falls back to
 * solid so it is never unreadable.
 *
 * This is the only part of the header that needs client JavaScript; the
 * navigation inside is passed in as server-rendered children. Children style
 * the light-on-dark tone with `group-data-[header-state=transparent]/header:`.
 */
export function HeaderFrame({
  variant,
  children,
}: {
  variant: HeaderVariant;
  children: ReactNode;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const [pastBoundary, setPastBoundary] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (variant !== "transparent") return;

    // One rect read per scroll is cheap, and React skips re-rendering when
    // the booleans are unchanged, so no rAF throttling is needed.
    const update = () => {
      const boundary = document.querySelector(`[${HEADER_BOUNDARY_ATTRIBUTE}]`);
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      setPastBoundary(!boundary || boundary.getBoundingClientRect().bottom <= headerHeight);
      setScrolled(window.scrollY > SCROLLED_THRESHOLD);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [variant]);

  const state: HeaderVariant = variant === "solid" || pastBoundary ? "solid" : "transparent";
  const overHeroScrolled = state === "transparent" && scrolled;

  return (
    <header
      ref={headerRef}
      data-header-variant={variant}
      data-header-state={state}
      data-header-scrolled={overHeroScrolled || undefined}
      className={cn(
        "group/header sticky top-0 z-40 h-(--header-height) border-b",
        "transition-[background-color,border-color,box-shadow] duration-(--duration-base) ease-standard motion-reduce:transition-none",
        state === "solid" && "border-neutral-200 bg-white shadow-xs",
        state === "transparent" &&
          (overHeroScrolled
            ? "border-white/10 bg-navy-600 shadow-md"
            : "border-transparent bg-transparent"),
      )}
    >
      {children}
    </header>
  );
}
