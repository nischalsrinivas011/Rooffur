import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

/** Every public page. Homepage sections are anchors, not separate URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/community-guidelines`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
