export const site = {
  name: "Emerald Cards & Games",
  shortName: "Emerald",
  description:
    "Windsor's destination for trading cards and gaming — Pokémon, One Piece, Magic, Disney Lorcana, Sports Cards & more.",
  address: {
    line: "1555 Talbot Rd #507-A",
    city: "Windsor, ON",
    postalCode: "N9R 1L0",
    province: "Ontario",
  },
  /** Used for the Google Maps embed query. */
  mapQuery: "1555 Talbot Rd, Windsor, ON N9R 1L0",
  phone: "+1 (519) 969-0707",
  email: "hello@emeraldcardsandgames.ca",
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
  /**
   * Ontario's combined federal + provincial sales tax. Shown next to prices so
   * the figure on a tile is unambiguous — it's the shelf price, not the total.
   */
  taxRate: 0.13,
  taxName: "HST",
} as const;

/**
 * The store's timezone. Every opening-hours calculation runs in this zone
 * rather than the visitor's, so someone checking from Vancouver or Detroit
 * sees whether the Windsor shop is open — not whether it would be open on
 * their own clock. `Intl` handles the DST switch, so this needs no maintenance
 * twice a year.
 */
export const STORE_TIMEZONE = "America/Toronto";

export interface DayHours {
  /** Minutes from midnight, store-local. */
  open: number;
  close: number;
}

const h = (hour: number, minute = 0) => hour * 60 + minute;

/**
 * Opening hours, indexed by JS weekday (0 = Sunday … 6 = Saturday).
 * `null` means closed that day.
 *
 * This is the single source of truth: the "Open now" badge, the "closes at"
 * copy, and the printed hours lists are all derived from it, so they can't
 * drift apart the way three hand-written copies would.
 */
export const openingHours: readonly (DayHours | null)[] = [
  { open: h(12), close: h(17) }, // Sunday
  { open: h(12), close: h(20) }, // Monday
  { open: h(12), close: h(20) }, // Tuesday
  { open: h(12), close: h(20) }, // Wednesday
  { open: h(12), close: h(20) }, // Thursday
  { open: h(12), close: h(20) }, // Friday
  { open: h(12), close: h(20) }, // Saturday
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/collections" },
  { label: "Events", href: "/events" },
  { label: "About Us", href: "/about" },
] as const;
