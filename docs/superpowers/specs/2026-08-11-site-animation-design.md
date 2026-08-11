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

### A1. Pack-rip intro — BUILT, THEN REMOVED

A sealed foil pack that tore open on the first visit of a session and let the
cards spill into the fan. It was built, reviewed in the browser, and then cut at
the user's request: they asked for the landing page's first-load intro to go.

Removed rather than disabled behind a flag — the machinery it needed reached
into three other files (a `dealOffsetMs` prop on `CardFan`, a `--deal-offset`
term in the `deal-in` `animation-delay`, and a layout-effect/`sessionStorage`
gate in `Hero`), and leaving that in place to serve nothing would cost more to
read than to rewrite if it is ever wanted again.

The fan's original CSS deal is untouched and still plays.

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
- `@types/react@19` does **not** type `ViewTransition`, so `PageTransition`
  reaches it through a locally-typed cast and falls back to rendering children
  untouched if the export ever disappears.

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

**New:** `components/motion/WordWipe.tsx`,
`components/motion/PageTransition.tsx`.

**Modified:** `home/Hero.tsx`, `home/CardFan.tsx`, `layout/Navbar.tsx`,
`layout/Footer.tsx`, `contact/ContactForm.tsx`, `ui/skeleton.tsx`,
`app/layout.tsx`, each `page.tsx`, `app/globals.css`.

## Verification

`npm run lint` and `npm run build` clean; every new animation has a
reduced-motion path.

Two things worth recording for whoever verifies this next.

**Browser-automated checks read every CSS animation as frozen.** A tab driven
over the extension is `document.visibilityState === "hidden"`, and Chrome parks
the document timeline at 0 there — `getAnimations()` reports `playState:
"running"` with `currentTime: 0` forever, and computed values sit at their
`from` keyframe. Sampling styles from such a tab says nothing about whether an
animation works. Take a screenshot instead: rendering the page advances the
timeline. An earlier pass through this work misread that artifact as motion's
`pathLength` silently failing on the contact form's tick.

**The hero copy is invisible without JS, and predates this pass.** The copy
container and the fan wrapper both SSR from a motion `initial` — the wrapper
ships `opacity: 0` and the words ship `translateY(110%)` — so with scripting off
the entire hero is blank. The `.fan-card` comment in `globals.css` claims a
visitor whose JS never runs "sees the finished hand"; the cards are indeed in
the HTML, but the `opacity: 0` wrapper above them defeats it. Not introduced
here and not fixed here. Fixing it means giving the hero's motion-hidden
elements a class and resetting it inside `<noscript>` — a blanket
`transform: none` reset is not an option, since `.fan-card` positions every card
with a transform.
