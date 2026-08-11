# Site animation pass — design

**Date:** 2026-08-11
**Status:** approved

## Goal

Make the site more attractive and more distinctly *itself* through motion, without
diluting the restraint the existing design already commits to.

## What is already there

Motion is not missing from this site. Before adding anything, the inventory:

- **Hero fan** — cards deal out of a stack on first paint (`deal-in`, CSS), autoplay
  every 3s, drag/flick to advance, and the whole deck leans toward the pointer.
- **Tiles** — `.slab` foil sweep on hover plus a 3D lean (`motion/TiltCard.tsx`).
- **Scroll** — `Reveal` / `StaggerGrid` fade-ups across most sections.
- **Ambient** — a 36s drift on the background wash, print grain, the pulsing
  open-now dot.

## Governing principle

`globals.css` states the house rules out loud, and they bind everything below:

> *"Don't reintroduce a second light source on these tiles — one foil per card."*
> *"The open-now dot. The only thing on the page that pulses."*

Three constraints follow:

1. **Reduced motion is honoured everywhere.** Every existing motion component
   checks `useReducedMotion` or has a `@media (prefers-reduced-motion: reduce)`
   rule. No exceptions in this pass.
2. **Nothing new competes with the fan below the fold.** The showpieces stay
   above it.
3. **No first-paint motion may delay LCP or hide content without JS.** The fan
   already gets this right: the finished hand is what ships in the HTML, and the
   deal animation only replays it. Every new intro follows the same pattern.

## A. Hero

### A1. Pack-rip intro

A sealed foil pack — CSS/SVG in emerald and brass, carrying the wordmark, so it
costs no image request — sits centre stage, shivers, tears along the top, and the
halves fall away as the cards spill into their fan slots. About 1.2s.

The pack is an **overlay on top of the already-finished fan**, never a
replacement for it. Consequences:

- No JS → no pack, just the finished hand.
- Reduced motion → no pack.
- Second visit within the session → no pack (`sessionStorage` gate). It is a
  first impression, not a toll booth.

`CardFan` gains a `deal` prop so its CSS `deal-in` can be suppressed while the
pack-rip drives the same cards; running both would double-animate them.

### A2. Fan scroll parallax

`useScroll` + `useTransform`. The fan drifts at ~0.85× scroll rate and the glow
pool behind it at ~0.7×, giving depth without introducing a new element. Active
only while the hero is on screen. Identity transform under reduced motion.

### A3. Animated headline

Each word of "WINDSOR'S / CARD SHOP" wipes up from behind a mask instead of
fading, and one brass foil sweep passes over the accent words on load.

**Once, not looping.** A looping headline shimmer is the clearest single tell of
a template. The rest of the hero copy keeps its existing stagger.

### A4. Holo shine on the front fan card

Real rainbow foil, but only on the card in the centre slot, its position driven
by the pointer-lean motion values the fan already computes — so it moves as the
visitor moves.

Scoped to `.fan-card`. It must never reach a `.slab` tile; that is precisely the
rule the CSS warns about, and it stays intact.

## B. Dead spots

### B5. Route transitions

Page changes currently hard-cut.

**Implementation note that overrides the obvious approach:** Next 16 supports
React's `<ViewTransition>` natively in the App Router with no configuration, so
this needs no `AnimatePresence` client wrapper in the layout. Verified against
`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`.

Two facts found while verifying:

- `ViewTransition` is exported from Next's bundled React as an element symbol,
  and `addTransitionType` is a function — both present at `next@16.3.0`.
- `@types/react@19` does **not** type `ViewTransition`, so a local declaration
  augmentation is required or the build fails.

Design: a short cross-fade plus a small lift on the incoming page — deliberately
short, because long page transitions read as lag rather than polish. Per the
guide, the wrapper goes in each `page.tsx`, not the layout, since layouts persist
across navigation and never fire enter/exit.

The sticky navbar gets a `viewTransitionName` and has its animation suppressed,
so it stays a fixed spatial anchor while content moves. `::view-transition` gets
`pointer-events: none` so clicks during the animation are not swallowed.

### B6. Navbar condense on scroll

Past ~80px: 64px → 52px tall, logo 40 → 32, background deepens. Spring, not
linear. The header is already sticky, so nothing reflows.

### B7. Form and loading states

Contact form: submit spinner, then an SVG checkmark that draws itself via
`pathLength`. Skeletons get a shimmer sweep instead of sitting flat.

### B8. Footer stagger

Footer link columns get the existing `StaggerGrid` treatment.

## Explicitly out of scope

**The `.band` seam draw.** Animating the brass hairline scaling out from centre
was considered and cut. At 1px and ~26% opacity it is work almost nobody would
consciously see.

**Shared-element morph** (collection tile art morphing into the detail page hero)
is a natural fit for the `ViewTransition` work and is noted here as a possible
follow-up, but is not part of this pass.

## Files

**New:** `components/home/PackRip.tsx`, `components/motion/WordWipe.tsx`,
`components/motion/PageTransition.tsx`, React type augmentation.

**Modified:** `home/Hero.tsx`, `home/CardFan.tsx`, `layout/Navbar.tsx`,
`layout/Footer.tsx`, `contact/ContactForm.tsx`, `ui/skeleton.tsx`,
`app/layout.tsx`, each `page.tsx`, `app/globals.css`.

## Verification

`npm run lint` and `npm run build` clean; every new animation has a
reduced-motion path; the hero fan still renders complete with JS disabled.
