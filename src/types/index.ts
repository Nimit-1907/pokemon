export type CollectionSlug =
  | "pokemon"
  | "one-piece"
  | "magic"
  | "disney-lorcana"
  | "sports-cards";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  /** Short marketing tag shown under the name */
  tagline: string;
  /** Longer blurb for the collection page header */
  description: string;
  /** Emerald-tinted gradient — the fallback when there's no artwork */
  gradient: { from: string; to: string };
  /**
   * 3:4 key art, used at every size — tiles, the hero fan, page headers, event
   * cards. There used to be a separate wide `banner`, but once the art became
   * portrait the two were the same file. Optional: not every line has art.
   */
  image?: string;
  /** Product categories for the sidebar filter */
  categories: string[];
}

export interface Product {
  id: string;
  name: string;
  collection: CollectionSlug;
  category: string;
  type: string;
  price: number;
  /** Fallback treatment when there's no product photo */
  gradient: { from: string; to: string };
  /** Product photo, e.g. "/images/products/crown-zenith.webp" */
  image?: string;
}

export interface StoreEvent {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-05-25" */
  date: string;
  time: string;
  entry: string;
  collection: CollectionSlug;
  location: string;
  description: string;
  gradient: { from: string; to: string };
}
