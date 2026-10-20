import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { captureAnalytics } from "@/test/analytics";
import { WhatsAppCta } from "./WhatsAppCta";

const URL = "https://chat.whatsapp.com/UnitTestInvite";

describe("WhatsAppCta", () => {
  it("links to the configured invite in a new tab with safe rel attributes", () => {
    render(
      <WhatsAppCta source="FINAL_CTA" href={URL}>
        Join Rooffur on WhatsApp
      </WhatsAppCta>,
    );
    const link = screen.getByRole("link", { name: /Join Rooffur on WhatsApp/ });
    expect(link).toHaveAttribute("href", URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAccessibleName("Join Rooffur on WhatsApp (opens WhatsApp in a new tab)");
  });

  it("records the conversion with its source and no personal data", async () => {
    const capture = captureAnalytics();
    render(
      <WhatsAppCta source="COMMUNITY" href={URL}>
        Join the Rooffur Community
      </WhatsAppCta>,
    );
    await userEvent.click(screen.getByRole("link"));
    expect(capture.events).toEqual([
      { event: "whatsapp_cta_clicked", properties: { source: "COMMUNITY" } },
    ]);
    capture.stop();
  });

  it("renders a disabled control, not a broken link, when no URL is configured", async () => {
    const capture = captureAnalytics();
    render(
      <WhatsAppCta source="HEADER" href={null}>
        Join WhatsApp
      </WhatsAppCta>,
    );
    const control = screen.getByRole("link", { name: "Join WhatsApp" });
    expect(control).toHaveAttribute("aria-disabled", "true");
    expect(control).not.toHaveAttribute("href");
    expect(control.tagName).toBe("SPAN");
    await userEvent.click(control);
    expect(capture.events).toEqual([]);
    capture.stop();
  });
});
