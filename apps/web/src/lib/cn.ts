import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the Rooffur-specific theme keys so overrides resolve correctly.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      shadow: ["cta", "cta-hover", "amber"],
    },
  },
});

/** Joins class names, skipping falsy values; later Tailwind classes win conflicts. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
