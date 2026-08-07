# Emerald Cards & Games

Marketing site for a trading card and gaming store at 1555 Talbot Rd, Windsor,
Ontario. Next.js App Router, Tailwind v4, deployed as a static export to GitHub
Pages.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
pnpm images   # regenerate public/images from the source artwork
```

## Artwork

`pnpm images` turns the source PNGs in `/home/nimit/Nimit1907/Images` (override
with an argument) into the web assets committed under `public/images`. The
GitHub Pages export runs with `images.unoptimized`, so those committed files are
exactly what ships — re-run this after changing any source art.

The brand mark comes from `Logo_Without_Background_1.png`:

| Output | What it is | Used by |
| --- | --- | --- |
| `logo.webp` | The full lockup, uncropped | `BrandLogo` (header, footer, mobile menu), `ComingSoon` |
| `icon.png` / `apple-icon.png` | The full lockup, squared off | Favicon + touch icon |
| `emblem.webp` | The shield above the banner | `CardArt` watermark only |

**Don't crop this badge for use as a mark.** It looks like it should reduce to a
shield or a gem, and it doesn't: the shield is cut off by the banner, and the
gem's lower points sit behind that banner, so any crop containing the whole gem
also clips the top of the "EMERALD" lettering. Every version reads as a broken
image rather than as a mark. The lockup carries its own wordmark, which does
repeat the one `BrandLogo` sets in HTML beside it — that repetition is the
accepted trade. Whole and small beats neat and cut.

`emblem.webp` is the one exception, and it isn't a logo: it's a watermark
printed at 18% opacity behind a collection name, where the full logo's own
lettering would fight the type on top of it.

> `sharp` orders `flatten` **before** `resize` internally, whatever order you
> call them in. Flattening after a `fit: "contain"` resize leaves the padding it
> just added transparent — which is why `apple-icon.png` came out with clear
> corners and an opaque middle.

## Design system

Defined entirely in `src/app/globals.css`. Two accent colours, each with a job —
keeping them separate is what gives the page hierarchy.

| Role | Token | Used for |
| --- | --- | --- |
| Base | `--base` `#06100b` | Page background. Green-tinted ink, not neutral black. |
| Surfaces | `--surface-1/2/3` | Four-step elevation ladder. |
| Emerald | `--brand` `#3edd6b` | **Live and interactive only** — open-now, CTAs, active nav, links. |
| Brass | `--brass` `#d9a857` | **Value and precision** — prices, dates, entry fees, counts, eyebrows. |
| Text | `--foreground` `#f2efe6` | Body copy. |

Every pairing clears WCAG AAA (lowest is 8.46:1).

**Spacing.** Fluid, on the same 360px → 1280px interpolation as the type scale —
spacing tracks the viewport instead of stepping once at `sm` and then never
moving again.

| Utility | 375px | 834px | 1440px | Used for |
| --- | --- | --- | --- | --- |
| `py-section` | 49 | 81 | 112 | Between page bands |
| `py-section-tight` | 40 | 56 | 72 | Header bands, footer, empty states |
| `*-stack` | 24 | 32 | 40 | A section heading to its content |
| `*-tile` | 12 | 16 | 20 | Between cards in a grid |
| `px-gutter` | 16 | 24 | 32 | Page side margin (`Container`) |

It replaced four competing rhythms (`py-12 sm:py-16`, `py-14 sm:py-20`,
`py-10 sm:py-14`, and some flat `py-12`s that never scaled), all of which
stopped at 640px — so a tablet and a 27" monitor got identical 64px bands.

> **Never name a spacing step after a display utility** — `block`, `grid`,
> `flex`, `table`, `inline`. Tailwind generates an `inline-<step>` utility for
> the `inline-size` property from this namespace, so `--spacing-block` emitted a
> second `.inline-block { inline-size: … }` rule that won the cascade and
> collapsed every `inline-block` element to 24px. Footer links wrapped one
> syllable per line. That's why the steps are `stack` and `tile`.

**Type.** Three roles, three faces:

- `font-display` — Archivo, variable `wdth` axis widened to 112%. Headlines only.
- default — Instrument Sans. All running copy and UI.
- `font-data` — IBM Plex Mono with tabular figures. Prices, times, dates, counts.

**Ground.** `layout/Ambient.tsx` renders one fixed layer behind the whole site,
so every route gets it — including the ones with no artwork of their own, which
is where it earns its place. Three parts, each nearly invisible alone:

| Layer | What it does |
| --- | --- |
| `.ambient-wash` | Three low radial washes, drifting over 36s |
| `.ambient-grain` | SVG `feTurbulence` at 4.5% — card stock has tooth, and it kills the banding a flat `#06100b` shows on 8-bit panels |
| `.ambient-vignette` | Corners fall away so the content column sits in the lit part |

