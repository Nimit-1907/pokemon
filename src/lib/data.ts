import type { Collection, Product, StoreEvent } from "@/types";

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

export const events: StoreEvent[] = [
  {
    slug: "pokemon-league-challenge",
    title: "Pokémon League Challenge",
    date: "2026-05-25",
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
    date: "2026-05-31",
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
    date: "2026-06-07",
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
    date: "2026-06-14",
    time: "12:00 PM",
    entry: "$10 Entry",
    collection: "disney-lorcana",
    location: "Emerald Cards & Games — Windsor, ON",
    description:
      "Join our Disney Lorcana League for a relaxed afternoon of games, trades, and exclusive league promos for every Illumineer.",
    gradient: { from: "#7c4dbd", to: "#2a1a4a" },
  },
];

export function getEvent(slug: string): StoreEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export const products: Product[] = [
  // Pokémon
  { id: "pk-1", name: "Scarlet & Violet", collection: "pokemon", category: "Booster Boxes", type: "Booster Box", price: 149.99, gradient: { from: "#f5b342", to: "#b8341e" } },
  { id: "pk-2", name: "Crown Zenith", collection: "pokemon", category: "Elite Trainer Boxes", type: "Elite Trainer Box", price: 69.99, gradient: { from: "#4aa3df", to: "#153a5b" } },
  { id: "pk-3", name: "Paldea Evolved", collection: "pokemon", category: "Booster Boxes", type: "Booster Box", price: 139.99, gradient: { from: "#e0679b", to: "#5b1f3a" } },
  { id: "pk-4", name: "151", collection: "pokemon", category: "Booster Packs", type: "Booster Bundle", price: 26.99, gradient: { from: "#e23b3b", to: "#7a1414" } },
  { id: "pk-5", name: "Paldean Fates", collection: "pokemon", category: "Elite Trainer Boxes", type: "Elite Trainer Box", price: 59.99, gradient: { from: "#c9a227", to: "#4a3708" } },
  { id: "pk-6", name: "Obsidian Flames", collection: "pokemon", category: "Booster Boxes", type: "Booster Box", price: 129.99, gradient: { from: "#3a3a3a", to: "#0a0a0a" } },
  { id: "pk-7", name: "Temporal Forces", collection: "pokemon", category: "Booster Boxes", type: "Booster Box", price: 129.99, gradient: { from: "#7c4dbd", to: "#2a1a4a" } },
  { id: "pk-8", name: "Fusion Strike", collection: "pokemon", category: "Booster Boxes", type: "Booster Box", price: 119.99, gradient: { from: "#e0679b", to: "#3a1428" } },
];

export function getProductsByCollection(slug: string): Product[] {
  return products.filter((p) => p.collection === slug);
}
