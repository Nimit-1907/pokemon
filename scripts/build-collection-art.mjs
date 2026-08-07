/**
 * Builds the collection posters and banners in `public/images/collections`
 * and `public/images/banners` from card art.
 *
 * Each collection gets:
 *   poster  700x700   one hero illustration, filling the tile
 *   banner  1400x700  a triptych of three illustrations over the collection's
 *                     own gradient, which shows through as the seams
 *
 * The art is cropped out of card scans (see `ART_CROPS`) so no card frame,
 * name bar or rules text survives — these read as illustration, not as
 * screenshots of cards. Nothing here carries a text lockup: every surface that
 * shows this art renders the collection name itself.
 *
 * Licensing matches `fetch-product-art.mjs` — placeholder art belonging to the
 * respective publishers. Replace with your own photography before launch.
 *
 * Usage: node scripts/build-collection-art.mjs [slug ...]
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  ART_CROPS,
  get,
  limitlessOnePieceUrl,
  lorcastCards,
  openversePhoto,
  pause,
  ptcgCardUrl,
  scryfallArtCrop,
} from "./lib/art-sources.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(root, "public/images");

/*
  Sizes are driven by how small these actually render — the poster tops out
  around 320 CSS px and the banner around 480 — and by how little resolution
  the sources have. A card's illustration window is only ~620x280, so anything
  larger is upscaling. These are roughly 2x the display size and no more.

  The poster is a stacked pair rather than one image for the same reason: card
  art is wide (up to 2.2:1), and cropping a single wide illustration to a
  square magnifies it two-and-a-half times. Two panels at their native aspect
  fill a square with no upscaling at all.
*/
const POSTER = { size: 600, panels: 2 };
const BANNER = { width: 900, height: 450 };
/** Gradient showing through between stacked panels. */
const SEAM = 8;

/*
  Gradients mirror `collections[].gradient` in `src/lib/data.ts` — they're the
  same colours the tile paints behind the artwork, so a banner seam matches the
  surface it sits on. Keep the two in step.

  `panels` are listed hero-first: [0] becomes the poster, [0..2] the banner.
*/
const COLLECTIONS = {
  pokemon: {
    gradient: { from: "#f5b342", to: "#b8341e" },
    crop: ART_CROPS.pokemon,
    // The Pokémon API 500s persistently, so these are CDN paths, not a search.
    panels: [
      { url: ptcgCardUrl("sv3pt5/6") }, // Charizard, mid-attack
      { url: ptcgCardUrl("sv3/26") }, // Charmander over lava
      { url: ptcgCardUrl("sv1/26") }, // Inkay, underwater
    ],
  },
  "one-piece": {
    gradient: { from: "#e23b3b", to: "#7a1414" },
    crop: ART_CROPS.onePiece,
    panels: [
      { url: limitlessOnePieceUrl("ST01-001") }, // Luffy
      { url: limitlessOnePieceUrl("OP01-120") }, // Shanks
      { url: limitlessOnePieceUrl("OP02-001") }, // Whitebeard
    ],
  },
  magic: {
    gradient: { from: "#6b5b95", to: "#241b30" },
    // Scryfall serves a frame-free art crop directly.
    panels: [
      { via: () => scryfallArtCrop("Ragavan, Nimble Pilferer") },
      { via: () => scryfallArtCrop("e:lci r:mythic") },
      { via: () => scryfallArtCrop("e:mkm r:mythic") },
    ],
  },
  "disney-lorcana": {
    gradient: { from: "#7c4dbd", to: "#2a1a4a" },
    crop: ART_CROPS.lorcana,
    panels: [
      { via: async () => (await lorcastCards("set:3 rarity:legendary"))[0] },
      { via: async () => (await lorcastCards("set:2 rarity:legendary"))[0] },
      { via: async () => (await lorcastCards("set:1 rarity:legendary"))[0] },
    ],
  },
  "sports-cards": {
    gradient: { from: "#2f7fd1", to: "#123a63" },
    // Photographs, not card art — nothing to crop out of a frame.
    panels: [
      { via: () => openversePhoto("basketball game action", 2) },
      { via: () => openversePhoto("american football players tackle", 3) },
      { via: () => openversePhoto("baseball pitcher throwing", 4) },
    ],
  },
};

/** Fetch one panel and crop it down to its illustration. */
async function panelArt(panel, crop) {
  const url = panel.url ?? (await panel.via());
  if (!url) throw new Error("panel source returned no image");
  const raw = await get(url);
  if (!crop) return raw;

  const meta = await sharp(raw).metadata();
  // Fractions of the scan, so a re-scanned source needs no pixel maths.
  return sharp(raw)
    .extract({
      left: Math.round(meta.width * crop.left),
      top: Math.round(meta.height * crop.top),
      width: Math.round(meta.width * crop.width),
      height: Math.round(meta.height * crop.height),
    })
    .toBuffer();
}

const gradientSvg = ({ from, to }, w, h) =>
  Buffer.from(
    `<svg width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1">` +
      `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>` +
      `<rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  );

async function build(slug, spec) {
  const arts = [];
  for (const panel of spec.panels) {
    if (arts.length) await pause();
    arts.push(await panelArt(panel, spec.crop));
  }

  /*
    Poster — panels stacked down a square, seam showing the gradient.

    Default (centre) crop positioning throughout: `attention` chases contrast
    and picked a fireball or a pair of hands over the character every time.
  */
  const band = Math.floor((POSTER.size - SEAM * (POSTER.panels - 1)) / POSTER.panels);
  const bands = await Promise.all(
    arts
      .slice(0, POSTER.panels)
      .map((art) => sharp(art).resize(POSTER.size, band, { fit: "cover" }).toBuffer()),
  );
  const poster = await sharp(gradientSvg(spec.gradient, POSTER.size, POSTER.size))
    .composite(bands.map((input, i) => ({ input, left: 0, top: i * (band + SEAM) })))
    .webp({ quality: 82 })
    .toBuffer();
  await writeFile(join(PUBLIC, "collections", `${slug}.webp`), poster);

  /*
    Banner — the hero illustration alone. Its 2:1 frame is close to the native
    aspect of a cropped card illustration, so this is the one place a single
    image fits without being magnified.
  */
  const banner = await sharp(arts[0])
    .resize(BANNER.width, BANNER.height, { fit: "cover" })
    .webp({ quality: 82 })
    .toBuffer();
  await writeFile(join(PUBLIC, "banners", `${slug}.webp`), banner);

  return { poster: poster.length, banner: banner.length };
}

async function run() {
  const only = process.argv.slice(2);
  const slugs = only.length ? only : Object.keys(COLLECTIONS);
  await mkdir(join(PUBLIC, "collections"), { recursive: true });
  await mkdir(join(PUBLIC, "banners"), { recursive: true });

  const failed = [];
  for (const slug of slugs) {
    const spec = COLLECTIONS[slug];
    if (!spec) {
      failed.push(`${slug} — no source mapped`);
      continue;
    }
    try {
      const { poster, banner } = await build(slug, spec);
      const kb = (n) => `${(n / 1024).toFixed(0)}kB`;
      console.log(
        `${slug.padEnd(16)} poster ${kb(poster).padStart(6)}   banner ${kb(banner).padStart(6)}`,
      );
    } catch (err) {
      failed.push(`${slug} — ${err.message}`);
    }
  }

  if (failed.length) {
    console.error("\nfailed:");
    for (const f of failed) console.error(`  ${f}`);
    process.exitCode = 1;
  }
}

run();
