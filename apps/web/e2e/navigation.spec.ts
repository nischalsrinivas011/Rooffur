import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  { path: "/", heading: "Find people you can trust to care for your pet." },
  { path: "/terms", heading: "Terms & Conditions" },
  { path: "/privacy", heading: "Privacy & Safety Policy" },
  { path: "/community-guidelines", heading: "Community Guidelines" },
];

const SECTIONS = [
  { name: "How It Works", id: "how-it-works" },
  { name: "Find Pet Care", id: "find-pet-care" },
  { name: "Become a Host", id: "become-a-host" },
  { name: "Community", id: "community" },
  { name: "Trust & Safety", id: "trust" },
  { name: "FAQs", id: "faqs" },
];

const header = (page: Page) => page.locator("header");
const hamburger = (page: Page) => page.getByRole("button", { name: "Open navigation menu" });

async function expectNoHorizontalOverflow(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
}

/** The section's heading is fully visible below the sticky header (once scrolling settles). */
async function expectSectionClearOfHeader(page: Page, id: string) {
  await expect
    .poll(async () => {
      const headerBottom = await header(page).evaluate((el) => el.getBoundingClientRect().bottom);
      const top = await page
        .locator(`#${id} h2`)
        .first()
        .evaluate((el) => el.getBoundingClientRect().top);
      return top >= headerBottom - 1 && top < (page.viewportSize()?.height ?? 0);
    })
    .toBe(true);
}

test.describe("every page", () => {
  for (const { path, heading } of ROUTES) {
    test(`${path} renders in the shell without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
      await expect(page.locator("header")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("footer")).toHaveCount(1);
      await expect(page).toHaveTitle(/Rooffur/);
      expect(await page.content()).not.toMatch(/Roofur(?!f)/);
      await expectNoHorizontalOverflow(page);
      expect(errors).toEqual([]);
    });

    test(`${path} has no detectable accessibility violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test("removed account and marketplace routes do not exist", async ({ page }) => {
    for (const path of ["/login", "/signup", "/hosts", "/become-a-host", "/community", "/guides"]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(404);
    }
  });

  test("skip link is the first focusable element and targets main", async ({ page }) => {
    await page.goto("/terms");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });
});

test.describe("desktop navigation", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop-only");
  });

  for (const { name, id } of SECTIONS) {
    test(`${name} scrolls to #${id}, clear of the sticky header`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name }).click();
      await expect(page).toHaveURL(`/#${id}`);
      await expectSectionClearOfHeader(page, id);
    });
  }

  test("section links work from another page", async ({ page }) => {
    await page.goto("/privacy");
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "FAQs" })
      .click();
    await expect(page).toHaveURL("/#faqs");
    await expectSectionClearOfHeader(page, "faqs");
  });

  test("logo returns to the top of the homepage", async ({ page }) => {
    await page.goto("/#faqs");
    await expectSectionClearOfHeader(page, "faqs");
    await header(page).getByRole("link", { name: "Rooffur" }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  });

  test("header: transparent at top, opaque over the hero, solid white past it", async ({
    page,
  }) => {
    const background = () => header(page).evaluate((el) => getComputedStyle(el).backgroundColor);
    await page.goto("/");
    await expect(header(page)).toHaveAttribute("data-header-state", "transparent");
    await expect(header(page)).not.toHaveAttribute("data-header-scrolled");

    await page.evaluate(() => window.scrollTo({ top: 150, behavior: "instant" }));
    await expect(header(page)).toHaveAttribute("data-header-scrolled", "true");
    await expect.poll(background).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);

    await page.evaluate(() => window.scrollTo({ top: 3000, behavior: "instant" }));
    await expect(header(page)).toHaveAttribute("data-header-state", "solid");
    await expect.poll(background).toBe("rgb(255, 255, 255)");
    await expect(header(page)).toBeInViewport();
  });

  test("legal pages use the solid header", async ({ page }) => {
    await page.goto("/terms");
    await expect(header(page)).toHaveAttribute("data-header-state", "solid");
  });

  test("full navigation fits at the narrowest desktop width", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();
    await expect(header(page).getByRole("link", { name: /Join WhatsApp/ })).toBeVisible();
    await expect(hamburger(page)).toBeHidden();
    await expectNoHorizontalOverflow(page);
  });
});

