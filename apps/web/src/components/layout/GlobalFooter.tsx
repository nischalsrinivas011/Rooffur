import Image from "next/image";
import Link from "next/link";
import { footerNavigation } from "@/config/navigation";
import { socialLinks as configuredSocialLinks, type SocialLink } from "@/config/social";
import logoMark from "../../../public/brand/rooffur-mark.png";
import { ContactDialog } from "./ContactDialog";
import { Container } from "./Container";
import { CurrentYear } from "./CurrentYear";
import { HomeLink } from "./HomeLink";

const linkClasses =
  "inline-flex min-h-8 items-center rounded-sm text-sm text-white/75 transition-colors duration-(--duration-fast) hover:text-white";

type GlobalFooterProps = {
  /** Overrides for tests; default to environment configuration. */
  socialLinks?: readonly SocialLink[];
};

/**
 * Global footer (E1 §17). "Contact" opens a dialog with the configured admin
 * email addresses (never shown upfront, never invented in code); social
 * links render only when official accounts are configured.
 */
export function GlobalFooter({ socialLinks = configuredSocialLinks }: GlobalFooterProps) {
  return (
    <footer className="bg-navy-800 text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
          <div>
            <HomeLink className="inline-flex min-h-11 items-center rounded-md">
              <Image src={logoMark} alt="Rooffur" className="h-10 w-auto" />
            </HomeLink>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
              Helping Pet Parents and pet lovers connect, get to know each other and build trusted
              care relationships.
            </p>
          </div>

          {footerNavigation.map((group) => {
            const headingId = `footer-${group.heading.toLowerCase()}`;
            return (
              <nav key={group.heading} aria-labelledby={headingId}>
                <h2
                  id={headingId}
                  className="text-xs font-bold tracking-[0.16em] text-amber-300 uppercase"
                >
                  {group.heading}
                </h2>
                <ul className="mt-4 space-y-1.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href === "contact" ? (
                        <ContactDialog triggerClassName={linkClasses} />
                      ) : (
                        <Link href={link.href} className={linkClasses}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/65">
            © <CurrentYear initialYear={new Date().getFullYear()} /> Rooffur
          </p>

          {socialLinks.length > 0 ? (
            <ul aria-label="Rooffur on social media" className="flex flex-wrap gap-x-5 gap-y-1">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={linkClasses}
                  >
                    {link.label} <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
