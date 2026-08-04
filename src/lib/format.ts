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
