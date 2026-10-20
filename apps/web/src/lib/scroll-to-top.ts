/**
 * Scrolls the page to the very top (smoothly unless the visitor prefers
 * reduced motion), clears any #section from the URL, and moves keyboard focus
 * to the start of the main content so focus doesn't stay far down the page.
 */
export function scrollToTop(): void {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  if (window.location.hash) {
    window.history.replaceState(window.history.state, "", window.location.pathname);
  }

  document.getElementById("main-content")?.focus({ preventScroll: true });
}
