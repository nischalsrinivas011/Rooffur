/**
 * External destinations configured per environment (E1 §18–§19).
 * Never hard-code these values in components or invent fallbacks: when a
 * value is missing or invalid, CTAs render disabled and development shows
 * a warning (see DevConfigWarning).
 */

const WHATSAPP_HOSTS = new Set(["chat.whatsapp.com", "wa.me", "whatsapp.com", "www.whatsapp.com"]);

/** Accepts only https links to official WhatsApp hosts; anything else is null. */
export function parseWhatsAppUrl(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  try {
    const url = new URL(raw.trim());
    return url.protocol === "https:" && WHATSAPP_HOSTS.has(url.hostname) ? url.toString() : null;
  } catch {
    return null;
  }
}

/** Accepts a single plain email address; anything else is null. */
export function parseContactEmail(raw: string | undefined): string | null {
  const value = raw?.trim();
  return value && /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/.test(value) ? value : null;
}

/**
 * Accepts a comma-separated list of email addresses. Invalid entries are
 * dropped and duplicates removed, so a typo never produces a broken link.
 */
export function parseContactEmails(raw: string | undefined): string[] {
  const valid = (raw ?? "")
    .split(",")
    .map((part) => parseContactEmail(part))
    .filter((email): email is string => email !== null);
  return [...new Set(valid)];
}

/** The Rooffur WhatsApp Community/Group invite every WhatsApp CTA opens. */
export const whatsappUrl = parseWhatsAppUrl(process.env.NEXT_PUBLIC_ROOFFUR_WHATSAPP_URL);

/**
 * QR code for the Rooffur WhatsApp group (cropped from the group's own QR
 * screen). It encodes one specific invite, so it is only shown when the
 * configured URL points at that same invite — a changed link can never be
 * paired with a stale QR. Replace the image and invite code together.
 */
export const WHATSAPP_QR = {
  src: "/whatsapp/rooffur-group-qr.png",
  inviteCode: "JuNCTQgHaUnLwkVIJ3LrLl",
  width: 716,
  height: 716,
} as const;

export function qrMatchesInvite(url: string | null): boolean {
  if (!url) return false;
  try {
    const { hostname, pathname } = new URL(url);
    return hostname === "chat.whatsapp.com" && pathname === `/${WHATSAPP_QR.inviteCode}`;
  } catch {
    return false;
  }
}

/** Rooffur admin contact addresses for questions and reporting concerns. */
export const contactEmails = parseContactEmails(process.env.NEXT_PUBLIC_ROOFFUR_CONTACT_EMAILS);

/** Environment variables that are missing or invalid, for the development warning. */
export const missingExternalConfig: string[] = [
  ...(whatsappUrl ? [] : ["NEXT_PUBLIC_ROOFFUR_WHATSAPP_URL"]),
  ...(contactEmails.length ? [] : ["NEXT_PUBLIC_ROOFFUR_CONTACT_EMAILS"]),
];
