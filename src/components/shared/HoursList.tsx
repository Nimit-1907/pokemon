"use client";

import { groupedHours, staticHours } from "@/lib/hours";
import { useNow } from "@/lib/clock";
import { cn } from "@/lib/utils";

/*
  The printed opening hours, with today's row picked out.

  The rows themselves are static, so they render on the server and are in the
  HTML for search engines and for anyone who never runs the JS. Only
  `isToday` needs the client: on a static export "today" would otherwise be
  frozen to the day the site was built. So the first paint highlights nothing,
  and the correct row lights up after mount.
*/
export function HoursList({
  className,
  highlightToday = true,
}: {
  className?: string;
  highlightToday?: boolean;
}) {
  const now = useNow();
  const rows = highlightToday && now ? groupedHours(now) : staticHours;

  return (
    <ul className={cn("space-y-1", className)}>
      {rows.map((row) => (
        <li
          key={row.days}
          className={cn(
            /*
              `flex-wrap` matters in the narrow columns (the footer, the store
              info cards): without it "Mon – Sat" broke mid-range onto three
              lines. Now the time drops below the days instead, and the day
              range itself never breaks.
            */
            "flex flex-wrap items-baseline justify-between gap-x-4 text-body-sm",
            row.isToday ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <span className="flex items-center gap-2 whitespace-nowrap">
            {row.days}
            {row.isToday && (
              <span className="rounded-sm bg-brand/15 px-1.5 py-px text-caption font-medium text-brand">
                Today
              </span>
            )}
          </span>
          <span
            className={cn(
              "font-data whitespace-nowrap",
              row.isToday ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {row.time}
          </span>
        </li>
      ))}
    </ul>
  );
}
