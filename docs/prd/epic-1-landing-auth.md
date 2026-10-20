## **Epic 1 — Landing Page & Authentication**

### **E1-S01 — Global Navigation & Landing Page Shell**

### **User Story**

> **As a visitor to Rooffur, I want a clear, consistent navigation and page structure so that I can immediately understand where I can go, move between Rooffur’s major experiences, and access or create my account from any public page.**

This story establishes the **global public shell** for Rooffur. It does **not** build the individual landing-page sections yet. It gives every later story a consistent header, page structure, responsive behavior and navigation model to plug into.

The implementation must use the existing Rooffur design system as the visual source of truth. The design system already establishes the core Amber/Navy/neutral palette, typography, radii, shadows and transitions. roofur-design-system Its navigation pattern also establishes a clean top-bar structure with logo, navigation links and actions. roofur-design-system

---

# **1\. Story Objective**

When an unauthenticated visitor opens Rooffur, the site must provide a predictable global structure:

┌───────────────────────────────────────────────────────────────┐  
│                        GLOBAL HEADER                          │  
├───────────────────────────────────────────────────────────────┤  
│                                                               │  
│                     PAGE CONTENT AREA                         │  
│                                                               │  
│             Landing-page sections added by                    │  
│                 subsequent user stories                       │  
│                                                               │  
├───────────────────────────────────────────────────────────────┤  
│                      GLOBAL FOOTER SLOT                       │  
└───────────────────────────────────────────────────────────────┘

For this story, Claude should build:

* the global public layout;  
* desktop navigation;  
* mobile navigation;  
* sticky/adaptive header behavior;  
* official Rooffur logo placement;  
* navigation routes;  
* basic route/page placeholders necessary to prevent broken links;  
* responsive behavior;  
* accessibility behavior.

It should **not** build the hero, search, trust section, community preview, Pet Guides cards or final footer content yet.

---

# **2\. Public Route Structure**

Establish these canonical public routes now:

/                     Landing page

/hosts                Find a Host / Host discovery

/become-a-host        Become a Host entry

/community            Community

/guides               Pet Guides

/login                 Login

/signup                Join Rooffur

The `How It Works` navigation item is different.

It should point to:

/\#how-it-works

because `How It Works` is a section of the landing page rather than a separate page in V1.

These route names should be treated as the canonical URLs unless a later approved story explicitly changes them.

---

# **3\. Desktop Header Layout**

For desktop/tablet-width screens, the header should follow this hierarchy:

┌──────────────────────────────────────────────────────────────────────────────┐  
│  \[ROOFFUR LOGO\]                                                             │  
│                                                                              │  
│       Find a Host   Become a Host   Community   Pet Guides   How It Works   │  
│                                                                              │  
│                                            Login     \[ Join Rooffur \]        │  
└──────────────────────────────────────────────────────────────────────────────┘

Actual visual implementation should be one horizontal bar rather than the multi-line representation above.

### **Exact navigation order**

The order is non-negotiable:

1\. Find a Host  
2\. Become a Host  
3\. Community  
4\. Pet Guides  
5\. How It Works  
6\. Login  
7\. Join Rooffur

`Find a Host` and `Become a Host` must appear before the content/community navigation because they represent Rooffur's primary marketplace actions.

---

# **4\. Logo**

Use the **official Rooffur logo asset supplied by the Product Owner**.

Claude must **not**:

* recreate the logo;  
* redesign the logo;  
* generate a replacement;  
* use the old design-system paw graphic as the final logo;  
* spell the product `Roofur`.

The canonical brand spelling throughout the application is:

> **Rooffur**

### **Logo placement**

Desktop:

LEFT EDGE

\[ Rooffur Logo \]   Find a Host   Become a Host ...

The logo should have sufficient whitespace around it and remain vertically centered within the header.

### **Logo click behavior**

Clicking the logo from any page must navigate to:

/

Logo alt text:

> `Rooffur`

If the official logo asset is temporarily unavailable during development, Claude may use a clearly documented temporary text placeholder:

