"use client";

import { Mail } from "lucide-react";
import { contactEmails as configuredContactEmails } from "@/config/external-links";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/watermelon-ui/dialog";

type ContactDialogProps = {
  /** Trigger styling, matching the surrounding footer links. */
  triggerClassName?: string;
  /** Override for tests; defaults to the configured admin addresses. */
  emails?: readonly string[];
};

/**
 * Footer "Contact": the admin email addresses are not shown on the page —
 * they appear only in this dialog, once the visitor asks for them. The
 * dialog content isn't rendered (or in the HTML) until it is opened.
 */
export function ContactDialog({
  triggerClassName,
  emails = configuredContactEmails,
}: ContactDialogProps) {
  if (emails.length === 0) {
    return (
      <span
        data-testid="footer-contact-unconfigured"
        className="inline-flex min-h-8 items-center text-sm text-white/50"
      >
        Contact details coming soon
      </span>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className={triggerClassName}>Contact</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Rooffur</DialogTitle>
          <DialogDescription>
            Questions, or need to report a concern? Email the Rooffur team.
          </DialogDescription>
        </DialogHeader>
        <ul data-testid="contact-emails" className="space-y-2">
          {emails.map((email) => (
            <li key={email}>
              <a
                href={`mailto:${email}`}
                className="flex min-h-12 items-center gap-3 rounded-xl border border-neutral-200 bg-off-white px-3.5 text-sm font-semibold [overflow-wrap:anywhere] text-navy-600 sm:px-4 sm:text-[0.9375rem] transition-colors hover:border-amber-300 hover:bg-amber-50"
              >
                <Mail aria-hidden="true" className="size-5 shrink-0 text-amber-600" />
                {email}
              </a>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
