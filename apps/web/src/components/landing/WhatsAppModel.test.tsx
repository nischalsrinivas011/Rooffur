import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WhatsAppModel } from "./WhatsAppModel";

const config = vi.hoisted(() => ({ url: "https://chat.whatsapp.com/JuNCTQgHaUnLwkVIJ3LrLl" }));
vi.mock("@/config/external-links", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/config/external-links")>();
  return {
    ...actual,
    get whatsappUrl() {
      return config.url;
    },
  };
});

describe("WhatsAppModel — group QR code", () => {
  it("shows the QR (with descriptive alt text) when the link is the group it encodes", () => {
    render(<WhatsAppModel />);
    const qr = screen.getByTestId("whatsapp-qr");
    expect(
      screen.getByRole("img", { name: "QR code to join the Rooffur WhatsApp group" }),
    ).toHaveAttribute("src", "/whatsapp/rooffur-group-qr.png");
    // Desktop only: phone visitors tap the button instead.
    expect(qr).toHaveClass("hidden", "lg:flex");
  });

  it("hides the QR when a different WhatsApp link is configured", () => {
    config.url = "https://chat.whatsapp.com/SomeOtherInvite";
    render(<WhatsAppModel />);
    expect(screen.queryByTestId("whatsapp-qr")).not.toBeInTheDocument();
  });
});
