/**
 * Site navigation (E1 §3–§5, §17). Header, mobile drawer and footer all render
 * from these lists, so labels, order and destinations are defined once.
 *
 * Section links use "/#id" so they work from any page: on the homepage they
 * scroll to the section, elsewhere they load the homepage at that section.
 */
export type NavItem = { label: string; href: string };

/** Homepage section anchors, in page order. */
export const sectionIds = {
  whatIsRooffur: "what-is-rooffur",
  howItWorks: "how-it-works",
  findPetCare: "find-pet-care",
  becomeAHost: "become-a-host",
  whatsapp: "rooffur-on-whatsapp",
  freeOrPaid: "free-or-paid-hosting",
  community: "community",
  trust: "trust",
  faqs: "faqs",
} as const;

const section = (id: string) => `/#${id}`;

/** Header and drawer navigation, in the required order. "Join WhatsApp" is rendered separately. */
export const primaryNavigation: readonly NavItem[] = [
  { label: "How It Works", href: section(sectionIds.howItWorks) },
  { label: "Find Pet Care", href: section(sectionIds.findPetCare) },
  { label: "Become a Host", href: section(sectionIds.becomeAHost) },
  { label: "Community", href: section(sectionIds.community) },
  { label: "Trust & Safety", href: section(sectionIds.trust) },
  { label: "FAQs", href: section(sectionIds.faqs) },
];

export type FooterLink = NavItem | { label: "Contact"; href: "contact" };
export type FooterNavGroup = { heading: string; links: readonly FooterLink[] };

/**
 * Footer navigation. "Contact" is resolved from the configured contact email
 * at render time; legal pages are honest placeholders pending approval.
 */
export const footerNavigation: readonly FooterNavGroup[] = [
  { heading: "Explore", links: primaryNavigation },
  {
    heading: "Rooffur",
    links: [
      { label: "About", href: section(sectionIds.whatIsRooffur) },
      { label: "Contact", href: "contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Community Guidelines", href: "/community-guidelines" },
    ],
  },
];
