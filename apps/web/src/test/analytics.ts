import { ANALYTICS_DOM_EVENT, type AnalyticsPayload } from "@/lib/analytics";

/** Collects analytics events dispatched during a test. */
export function captureAnalytics() {
  const events: AnalyticsPayload[] = [];
  const listener = (e: Event) => events.push((e as CustomEvent<AnalyticsPayload>).detail);
  window.addEventListener(ANALYTICS_DOM_EVENT, listener);
  return {
    events,
    stop: () => window.removeEventListener(ANALYTICS_DOM_EVENT, listener),
  };
}
