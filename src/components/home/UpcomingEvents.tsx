import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EventCard } from "@/components/shared/EventCard";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion/Reveal";
import { sortedEvents } from "@/lib/data";

const upcoming = sortedEvents.slice(0, 4);

export function UpcomingEvents() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            title="Upcoming Events"
            viewAllHref="/events"
            viewAllLabel="View All Events"
          />
        </Reveal>
        <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
