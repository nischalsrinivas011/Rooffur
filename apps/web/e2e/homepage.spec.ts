import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { E2E_CONTACT_EMAILS, E2E_WHATSAPP_URL } from "../playwright.config";

/** Stub WhatsApp so clicking CTAs never leaves the test environment. */
async function stubWhatsApp(page: Page) {
  await page.context().route("https://chat.whatsapp.com/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<title>WhatsApp stub</title>",
    }),
  );
}

const whatsappLinks = (page: Page) => page.locator('a[href*="whatsapp.com"]');

test.describe("homepage content", () => {
  test("sections render in the exact PRD order", async ({ page }) => {
    await page.goto("/");
    const order = await page
      .locator("main > section")
      .evaluateAll((sections) => sections.map((s) => s.id || s.getAttribute("aria-labelledby")));
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

  test("all core content is in the static HTML (works without JavaScript)", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Find people you can trust to care for your pet.",
      }),
    ).toBeVisible();
    await expect(page.locator("#how-it-works")).toContainText(
      "Move forward only if it feels right",
    );
    await expect(page.locator("#free-or-paid-hosting")).toContainText("Rooffur commission: ₹0");
    await expect(page.locator("#free-or-paid-hosting")).toContainText(
      "Rooffur does not currently process payments.",
    );
    expect(await page.content()).toContain("No. Rooffur does not currently require an account.");
    await context.close();
  });

  test("no login, sign-up or search anywhere on the page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("form, input, select, textarea")).toHaveCount(0);
    await expect(page.getByRole("link", { name: /log ?in|sign ?up/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /log ?in|sign ?up/i })).toHaveCount(0);
  });

  test("every internal link resolves (no broken links)", async ({ page, request }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((links) => [...new Set(links.map((a) => a.getAttribute("href")!))]);
    const internal = hrefs.filter((h) => h.startsWith("/") || h.startsWith("#"));
    for (const href of internal) {
      const [path, hash] = href.startsWith("#") ? ["/", href.slice(1)] : href.split("#");
      const response = await request.get(path || "/");
      expect(response.status(), href).toBe(200);
      if (hash) await expect(page.locator(`[id="${hash}"]`), href).toHaveCount(1);
    }
  });
});

test.describe("WhatsApp CTAs", () => {
  test("every WhatsApp CTA uses the one configured URL and opens in a new tab", async ({
    page,
  }) => {
    await page.goto("/");
    const links = whatsappLinks(page);
    // Header + Find Pet Care + Become a Host + WhatsApp section + Community + Final CTA.
    await expect(links).toHaveCount(6);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", E2E_WHATSAPP_URL);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("Final CTA opens the WhatsApp invite in a new tab and records the click", async ({
    page,
  }) => {
    await stubWhatsApp(page);
    await page.goto("/");
    const events: unknown[] = [];
    await page.exposeFunction("__recordEvent", (e: unknown) => events.push(e));
    await page.evaluate(() =>
      window.addEventListener("rooffur:analytics", (e) =>
        (window as unknown as { __recordEvent: (d: unknown) => void }).__recordEvent(
          (e as CustomEvent).detail,
        ),
      ),
    );

    const finalCta = page.locator("section[aria-labelledby='final-cta-title']");
    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      finalCta.getByRole("link", { name: /Join Rooffur on WhatsApp/ }).click(),
    ]);
    await expect(popup).toHaveURL(E2E_WHATSAPP_URL);
    expect(events).toContainEqual({
      event: "whatsapp_cta_clicked",
      properties: { source: "FINAL_CTA" },
    });
  });

  test("hero CTAs scroll to the Pet Parent and Host sections", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("#landing-hero");
    await hero.getByRole("link", { name: "Find Pet Care" }).click();
    await expect(page).toHaveURL("/#find-pet-care");
    await expect(page.locator("#find-pet-care h2")).toBeInViewport();
    await page.goto("/");
    await hero.getByRole("link", { name: "Become a Host" }).click();
    await expect(page).toHaveURL("/#become-a-host");
    await expect(page.locator("#become-a-host h2")).toBeInViewport();
  });

  test("final CTA 'See how Rooffur works' scrolls to How It Works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "See how Rooffur works" }).click();
    await expect(page).toHaveURL("/#how-it-works");
    await expect(page.locator("#how-it-works h2")).toBeInViewport();
  });
});

