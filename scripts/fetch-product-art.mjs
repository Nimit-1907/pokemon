/**
 * Pulls placeholder product artwork from the public card-game APIs into
 * `public/images/products/<product-id>.webp`.
 *
 * Why this exists: the shop has no product photography yet, so every tile in
 * `lib/data.ts` falls back to its gradient. These are stand-ins — real sealed
 * product shots should replace them. Drop a `Product_<id>.png` into the
 * `optimize-images.mjs` source folder and it overwrites the same output path,
 * so swapping in a real photo needs no change here.
 *
 * Licensing: this art belongs to The Pokémon Company, Wizards of the Coast,
 * Bandai and Ravensburger respectively. Fine for a demo; for the live shop use
 * distributor product shots or your own photos of stock.
 *
 * Sources, all free and key-less:
 *   Pokémon  images.pokemontcg.io  (CDN direct — the v2 API 500s intermittently)
 *   Magic    api.scryfall.com      (cache locally, <10 req/s — their guidelines)
 *   Lorcana  api.lorcast.com
 *   1 Piece  optcgapi.com for the card list, Limitless CDN for the scan
 *
 * One Piece is the awkward one: Bandai stamps a "SAMPLE" band across the middle
 * of every official English card image, and every free mirror is scraped from
 * Bandai, so the stamp is unavoidable. Those cards are art-cropped to the panel
 * *above* the band instead of used whole — see `ART_CROPS.onePiece`.
 *
 * Sports cards and accessories have no card API behind them: those come from
 * Openverse and from hand-picked Wikimedia Commons files respectively, and are
 * CC-licensed rather than publisher-owned. Attribution for them is required —
 * see `public/images/CREDITS.md`.
 *
 * Usage: node scripts/fetch-product-art.mjs [productId ...]
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  ART_CROPS,
  get,
  limitlessOnePieceUrl,
  commonsFile,
  openversePhoto,
  pause,
  ptcgCardUrl,
} from "./lib/art-sources.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public/images/products");

/** Tiles are square and ~20vw at the widest breakpoint; 600px covers 2x. */
const WIDTH = 600;