test.describe("mobile navigation", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile-only");
  });

  test("header shows hamburger, logo, then Join", async ({ page }) => {
    await page.goto("/");
    const burger = await hamburger(page).boundingBox();
    const logo = await header(page).getByRole("link", { name: "Rooffur" }).boundingBox();
    const join = header(page).getByRole("link", { name: /Join WhatsApp/ });
    await expect(join).toHaveText(/^Join/);
    const joinBox = await join.boundingBox();
    expect(burger!.x).toBeLessThan(logo!.x);
    expect(logo!.x).toBeLessThan(joinBox!.x);
    expect(burger!.height).toBeGreaterThanOrEqual(44);
    expect(joinBox!.height).toBeGreaterThanOrEqual(44);
    await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
  });

  test("drawer opens from the left with all links and Join WhatsApp; closes via overlay", async ({
    page,
  }) => {
    await page.goto("/");
    await hamburger(page).click();
    const drawer = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(drawer).toBeVisible();
    await expect.poll(async () => Math.round((await drawer.boundingBox())!.x)).toBe(0);
    await expect(drawer.getByRole("navigation", { name: "Main" }).getByRole("link")).toHaveText(
      SECTIONS.map((s) => s.name),
    );
    await expect(drawer.getByRole("link", { name: /Join WhatsApp/ })).toBeVisible();

    const viewport = page.viewportSize()!;
    await page.mouse.click(viewport.width - 10, viewport.height / 2);
    await expect(drawer).toBeHidden();
  });

  test("drawer closes via Escape and the X button, returning focus", async ({ page }) => {
    await page.goto("/");
    await hamburger(page).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await hamburger(page).click();
    await page.getByRole("button", { name: "Close navigation menu" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(hamburger(page)).toBeFocused();
  });

  for (const { name, id } of SECTIONS) {
    test(`drawer ${name} closes the drawer and scrolls to #${id}`, async ({ page }) => {
      await page.goto("/");
      await hamburger(page).click();
      await page.getByRole("dialog").getByRole("link", { name }).click();
      await expect(page.getByRole("dialog")).toBeHidden();
      await expect(page).toHaveURL(`/#${id}`);
      await expectSectionClearOfHeader(page, id);
    });
  }

  test("drawer logo returns to the top when already on the homepage", async ({ page }) => {
    await page.goto("/#faqs");
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
    await hamburger(page).click();
    await page.getByRole("dialog").getByRole("link", { name: "Rooffur", exact: true }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBeLessThan(5);
  });

  test("drawer is keyboard operable with focus trapped inside", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // hamburger
    await expect(hamburger(page)).toBeFocused();
    await page.keyboard.press("Enter");
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      expect(await drawer.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
  });

  test("open drawer has no detectable accessibility violations", async ({ page }) => {
    await page.goto("/");
    await hamburger(page).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("getting back to the top", () => {
  const scrollY = (page: Page) => page.evaluate(() => Math.round(window.scrollY));

  for (const where of ["header", "footer"] as const) {
    test(`${where} logo returns to the top when already on the homepage`, async ({ page }) => {
      await page.goto("/#faqs");
      await expect.poll(() => scrollY(page)).toBeGreaterThan(500);
      await page.locator(where).getByRole("link", { name: "Rooffur", exact: true }).click();
      await expect.poll(() => scrollY(page)).toBeLessThan(5);
      await expect(page).toHaveURL("/");
    });

    test(`${where} logo goes home from a legal page`, async ({ page }) => {
      await page.goto("/privacy");
      await page.locator(where).getByRole("link", { name: "Rooffur", exact: true }).click();
      await expect(page).toHaveURL("/");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Find people you can trust to care for your pet.",
      );
    });
  }

  test("back-to-top is hidden near the top and appears after scrolling", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Back to top" });
    await expect(button).toBeHidden();
    await page.evaluate(() => window.scrollTo({ top: 2500, behavior: "instant" }));
    await expect(button).toBeVisible();
    await button.click();
    await expect.poll(() => scrollY(page)).toBeLessThan(5);
    await expect(page.locator("main")).toBeFocused();
    await expect(button).toBeHidden();
  });

  test("back-to-top works on legal pages too", async ({ page }) => {
    await page.goto("/terms");
    await page.evaluate(() => window.scrollTo({ top: 1800, behavior: "instant" }));
    await page.getByRole("button", { name: "Back to top" }).click();
    await expect.poll(() => scrollY(page)).toBeLessThan(5);
  });
});
