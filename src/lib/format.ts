const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/** Split an ISO "YYYY-MM-DD" into badge parts without timezone drift. */
export function eventDateParts(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return {
    month: MONTHS[month - 1],
    day: String(day).padStart(2, "0"),
    year,
  };
}

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS_LONG = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

/**
 * e.g. "Monday, 25 May 2026" — computed from parts to avoid TZ drift.
 *
 * Day-before-month is the unambiguous ordering, and the one Canadian readers
 * share with the rest of the Commonwealth. "05/25" vs "25/05" is a real
 * ambiguity for a store this close to the US border; spelling the month out
 * removes it entirely.
 */
export function formatEventDateLong(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const weekday = WEEKDAYS_LONG[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${weekday}, ${day} ${MONTHS_LONG[month - 1]} ${year}`;
}

/** e.g. "Sat, 25 May" — the compact form for list rows and cards. */
export function formatEventDateShort(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const weekday = WEEKDAYS_LONG[
    new Date(Date.UTC(year, month - 1, day)).getUTCDay()
  ].slice(0, 3);
  return `${weekday}, ${day} ${MONTHS_LONG[month - 1]}`;
}

/*
  Money. Every price on this site is Canadian — the store is in Windsor and
  collectors here price-check against US listings all day, so the currency has
  to be stated rather than assumed.

  `formatPrice` gives the bare figure for use in a column of prices where a
  nearby line already says CAD; `formatPriceWithCurrency` is the standalone
  form. Built once at module scope because constructing an Intl formatter is
  comparatively expensive and these run per product tile.
*/
const CAD = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  currencyDisplay: "narrowSymbol",
});

/** e.g. "$149.99". */
export function formatPrice(amount: number) {
  return CAD.format(amount);
}

/** e.g. "$149.99 CAD" — use where no other line establishes the currency. */
export function formatPriceWithCurrency(amount: number) {
  return `${CAD.format(amount)} CAD`;
}

/** Whether an ISO date is today or later, in store-local terms. */
export function isUpcoming(iso: string, today: string) {
  return iso >= today;
}

/** Full month name, e.g. "May". */
export function monthName(monthIndexZeroBased: number) {
  return MONTHS_LONG[monthIndexZeroBased];
}

/**
 * Build a calendar matrix (weeks of 7 day-numbers, 0 = blank) for a month.
 * `year` full, `month` 0-based.
 */
export function getMonthMatrix(year: number, month: number): number[][] {
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const cells: number[] = Array(firstWeekday).fill(0);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(0);

  const weeks: number[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
