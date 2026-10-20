# Rooffur

Rooffur helps Pet Parents connect with pet lovers (Hosts) who may care for their pets. **V1 is a static discovery website whose primary conversion is joining the Rooffur WhatsApp community.** The marketplace itself (accounts, search, booking, payments) is deliberately not built yet.

## Non-negotiables

- Brand spelling is **Rooffur** everywhere (code, copy, metadata, alt text). Source docs often say "Roofur" — that is wrong.
- **Out of scope for V1 (Epic E1):** login, sign-up, accounts, database/PostgreSQL/Better Auth, search, filters, messaging, booking, availability, payments, reviews, dashboards, internal forum, notifications. Don't add them unless a new approved epic asks.
- Never invent marketplace data or social proof: no fake names, profiles, ratings, reviews, likes, member counts, testimonials, social accounts, contact addresses or legal policy text. Community topics are labelled "Example". Legal text comes only from the Product Owner: the approved Terms & Conditions, Privacy & Safety Policy and Community Guidelines (20/10/2026) live verbatim in `apps/web/src/content/legal.ts`, rendered by `LegalPage`.
- No unsupported safety claims: no guaranteed safety, police verification, background checks, insurance, certified Hosts, verified homes or guaranteed care.
- Official logo (dog + cat mark): original at `docs/brand/rooffur-logo-original.png`; web versions in `apps/web/public/brand/`; favicons at `apps/web/src/app/icon.png` / `apple-icon.png`. Never recreate, recolor or redesign it. Don't recolor the site WhatsApp-green — WhatsApp is a channel; Rooffur is the brand.
- Run `pnpm verify` and get it passing before calling work done.

## Reference docs

- Design system (visual source of truth): `docs/design-system/roofur-design-system.html`
- PRDs: `docs/prd/` (older account/marketplace stories there are superseded by the WhatsApp website epic)

## Stack

pnpm + Turborepo · Next.js App Router with **static export** (`output: "export"` → `apps/web/out/`, hostable on any static host) · TypeScript strict · Tailwind CSS v4 · Radix primitives · Watermelon UI components (copied in, restyled) · Lucide icons (24px / 2px stroke; no emoji icons) · Vitest + Testing Library · Playwright + axe.

## Layout

- `apps/web/src/app/(public-hero)/page.tsx` — the homepage; section order is fixed by the PRD
- `apps/web/src/app/(public)/` — legal pages (terms, privacy, community-guidelines) rendered from `src/content/legal.ts`
- `apps/web/src/content/home.ts` — all approved homepage copy; change only with Product Owner approval
- `apps/web/src/components/landing/` — one component per homepage section
- `apps/web/src/components/whatsapp/WhatsAppCta.tsx` — the only way to link to WhatsApp
- `apps/web/src/components/watermelon-ui/` — Watermelon UI components (e.g. the FAQ accordion)
- `apps/web/src/config/` — `navigation.ts` (all nav/footer links and section ids), `external-links.ts` (WhatsApp URL + contact email from env), `site.ts` (SEO), `social.ts`
- `apps/web/images-src/` — approved lifestyle photos (`hero`, `pet-parent`, `host`); `pnpm --filter @rooffur/web images` turns them into WebP variants in `public/images/` + `src/content/images.generated.json` (commit both). `src/content/images.ts` holds each slot's alt text. Slots without a photo show a designed placeholder (`LifestyleImage`); never use unapproved/stock photos. A custom next/image loader (`src/lib/image-loader.ts`) serves the variants as a srcset in the static export.
- `apps/web/scripts/flatten-segment-prefetch.mjs` — post-build workaround for a Next 16 static-export prefetch filename mismatch; remove when Next fixes it
- `packages/ui/src/tokens.css` — design tokens; the only place raw colors and values live

## Conventions

- Visual-first homepage (E1-S02 visual storytelling): each section is eyebrow → headline → at most 1–2 lines → one visual anchor (photo, diagram, icon flow, phone mockup, comparison, bubbles) → CTA. If a visual already says it, don't repeat it in a paragraph; detail belongs in the FAQs. Illustrations (chat mockup, community bubbles) are labelled as examples and never show names, photos, timestamps, read receipts or counts.

- Motion: explain, don't decorate. No animation libraries. The How It Works journey plays once on scroll via `JourneyAnimator` (IntersectionObserver → `data-journey="ready"|"play"`) + `HowItWorks.module.css`; server HTML is the final state, text never fades, nothing loops, and `prefers-reduced-motion` shows the final state immediately.
- Styling: Tailwind utilities backed by the tokens (`bg-amber-500`, `text-navy-600`, `rounded-xl`, `font-display`) or `var(--amber-500)`. No raw hex values in components.
- Default to Server Components; `"use client"` only for small interactive leaves (`HeaderFrame`, `MobileNavigation`, `WhatsAppCta`, the accordion).
- The real WhatsApp group invite lives in the committed `apps/web/.env` (public, non-secret). Its QR code is `apps/web/public/whatsapp/rooffur-group-qr.png` (cropped from the group's QR screen, verified to decode to the invite); `WHATSAPP_QR` in `external-links.ts` holds its invite code, and the QR only renders when the configured URL matches it. Replace image + invite code together.
- External URLs come from environment config only (see `apps/web/.env.example`): one `NEXT_PUBLIC_ROOFFUR_WHATSAPP_URL` for every WhatsApp CTA, `NEXT_PUBLIC_ROOFFUR_CONTACT_EMAILS` (comma-separated admin addresses, set in `apps/web/.env`), shown only inside the footer Contact dialog (`ContactDialog`, Watermelon UI dialog) — never upfront on the page. Missing values disable the CTA / show "coming soon", never a hard-coded fallback.
- Navigation is homepage anchors (`/#how-it-works` …); the sticky header offset comes from `scroll-padding-top` in `globals.css`. Header: transparent at the very top of the hero, navy once scrolled within it, solid white past it (`HeaderFrame`, hero carries `data-header-boundary`).
- UI components: use Watermelon UI (https://ui.watermelon.sh, registry `https://registry.watermelon.sh/r/<name>.json`). Read the registry source first, copy it into `components/watermelon-ui/`, and restyle with Rooffur tokens. Its marketing blocks (own navbar, full-screen heights, stock images, entrance animations) don't fit as-is.
- Analytics: `track()` in `src/lib/analytics.ts`; only `whatsapp_cta_clicked { source }` today. No provider connected; events dispatch as `rooffur:analytics` window events. Never send personal data.

## Commands

```bash
pnpm dev                                 # dev server on :3000
pnpm verify                              # format, lint, typecheck, unit tests, build, e2e
pnpm --filter @rooffur/web build         # static export to apps/web/out
pnpm --filter @rooffur/web serve:out     # preview the export locally
```

E2E builds its own export with test-only WhatsApp/contact values (see `playwright.config.ts`) and serves `out/`. First-time setup: `pnpm install` then `pnpm --filter @rooffur/web exec playwright install chromium`.
