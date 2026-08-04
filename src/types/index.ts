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
  /** Emerald-tinted gradient used for the placeholder art (from/to) */
  gradient: { from: string; to: string };
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
  gradient: { from: string; to: string };
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