/*
  Product id -> where its art comes from.

  Sealed product uses the set's logo where the source has one (Pokémon), since
  a logo reads as "this set" far better than one arbitrary card from it.
  Everything else uses a representative card: the chase card for sealed, the
  card itself for singles.
*/
const SOURCES = {
  // --- Pokémon: set logos straight off the CDN, plus one full-art single.
  "pk-1": { via: "ptcgLogo", set: "sv1" },
  "pk-2": { via: "ptcgLogo", set: "swsh12pt5" },
  "pk-3": { via: "ptcgLogo", set: "sv2" },
  "pk-4": { via: "ptcgLogo", set: "sv3pt5" },
  "pk-5": { via: "ptcgLogo", set: "sv4pt5" },
  "pk-6": { via: "ptcgLogo", set: "sv3" },
  "pk-7": { via: "ptcgLogo", set: "sv5" },
  "pk-8": { via: "ptcgLogo", set: "swsh8" },
  // Obsidian Flames #223 — the special-illustration Charizard ex.
  "pk-9": { via: "ptcgCard", set: "sv3", number: "223" },

  // --- One Piece: chase card of the set, leader card of the starter deck.
  "op-1": { via: "optcgSet", set: "OP-01" },
  // Whitebeard, the set's face card — the market-priced chase card for OP-02
  // crops to a torso once the SAMPLE band is cut away.
  "op-2": { via: "optcgSet", set: "OP-02", cardId: "OP02-001" },
  // The deck tile takes Zoro rather than the leader, so it doesn't come out as
  // the same picture as the Luffy leader single two tiles along.
  "op-3": { via: "optcgDeck", set: "ST-01", cardId: "ST01-013" },
  "op-4": { via: "optcgDeck", set: "ST-02", prefer: "Leader" },
  "op-5": { via: "optcgSet", set: "OP-06" },
  "op-6": { via: "optcgDeck", set: "ST-01", prefer: "Leader", name: "Luffy" },

  // --- Magic: Scryfall. Sets resolve to their most-played mythic.
  "mg-1": { via: "scryfallSet", code: "mkm" },
  "mg-2": { via: "scryfallSet", code: "lci" },
  "mg-3": { via: "scryfallNamed", name: "Deep Gnome Terramancer" },
  "mg-4": { via: "scryfallSet", code: "rvr" },
  "mg-5": { via: "scryfallNamed", name: "Sol Ring" },
  "mg-6": { via: "scryfallNamed", name: "Ragavan, Nimble Pilferer" },

  // --- Disney Lorcana: Lorcast.
  "dl-1": { via: "lorcast", q: "set:3 rarity:legendary" },
  "dl-2": { via: "lorcast", q: "set:2 rarity:legendary" },
  "dl-3": { via: "lorcast", q: "set:1 rarity:legendary" },
  "dl-4": { via: "lorcast", q: "set:1 rarity:enchanted" },
  "dl-5": { via: "lorcast", q: "Elsa Snow Queen" },
  "dl-6": { via: "lorcast", q: "Mickey Mouse Brave Little Tailor" },

  /*
    --- Sports cards: Openverse, filtered to commercially-licensed photos.

    There's no sports-card equivalent of Scryfall, so these are photographs of
    the sport rather than of the product. `pick` selects from the result list
    where the first hit is a poor crop or an odd subject.
  */
  "sp-1": { via: "openverse", q: "basketball dunk", pick: 0 },
  "sp-2": { via: "openverse", q: "american football players tackle", pick: 2 },
  "sp-3": { via: "openverse", q: "soccer player ball action", pick: 0 },
  "sp-4": { via: "openverse", q: "basketball player shooting", pick: 1 },
  "sp-5": { via: "openverse", q: "american football quarterback", pick: 1 },
  "sp-6": { via: "openverse", q: "baseball batter", pick: 0 },
  /*
    NOT "trading card album" — that query surfaces WWII-era cigarette-card
    albums, including Nazi propaganda sets. Openverse is an unvetted index;
    every pick here has been eyeballed before being committed.
  */
  "sp-7": { via: "openverse", q: "ice hockey players puck", pick: 3 },

  /*
    --- Accessories: hand-picked Wikimedia Commons files.

    Search ranking is useless for card supplies — "card sleeves" returns
    passport holders and Victorian trade cards — so these are pinned by title.
    All four are CC BY-SA 4.0 and credited in `public/images/CREDITS.md`;
    keep that file in step with this block.

    Shots of identifiable people were rejected on likeness grounds, which are
    separate from the copyright licence. The binder photo is cropped to the
    pages for that reason: the full frame has bystanders in it.
  */
  "pk-10": { via: "commons", file: "Sleeved playing card.jpg" },
  "op-7": { via: "commons", file: "Netrunner - Gateway starter decks.jpg" },
  "mg-7": { via: "commons", file: "Magic the Gathering - Commander.jpg" },
  "dl-7": {
    via: "commons",
    file: "Magic the Gathering - Trade.jpg",
    crop: { left: 0, top: 0.52, width: 1, height: 0.44 },
  },
};