test.describe("FAQ accordion", () => {
  test("opens and closes with mouse and keyboard, exposing expanded state", async ({ page }) => {
    await page.goto("/#faqs");
    const accordion = page.getByTestId("faq-accordion");
    const triggers = accordion.getByRole("button");
    await expect(triggers).toHaveCount(10);

    const first = triggers.nth(0);
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(
      accordion.getByText(
        /^Rooffur is a community that brings Pet Parents and pet lovers together to build trusted care relationships./,
      ),
    ).toBeVisible();

    const fifth = triggers.nth(4);
    await fifth.focus();
    await page.keyboard.press("Enter");
    await expect(fifth).toHaveAttribute("aria-expanded", "true");
    await expect(
      accordion.getByText(/Not currently\. Rooffur does not process payments/),
    ).toBeVisible();
    // Multiple answers can be open at once.
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Enter");
    await expect(fifth).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("footer", () => {
  test("Contact emails stay hidden until the Contact button is clicked", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();
    for (const email of E2E_CONTACT_EMAILS) expect(html).not.toContain(email);

    await page
      .getByRole("navigation", { name: "Rooffur" })
      .getByRole("button", { name: "Contact" })
      .click();
    const dialog = page.getByRole("dialog", { name: "Contact Rooffur" });
    await expect(dialog).toBeVisible();
    for (const email of E2E_CONTACT_EMAILS) {
      await expect(dialog.getByRole("link", { name: email })).toHaveAttribute(
        "href",
        `mailto:${email}`,
      );
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("open Contact dialog has no detectable accessibility violations", async ({ page }) => {
    await page.goto("/terms");
    await page.getByRole("button", { name: "Contact" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test("shows the current year and no social links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toContainText(`© ${new Date().getFullYear()} Rooffur`);
    await expect(page.getByRole("list", { name: "Rooffur on social media" })).toHaveCount(0);
  });

  test("legal pages show the approved documents with their date and contact links", async ({
    page,
  }) => {
    for (const [path, title, contactLinks] of [
      ["/terms", "Terms & Conditions", 2],
      ["/privacy", "Privacy & Safety Policy", 4],
      ["/community-guidelines", "Community Guidelines", 0],
    ] as const) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
      await expect(page.locator("main")).toContainText("Last updated: 20/10/2026");
      await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(contactLinks);
    }
    await expect(page.locator("main")).toContainText("Talk first. Meet first. Decide together.");
  });
});

test.describe("SEO", () => {
  test("homepage metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Rooffur | Trusted Pet Care Through Community");
    const meta = (selector: string) => page.locator(selector).getAttribute("content");
    expect(await meta('meta[name="description"]')).toBe(
      "Rooffur helps Pet Parents connect with pet lovers, talk, meet and find care that feels right for their pets. Join the Rooffur community on WhatsApp.",
    );
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(
      "https://rooffur.com",
    );
    expect(await meta('meta[property="og:title"]')).toBe(
      "Rooffur | Trusted Pet Care Through Community",
    );
    expect(await meta('meta[property="og:description"]')).toContain("Join the Rooffur community");
    expect(await meta('meta[property="og:image"]')).toBe("https://rooffur.com/og/rooffur-og.png");
    expect(await meta('meta[name="viewport"]')).toContain("width=device-width");
    await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute("href", /icon/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("robots.txt, sitemap.xml and the OG image are served", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: https://rooffur.com/sitemap.xml");

    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const path of ["/", "/terms", "/privacy", "/community-guidelines"]) {
      expect(sitemap).toContain(`<loc>https://rooffur.com${path}</loc>`);
    }

    const og = await request.get("/og/rooffur-og.png");
    expect(og.status()).toBe(200);
    expect(og.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("mobile layout", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile-only");
  });

  test("no horizontal overflow anywhere on the page at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto("/");
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 1200) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth, `at ${y}px`).toBeLessThanOrEqual(clientWidth);
    }
  });

  test("CTAs are comfortably tappable", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto("/");
    for (const link of await whatsappLinks(page).all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("How It Works becomes vertical and two-column sections stack", async ({ page }) => {
    await page.goto("/");
    const steps = await page
      .getByTestId("how-it-works-steps")
      .locator(":scope > li:not([aria-hidden])")
      .evaluateAll((items) => items.map((el) => el.getBoundingClientRect()));
    for (let i = 1; i < steps.length; i++) {
      expect(steps[i]!.top).toBeGreaterThan(steps[i - 1]!.bottom - 1);
    }
  });

  test("photo sections put heading and CTA before the photo", async ({ page }) => {
    await page.goto("/");
    for (const [sectionSel, slot, ctaName] of [
      ["#landing-hero", "hero", "Become a Host"],
      ["#find-pet-care", "petParent", /Find Pet Care on WhatsApp/],
      ["#become-a-host", "host", /Become a Host on WhatsApp/],
    ] as const) {
      const cta = await page.locator(sectionSel).getByRole("link", { name: ctaName }).boundingBox();
      const photo = await page.locator(`[data-photo-slot=${slot}]`).boundingBox();
      expect(cta!.y + cta!.height, slot).toBeLessThanOrEqual(photo!.y);
    }
  });

  test("What is Rooffur diagram stacks vertically", async ({ page }) => {
    await page.goto("/");
    const nodes = await page
      .getByTestId("connection-diagram")
      .locator(":scope > li:not([aria-hidden])")
      .evaluateAll((items) => items.map((el) => el.getBoundingClientRect().top));
    expect(nodes).toHaveLength(3);
    expect(nodes[0]!).toBeLessThan(nodes[1]!);
    expect(nodes[1]!).toBeLessThan(nodes[2]!);
  });
});

test.describe("desktop layout", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop-only");
  });

  test("How It Works is a horizontal progression of five steps", async ({ page }) => {
    await page.goto("/");
    const tops = await page
      .getByTestId("how-it-works-steps")
      .locator(":scope > li:not([aria-hidden])")
      .evaluateAll((items) => items.map((el) => Math.round(el.getBoundingClientRect().top)));
    expect(tops).toHaveLength(5);
    expect(new Set(tops).size).toBe(1);
  });

  test("photo sections alternate: hero text|photo, Pet Parents photo|text, Hosts text|photo", async ({
    page,
  }) => {
    await page.goto("/");
    const box = async (sel: string) => (await page.locator(sel).first().boundingBox())!;

    const h1 = await box("#landing-hero h1");
    const hero = await box("[data-photo-slot=hero]");
    expect(hero.x).toBeGreaterThan(h1.x + h1.width - 1);
    // Visual takes the larger share (~55%).
    expect(hero.width).toBeGreaterThan(h1.width);

    const petHeading = await box("#find-pet-care h2");
    const petPhoto = await box("[data-photo-slot=petParent]");
    expect(petPhoto.x + petPhoto.width).toBeLessThanOrEqual(petHeading.x);

    const hostHeading = await box("#become-a-host h2");
    const hostPhoto = await box("[data-photo-slot=host]");
    expect(hostPhoto.x).toBeGreaterThan(hostHeading.x);
  });

  test("diagram, WhatsApp mockup and free/paid comparison sit side by side", async ({ page }) => {
    await page.goto("/");
    // Pet Parent → Rooffur → Host on one row (vertical centres aligned).
    const centres = await page
      .getByTestId("connection-diagram")
      .locator(":scope > li:not([aria-hidden])")
      .evaluateAll((items) =>
        items.map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.left, y: r.top + r.height / 2 };
        }),
      );
    expect(centres).toHaveLength(3);
    for (const c of centres) expect(Math.abs(c.y - centres[0]!.y)).toBeLessThan(2);
    expect(centres[0]!.x).toBeLessThan(centres[1]!.x);
    expect(centres[1]!.x).toBeLessThan(centres[2]!.x);

    const phone = (await page.getByTestId("example-conversation").boundingBox())!;
    const flow = (await page.getByTestId("whatsapp-steps").boundingBox())!;
    expect(flow.x).toBeGreaterThan(phone.x + phone.width - 1);

    const options = await page
      .getByTestId("hosting-options")
      .locator(":scope > li")
      .evaluateAll((items) => items.map((el) => Math.round(el.getBoundingClientRect().top)));
    expect(new Set(options).size).toBe(1);
    await expect(page.getByTestId("commission-strip")).toContainText("Rooffur commission: ₹0");
  });
});

test.describe("design success test: answers are visible without reading paragraphs", () => {
  test("headings, labels and visuals alone convey the six key answers", async ({ page }) => {
    await page.goto("/");
    // What a scanner sees: headings, list items (chips, steps, cards, diagram),
    // links/buttons and one-line labels — but not paragraphs or FAQ answers.
    const scannable = await page.evaluate(() =>
      [...document.querySelectorAll("main h1, main h2, main h3, main li, main a, main p")]
        .filter((el) => !el.closest("#faqs"))
        .filter((el) => el.tagName !== "P" || (el.textContent ?? "").split(/\s+/).length <= 12)
        .map((el) => el.textContent ?? "")
        .join(" | "),
    );
    expect(scannable).toMatch(/Pet Parent.*Rooffur.*Pet lover \/ Host/); // what is Rooffur
    expect(scannable).toMatch(/Join.*Share.*Discover.*Meet.*Decide/); // how it works
    expect(scannable).toMatch(/WhatsApp/); // where it happens
    expect(scannable).toMatch(/₹ You decide/); // Hosts can charge
    expect(scannable).toMatch(/₹0/); // or host for free
    expect(scannable).toMatch(/Rooffur commission: ₹0/); // no commission
    expect(scannable).toMatch(/Meet first.*Ask questions/); // before choosing
  });
});

test.describe("How It Works journey animation", () => {
  const journey = (page: Page) => page.getByTestId("how-it-works-steps");

  test("waits off-screen, plays once when scrolled into view, then stays static", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(journey(page)).toHaveAttribute("data-journey", "ready");

    await journey(page).scrollIntoViewIfNeeded();
    await expect(journey(page)).toHaveAttribute("data-journey", "play");

    // The whole entrance finishes in about five seconds…
    await page.waitForTimeout(5600);
    const running = await page.evaluate(
      () =>
        document
          .getElementById("how-it-works")!
          .getAnimations({ subtree: true })
          .filter((a) => a.playState === "running").length,
    );
    // …and nothing loops afterwards.
    expect(running).toBe(0);
    const heartFill = await page
      .locator("#how-it-works-journey li")
      .nth(4)
      .locator("svg path")
      .first()
      .evaluate((p) => getComputedStyle(p).fill);
    expect(heartFill).not.toBe("none");
    expect(heartFill).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
  });

  test("with reduced motion, shows the final state immediately", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await journey(page).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(journey(page)).not.toHaveAttribute("data-journey");
    const animations = await page.evaluate(
      () => document.getElementById("how-it-works")!.getAnimations({ subtree: true }).length,
    );
    expect(animations).toBe(0);
    await context.close();
  });

  test("step text is fully readable before and during the animation", async ({ page }) => {
    await page.goto("/");
    const opacities = await page
      .locator("#how-it-works-journey h3, #how-it-works-journey p")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
    expect(opacities.every((o) => o === "1")).toBe(true);
  });
});
