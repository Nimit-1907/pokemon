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
  // The full lockup — alpha preserved so it sits on any surface.
  ["Logo_Without_Background_1.png", `${PUBLIC}/logo.webp`, { width: 512 }],

  /*
    NOTE: there is deliberately no cropped "mark" variant.

    This badge doesn't decompose. Cropping to the shield cuts it off at the
    banner; cropping to the gem can't avoid catching the top of the "EMERALD"
    lettering, because the gem's lower points sit behind the banner. Every
    attempt reads as a clipped image rather than as a mark. The full lockup is
    used everywhere instead — small, but whole.
  */

  // The shield without the wordmark, for use as a watermark behind type —
  // the full logo's own lettering fights whatever sits on top of it.
  //
  // Cropped to the shield's own bounds: the artwork's banner starts at ~54%
  // of the height, and the shield spans 11%–89% across. Cutting to those keeps
  // the mark centred instead of floating in the source's transparent margins.
  [
    "Logo_Without_Background_1.png",
    `${PUBLIC}/emblem.webp`,
    { width: 512, crop: { top: 0.045, height: 0.485, left: 0.1, width: 0.8 } },
  ],

  // Store interiors.
  ["AboutUs_HomePage_StoreImage.png", `${PUBLIC}/store-home.webp`, { width: 1200 }],
  ["AboutUs_MainPage_StoreImage.png", `${PUBLIC}/store-about.webp`, { width: 1400 }],

  /*
    Collection art is NOT built here.

    `public/images/collections/<slug>.png` is one piece of hand-supplied 3:4 key
    art per collection, dropped in as-is and used at every size. It was
    generated from the card APIs for a while, by a `build-collection-art.mjs`
    that no longer exists. No jobs here touch those files, so a re-run can't
    overwrite the art.
  */

  /*
    Favicon + touch icon (Next's file conventions pick these up by name).

    The whole badge, uncropped. `fit: "contain"` squares it off so browsers
    don't stretch it into a square slot, and the source is close enough to
    square that it still fills the tile.
  */
  ...[
    [`${APP}/icon.png`, 256, null],
    // Apple composites touch icons onto an opaque tile and ignores alpha, so
    // this one is flattened onto the site's ink rather than left transparent.
    [`${APP}/apple-icon.png`, 180, { r: 6, g: 16, b: 11, alpha: 1 }],
  ].map(([out, size, flatten]) => [
    "Logo_Without_Background_1.png",
    out,
    {
      width: size,
      height: size,
      fit: "contain",
      format: "png",
      ...(flatten ? { flatten } : {}),
    },
  ]),

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
      /** Pad colour for `fit: "contain"`. Transparent unless given. */
      background = { r: 0, g: 0, b: 0, alpha: 0 },
      /** Composite onto an opaque colour — for icons that can't be transparent. */
      flatten,
    } = opts;

    let pipeline = sharp(join(SRC, name));
    if (crop) {
      const meta = await pipeline.metadata();
      // Fractions of the source, so a re-cut source doesn't need pixel maths.
      // `left`/`width` default to the full width for top-and-tail crops.
      pipeline = pipeline.extract({
        left: Math.round(meta.width * (crop.left ?? 0)),
        top: Math.round(meta.height * crop.top),
        width: Math.round(meta.width * (crop.width ?? 1)),
        height: Math.round(meta.height * crop.height),
      });
    }
    /*
      Flatten first. sharp orders `flatten` ahead of `resize` internally
      regardless of call order, so flattening afterwards leaves the transparent
      padding that `fit: "contain"` just added — the icon came out with clear
      corners and an opaque middle. Doing it here, and padding with the same
      colour, gives a uniformly opaque tile.
    */
    if (flatten) pipeline = pipeline.flatten({ background: flatten });
    pipeline = pipeline.resize(width, height, {
      fit,
      background: flatten ?? background,
      withoutEnlargement: true,
    });

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
