import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactDialog } from "./ContactDialog";

const EMAILS = ["hello@rooffur.example", "team@rooffur.example"];

describe("ContactDialog", () => {
  it("shows only a Contact button until it is clicked", () => {
    const { container } = render(<ContactDialog emails={EMAILS} />);
    expect(screen.getByRole("button", { name: "Contact" })).toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain("rooffur.example");
    expect(container.querySelector("a")).toBeNull();
  });

  it("opens a dialog listing every admin email as a mailto link, and closes", async () => {
    const user = userEvent.setup();
    render(<ContactDialog emails={EMAILS} />);
    await user.click(screen.getByRole("button", { name: "Contact" }));

    const dialog = await screen.findByRole("dialog", { name: "Contact Rooffur" });
    expect(dialog).toHaveAccessibleDescription(
      "Questions, or need to report a concern? Email the Rooffur team.",
    );
    expect(
      within(dialog)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(EMAILS.map((e) => `mailto:${e}`));

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contact" })).toHaveFocus();
  });

  it("falls back to 'coming soon' when no address is configured", () => {
    render(<ContactDialog emails={[]} />);
    expect(screen.queryByRole("button", { name: "Contact" })).not.toBeInTheDocument();
    expect(screen.getByTestId("footer-contact-unconfigured")).toHaveTextContent(
      "Contact details coming soon",
    );
  });
});
