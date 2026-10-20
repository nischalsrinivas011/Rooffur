export const MAIN_CONTENT_ID = "main-content";

/** First focusable element on every page; visible only when focused (E1-S01 §21). */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only rounded-lg bg-navy-600 px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60"
    >
      Skip to main content
    </a>
  );
}
