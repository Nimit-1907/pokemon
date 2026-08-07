import { productsPerCollection } from "@/lib/flags";
import type { Collection, Product, StoreEvent } from "@/types";

/**
 * The catch-all category filter.
 *
 * Lives here, not in `CollectionProducts`, because that module is
 * `"use client"` — a server component importing a plain constant from a client
 * module gets a client *reference* rather than the value, so this arrived as
 * `undefined` and silently filtered "All Products" out of the sidebar.
 */
export const ALL_PRODUCTS = "All Products";

/**
 * Central mock data. Everything the site renders is driven from here so pages
 * stay data-driven and reusable. Per-collection gradients stand in for card art
 * until real imagery is supplied.
 */

export const collections: Collection[] = [
  {
    slug: "pokemon",
    name: "Pokémon",
    tagline: "The world's #1 TCG",
    description:
      "Explore sealed products, singles, and accessories from the Pokémon TCG — from the newest Scarlet & Violet sets to classic chase cards.",
    gradient: { from: "#f5b342", to: "#b8341e" },
    image: "/images/collections/pokemon.webp",
    banner: "/images/banners/pokemon.webp",
    categories: [
      "All Products",
      "Booster Boxes",
      "Elite Trainer Boxes",
      "Booster Packs",
      "Singles",
      "Accessories",
    ],
  },
  {
    slug: "one-piece",
    name: "One Piece",
    tagline: "Set sail for adventure",
    description:
      "Booster boxes, starter decks, and singles from the fast-growing One Piece Card Game. Build your crew and battle for the One Piece.",
    gradient: { from: "#e23b3b", to: "#7a1414" },
    image: "/images/collections/one-piece.webp",
    banner: "/images/banners/one-piece.webp",
    categories: [
      "All Products",
      "Booster Boxes",
      "Starter Decks",
      "Booster Packs",
      "Singles",
      "Accessories",
    ],
  },
  {
    slug: "magic",
    name: "Magic: The Gathering",
    tagline: "The original TCG",
    description:
      "The deepest trading card game in the world. Shop the latest sets, Commander decks, singles, and sealed product for every format.",
    gradient: { from: "#6b5b95", to: "#241b30" },
    image: "/images/collections/magic.webp",
    banner: "/images/banners/magic.webp",
    categories: [
      "All Products",
      "Booster Boxes",
      "Commander Decks",
      "Bundles",
      "Singles",
      "Accessories",
    ],
  },
  {
    slug: "disney-lorcana",
    name: "Disney Lorcana",
    tagline: "Become a legendary Illumineer",
    description:
      "Collect and play with the magic of Disney. Illumineer's Trove, booster boxes, starter decks, and singles from Disney Lorcana.",
    gradient: { from: "#7c4dbd", to: "#2a1a4a" },
    image: "/images/collections/disney-lorcana.webp",
    banner: "/images/banners/disney-lorcana.webp",
    categories: [
      "All Products",
      "Booster Boxes",
      "Starter Decks",
      "Illumineer's Trove",
      "Singles",
      "Accessories",
    ],
  },
  {
    slug: "sports-cards",
    name: "Sports Cards",
    tagline: "Hobby boxes & hits",
    description:
      "Basketball, football, soccer and more. Hobby boxes, blasters, and singles across the biggest brands in the sports card hobby.",
    gradient: { from: "#2f7fd1", to: "#123a63" },
    image: "/images/collections/sports-cards.webp",
    banner: "/images/banners/sports-cards.webp",
    categories: [
      "All Products",
      "Hobby Boxes",
      "Blaster Boxes",
      "Singles",
      "Supplies",
    ],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

/*
  PLACEHOLDER SCHEDULE — replace with the shop's real calendar.

  These dates are the one part of this file that expires. Anything already in
  the past is filtered out of the listings at runtime, so a stale calendar
  doesn't show finished events — but it does leave the site looking like
  nothing is on. Keep dates ahead of today.
*/
export const events: StoreEvent[] = [
  {
    slug: "pokemon-league-challenge",
    title: "Pokémon League Challenge",
    date: "2026-08-15",
    time: "12:00 PM",
    entry: "$10 Entry",
    collection: "pokemon",
    location: "Emerald Cards & Games — Windsor, ON",
    description:
      "A sanctioned Pokémon TCG League Challenge. Earn Championship Points, win booster packs, and battle trainers of all levels.",
    gradient: { from: "#f5b342", to: "#b8341e" },
  },
  {
    slug: "one-piece-store-tournament",
    title: "One Piece Store Tournament",
    date: "2026-08-22",
    time: "1:00 PM",
    entry: "$10 Entry",
    collection: "one-piece",
    location: "Emerald Cards & Games — Windsor, ON",
    description:
      "Official One Piece Card Game store tournament. Swiss rounds with promo packs for all entrants and prizes for the top crews.",
    gradient: { from: "#e23b3b", to: "#7a1414" },
  },
  {
    slug: "friday-night-magic",
    title: "Friday Night Magic",
    date: "2026-08-14",
    time: "6:00 PM",
    entry: "$5 Entry",
    collection: "magic",
    location: "Emerald Cards & Games — Windsor, ON",
    description:
      "The weekly Magic: The Gathering tradition. Casual and competitive players welcome — draft, standard, and Commander pods every week.",
    gradient: { from: "#6b5b95", to: "#241b30" },
  },
  {
    slug: "lorcana-league",
    title: "Lorcana League",
    date: "2026-08-29",
    time: "12:00 PM",
    entry: "$10 Entry",
    collection: "disney-lorcana",
    location: "Emerald Cards & Games — Windsor, ON",
    description:
      "Join our Disney Lorcana League for a relaxed afternoon of games, trades, and exclusive league promos for every Illumineer.",
    gradient: { from: "#7c4dbd", to: "#2a1a4a" },
  },
  {
    slug: "sports-card-break-night",
    title: "Sports Card Break Night",
    date: "2026-09-04",
    time: "7:00 PM",
    entry: "Buy-in varies",
    collection: "sports-cards",
    location: "Emerald Cards & Games — Windsor, ON",
    description:
      "Group breaks of the hottest hobby boxes. Claim your teams, watch the hits live, and take home every card from your slots.",
    gradient: { from: "#2f7fd1", to: "#123a63" },
  },
  {
    slug: "commander-night",
    title: "Commander Night",
    date: "2026-09-12",
    time: "6:30 PM",
    entry: "Free",
    collection: "magic",
    location: "Emerald Cards & Games — Windsor, ON",
    description:
      "Bring your favourite 100-card deck for a night of multiplayer Magic. Pods form all evening — new and veteran commanders welcome.",
    gradient: { from: "#6b5b95", to: "#241b30" },
  },
  {
    slug: "pokemon-prerelease",
    title: "Pokémon Set Prerelease",
    date: "2026-09-19",
    time: "11:00 AM",
    entry: "$30 Entry",
    collection: "pokemon",
    location: "Emerald Cards & Games — Windsor, ON",
    description:
      "Be the first to open the newest Pokémon TCG set. Build a deck from your prerelease kit and battle for exclusive promo cards.",
    gradient: { from: "#f5b342", to: "#b8341e" },
  },
];

export function getEvent(slug: string): StoreEvent | undefined {
  return events.find((e) => e.slug === slug);
}

/** Events in chronological order (ISO dates sort lexicographically). */
export const sortedEvents: StoreEvent[] = [...events].sort((a, b) =>
  a.date.localeCompare(b.date),
);

export const products: Product[] = [
  // Pokémon
  { id: "pk-1", name: "Scarlet & Violet", collection: "pokemon", category: "Booster Boxes", type: "Booster Box", price: 149.99, gradient: { from: "#f5b342", to: "#b8341e" }, image: "/images/products/pk-1.webp" },
  { id: "pk-2", name: "Crown Zenith", collection: "pokemon", category: "Elite Trainer Boxes", type: "Elite Trainer Box", price: 69.99, gradient: { from: "#4aa3df", to: "#153a5b" }, image: "/images/products/pk-2.webp" },
  { id: "pk-3", name: "Paldea Evolved", collection: "pokemon", category: "Booster Boxes", type: "Booster Box", price: 139.99, gradient: { from: "#e0679b", to: "#5b1f3a" }, image: "/images/products/pk-3.webp" },
  { id: "pk-4", name: "151", collection: "pokemon", category: "Booster Packs", type: "Booster Bundle", price: 26.99, gradient: { from: "#e23b3b", to: "#7a1414" }, image: "/images/products/pk-4.webp" },
  { id: "pk-5", name: "Paldean Fates", collection: "pokemon", category: "Elite Trainer Boxes", type: "Elite Trainer Box", price: 59.99, gradient: { from: "#c9a227", to: "#4a3708" }, image: "/images/products/pk-5.webp" },
  { id: "pk-6", name: "Obsidian Flames", collection: "pokemon", category: "Booster Boxes", type: "Booster Box", price: 129.99, gradient: { from: "#3a3a3a", to: "#0a0a0a" }, image: "/images/products/pk-6.webp" },
  { id: "pk-7", name: "Temporal Forces", collection: "pokemon", category: "Booster Boxes", type: "Booster Box", price: 129.99, gradient: { from: "#7c4dbd", to: "#2a1a4a" }, image: "/images/products/pk-7.webp" },
  { id: "pk-8", name: "Fusion Strike", collection: "pokemon", category: "Booster Packs", type: "Booster Pack", price: 4.99, gradient: { from: "#e0679b", to: "#3a1428" }, image: "/images/products/pk-8.webp" },
  { id: "pk-9", name: "Charizard ex", collection: "pokemon", category: "Singles", type: "Single Card", price: 89.99, gradient: { from: "#ff7a1a", to: "#7a1414" }, image: "/images/products/pk-9.webp" },
  { id: "pk-10", name: "Premium Card Sleeves", collection: "pokemon", category: "Accessories", type: "Accessory", price: 12.99, gradient: { from: "#3fae14", to: "#123a08" } },

  // One Piece
  { id: "op-1", name: "Romance Dawn", collection: "one-piece", category: "Booster Boxes", type: "Booster Box", price: 119.99, gradient: { from: "#e23b3b", to: "#7a1414" }, image: "/images/products/op-1.webp" },
  { id: "op-2", name: "Paramount War", collection: "one-piece", category: "Booster Boxes", type: "Booster Box", price: 124.99, gradient: { from: "#c9302c", to: "#4a0f0f" }, image: "/images/products/op-2.webp" },
  { id: "op-3", name: "Straw Hat Crew", collection: "one-piece", category: "Starter Decks", type: "Starter Deck", price: 14.99, gradient: { from: "#e07b1a", to: "#5b2e08" }, image: "/images/products/op-3.webp" },
  { id: "op-4", name: "Worst Generation", collection: "one-piece", category: "Starter Decks", type: "Starter Deck", price: 14.99, gradient: { from: "#8b2fd1", to: "#2a1a4a" }, image: "/images/products/op-4.webp" },
  { id: "op-5", name: "Wings of Captain", collection: "one-piece", category: "Booster Packs", type: "Booster Pack", price: 5.49, gradient: { from: "#2f7fd1", to: "#123a63" }, image: "/images/products/op-5.webp" },
  { id: "op-6", name: "Monkey D. Luffy", collection: "one-piece", category: "Singles", type: "Leader Card", price: 34.99, gradient: { from: "#e23b3b", to: "#3a1010" }, image: "/images/products/op-6.webp" },
  { id: "op-7", name: "Playmat — Grand Line", collection: "one-piece", category: "Accessories", type: "Accessory", price: 24.99, gradient: { from: "#3fae14", to: "#123a08" } },

  // Magic: The Gathering
  { id: "mg-1", name: "Murders at Karlov Manor", collection: "magic", category: "Booster Boxes", type: "Play Booster Box", price: 129.99, gradient: { from: "#6b5b95", to: "#241b30" }, image: "/images/products/mg-1.webp" },
  { id: "mg-2", name: "The Lost Caverns", collection: "magic", category: "Booster Boxes", type: "Set Booster Box", price: 134.99, gradient: { from: "#4a7c59", to: "#16281c" }, image: "/images/products/mg-2.webp" },
  { id: "mg-3", name: "Deep Gnome Commander", collection: "magic", category: "Commander Decks", type: "Commander Deck", price: 44.99, gradient: { from: "#8a6d3b", to: "#2e2410" }, image: "/images/products/mg-3.webp" },
  { id: "mg-4", name: "Ravnica Remastered Bundle", collection: "magic", category: "Bundles", type: "Bundle", price: 49.99, gradient: { from: "#b5452f", to: "#3a1610" }, image: "/images/products/mg-4.webp" },
  { id: "mg-5", name: "Sol Ring — Foil", collection: "magic", category: "Singles", type: "Single Card", price: 19.99, gradient: { from: "#c9a227", to: "#3a2c08" }, image: "/images/products/mg-5.webp" },
  { id: "mg-6", name: "Ragavan, Nimble Pilferer", collection: "magic", category: "Singles", type: "Single Card", price: 59.99, gradient: { from: "#c0392b", to: "#3a100c" }, image: "/images/products/mg-6.webp" },
  { id: "mg-7", name: "Dragon Shield Sleeves", collection: "magic", category: "Accessories", type: "Accessory", price: 11.99, gradient: { from: "#3fae14", to: "#123a08" } },

  // Disney Lorcana
  { id: "dl-1", name: "Into the Inklands", collection: "disney-lorcana", category: "Booster Boxes", type: "Booster Box", price: 144.99, gradient: { from: "#7c4dbd", to: "#2a1a4a" }, image: "/images/products/dl-1.webp" },
  { id: "dl-2", name: "Rise of the Floodborn", collection: "disney-lorcana", category: "Booster Boxes", type: "Booster Box", price: 149.99, gradient: { from: "#4a6ebd", to: "#1a2a4a" }, image: "/images/products/dl-2.webp" },
  { id: "dl-3", name: "Amber & Amethyst Deck", collection: "disney-lorcana", category: "Starter Decks", type: "Starter Deck", price: 16.99, gradient: { from: "#b57ddb", to: "#3a2050" }, image: "/images/products/dl-3.webp" },
  { id: "dl-4", name: "Illumineer's Trove", collection: "disney-lorcana", category: "Illumineer's Trove", type: "Trove", price: 49.99, gradient: { from: "#5b3d8f", to: "#1f1436" }, image: "/images/products/dl-4.webp" },
  { id: "dl-5", name: "Elsa — Snow Queen", collection: "disney-lorcana", category: "Singles", type: "Single Card", price: 27.99, gradient: { from: "#4aa3df", to: "#153a5b" }, image: "/images/products/dl-5.webp" },
  { id: "dl-6", name: "Mickey — Brave Little Tailor", collection: "disney-lorcana", category: "Singles", type: "Single Card", price: 39.99, gradient: { from: "#c0392b", to: "#3a100c" }, image: "/images/products/dl-6.webp" },
  { id: "dl-7", name: "Card Portfolio Binder", collection: "disney-lorcana", category: "Accessories", type: "Accessory", price: 18.99, gradient: { from: "#3fae14", to: "#123a08" } },

  // Sports Cards
  { id: "sp-1", name: "Prizm Basketball", collection: "sports-cards", category: "Hobby Boxes", type: "Hobby Box", price: 399.99, gradient: { from: "#2f7fd1", to: "#123a63" }, image: "/images/products/sp-1.webp" },
  { id: "sp-2", name: "Panini Select Football", collection: "sports-cards", category: "Hobby Boxes", type: "Hobby Box", price: 349.99, gradient: { from: "#1f9c6b", to: "#0c3a28" }, image: "/images/products/sp-2.webp" },
  { id: "sp-3", name: "Topps Chrome Soccer", collection: "sports-cards", category: "Hobby Boxes", type: "Hobby Box", price: 289.99, gradient: { from: "#c0392b", to: "#3a100c" }, image: "/images/products/sp-3.webp" },
  { id: "sp-4", name: "Mosaic Blaster", collection: "sports-cards", category: "Blaster Boxes", type: "Blaster Box", price: 34.99, gradient: { from: "#8a5cd1", to: "#2a1a4a" }, image: "/images/products/sp-4.webp" },
  { id: "sp-5", name: "Optic Blaster", collection: "sports-cards", category: "Blaster Boxes", type: "Blaster Box", price: 29.99, gradient: { from: "#c9a227", to: "#3a2c08" }, image: "/images/products/sp-5.webp" },
  { id: "sp-6", name: "Rookie Auto — RC", collection: "sports-cards", category: "Singles", type: "Single Card", price: 74.99, gradient: { from: "#2f7fd1", to: "#0c2438" }, image: "/images/products/sp-6.webp" },
  { id: "sp-7", name: "Toploaders (25ct)", collection: "sports-cards", category: "Supplies", type: "Supply", price: 8.99, gradient: { from: "#3fae14", to: "#123a08" }, image: "/images/products/sp-7.webp" },
];

export function getProductsByCollection(slug: string): Product[] {
  return products.filter((p) => p.collection === slug);
}

/**
 * The products a collection actually lists, honouring the demo sample cap in
 * `lib/flags.ts`.
 *
 * Everything that shows a count uses this, so a tile can't advertise "10 items"
 * and then open a page showing three. Use `getProductsByCollection` only when
 * you genuinely want the full range regardless of what's on display.
 */
export function getListedProducts(slug: string): Product[] {
  const all = getProductsByCollection(slug);
  return productsPerCollection ? all.slice(0, productsPerCollection) : all;
}
