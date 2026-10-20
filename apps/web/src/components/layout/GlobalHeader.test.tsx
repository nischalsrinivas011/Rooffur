import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GlobalHeader } from "./GlobalHeader";

const WHATSAPP = "https://chat.whatsapp.com/HeaderTestInvite";
vi.mock("@/config/external-links", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/config/external-links")>()),
  whatsappUrl: "https://chat.whatsapp.com/HeaderTestInvite",
}));

const EXPECTED_NAV = [
  ["How It Works", "/#how-it-works"],
  ["Find Pet Care", "/#find-pet-care"],
  ["Become a Host", "/#become-a-host"],
  ["Community", "/#community"],
  ["Trust & Safety", "/#trust"],
  ["FAQs", "/#faqs"],
];

const hamburger = () => screen.getByRole("button", { name: /navigation menu/i });
const navLinks = (container: HTMLElement) =>
  within(within(container).getByRole("navigation", { name: "Main" }))
    .getAllByRole("link")
    .map((l) => [l.textContent, l.getAttribute("href")]);

describe("GlobalHeader", () => {
  it("links the official logo to the homepage", () => {
    render(<GlobalHeader />);
    const logo = screen.getByRole("img", { name: "Rooffur" });
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it("shows the six section links in the agreed order", () => {
    const { container } = render(<GlobalHeader />);
    expect(navLinks(container)).toEqual(EXPECTED_NAV);
  });

  it("shows Join WhatsApp as the primary CTA, opening the configured invite", () => {
    render(<GlobalHeader />);
    const cta = screen.getByRole("link", { name: /^Join WhatsApp/ });
    expect(cta).toHaveAttribute("href", WHATSAPP);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveClass("bg-amber-500");
  });

  it("has no login, sign-up or account links", () => {
    const { container } = render(<GlobalHeader />);
    expect(container.textContent).not.toMatch(/log ?in|sign ?up|join rooffur|account/i);
  });
});

describe("GlobalHeader — mobile drawer", () => {
  it("places the hamburger before the logo and exposes its state", () => {
    render(<GlobalHeader />);
    const logo = screen.getByRole("link", { name: "Rooffur" });
    expect(
      hamburger().compareDocumentPosition(logo) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(hamburger()).toHaveAccessibleName("Open navigation menu");
    expect(hamburger()).toHaveAttribute("aria-expanded", "false");
  });

  it("opens with every section link plus a full-width Join WhatsApp, with focus inside", async () => {
    const user = userEvent.setup();
    render(<GlobalHeader />);
    await user.click(hamburger());
    const drawer = await screen.findByRole("dialog", { name: "Navigation menu" });
    expect(drawer).toContainElement(document.activeElement as HTMLElement);
    expect(navLinks(drawer)).toEqual(EXPECTED_NAV);
    expect(within(drawer).getByRole("link", { name: /Join WhatsApp/ })).toHaveAttribute(
      "href",
      WHATSAPP,
    );
  });

  it("closes via the close button, Escape, and selecting a link", async () => {
    const user = userEvent.setup();
    render(<GlobalHeader />);
    const trigger = hamburger();

    await user.click(trigger);
    await user.click(
      within(await screen.findByRole("dialog")).getByRole("button", {
        name: "Close navigation menu",
      }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(trigger);
    await user.click(within(await screen.findByRole("dialog")).getByRole("link", { name: "FAQs" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("traps keyboard focus inside the open drawer", async () => {
    const user = userEvent.setup();
    render(<GlobalHeader />);
    const trigger = hamburger();
    trigger.focus();
    await user.keyboard("{Enter}");
    const drawer = await screen.findByRole("dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    for (let i = 0; i < 12; i++) {
      await user.tab();
      expect(drawer).toContainElement(document.activeElement as HTMLElement);
    }
  });
});