> **Rooffur**

It must not fabricate a new logo.

---

# **5\. Desktop Navigation Behavior**

### **Find a Host**

Label:

> **Find a Host**

Click:

Find a Host  
     ↓  
/hosts

Do not require authentication.

The `/hosts` destination may initially be a simple route placeholder until the Host Discovery epic implements it.

Placeholder text may say:

> **Find a Host**  
> Host discovery is being built.

No fake Host listings should be created purely to make the page appear complete.

---

### **Become a Host**

Label:

> **Become a Host**

Click:

Become a Host  
      ↓  
/become-a-host

Authentication and Host onboarding behavior will be implemented in later stories.

For now the route must exist and must not return a 404\.

---

### **Community**

Label:

> **Community**

Click:

/community

Public users may ultimately browse the community without authentication.

The actual Community implementation is outside this story.

---

### **Pet Guides**

Label:

> **Pet Guides**

Click:

/guides

Do not label this navigation item:

> Blog

even though `/guides` will contain SEO/blog content.

Customer-facing terminology is:

> **Pet Guides**

---

### **How It Works**

Label:

> **How It Works**

On the landing page:

Click  
 ↓  
Smooth scroll  
 ↓  
\#how-it-works

On another public page:

Click  
 ↓  
Navigate to /  
 ↓  
Scroll to \#how-it-works

This interaction should work with standard URL fragment behavior even if JavaScript fails.

Do not make scrolling dependent exclusively on JavaScript.

---

# **6\. Authentication Actions**

The right side of the desktop navigation contains:

Login

\[ Join Rooffur \]

### **Login**

`Login` should be a lower-emphasis action.

Click:

Login  
 ↓  
/login

The authentication form itself is **not part of this story**.

---

### **Join Rooffur**

Exact label:

> **Join Rooffur**

This is the primary authentication CTA.

Click:

Join Rooffur  
      ↓  
/signup

Do **not** use:

* Register  
* Create Host Account  
* Pet Parent Signup

The platform has a single user identity that can eventually act as both Pet Parent and Host.

---

# **7\. Button Styling**

The existing design system defines Amber as the primary CTA treatment and Navy as an authoritative secondary treatment. roofur-design-system

Therefore:

### **Join Rooffur**

Use:

Primary Amber CTA

Following the existing design-system treatment.

### **Login**

Use either:

Ghost

or equivalent low-emphasis navigation styling.

It should **not visually compete with `Join Rooffur`**.

### **Navigation links**

Standard text-navigation appearance.

Do not put every navigation item inside a button.

---

# **8\. Sticky Header**

The header must remain visible while the visitor scrolls.

Behavior:

PAGE LOAD  
    ↓  
Header visible  
    ↓  
User scrolls  
    ↓  
Header remains pinned to top

Use:

position: sticky  
top: 0

where practical.

Avoid `position: fixed` unless there is a compelling technical reason.

---

# **9\. Adaptive Header Appearance**

On the landing-page hero, Story 2 will use a visually strong hero.

Therefore the header must support two visual states.

### **State A — Top of landing page**

When the user is at the very top of `/`:

Transparent / hero-compatible header

The navigation must remain readable against the hero.

The exact text treatment can adapt to the hero implementation in Story 2\.

---

### **State B — User scrolls beyond hero/top threshold**

Header transitions into:

White background  
Subtle bottom border / subtle elevation  
Standard Navy navigation text

Transition should use the design system's existing motion philosophy rather than an aggressive animation. The design system defines fast/base transitions of roughly 150ms and 250ms. roofur-design-system

Recommended transition:

150–250ms

No dramatic slide animation.

---

### **Other pages**

Pages such as:

/community  
/guides  
/login  
/signup

should start with the solid header state immediately unless a future page explicitly declares itself as having a hero-compatible header.

Do not hard-code header appearance based purely on individual URLs.

Prefer the layout/page to expose whether it uses:

transparent-header

or:

solid-header

so future pages can opt in cleanly.

---

# **10\. Header Height**

