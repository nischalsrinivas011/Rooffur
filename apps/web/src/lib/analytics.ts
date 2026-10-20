/**
 * Product analytics entry point. Every tracked interaction goes through
 * `track()`, so the event catalogue lives in one typed place.
 *
 * No analytics provider is connected yet. Events are dispatched as a
 * `rooffur:analytics` window event (used by tests and by a future provider
 * adapter) and logged to the console in development.
 */

/** Where a WhatsApp CTA was clicked — the site's primary conversion. */
export type WhatsAppCtaSource =
  | "HEADER"
  | "MOBILE_HEADER"
  | "MOBILE_DRAWER"
  | "FIND_PET_CARE"
  | "BECOME_A_HOST"
  | "WHATSAPP_SECTION"
  | "COMMUNITY"
  | "FINAL_CTA";

export type AnalyticsEvents = {
  whatsapp_cta_clicked: { source: WhatsAppCtaSource };
};

export type AnalyticsEventName = keyof AnalyticsEvents;

export type AnalyticsPayload<E extends AnalyticsEventName = AnalyticsEventName> = {
  event: E;
  properties: AnalyticsEvents[E];
};

export const ANALYTICS_DOM_EVENT = "rooffur:analytics";

export function track<E extends AnalyticsEventName>(
  event: E,
  properties: AnalyticsEvents[E],
): void {
  if (typeof window === "undefined") return;

  const detail: AnalyticsPayload<E> = { event, properties };
  window.dispatchEvent(new CustomEvent(ANALYTICS_DOM_EVENT, { detail }));

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, properties);
  }
}
