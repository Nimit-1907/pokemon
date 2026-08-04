export const site = {
  name: "Emerald Cards & Games",
  shortName: "Emerald",
  description:
    "Windsor's ultimate destination for trading cards and gaming — Pokémon, One Piece, Magic, Disney Lorcana, Sports Cards & more.",
  address: {
    line: "1555 Talbot Rd #507-A",
    city: "Windsor, ON N9R 1L0",
  },
  /** Used for the Google Maps embed query. */
  mapQuery: "1555 Talbot Rd, Windsor, ON N9R 1L0",
  phone: "+1 (519) 969-0707",
  email: "hello@emeraldcardsandgames.ca",
  hours: [
    { days: "Mon – Sat", time: "12PM – 8PM" },
    { days: "Sun", time: "12PM – 5PM" },
  ],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/collections" },
  { label: "Events", href: "/events" },
  { label: "About Us", href: "/about" },
] as const;