Follow the design system's navigation proportions.

The current design system demonstrates a 64px navigation component. roofur-design-system

Recommended desktop header height:

64–72px

Claude should not make it excessively tall.

---

# **11\. Active Navigation State**

When the visitor is on a top-level destination, that navigation item should have a subtle active state.

Examples:

/hosts  
→ Find a Host active

/community  
→ Community active

/guides  
→ Pet Guides active

/become-a-host  
→ Become a Host active

Use the design system's understated active-navigation treatment rather than a large underline or strong filled button. The existing system uses subtle background and text-state changes for navigation. roofur-design-system

Do not mark:

Join Rooffur

as an active navigation item when `/signup` is open.

It remains a CTA.

---

# **12\. Mobile Header**

For mobile widths, the header changes completely.

Required order:

┌───────────────────────────────────────────┐  
│  \[☰\]   \[ROOFFUR LOGO\]                    │  
└───────────────────────────────────────────┘

The hamburger must appear **before the logo on the left**.

Do not place the hamburger on the right.

Do not implement bottom navigation for the public site.

---

# **13\. Mobile Hamburger Button**

The hamburger is a real `<button>`.

Accessible label:

> `Open navigation menu`

When the menu is open:

> `Close navigation menu`

It must expose:

aria-expanded="true/false"

and correctly reference the navigation panel.

Touch target should be at least approximately:

44px × 44px  
---

# **14\. Mobile Navigation Drawer**

Clicking the hamburger opens a left-side navigation drawer.

Conceptual structure:

┌────────────────────────────┐  
│ ✕     ROOFFUR              │  
│                            │  
│ Find a Host                │  
│ Become a Host              │  
│ Community                  │  
│ Pet Guides                 │  
│ How It Works               │  
│                            │  
│ ─────────────────────────  │  
│                            │  
│ Login                      │  
│                            │  
│ \[ Join Rooffur \]           │  
└────────────────────────────┘

The drawer should occupy enough width to comfortably display navigation but should not necessarily cover the entire screen.

Recommended:

\~80–90% width  
max-width around 320–360px

Use sensible responsive sizing rather than an inflexible hard-coded width.

---

# **15\. Mobile Drawer Interaction**

When opened:

Hamburger click  
     ↓  
Drawer opens from left  
     ↓  
Background overlay appears  
     ↓  
Focus moves into drawer

The drawer closes when:

* user clicks the close button;  
* user clicks the background overlay;  
* user presses `Escape`;  
* user selects a navigation destination.

Keyboard focus must not disappear behind the drawer.

While the drawer is open, keyboard navigation should remain within the active navigation context where practical.

---

# **16\. Mobile Navigation Order**

Exact order remains:

Find a Host  
Become a Host  
Community  
Pet Guides  
How It Works

Login

Join Rooffur

`Join Rooffur` should appear as an Amber primary CTA.

`Login` should remain lower emphasis.

---

# **17\. Mobile Logo Behavior**

The official Rooffur logo appears immediately after the hamburger.

Clicking it:

→ /

Do not center the logo independently if doing so breaks the requested:

hamburger → logo

left-side ordering.

---

# **18\. Tablet Behavior**

Do not create a special tablet-only navigation system unless necessary.

At widths where the complete desktop navigation no longer fits comfortably:

switch to mobile/hamburger navigation

Do not:

* shrink navigation text excessively;  
* squeeze labels together;  
* allow horizontal header overflow;  
* hide arbitrary links.

Use a responsive breakpoint based on actual layout fit.

---

# **19\. Page Shell**

Create a shared public layout component.

Conceptual structure:

PublicLayout  
│  
├── GlobalHeader  
│  
├── Main  
│   └── page content  
│  
└── FooterSlot

The landing page should then look conceptually like:

/  
│  
├── Header  
│  
├── Hero                    ← Story 2  
│  
├── How It Works            ← Story 3  
│  
├── Trust                   ← Story 3  
│  
├── Host Proposition        ← Story 4  
│  
├── Community Preview       ← Story 5  
│  
├── Pet Guides Preview      ← Story 5  
│  
├── Supported Pets          ← Story 6  
│  
├── Final CTA               ← Story 6  
│  
└── Footer                  ← Story 6

