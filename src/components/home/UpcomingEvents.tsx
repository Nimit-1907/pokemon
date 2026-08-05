import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EventCard } from "@/components/shared/EventCard";
import { Reveal } from "@/components/motion/Reveal";
import { getEvent } from "@/lib/data";

/*
  The homepage features a single event rather than the next few — "View All
  Events" carries anyone who wants the rest. Picked by slug so re-dating the
  calendar can't silently swap which event is promoted.
*/
const featured = getEvent("friday-night-magic");

export function UpcomingEvents() {
  if (!featured) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            title="Upcoming Events"
            viewAllHref="/events"
            viewAllLabel="View All Events"
          />
        </Reveal>
        {/*
          One card, so no carousel or grid: full width on a phone, capped on
          wider screens so a lone tile doesn't stretch across the container.
        */}
        <Reveal delay={0.05} className="max-w-sm">
          <EventCard event={featured} />
        </Reveal>
      </Container>
    </section>
  );
}
