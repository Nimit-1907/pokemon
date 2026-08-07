/*
  Routes that are built and working but held back for the client demo.

  The full implementations still live in their route files — flipping a flag
  here to `false` publishes one, no code to restore. Keeping them behind a
  switch rather than deleting them means the work isn't lost and the demo is
  reversible in seconds.

  Typed as plain `boolean` on purpose: `as const` would narrow each to a literal
  `true`, and TypeScript would then treat the real page body below the guard as
  unreachable.
*/
export const comingSoon: {
  /** `/collections` — the full product index. */
  collectionsIndex: boolean;
  /** `/events` — the full calendar and event listing. */
  eventsIndex: boolean;
} = {
  collectionsIndex: true,
  eventsIndex: true,
};

/*
  Every money figure is hidden for the demo — product prices and event entry
  fees alike.

  This also suppresses the copy that only makes sense alongside a figure: the
  "prices in Canadian dollars, HST added at the till" lines, the hero's "Priced
  in CAD" assurance, and the "entry fees are in Canadian dollars" note on the
  events page. Leaving those in with no amounts on screen reads as a bug rather
  than as restraint.

  Nothing is removed from the data — `product.price` and `event.entry` are
  still there, still formatted through `lib/format.ts`. This only controls
  whether they're rendered.
*/
export const showPrices = false;

/**
 * How many products each collection page lists. `null` shows the full range.
 *
 * The category sidebar narrows to match — see `collections/[slug]/page.tsx`.
 * Offering a "Singles" filter that leads to an empty grid is worse than not
 * offering it.
 */
export const productsPerCollection: number | null = 3;

/*
  Where the "browse everything" calls to action point while the index pages are
  held back.

  A hero CTA that lands on a "Coming soon" page is a bad demo moment, so while
  the flag is on they scroll to the matching section of the homepage instead —
  which shows real, working content. The nav and footer deliberately still point
  at the routes, so the coming-soon treatment is there to be shown off.
*/
export const collectionsHref = comingSoon.collectionsIndex
  ? "/#collections"
  : "/collections";

export const eventsHref = comingSoon.eventsIndex ? "/#events" : "/events";
