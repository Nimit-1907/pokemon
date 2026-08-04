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

/** e.g. "Monday, May 25, 2026" — computed from parts to avoid TZ drift. */
export function formatEventDateLong(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const weekday = WEEKDAYS_LONG[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${weekday}, ${MONTHS_LONG[month - 1]} ${day}, ${year}`;
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
