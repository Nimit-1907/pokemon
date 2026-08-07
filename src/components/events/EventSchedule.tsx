"use client";

import { CalendarX } from "lucide-react";
import { EventCard } from "@/components/shared/EventCard";
import { EventCalendar } from "@/components/events/EventCalendar";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { storeToday } from "@/lib/hours";
import { useNow } from "@/lib/clock";
import type { StoreEvent } from "@/types";

/*
  Splits the calendar into what's still to come and what's been and gone.

  This has to happen on the client. The site is exported statically, so "today"
  evaluated during the build is the deploy date — a week later the page would
  still be advertising an event that already happened. Before mount everything
  renders as upcoming, which is the safe default: the worst case is a listing
  briefly showing one extra card, not a visitor turning up to a finished event.
*/
export function EventSchedule({ events }: { events: StoreEvent[] }) {
  const now = useNow();
  const today = now ? storeToday(now) : null;

  const upcoming = today ? events.filter((e) => e.date >= today) : events;
  const past = today ? events.filter((e) => e.date < today).reverse() : [];

  return (
    <>
      <SectionHeading
        eyebrow={
          today
            ? `${upcoming.length} ${upcoming.length === 1 ? "event" : "events"} coming up`
            : undefined
        }
        title="What's on"
      />

      {upcoming.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <div className="panel flex flex-col items-center px-6 py-section-tight text-center">
          <CalendarX className="size-9 text-muted-foreground/50" />
          <p className="mt-4 font-display text-h3 font-bold uppercase text-foreground">
            Nothing on the calendar
          </p>
          <p className="mt-1 max-w-sm text-body-sm text-muted-foreground">
            The next round of tournaments and league nights hasn&apos;t been
            posted yet. Give the shop a call and we&apos;ll tell you what&apos;s
            planned.
          </p>
        </div>
      )}

      {/* The month grid is the "when can I come in?" view of the same data. */}
      {events.length > 0 && (
        <div className="mt-14">
          <SectionHeading title="By month" />
          <EventCalendar events={events} today={today} />
        </div>
      )}

      {past.length > 0 && (
        <div className="mt-14">
          <SectionHeading title="Recently held" />
          {/*
            Kept, dimmed, and de-emphasised rather than hidden: a run of past
            events is the evidence that the shop actually runs them.
          */}
          <ul className="panel divide-y divide-border">
            {past.map((event) => (
              <li
                key={event.slug}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 text-body-sm"
              >
                <span className="text-muted-foreground">{event.title}</span>
                <span className="font-data text-caption text-muted-foreground/70">
                  {event.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