Story 1 should create the structural ability for those sections to be added without rewriting the layout.

---

# **20\. Landing Page Section Anchors**

Reserve these semantic section IDs:

\#find-a-host

\#how-it-works

\#trust

\#become-a-host

\#community

\#pet-guides

Do not create fake completed sections just to populate these IDs.

They can be added as their corresponding stories are implemented.

The important requirement is that the architecture supports anchor navigation cleanly.

---

# **21\. Main Content Accessibility**

The page should include a semantic:

\<header\>  
\<nav\>  
\<main\>  
\<footer\>

structure.

There must be exactly one primary `<main>` region per page.

Provide a visually hidden or unobtrusive:

> **Skip to main content**

link as the first keyboard-focusable page element.

It should become visible when focused.

---

# **22\. Responsive Container**

Public pages should use a shared content-container primitive.

Recommended behavior:

Mobile:  
16–20px horizontal padding

Tablet:  
24–32px

Desktop:  
responsive centered container

Do not use a fixed desktop width that creates horizontal scrolling.

Landing-page sections can occasionally use full-width backgrounds while keeping actual content inside the shared container.

---

# **23\. Design-System Enforcement**

Claude should translate the existing design-system values into reusable application tokens rather than copying styles manually into the header.

The design system defines:

* Amber family;  
* Navy family;  
* neutral family;  
* Cormorant Garamond;  
* Plus Jakarta Sans;  
* border radii;  
* shadow levels;  
* transition speeds. roofur-design-system

Create/reuse central tokens such as:

\--amber-500  
\--navy-500  
\--neutral-\*  
\--radius-\*  
\--shadow-\*

Do not scatter raw hex codes inside `GlobalHeader.tsx`.

---

# **24\. Typography**

Navigation and UI text:

Plus Jakarta Sans

Logo typography is determined by the official logo asset and should not be recreated with text unless acting as a temporary development fallback.

Display typography will be used in later landing-page stories.

The design system explicitly uses Plus Jakarta Sans for body/UI and Cormorant Garamond for display moments. roofur-design-system

---

# **25\. Loading Behavior**

The global shell should render immediately.

Do not display a full-page spinner merely because authentication state is being checked.

For an anonymous public page:

Header  
Page  
Navigation

should be usable without waiting for unnecessary client-side hydration.

Use server-rendered navigation wherever practical.

---

# **26\. Authentication-Aware Shell Architecture**

Actual logged-in navigation will be implemented in Story E1-S14.

However, Story 1 must not architect the header in a way that assumes the user is permanently anonymous.

Header actions should support a future state like:

Anonymous:

Login  
Join Rooffur

versus:

Authenticated:

Messages  
Profile

Therefore, structure authentication actions as a dedicated reusable region/component rather than hard-coding `Login` and `Join Rooffur` throughout the header.

Example conceptual component:

Header  
├── Logo  
├── PrimaryNavigation  
└── AccountNavigation  
---

# **27\. Broken/Future Routes**

Because `/hosts`, `/community`, `/guides` and `/become-a-host` will be implemented in later stories/epics, Story 1 may create lightweight route placeholders.

Each placeholder should:

* use the normal Rooffur shell;  
* contain the proper page title;  
* contain a simple explanatory message;  
* never pretend a feature is functional when it is not.

Example:

> **Community**  
> The Rooffur community is coming soon.

No lorem ipsum.

No fake data.

---

# **28\. Error Handling**

If navigation to a valid Rooffur route fails because of an application error:

* use the application's standard error boundary;  
* preserve the global shell where technically possible;  
* provide a way to return home.

Do not leave users on an unstyled framework error page in production.

A full error-system story can be introduced later, but the shell should support it.

---

# **29\. SEO Foundation**

The root layout must support standard metadata.

For Story 1, establish:

siteName: Rooffur

