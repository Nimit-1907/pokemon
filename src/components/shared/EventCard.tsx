import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { CardArt } from "@/components/shared/CardArt";
import { TiltCard } from "@/components/motion/TiltCard";
import { eventDateParts } from "@/lib/format";
import { getCollection } from "@/lib/data";
import { showPrices } from "@/lib/flags";
import type { StoreEvent } from "@/types";

/**
 * Upcoming-event tile.
 *
 * The whole card is the link. It used to be a static card with a "View
 * Details" button inside it, which meant a phone user had to hit a 90px target
 * instead of the 300px one they were already looking at.
 */
export function EventCard({ event }: { event: StoreEvent }) {
  const { month, day } = eventDateParts(event.date);
  const collection = getCollection(event.collection);

  return (
    <TiltCard>
      <Link
        href={`/events/${event.slug}`}
        className="slab group flex h-full flex-col overflow-hidden"
      >
        <div className="relative">
          <CardArt
            name={collection?.name ?? event.title}
            gradient={event.gradient}
            image={collection?.banner}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
            className="aspect-[16/10] w-full"
            compact
          />
          {/* Date badge — the one thing someone scanning an events list needs. */}
          <div className="absolute left-3 top-3 z-[2] flex flex-col items-center rounded-lg border border-border-strong bg-base/90 px-3 py-1.5 backdrop-blur-sm">
            <span className="font-data text-caption font-semibold uppercase tracking-widest text-brass">
              {month}
            </span>
            <span className="font-display text-h3 font-bold leading-none text-foreground">
              {day}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="text-body font-semibold leading-tight text-foreground">
            {event.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-body-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-muted-foreground" />
              <span className="font-data">{event.time}</span>
            </span>
            {/* Entry fee and its separator travel together — see `lib/flags.ts`. */}
            {showPrices && (
              <>
                <span aria-hidden className="text-border-strong">
                  ·
                </span>
                <span className="font-data text-brass">{event.entry}</span>
              </>
            )}
          </div>
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-body-sm font-medium text-brand">
            Event details
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
