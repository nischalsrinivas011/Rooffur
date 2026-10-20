"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { scrollToTop } from "@/lib/scroll-to-top";

/**
 * Floating "back to top" button, shown once the visitor has scrolled roughly
 * a screen down. When hidden it is `invisible`, so it is also removed from
 * the tab order and the accessibility tree.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      data-testid="back-to-top"
      onClick={scrollToTop}
      className={cn(
        "fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full bg-amber-500 text-navy-800 shadow-lg sm:right-6 sm:bottom-6",
        "transition-[opacity,transform,background-color,visibility] duration-(--duration-base) ease-standard hover:-translate-y-0.5 hover:bg-amber-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        visible ? "visible opacity-100" : "invisible translate-y-2 opacity-0",
      )}
    >
      <ArrowUp aria-hidden="true" className="size-6" strokeWidth={2.25} />
    </button>
  );
}
