import { openingHours, STORE_TIMEZONE, type DayHours } from "@/lib/site";

/*
  Opening-hours logic, all of it evaluated in the store's timezone.

  Two things make this trickier than `new Date().getHours()`:

  1. The visitor's clock is the wrong clock. Someone in Vancouver asking "are
     they open?" means the Windsor shop, not their own 3pm.
  2. This site is a static export. Anything computed during the build is frozen
     into the HTML at deploy time, so a status rendered on the server would be
     permanently wrong. `<StoreStatus>` is a client component that calls this
     after mount for that reason.

  `Intl` does the zone conversion, which means DST is handled for free.
*/

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/*
  Parsed with `en-US` deliberately: its abbreviated weekdays are exactly the
  keys above. `en-CA` renders them with a trailing period ("Sun."), which would
  miss the lookup. Display formatting is separate and does use Canadian
  conventions — see `formatTime` and `format.ts`.
*/
const PART_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: STORE_TIMEZONE,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

interface StoreClock {
  /** 0 = Sunday … 6 = Saturday, in store-local time. */
  weekday: number;
  /** Minutes from store-local midnight. */
  minutes: number;
}

function storeClock(date: Date): StoreClock {
  const parts = PART_FORMATTER.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return {
    weekday: WEEKDAY_INDEX[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/*
  Store-local calendar date as "YYYY-MM-DD".

  `en-CA` is doing real work here rather than being decorative: its short date
  format *is* ISO 8601 (2026-05-25), which is the format event dates are stored
  in, so they compare as plain strings with no parsing.
*/
const ISO_DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: STORE_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today's date in the store's timezone, as "YYYY-MM-DD". */
export function storeToday(now: Date = new Date()): string {
  return ISO_DATE_FORMATTER.format(now);
}

const WEEKDAY_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Minutes from midnight → "8:00 PM". */
export function formatTime(minutes: number): string {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

/** "12:00 PM – 8:00 PM", or "Closed". */
export function formatRange(day: DayHours | null): string {
  return day ? `${formatTime(day.open)} – ${formatTime(day.close)}` : "Closed";
}

export type StoreState = "open" | "closing-soon" | "closed";

export interface StoreStatus {
  state: StoreState;
  /** Short badge label: "Open now", "Closing soon", "Closed". */
  label: string;
  /** The useful half: "Closes 8:00 PM", "Opens Monday at 12:00 PM". */
  detail: string;
  /** Today's hours, for a "Today: 12–8" line. */
  today: DayHours | null;
}

/** Inside this many minutes of closing, the badge warns instead of reassures. */
const CLOSING_SOON_MINUTES = 60;

/**
 * Where the store is in its week right now.
 *
 * `now` is injectable so this is testable and so callers can render a specific
 * moment; it defaults to the real current time.
 */
export function getStoreStatus(now: Date = new Date()): StoreStatus {
  const { weekday, minutes } = storeClock(now);
  const today = openingHours[weekday] ?? null;

  if (today && minutes >= today.open && minutes < today.close) {
    const untilClose = today.close - minutes;
    const closingSoon = untilClose <= CLOSING_SOON_MINUTES;

    return {
      state: closingSoon ? "closing-soon" : "open",
      label: closingSoon ? "Closing soon" : "Open now",
      detail: closingSoon
        ? `Closes in ${untilClose} min`
        : `Closes ${formatTime(today.close)}`,
      today,
    };
  }

  // Closed. Either it's too early today, or today is done — find the next open.
  if (today && minutes < today.open) {
    return {
      state: "closed",
      label: "Closed",
      detail: `Opens ${formatTime(today.open)}`,
      today,
    };
  }

  return { state: "closed", label: "Closed", detail: nextOpening(weekday), today };
}

/** "Opens tomorrow at 12:00 PM" / "Opens Monday at 12:00 PM". */
function nextOpening(fromWeekday: number): string {
  for (let offset = 1; offset <= 7; offset++) {
    const day = (fromWeekday + offset) % 7;
    const hours = openingHours[day];
    if (!hours) continue;

    const when = offset === 1 ? "tomorrow" : WEEKDAY_LONG[day];
    return `Opens ${when} at ${formatTime(hours.open)}`;
  }

  // Every day is `null` — the store has no hours set at all.
  return "Hours vary — call ahead";
}

export interface HoursRow {
  /** "Mon – Sat" or "Sun". */
  days: string;
  /** "12:00 PM – 8:00 PM" or "Closed". */
  time: string;
  /** True for the row covering the current store-local day. */
  isToday: boolean;
}

/**
 * The printed hours list, with consecutive identical days collapsed into a
 * range ("Mon – Sat: 12:00 PM – 8:00 PM").
 *
 * The week is walked Monday-first, which is how a retail hours sign reads —
 * `openingHours` is Sunday-indexed only because that's what JS `getDay()`
 * returns.
 */
export function groupedHours(now: Date = new Date()): HoursRow[] {
  const todayIndex = storeClock(now).weekday;
  const week = [1, 2, 3, 4, 5, 6, 0]; // Mon → Sun

  const rows: HoursRow[] = [];
  let runStart = 0;

  const sameHours = (a: DayHours | null, b: DayHours | null) =>
    a === b || (!!a && !!b && a.open === b.open && a.close === b.close);

  for (let i = 0; i < week.length; i++) {
    const current = openingHours[week[i]] ?? null;
    const next = i + 1 < week.length ? (openingHours[week[i + 1]] ?? null) : undefined;

    // Keep extending the run while the next day has identical hours.
    if (next !== undefined && sameHours(current, next)) continue;

    const runDays = week.slice(runStart, i + 1);
    rows.push({
      days:
        runDays.length === 1
          ? WEEKDAY_SHORT[runDays[0]]
          : `${WEEKDAY_SHORT[runDays[0]]} – ${WEEKDAY_SHORT[runDays[runDays.length - 1]]}`,
      time: formatRange(current),
      isToday: runDays.includes(todayIndex),
    });

    runStart = i + 1;
  }

  return rows;
}

/**
 * A static, build-safe hours list for server-rendered markup.
 *
 * `isToday` is meaningless at build time on a static export, so it's forced
 * off — highlighting a day here would freeze "today" to the deploy date.
 */
export const staticHours: HoursRow[] = groupedHours(new Date(0)).map((row) => ({
  ...row,
  isToday: false,
}));
