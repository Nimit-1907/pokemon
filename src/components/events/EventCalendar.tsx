import Link from "next/link";
import { getMonthMatrix, monthName } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { StoreEvent } from "@/types";

/*
  Month grid. Only months that actually contain an event are rendered — a run
  of empty calendars would be noise.

  `today` is passed in rather than read here so the whole tree stays a pure
  function of its props: `EventSchedule` owns the one client-side clock read,
  and `null` (pre-mount, or on a static build) simply means "don't mark today".
*/

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

type MonthKey = { year: number; month: number };

function distinctMonths(events: StoreEvent[]): MonthKey[] {
  const seen = new Map<string, MonthKey>();
  for (const e of events) {
    const [year, month] = e.date.split("-").map(Number);
    const key = `${year}-${month}`;
    if (!seen.has(key)) seen.set(key, { year, month: month - 1 });
  }
  return [...seen.values()].sort(
    (a, b) => a.year - b.year || a.month - b.month,
  );
}

/** "2026-05-25" for a given cell, to compare against event dates and today. */
function isoFor(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function EventCalendar({
  events,
  today = null,
}: {
  events: StoreEvent[];
  today?: string | null;
}) {
  const months = distinctMonths(events);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {months.map(({ year, month }) => {
        const weeks = getMonthMatrix(year, month);
        const byDay = new Map<number, StoreEvent>();
        for (const e of events) {
          const [ey, em, ed] = e.date.split("-").map(Number);
          if (ey === year && em - 1 === month) byDay.set(ed, e);
        }

        return (
          <div key={`${year}-${month}`} className="panel p-5">
            <h3 className="mb-4 font-display text-h3 font-bold uppercase text-foreground">
              {monthName(month)}{" "}
              <span className="font-data font-normal text-muted-foreground">
                {year}
              </span>
            </h3>

            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-caption font-semibold uppercase text-muted-foreground">
              {WEEKDAY_LABELS.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {weeks.flat().map((day, i) => {
                if (day === 0) return <div key={i} />;

                const iso = isoFor(year, month, day);
                const isToday = today === iso;
                const event = byDay.get(day);

                if (!event) {
                  return (
                    <div
                      key={i}
                      className={cn(
                        "font-data grid aspect-square place-items-center rounded-md text-body-sm",
                        isToday
                          ? "text-foreground ring-1 ring-inset ring-border-strong"
                          : "text-muted-foreground/60",
                      )}
                    >
                      {day}
                    </div>
                  );
                }

                return (
                  <Link
                    key={i}
                    href={`/events/${event.slug}`}
                    /*
                      The title carries what the colour alone can't — a swatch
                      is not a label, and this is the only place the event's
                      name is available on hover or to a screen reader.
                    */
                    title={`${event.title} · ${event.time}`}
                    className={cn(
                      "font-data grid aspect-square place-items-center rounded-md text-body-sm font-semibold transition-colors",
                      "bg-brass/15 text-brass ring-1 ring-inset ring-brass/40",
                      "hover:bg-brass hover:text-brass-foreground",
                      isToday && "ring-2 ring-brand",
                    )}
                  >
                    {day}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