It's fixed, not scrolling: content moves *across* it, so it reads as the light
in the room rather than as a pattern glued to the page. Reduced motion stops
the drift and keeps the colour and texture — those aren't motion.

**Bands.** `.band` marks where one section joins the next: a brass hairline
fading out at both ends, plus a faint emerald spill running down from it.
Sections are separated by up to 112px of space and nothing else, and at that
distance the eye stops reading them as separate bands. It replaced the flat
`border-b border-border` each page header used to carry.

> `.band`'s spill is a `z-index: -1` pseudo-element, which is why the class
> also sets `isolation: isolate` — without a stacking context of its own the
> layer drops behind the page ground and disappears.

**Surfaces.** `.panel` is the quiet default for anything informational.
`.slab` is for tiles that are actually clickable — it adds a brass top edge and
a foil sweep on hover, the signature flourish. Don't put `.slab` on something
that isn't a link; the lift promises navigation.

> A component class must not share a name with a generated colour utility.
> `.text-accent` was tried and silently lost to Tailwind's `text-accent`
> (from `--color-accent`, a dark surface green). Use `text-brass` directly.

## Static export and time

The site is prerendered, so **anything derived from the current time must be
computed on the client** or it freezes at build time and goes stale on deploy.

`src/lib/clock.ts` exposes `useNow()`, a single shared ticker built on
`useSyncExternalStore`. It returns `null` before the first client render — the
signal to show a neutral placeholder rather than a guess. Consumers:
`StoreStatus`, `HoursList`, `EventSchedule`, `UpcomingEvents`.

Opening hours live in `src/lib/site.ts` as `openingHours` (one entry per
weekday, minutes from midnight) and are the single source of truth for the
open/closed badge, the "closes at" copy, and the printed hours lists.
`src/lib/hours.ts` evaluates them in `America/Toronto` via `Intl`, so a visitor
in Vancouver or Detroit sees whether the *Windsor* shop is open, and DST needs
no maintenance.

## Demo mode

Everything trimmed for the client demo is controlled from `src/lib/flags.ts`.
No content was deleted — each switch below restores in one line.

```ts
export const comingSoon = {
  collectionsIndex: true,   // /collections  → false publishes the full index
  eventsIndex: true,        // /events       → false publishes the full calendar
};

export const showPrices = false;              // true shows every money figure again
export const productsPerCollection = 3;       // null lists the full range
```

**`comingSoon`** — both index pages are built and working; they sit below a
guard in their own route files. Detail pages (`/collections/[slug]`,
`/events/[slug]`) stay live either way and are what the homepage tiles, the
Products dropdown and the mobile menu link to. The hero CTAs point at the
homepage sections (`/#collections`, `/#events`) while the indexes are held
back, so they don't dead-end; the nav, footer and "view all" links still go to
the routes, so the placeholder is there to be shown.

**`showPrices`** — hides every money figure on the site: product prices on
collection pages, and event entry fees on event cards and event detail pages.
It also suppresses the copy that only makes sense next to a figure — the
"prices in Canadian dollars, HST added at the till" lines, the hero's "Priced
in CAD" assurance, the events page's "entry fees are in Canadian dollars" note,
and the "Entry is paid in store" line on event pages. Leaving those in with no
amounts on screen implies a cost the page never states.

Nothing is removed from the data: `product.price` and `event.entry` are intact
and the `en-CA`/CAD formatters in `lib/format.ts` stay wired up. Setting this to
`true` restores everything at once.

**`productsPerCollection`** — caps how many products each collection lists.
Everything that shows a count reads through `getListedProducts()`, so a tile
can't advertise "10 items" and then open a page showing three. The category
sidebar narrows to the categories actually represented in the sample, so no
filter leads to an empty grid.

> `ALL_PRODUCTS` lives in `lib/data.ts`, not in `CollectionProducts`. That
> module is `"use client"`, and a server component importing a plain constant
> from a client module receives a client *reference* rather than the value — it
> arrived as `undefined` and silently dropped "All Products" from the sidebar.

## Canadian conventions

- Prices render through `formatPrice` / `formatPriceWithCurrency` (`en-CA`, CAD).
  The footer and each collection page state the currency and that HST is added
  at the till.
- Dates are day-before-month with the month spelled out ("Monday, 25 May 2026"),
  which removes the 05/25-vs-25/05 ambiguity.
- `<html lang="en-CA">`.
- Canadian spelling throughout (colour, centre, favourite).

## Content that needs the owner's input

- **`events` in `src/lib/data.ts` is a placeholder schedule.** Past events are
  filtered out at runtime, so a stale calendar makes the site look like nothing
  is on. Keep dates ahead of today.
- Product names and prices in `src/lib/data.ts` are placeholders.
- `site.socials` point at bare `instagram.com` / `facebook.com` / `tiktok.com`.
- Disney Lorcana has no artwork; it falls back to the gradient treatment.