and correct document language.

Do not finalize all page-specific SEO copy here; that belongs to Story E1-S15.

The page must not still contain:

Roofur

in metadata, titles or alt text.

---

# **30\. No Fake Marketplace Data**

For this story, Claude must not invent:

* Host profiles;  
* ratings;  
* reviews;  
* locations;  
* availability;  
* prices;  
* community posts;  
* user counts.

Those belong to later stories/data seeding decisions.

---

# **31\. Feature Flow**

### **Desktop**

User opens Rooffur  
        ↓  
Global header appears  
        ↓  
User can choose:

Find a Host ────────→ /hosts

Become a Host ─────→ /become-a-host

Community ─────────→ /community

Pet Guides ────────→ /guides

How It Works ──────→ /\#how-it-works

Login ─────────────→ /login

Join Rooffur ──────→ /signup

### **Mobile**

User opens Rooffur  
       ↓  
☰ \+ Rooffur logo  
       ↓  
Tap ☰  
       ↓  
Navigation drawer  
       ↓  
Choose destination  
       ↓  
Drawer closes  
       ↓  
Destination opens  
---

# **32\. Acceptance Criteria**

The story is accepted only when all of the following are true:

### **Desktop**

* Official Rooffur logo appears on the left.  
* Product name is spelled **Rooffur** everywhere.  
* Navigation appears in this exact order:  
  `Find a Host → Become a Host → Community → Pet Guides → How It Works`.  
* `Login` appears as a lower-emphasis action.  
* `Join Rooffur` appears as the primary Amber CTA.  
* Every navigation item has the correct destination.  
* Clicking the logo returns to `/`.  
* Header remains visible while scrolling.  
* Landing-page header supports transparent/hero-compatible state.  
* Header becomes solid after the top/hero area is left.  
* Non-hero pages use the solid state by default.  
* Appropriate active navigation states appear.  
* Header has no horizontal overflow.

### **Mobile**

* Hamburger appears on the **left before the Rooffur logo**.  
* Hamburger opens a left-side navigation drawer.  
* Drawer contains all public navigation options.  
* Drawer order matches desktop navigation.  
* Login and Join Rooffur appear within the drawer.  
* Join Rooffur retains primary CTA treatment.  
* Drawer closes via close button.  
* Drawer closes via overlay click.  
* Drawer closes via Escape.  
* Drawer closes when a navigation item is selected.  
* Menu controls work by keyboard.  
* Mobile navigation works at 320px width without horizontal overflow.

### **Accessibility**

* Navigation uses semantic `<nav>`.  
* Hamburger is a semantic `<button>`.  
* Hamburger exposes an accessible name.  
* Hamburger exposes expanded/collapsed state.  
* Keyboard users can operate the entire navigation.  
* Focus styles remain visible.  
* Skip-to-content link exists.  
* Page has a semantic `<main>`.  
* Navigation does not rely only on color to indicate current state.

### **Architecture**

* Global shell is reusable across public pages.  
* Navigation is not duplicated individually across pages.  
* Account actions are architected so authenticated navigation can replace anonymous navigation later.  
* Design tokens are centralized.  
* No unnecessary client component wraps the entire site.  
* Future routes have honest placeholder pages rather than 404s.  
* No fake marketplace data is introduced.

---

# **33\. Definition of Done**

Claude Code may mark **E1-S01 complete** only when:

Desktop navigation works  
\+  
Mobile navigation works  
\+  
Sticky/adaptive header works  
\+  
All declared routes resolve  
\+  
Design system is respected  
\+  
Accessibility checks pass  
\+  
Responsive checks pass  
\+  
Tests pass

At minimum, tests should verify:

Logo → /  
Find a Host → /hosts  
Become a Host → /become-a-host  
Community → /community  
Pet Guides → /guides  
Login → /login  
Join Rooffur → /signup

Mobile menu opens  
Mobile menu closes  
Mobile menu keyboard behavior works

Claude must run the repository's verification command:

pnpm verify

before declaring the story complete.

