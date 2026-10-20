import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { communityGuidelines, privacyAndSafetyPolicy, termsAndConditions } from "@/content/legal";
import { LegalPage } from "./LegalPage";

describe("LegalPage", () => {
  it.each([
    [termsAndConditions, 18],
    [privacyAndSafetyPolicy, 13],
    [communityGuidelines, 16],
  ] as const)("renders %s.title with its date and every paragraph", (document, paragraphs) => {
    const { container } = render(<LegalPage document={document} />);
    expect(screen.getByRole("heading", { level: 1, name: document.title })).toBeInTheDocument();
    expect(screen.getByText("20/10/2026").tagName).toBe("TIME");
    expect(document.paragraphs).toHaveLength(paragraphs);
    expect(container.innerHTML).not.toMatch(/Roofur(?!f)/);
  });

  it("turns the contact addresses into mailto links", () => {
    render(<LegalPage document={termsAndConditions} />);
    expect(screen.getByRole("link", { name: "nischalsrinivas011@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:nischalsrinivas011@gmail.com",
    );
    expect(screen.getByRole("link", { name: "ranjithagowda1024@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:ranjithagowda1024@gmail.com",
    );
  });

  it("highlights the community principle in the closing panel", () => {
    render(<LegalPage document={communityGuidelines} />);
    expect(screen.getByText("Talk first. Meet first. Decide together.")).toHaveClass(
      "font-display",
    );
  });
});
