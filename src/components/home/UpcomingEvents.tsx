import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EventCard } from "@/components/shared/EventCard";
import { events } from "@/lib/data";

export function UpcomingEvents() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Upcoming Events"
          viewAllHref="/events"
          viewAllLabel="View All Events"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </Container>
    </section>
  );
}
