"use client";

import { useEffect } from "react";

/**
 * Plays the How It Works journey animation once, when it scrolls into view.
 * Sets data-journey="ready" (start state) on mount and "play" when at least
 * a third of the journey is visible. Does nothing when the visitor prefers
 * reduced motion or IntersectionObserver is unavailable — the server-rendered
 * final state simply stays.
 */
export function JourneyAnimator({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (
      !el ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    el.dataset.journey = "ready";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.journey = "play";
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetId]);

  return null;
}
