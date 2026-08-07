/*
  Link builders for the store's contact details.

  These were being hand-rolled at five call sites, and inconsistently: some
  passed the display number straight into `tel:` including its spaces and
  brackets, which several dialers refuse to parse. Centralising them means a
  tap-to-call link behaves the same everywhere.
*/

/** `tel:` link — strips everything a dialer can't read, keeping the `+`. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/** `mailto:` link. */
export function mailHref(email: string): string {
  return `mailto:${email}`;
}

/**
 * Google Maps directions link.
 *
 * `dir/?api=1` opens turn-by-turn directions rather than a pin, which is what
 * someone tapping "Directions" on a phone actually wants.
 */
export function mapsHref(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/** Google Maps place link — a pin, for "view on map" rather than "take me there". */
export function mapsPlaceHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
