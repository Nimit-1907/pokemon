"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EventCard } from "@/components/shared/EventCard";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion/Reveal";
import { sortedEvents } from "@/lib/data";
import { storeToday } from "@/lib/hours";
import { useNow } from "@/lib/clock";
import { cn } from "@/lib/utils";

/** How many events the homepage previews before deferring to /events. */
const PREVIEW_COUNT = 1;

/*
  The next event only. The homepage points at one thing and the full calendar
  link carries the rest — see the layout note below for how a single card is
  kept from looking like the shop runs one event a month.

  The upcoming filter runs on the client for the same reason it does on the
  events page: on a static export, a build-time "today" goes stale the moment
  it deploys. Pre-mount it shows the earliest event in the calendar, which is
  the right answer on a freshly built site and never a wrong-looking one.
*/
export function UpcomingEvents() {
  const now = useNow();
  const today = now ? storeToday(now) : null;

  const upcoming = (today ? sortedEvents.filter((e) => e.date >= today) : sortedEvents)
    .slice(0, PREVIEW_COUNT);

  // Nothing left on the calendar — the section has nothing to say, so it goes.
  if (upcoming.length === 0) return null;

  return (
    <section id="events" className="band scroll-mt-20 py-section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Tournaments & league nights"
            title="What's on"
            viewAllHref="/events"
            viewAllLabel="Full calendar"
          />
        </Reveal>
        {/*
          The columns only appear once there's something to put in them. A lone
          card left in a three-column grid sits in the left third with two empty
          thirds beside it, which reads as a layout that failed to load; capped
          at `max-w-md` it reads as one event being pointed at deliberately.
        */}
        <StaggerGrid
          className={cn(
            "grid gap-tile",
            upcoming.length > 1
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : "max-w-md",
          )}
        >
          {upcoming.map((event) => (
            <StaggerItem key={event.slug}>
              <EventCard event={event} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
