import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/(public-hero)/page";
import { faqs } from "@/content/home";

const WHATSAPP = "https://chat.whatsapp.com/HomeTestInvite";
vi.mock("@/config/external-links", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/config/external-links")>()),
  whatsappUrl: "https://chat.whatsapp.com/HomeTestInvite",
}));

const section = (id: string) => document.getElementById(id)!;
const listItems = (testId: string) => within(screen.getByTestId(testId)).getAllByRole("listitem");

/**
 * Visible body-copy words outside the FAQs (which stay text-led by design and
 * are unchanged), excluding screen-reader-only text.
 */
function visibleWordCount(container: HTMLElement) {
  const clone = container.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("script, #faqs, .sr-only").forEach((n) => n.remove());
  return (clone.textContent?.match(/[A-Za-z0-9₹'’]+/g) ?? []).length;
}

describe("Homepage — structure (unchanged information architecture)", () => {
  it("renders the sections in the exact PRD order", () => {
    const { container } = render(<HomePage />);
    const order = [...container.querySelectorAll(":scope > section")].map(
      (s) => s.id || s.getAttribute("aria-labelledby"),
    );
    expect(order).toEqual([
      "landing-hero",
      "what-is-rooffur",
      "how-it-works",
      "find-pet-care",
      "become-a-host",
      "rooffur-on-whatsapp",
      "free-or-paid-hosting",
      "community",
      "trust",
      "faqs",
      "final-cta-title",
    ]);
  });

  it("has exactly one H1 and an H2 for every other section", () => {
    render(<HomePage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Find people you can trust to care for your pet.");
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(10);
  });

  // The visual-storytelling story cut 951 → 465 words; the animated How It
  // Works story then added its approved subtitle, MEET label and photo caption.
  it("keeps visible body copy outside the FAQs near half its original 951 words", () => {
    const { container } = render(<HomePage />);
    expect(visibleWordCount(container)).toBeLessThanOrEqual(480);
  });

  it("introduces no product scope: no login, sign-up, search, forms or booking", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll("form, input, select, textarea")).toHaveLength(0);
    expect(container.textContent).not.toMatch(
      /\blog ?in\b|sign ?up|create (an )?account|book now/i,
    );
  });

  it("makes no unsupported safety claims", () => {
    const { container } = render(<HomePage />);
    expect(container.textContent).not.toMatch(
      /guarantee|background[- ]check|police|insur|certified|verified (homes|hosts)|100%/i,
    );
  });

  it("shows no fake social proof: no counts, ratings, timestamps or read receipts", () => {
    const { container } = render(<HomePage />);
    expect(container.textContent).not.toMatch(
      /\d+\s*(likes?|comments?|replies|members|followers|reviews|stars?)\b|★|rating|\b\d{1,2}:\d{2}\b|\b(seen|read)\b ✓/i,
    );
  });
});

describe("Hero", () => {
  it("contains only the agreed elements", () => {
    render(<HomePage />);
    const hero = section("landing-hero");
    expect(hero).toHaveTextContent(
      "Meet pet lovers nearby, get to know them, and choose care that feels right.",
    );
    expect(hero).toHaveTextContent("Someone you trust, for someone you love.");
    expect(within(hero).getByRole("link", { name: "Find Pet Care" })).toHaveAttribute(
      "href",
      "#find-pet-care",
    );
    expect(within(hero).getByRole("link", { name: "Become a Host" })).toHaveAttribute(
      "href",
      "#become-a-host",
    );
    expect(hero).toHaveTextContent(
      "Rooffur currently connects Pet Parents and Hosts through WhatsApp.",
    );
    // eyebrow, H1, supporting line, emotional line, WhatsApp note
    expect(hero.querySelectorAll("p, h1")).toHaveLength(5);
  });

  it("shows the approved hero photo with descriptive alt text", () => {
    render(<HomePage />);
    const photo = within(section("landing-hero")).getByRole("img");
    expect(photo.getAttribute("alt")).toMatch(/golden retriever/);
    expect(photo.getAttribute("src")).toContain("/images/hero");
  });
});

describe("Photography", () => {
  it("uses six photo placements, each with descriptive alt text", () => {
    render(<HomePage />);
    const photos = screen
      .getAllByRole("img")
      .filter((img) => img.getAttribute("src")?.startsWith("/images/"));
    expect(photos).toHaveLength(6);
    for (const photo of photos) {
      expect((photo.getAttribute("alt") ?? "").split(/\s+/).length).toBeGreaterThan(5);
    }
  });

  it("puts the diagram photos on the Pet Parent and Host cards", () => {
    render(<HomePage />);
    const [parent, , , , host] = within(screen.getByTestId("connection-diagram")).getAllByRole(
      "listitem",
      { hidden: true },
    );
    expect(within(parent!).getByRole("img").getAttribute("src")).toContain("diagram-pet-parent");
    expect(within(host!).getByRole("img").getAttribute("src")).toContain("diagram-host");
  });
});

describe("What is Rooffur?", () => {
  it("shows Pet Parent → Rooffur → Host as readable text, then Talk → Meet → Decide", () => {
    render(<HomePage />);
    const nodes = listItems("connection-diagram").filter(
      (li) => li.getAttribute("aria-hidden") !== "true",
    );
    expect(nodes.map((li) => li.textContent)).toEqual([
      "Pet ParentNeeds care",
      "Rooffur",
      "Pet lover / HostOpen to helping",
    ]);
    expect(listItems("journey-flow").map((li) => li.textContent)).toEqual([
      "Talk",
      "Meet",
      "Decide",
    ]);
    expect(section("what-is-rooffur")).toHaveTextContent(
      "Rooffur helps you connect. You decide who feels right.",
    );
  });
});

describe("How It Works", () => {
  it("has exactly five steps, each a title and one short caption (no paragraphs)", () => {
    render(<HomePage />);
    const steps = listItems("how-it-works-steps");
    expect(steps.map((s) => within(s).getByRole("heading").textContent)).toEqual([
      "Join",
      "Share",
      "Discover",
      "Meet",
      "Decide",
    ]);
    for (const step of steps) {
      const captions = step.querySelectorAll("p");
      expect(captions).toHaveLength(1);
      expect(captions[0]!.textContent!.split(/s+/).length).toBeLessThanOrEqual(7);
    }
    expect(steps[4]).toHaveTextContent("Move forward only if it feels right");
  });

  it("emphasises MEET as the trust step and ends with a real Meet & Greet photo", () => {
    render(<HomePage />);
    const steps = listItems("how-it-works-steps");
    expect(steps[3]).toHaveTextContent("Build trust here");
    for (const i of [0, 1, 2, 4]) expect(steps[i]).not.toHaveTextContent("Build trust here");
    const how = section("how-it-works");
    expect(how).toHaveTextContent(
      "From first hello to feeling comfortable — take it one step at a time.",
    );
    expect(within(how).getByText("Talk. Meet. Decide together.").tagName).toBe("FIGCAPTION");
    expect(within(how).getByRole("img").getAttribute("src")).toContain("/images/how-meet");
  });

  it("renders the final journey state on the server (no animation state set)", () => {
    render(<HomePage />);
    expect(screen.getByTestId("how-it-works-steps")).not.toHaveAttribute("data-journey");
    expect(screen.getByTestId("how-it-works-rail")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Find Pet Care", () => {
  it("uses situation chips and an icon/label checklist, with no example-request paragraph", () => {
    render(<HomePage />);
    expect(listItems("care-situations").map((li) => li.textContent)).toEqual([
      "Travelling",
      "Work",
      "Weekend away",
      "Unexpected plans",
      "Occasional help",
    ]);
    const checklist = listItems("share-checklist");
    expect(checklist).toHaveLength(8);
    for (const row of checklist) expect(row.querySelector("svg")).not.toBeNull();
    expect(section("find-pet-care")).not.toHaveTextContent(/Labrador/);
  });
});

describe("Become a Host", () => {
  it("shows four concise benefit cards", () => {
    render(<HomePage />);
    const cards = listItems("host-benefits");
    expect(cards.map((c) => within(c).getByRole("heading").textContent)).toEqual([
      "Choose your pets",
      "Your schedule",
      "Free or paid",
      "Meet first",
    ]);
  });
});

describe("WhatsApp section", () => {
  it("shows an illustrative chat clearly labelled as an example, with no fake people", () => {
    render(<HomePage />);
    const chat = screen.getByTestId("example-conversation");
    expect(within(chat).getByText("Example conversation")).toBeInTheDocument();
    expect(chat).toHaveTextContent("Looking for someone to care for my Labrador from 25–28 Oct.");
    expect(chat.querySelectorAll("img")).toHaveLength(0);
    expect(chat.textContent).not.toMatch(/\b\d{1,2}:\d{2}\b|online|typing|members/i);
  });

  it("shows Join → Share → Connect", () => {
    render(<HomePage />);
    expect(
      listItems("whatsapp-steps").map((li) => within(li).getByRole("heading").textContent),
    ).toEqual(["Join", "Share", "Connect"]);
  });
});

describe("Free or paid hosting", () => {
  it("compares ₹0 and ₹ You decide and prominently states the ₹0 commission", () => {
    render(<HomePage />);
    const options = listItems("hosting-options");
    expect(options[0]).toHaveTextContent("₹0");
    expect(options[1]).toHaveTextContent("₹ You decide");
    const strip = screen.getByTestId("commission-strip");
    expect(strip).toHaveTextContent("Rooffur commission: ₹0");
    expect(strip).toHaveTextContent("Rooffur does not currently process payments.");
    expect(
      section("free-or-paid-hosting").compareDocumentPosition(section("faqs")) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});

describe("Community", () => {
  it("shows four example conversation bubbles under an explicit example label", () => {
    render(<HomePage />);
    expect(
      within(section("community")).getByText("Example community conversations"),
    ).toBeInTheDocument();
    expect(listItems("community-examples")).toHaveLength(4);
  });
});

describe("Trust & Safety", () => {
  it("shows five icon-led principles and keeps the disclaimer visible", () => {
    render(<HomePage />);
    const principles = listItems("trust-principles");
    expect(principles.map((p) => within(p).getByRole("heading").textContent)).toEqual([
      "Meet first",
      "Ask questions",
      "Both sides choose",
      "Protect your information",
      "Report concerns",
    ]);
    for (const p of principles) expect(p.querySelector("svg")).not.toBeNull();
    expect(screen.getByTestId("trust-notice")).toHaveTextContent(
      "Rooffur helps people discover and connect. Pet Parents and Hosts are responsible for deciding whether an arrangement is right for them.",
    );
  });
});

describe("WhatsApp CTAs", () => {
  it("routes every WhatsApp CTA to the single configured URL", () => {
    render(<HomePage />);
    const links = screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("href")?.includes("whatsapp.com"));
    expect(links.map((l) => l.textContent?.replace(/\s*\(opens.*\)$/, ""))).toEqual([
      "Find Pet Care on WhatsApp",
      "Become a Host on WhatsApp",
      "Join Rooffur on WhatsApp",
      "Join the Rooffur Community",
      "Join Rooffur on WhatsApp",
    ]);
    for (const link of links) {
      expect(link).toHaveAttribute("href", WHATSAPP);
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  it("final CTA keeps one short line and links back to How It Works", () => {
    render(<HomePage />);
    expect(screen.getByText("Join Pet Parents and pet lovers on Rooffur.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See how Rooffur works" })).toHaveAttribute(
      "href",
      "#how-it-works",
    );
  });
});

describe("FAQ accordion (detailed information stays here)", () => {
  const triggers = () => within(screen.getByTestId("faq-accordion")).getAllByRole("button");

  it("lists all 10 FAQs, closed by default, answers present in the HTML", () => {
    render(<HomePage />);
    expect(triggers().map((t) => t.textContent)).toEqual(faqs.items.map((f) => f.question));
    for (const t of triggers()) expect(t).toHaveAttribute("aria-expanded", "false");
    for (const f of faqs.items) expect(screen.getByText(f.answer)).toBeInTheDocument();
  });

  it("opens and closes by mouse and keyboard; several can be open", async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const [first, second] = triggers();
    await user.click(first!);
    await user.click(second!);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(faqs.items[0].answer)).toBeVisible();
    second!.focus();
    await user.keyboard("{Enter}");
    expect(second).toHaveAttribute("aria-expanded", "false");
  });

  it("publishes FAQPage structured data matching the visible FAQs", () => {
    const { container } = render(<HomePage />);
    const data = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!.textContent!,
    );
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(10);
  });
});
