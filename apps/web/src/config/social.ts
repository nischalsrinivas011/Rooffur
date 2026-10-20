/**
 * Official Rooffur social accounts (E1-S04 §37).
 * Only accounts with a configured URL are shown. Nothing is shown until the
 * Product Owner supplies real profile URLs — never add placeholder profiles.
 */
export type SocialLink = { label: string; href: string };

const configured: Array<{ label: string; href: string | undefined }> = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL },
  { label: "Facebook", href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL },
  { label: "X", href: process.env.NEXT_PUBLIC_SOCIAL_X_URL },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL },
];

export const socialLinks: readonly SocialLink[] = configured.filter(
  (link): link is SocialLink => typeof link.href === "string" && link.href.trim() !== "",
);
