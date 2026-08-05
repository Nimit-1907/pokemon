/**
 * Turns the source artwork (large PNGs, ~34MB) into the web assets in
 * `public/images`. The GitHub Pages export runs with `images.unoptimized`, so
 * nothing resizes these at request time — the committed files are what ships.
 *
 * Usage: node scripts/optimize-images.mjs [sourceDir]
 */
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.argv[2] ?? "/home/nimit/Nimit1907/Images";
const PUBLIC = join(root, "public/images");
const APP = join(root, "src/app");

/**
 * [source, output, { width, height, format, quality, fit, optional }]
 *
 * `optional: true` entries are artwork we don't have yet — drop a file with
 * that exact name into the source folder, re-run, and it ships. Missing
 * optional sources are reported and skipped; missing required ones fail.
 */
const JOBS = [
  // Brand mark — alpha preserved so it sits on any surface.
  ["Logo_Without_Background.png", `${PUBLIC}/logo.webp`, { width: 512 }],

  // The shield without the wordmark, for use as a watermark behind type —
  // the full logo's own lettering fights whatever sits on top of it.
  [
    "Logo_Without_Background.png",
    `${PUBLIC}/emblem.webp`,
    { width: 512, crop: { top: 0.05, height: 0.43 } },
  ],

  // Hero backdrop, dimmed to a texture behind the copy.
  ["Background_Banner.png", `${PUBLIC}/hero-backdrop.webp`, { width: 1600 }],

  // Store interiors.
  ["AboutUs_HomePage_StoreImage.png", `${PUBLIC}/store-home.webp`, { width: 1200 }],
  ["AboutUs_MainPage_StoreImage.png", `${PUBLIC}/store-about.webp`, { width: 1400 }],

  // Square collection posters — card art for tiles and the hero fan.
  ["Poster_Pokemon1.png", `${PUBLIC}/collections/pokemon.webp`, { width: 700 }],
  ["Poster_OnePiece1.png", `${PUBLIC}/collections/one-piece.webp`, { width: 700 }],
  ["Poster_Magic.png", `${PUBLIC}/collections/magic.webp`, { width: 700 }],
  ["Poster_Sports.png", `${PUBLIC}/collections/sports-cards.webp`, { width: 700 }],

  // Wide collection banners — page headers and event cards.
  ["Banner_Pokemon.png", `${PUBLIC}/banners/pokemon.webp`, { width: 1400 }],
  ["Banner_OnePiece.png", `${PUBLIC}/banners/one-piece.webp`, { width: 1400 }],
  ["Banner_Magic.png", `${PUBLIC}/banners/magic.webp`, { width: 1400 }],
  ["Banner_Sports.png", `${PUBLIC}/banners/sports-cards.webp`, { width: 1400 }],

  // Disney Lorcana has no artwork yet — it falls back to the gradient
  // treatment everywhere until these two land.
  [
    "Poster_Lorcana.png",
    `${PUBLIC}/collections/disney-lorcana.webp`,
    { width: 700, optional: true },
  ],
  [
    "Banner_Lorcana.png",
    `${PUBLIC}/banners/disney-lorcana.webp`,
    { width: 1400, optional: true },
  ],

  // Favicon + touch icon (Next's file conventions pick these up by name).
  ["Logo_Without_Background.png", `${APP}/icon.png`, { width: 256, format: "png" }],
  ["Logo_Without_Background.png", `${APP}/apple-icon.png`, { width: 180, format: "png" }],

  // Social preview.
  [
    "Welcome_Page.png",
    `${APP}/opengraph-image.jpg`,
    { width: 1200, height: 630, fit: "cover", format: "jpeg", quality: 82 },
  ],
];

const kb = (n) => `${(n / 1024).toFixed(0)}kB`;

async function run() {
  const sources = new Set(await readdir(SRC));
  let before = 0;
  let after = 0;

  // Any Product_<product-id>.png in the source folder becomes that product's
  // photo — no edit to this file needed when new shots arrive.
  for (const name of sources) {
    const id = name.match(/^Product_(.+)\.png$/i)?.[1];
    if (id) JOBS.push([name, `${PUBLIC}/products/${id}.webp`, { width: 700 }]);
  }

  for (const [name, out, opts] of JOBS) {
    if (!sources.has(name)) {
      if (opts.optional) {
        console.log(`${"(awaiting artwork)".padEnd(44)} ${name}`);
        continue;
      }
      console.error(`missing source: ${name}`);
      process.exitCode = 1;
      continue;
    }
    await mkdir(dirname(out), { recursive: true });

    const {
      width,
      height,
      fit = "inside",
      format = "webp",
      quality = 80,
      crop,
    } = opts;

    let pipeline = sharp(join(SRC, name));
    if (crop) {
      const meta = await pipeline.metadata();
      pipeline = pipeline.extract({
        left: 0,
        top: Math.round(meta.height * crop.top),
        width: meta.width,
        height: Math.round(meta.height * crop.height),
      });
    }
    pipeline = pipeline.resize(width, height, { fit, withoutEnlargement: true });

    const buf = await (format === "webp"
      ? pipeline.webp({ quality })
      : format === "png"
        ? pipeline.png({ compressionLevel: 9, palette: true })
        : pipeline.jpeg({ quality, mozjpeg: true })
    ).toBuffer();

    await writeFile(out, buf);

    before += (await stat(join(SRC, name))).size;
    after += buf.length;
    console.log(`${out.replace(root + "/", "").padEnd(44)} ${kb(buf.length)}`);
  }

  console.log(`\ntotal: ${kb(before)} source -> ${kb(after)} shipped`);
}

run();
