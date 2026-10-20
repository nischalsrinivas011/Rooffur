import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlobalFooter } from "./GlobalFooter";

vi.mock("@/config/external-links", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/config/external-links")>()),
  contactEmails: ["hello@rooffur.example", "team@rooffur.example"],
}));

const linksIn = (navName: string) =>
  within(screen.getByRole("navigation", { name: navName }))
    .queryAllByRole("link")
    .map((l) => [l.textContent, l.getAttribute("href")]);

describe("GlobalFooter", () => {
  afterEach(() => vi.useRealTimers());

  it("shows the official logo and the brand statement", () => {
    render(<GlobalFooter />);
    expect(screen.getByRole("img", { name: "Rooffur" }).closest("a")).toHaveAttribute("href", "/");
    expect(
      screen.getByText(
        "Helping Pet Parents and pet lovers connect, get to know each other and build trusted care relationships.",
      ),
    ).toBeInTheDocument();
  });

  it("has the agreed Explore, Rooffur and Legal links", () => {
    render(<GlobalFooter />);
    expect(linksIn("Explore")).toEqual([
      ["How It Works", "/#how-it-works"],
      ["Find Pet Care", "/#find-pet-care"],
      ["Become a Host", "/#become-a-host"],
      ["Community", "/#community"],
      ["Trust & Safety", "/#trust"],
      ["FAQs", "/#faqs"],
    ]);
    expect(linksIn("Rooffur")).toEqual([["About", "/#what-is-rooffur"]]);
    expect(
      within(screen.getByRole("navigation", { name: "Rooffur" })).getByRole("button", {
        name: "Contact",
      }),
    ).toBeInTheDocument();
    expect(linksIn("Legal")).toEqual([
      ["Terms", "/terms"],
      ["Privacy", "/privacy"],
      ["Community Guidelines", "/community-guidelines"],
    ]);
  });

  it("does not show contact email addresses upfront", () => {
    render(<GlobalFooter />);
    expect(document.body.innerHTML).not.toMatch(/mailto:|rooffur.example/);
  });

  it("renders the current year", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2031-03-01T12:00:00Z"));
    render(<GlobalFooter />);
    const copyright = screen.getByText(
      (_, el) => el?.tagName === "P" && /^©/.test(el.textContent ?? ""),
    );
    expect(copyright).toHaveTextContent("© 2031 Rooffur");
  });

  it("shows no social links unless official accounts are configured", () => {
    const { unmount } = render(<GlobalFooter />);
    expect(screen.queryByRole("list", { name: "Rooffur on social media" })).not.toBeInTheDocument();
    unmount();

    render(
      <GlobalFooter
        socialLinks={[{ label: "Instagram", href: "https://instagram.com/rooffur" }]}
      />,
    );
    expect(screen.getByRole("list", { name: "Rooffur on social media" })).toBeInTheDocument();
  });
});
