/**
 * next/image loader for the static export (no image server at runtime).
 *
 * Lifestyle photos ("/images/<slot>.webp") are pre-generated at fixed widths
 * by scripts/optimize-images.mjs; this maps each requested width to the
 * nearest generated variant so the browser gets a proper srcset.
 * Other static assets (logo, icons) are served as-is.
 */

/** Must match IMAGE_WIDTHS in scripts/optimize-images.mjs and next.config.ts. */
export const IMAGE_WIDTHS = [384, 640, 960, 1280, 1920] as const;

export default function rooffurImageLoader({ src, width }: { src: string; width: number }) {
  if (src.startsWith("/images/") && src.endsWith(".webp")) {
    const variant = IMAGE_WIDTHS.find((w) => w >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
    return src.replace(/\.webp$/, `-${variant}.webp`);
  }
  // Pre-sized static asset: the width query only keeps next/image's srcset entries distinct.
  return `${src}?w=${width}`;
}
