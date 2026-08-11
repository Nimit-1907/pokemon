/**
 * Shared plumbing for `fetch-product-art.mjs`, which builds the placeholder
 * product tiles. It was shared with a collection-art builder too, until that
 * script was dropped in favour of hand-supplied key art.
 *
 * All the card sources are free and key-less. See the header of
 * `fetch-product-art.mjs` for the licensing position on the art itself.
 */

/*
  Scryfall's guidelines ask for an identifying User-Agent, and Wikimedia —
  which serves most Openverse results — 429s any agent without a project URL
  in it. One string satisfies both.
*/
export const UA = "EmeraldCardsAndGames/1.0 (+https://github.com/Nimit1907/pokemon)";

/**
 * The illustration window of a card, as fractions of the scan. Cropping to
 * these strips the frame, name bar and rules text, leaving just the art.
 *
 * `onePiece` is the load-bearing one: Bandai stamps a "SAMPLE" band across the
 * middle of every official English One Piece image and every free mirror is
 * scraped from Bandai, so the crop has to stop above it. `pokemon` starts at
 * 12.8% rather than 10% to clear the "Evolves from …" bar that Stage-1 cards
 * carry above the art, and `lorcana` starts at 15% to clear the ink-cost
 * gem, which Lorcana prints over the top-left corner of the illustration.
 */
export const ART_CROPS = {
  pokemon: { left: 0.075, top: 0.128, width: 0.85, height: 0.275 },
  lorcana: { left: 0.05, top: 0.15, width: 0.9, height: 0.32 },
  onePiece: { left: 0.035, top: 0.095, width: 0.93, height: 0.325 },
};

/** Fetch with backoff — the Pokémon API 500s and Wikimedia 429s under load. */
export async function get(url, { json = false, tries = 4 } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": UA,
          Accept: json ? "application/json" : "image/*",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return json ? await res.json() : Buffer.from(await res.arrayBuffer());
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 800 * 2 ** (attempt - 1)));
    }
  }
  throw new Error(`${url} — ${lastErr.message}`);
}

/** Politeness gap between successive downloads. */
export const pause = (ms = 500) => new Promise((r) => setTimeout(r, ms));

/** `sv3/223` -> the hi-res scan of that card. */
export const ptcgCardUrl = (setAndNumber) =>
  `https://images.pokemontcg.io/${setAndNumber}_hires.png`;

/**
 * A One Piece card scan from the Limitless CDN.
 *
 * optcgapi is the card *list* — its own scans carry the SAMPLE band and its
 * parallel-art ids (`OP01-120_p2`) have no clean equivalent, so the base card
 * is taken from Limitless instead.
 */
export function limitlessOnePieceUrl(cardSetId) {
  if (!cardSetId) return null;
  const base = cardSetId.split("_")[0];
  return `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/one-piece/${base.split("-")[0]}/${base}_EN.webp`;
}

/*
  Scryfall and Lorcast helpers used to live here, for the collection art
  builder. That script is gone — the collection art is hand-supplied now — and
  `fetch-product-art.mjs` has its own Scryfall/Lorcast fetchers, which want full
  card images rather than art crops. Nothing was left calling these.
*/

/**
 * A commercially-licensed photograph from Openverse.
 *
 * Openverse is an unvetted index — a "trading card album" search surfaces
 * WWII-era cigarette-card sets, including Nazi propaganda. Every pick that
 * ships has been eyeballed first; `pick` exists to step past bad hits.
 */
export async function openversePhoto(query, pick = 0) {
  const res = await get(
    `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}` +
      `&license_type=commercial&size=large&page_size=8`,
    { json: true },
  );
  return (res.results ?? []).filter((r) => r.url)[pick]?.url ?? null;
}
