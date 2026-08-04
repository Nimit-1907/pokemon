import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EventCard } from "@/components/shared/EventCard";
import { EventCalendar } from "@/components/events/EventCalendar";
import { sortedEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Tournaments, leagues, and game nights at Emerald Cards & Games in Windsor, Ontario.",
};

export default function EventsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 0%, rgba(85,231,27,0.12), transparent 65%)",
          }}
        />
        <Container className="py-14 text-center sm:py-20">
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Upcoming <span className="text-glow">Events</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Tournaments, leagues, and game nights all month long. Grab a seat,
            meet the community, and play your favourite games.
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading title="All Events" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sortedEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <SectionHeading title="Event Calendar" />
          <EventCalendar events={sortedEvents} />
        </Container>
      </section>
    </>
  );
}
