import Link from "next/link";
import { getMonthMatrix, monthName } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { StoreEvent } from "@/types";

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

export function EventCalendar({ events }: { events: StoreEvent[] }) {
  const months = distinctMonths(events);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {months.map(({ year, month }) => {
        const weeks = getMonthMatrix(year, month);
        const byDay = new Map<number, StoreEvent>();
        for (const e of events) {
          const [ey, em, ed] = e.date.split("-").map(Number);
          if (ey === year && em - 1 === month) byDay.set(ed, e);
        }

        return (
          <div
            key={`${year}-${month}`}
            className="rounded-xl border border-border bg-card p-5"
          >
            <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-tight text-foreground">
              {monthName(month)}{" "}
              <span className="text-muted-foreground">{year}</span>
            </h3>

            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              {WEEKDAY_LABELS.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {weeks.flat().map((day, i) => {
                if (day === 0) return <div key={i} />;
                const ev = byDay.get(day);

                if (!ev) {
                  return (
                    <div
                      key={i}
                      className="grid aspect-square place-items-center rounded-md text-sm text-muted-foreground/70"
                    >
                      {day}
                    </div>
                  );
                }

                return (
                  <Link
                    key={i}
                    href={`/events/${ev.slug}`}
                    title={`${ev.title} · ${ev.time}`}
                    className={cn(
                      "grid aspect-square place-items-center rounded-md bg-brand/15 text-sm font-semibold text-brand ring-1 ring-brand/40 transition-all",
                      "hover:bg-brand hover:text-brand-foreground hover:shadow-[0_0_16px_-4px_rgba(85,231,27,0.7)]",
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
