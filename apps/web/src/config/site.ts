/** Site-wide metadata (E1 §24). */
export const siteConfig = {
  name: "Rooffur",
  /** Canonical origin. Override per environment with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rooffur.com").replace(/\/$/, ""),
  title: "Rooffur | Trusted Pet Care Through Community",
  description:
    "Rooffur helps Pet Parents connect with pet lovers, talk, meet and find care that feels right for their pets. Join the Rooffur community on WhatsApp.",
  /**
   * Open Graph / social share image. PLACEHOLDER: a branded navy card with the
   * official mark. Replace the file (1200×630) when final artwork is approved.
   */
  ogImage: { url: "/og/rooffur-og.png", width: 1200, height: 630, alt: "Rooffur" },
} as const;
