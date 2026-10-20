import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);

/**
 * Test-only external configuration. These are deliberately fake values on
 * reserved/test domains, used to verify every CTA shares one configured URL.
 */
export const E2E_WHATSAPP_URL = "https://chat.whatsapp.com/RooffurE2ETestInvite";
export const E2E_CONTACT_EMAILS = ["contact@example.com", "team@example.com"];

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  // Tests run against the real static export, as it would be hosted.
  webServer: {
    command: `pnpm build && pnpm exec serve out --listen ${PORT} --no-clipboard --no-request-logging`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 240_000,
    env: {
      NEXT_PUBLIC_ROOFFUR_WHATSAPP_URL: E2E_WHATSAPP_URL,
      NEXT_PUBLIC_ROOFFUR_CONTACT_EMAILS: E2E_CONTACT_EMAILS.join(","),
      NEXT_PUBLIC_SITE_URL: "https://rooffur.com",
    },
  },
});