const RESOLVERS = {
  ptcgLogo: async (s) => `https://images.pokemontcg.io/${s.set}/logo.png`,

  ptcgCard: async (s) => ptcgCardUrl(`${s.set}/${s.number}`),

  scryfallNamed: async (s) => {
    const card = await get(
      `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(s.name)}`,
      { json: true },
    );
    return card.image_uris?.normal ?? card.card_faces?.[0]?.image_uris?.normal;
  },

  /* The set's most-played mythic stands in for the box. */
  scryfallSet: async (s) => {
    const q = `e:${s.code} r:mythic`;
    const res = await get(
      `https://api.scryfall.com/cards/search?q=${encodeURIComponent(q)}&order=edhrec&unique=cards`,
      { json: true },
    );
    const card = res.data?.[0];
    return card?.image_uris?.normal ?? card?.card_faces?.[0]?.image_uris?.normal;
  },

  /*
    Photographs, squared off — unlike a card scan there's no framing to
    preserve, so these are cropped to fill the tile rather than contained.
  */
  openverse: async (s) => {
    const url = await openversePhoto(s.q, s.pick);
    return url && { url, square: true };
  },

  commons: async (s) => ({
    url: commonsFile(s.file),
    square: true,
    crop: s.crop,
  }),

  lorcast: async (s) => {
    const res = await get(
      `https://api.lorcast.com/v0/cards/search?q=${encodeURIComponent(s.q)}`,
      { json: true },
    );
    return res.results?.[0]?.image_uris?.digital?.large;
  },

  /* Chase card = the one the market prices highest. */
  optcgSet: async (s) => {
    const cards = await get(`https://optcgapi.com/api/sets/${s.set}/`, {
      json: true,
    });
    const pool = cards.filter(
      (c) => c.card_set_id && (!s.cardId || c.card_set_id === s.cardId),
    );
    const best = pool.sort(
      (a, b) => (b.market_price ?? 0) - (a.market_price ?? 0),
    )[0];
    return onePiecePanel(best?.card_set_id);
  },

  optcgDeck: async (s) => {
    const cards = await get(`https://optcgapi.com/api/decks/${s.set}/`, {
      json: true,
    });
    const pool = cards.filter(
      (c) =>
        c.card_set_id &&
        (!s.cardId || c.card_set_id === s.cardId) &&
        (!s.prefer || c.card_type === s.prefer) &&
        (!s.name || c.card_name.includes(s.name)),
    );
    return onePiecePanel(
      (pool.length ? pool : cards.filter((c) => c.card_set_id))[0]?.card_set_id,
    );
  },
};

/** A One Piece scan plus the crop that takes the art above the SAMPLE band. */
function onePiecePanel(cardSetId) {
  const url = limitlessOnePieceUrl(cardSetId);
  return url && { url, crop: ART_CROPS.onePiece };
}

async function run() {
  const only = process.argv.slice(2);
  const ids = only.length ? only : Object.keys(SOURCES);
  await mkdir(OUT, { recursive: true });

  let ok = 0;
  const failed = [];
  let first = true;

  for (const id of ids) {
    // Space the requests out — see the backoff note in `get`.
    if (!first) await pause();
    first = false;
    const source = SOURCES[id];
    if (!source) {
      failed.push(`${id} — no source mapped`);
      continue;
    }
    try {
      const resolved = await RESOLVERS[source.via](source);
      if (!resolved) throw new Error("source returned no image");
      const { url, crop, square } =
        typeof resolved === "string" ? { url: resolved } : resolved;
      const raw = await get(url);

      let pipeline = sharp(raw);
      if (crop) {
        const meta = await pipeline.metadata();
        // Fractions of the scan, so a re-scanned source needs no pixel maths.
        pipeline = pipeline.extract({
          left: Math.round(meta.width * crop.left),
          top: Math.round(meta.height * crop.top),
          width: Math.round(meta.width * crop.width),
          height: Math.round(meta.height * crop.height),
        });
      }

      /*
        Alpha is preserved so the transparent set logos sit straight on the
        tile's gradient — CardArt already paints that behind the image, so
        there's nothing to composite here.

        Cropped art and photographs are squared off (`cover`) and rounded, so
        they read as deliberate art panels beside the full card scans rather
        than as letterboxed strips. Card scans keep their own aspect.
      */
      pipeline = crop || square
        ? pipeline.resize(WIDTH, WIDTH, { fit: "cover" }).composite([
            {
              input: Buffer.from(
                `<svg width="${WIDTH}" height="${WIDTH}"><rect width="${WIDTH}" height="${WIDTH}" rx="${Math.round(WIDTH * 0.05)}"/></svg>`,
              ),
              blend: "dest-in",
            },
          ])
        : pipeline.resize(WIDTH, WIDTH, {
            fit: "inside",
            withoutEnlargement: true,
          });

      const buf = await pipeline.webp({ quality: 82 }).toBuffer();

      await writeFile(join(OUT, `${id}.webp`), buf);
      console.log(
        `${`products/${id}.webp`.padEnd(28)} ${(buf.length / 1024).toFixed(0)}kB  ${url.slice(0, 60)}`,
      );
      ok++;
    } catch (err) {
      failed.push(`${id} — ${err.message}`);
    }
  }

  console.log(`\n${ok}/${ids.length} fetched`);
  if (failed.length) {
    console.error("\nfailed:");
    for (const f of failed) console.error(`  ${f}`);
    process.exitCode = 1;
  }
}

run();
