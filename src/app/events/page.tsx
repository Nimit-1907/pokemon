import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { EventSchedule } from "@/components/events/EventSchedule";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { PageTransition } from "@/components/motion/PageTransition";
import { sortedEvents } from "@/lib/data";
import { site } from "@/lib/site";
import { comingSoon, showPrices } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Tournaments, league nights and prereleases at Emerald Cards & Games in Windsor, Ontario — Pokémon, One Piece, Magic: The Gathering, Disney Lorcana and sports card breaks.",
};

export default function EventsPage() {
  /*
    Held back for the client demo — see `lib/flags.ts`. The full listing and
    month calendar below are finished; setting `eventsIndex` to `false`
    publishes them. Individual event pages (`/events/[slug]`) stay live, and
    are what the homepage cards link to.

    This one is worth un-hiding as soon as the real schedule is in: the demo
    listing runs on placeholder dates, which is exactly what shouldn't be in
    front of a client.
  */
  if (comingSoon.eventsIndex) {
    return (
      <PageTransition>
        <ComingSoon
          eyebrow="Tournaments & league nights"
          title="Coming soon"
          description="The full calendar is on its way. We run sanctioned events most weeks — call the shop and we'll tell you what's coming up."
        />
      </PageTransition>
    );
  }

  return <EventsIndex />;
}

/*
  The events index — upcoming listing, month calendar, and recently held.
  `EventCalendar` was written long before this page existed and had never been
  mounted anywhere; this is where it belongs.
*/
function EventsIndex() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 0%, rgba(62,221,107,0.1), transparent 65%), radial-gradient(40% 50% at 90% 100%, rgba(217,168,87,0.07), transparent 60%)",
          }}
        />
        <Container className="py-section-tight">
          <p className="text-eyebrow font-semibold uppercase text-brass">
            In store · {site.address.city}
          </p>
          <h1 className="mt-3 font-display text-h1 font-extrabold uppercase text-foreground">
            Tournaments &amp; <span className="text-brass">league nights</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lead text-muted-foreground">
            Sanctioned events, casual pods and prereleases — most weeks, all
            skill levels.
            {showPrices &&
              " Entry fees are in Canadian dollars and paid in store."}
          </p>
        </Container>
      </section>

      <section className="band py-section">
        <Container>
          <EventSchedule events={sortedEvents} />
        </Container>
      </section>
    </PageTransition>
  );
}
