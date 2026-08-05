import Link from "next/link";
import { Clock, Ticket } from "lucide-react";
import { CardArt } from "@/components/shared/CardArt";
import { Button } from "@/components/ui/button";
import { eventDateParts } from "@/lib/format";
import { getCollection } from "@/lib/data";
import type { StoreEvent } from "@/types";

/** Upcoming-event tile: date badge over art, title, time/entry, details CTA. */
export function EventCard({ event }: { event: StoreEvent }) {
  const { month, day } = eventDateParts(event.date);
  const collection = getCollection(event.collection);

  return (
    <div className="glow-card group flex h-full flex-col overflow-hidden rounded-xl">
      <div className="relative">
        <CardArt
          name={collection?.name ?? event.title}
          gradient={event.gradient}
          image={collection?.banner}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
          className="aspect-[16/10] w-full"
          compact
        />
        {/* Date badge */}
        <div className="absolute left-3 top-3 flex flex-col items-center rounded-lg border border-border/60 bg-background/90 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-caption font-bold uppercase tracking-widest text-brand">
            {month}
          </span>
          <span className="font-display text-h3 font-bold leading-none text-foreground">
            {day}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-body font-semibold text-foreground">
          {event.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-body-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4 text-brand" />
            {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ticket className="size-4 text-brand" />
            {event.entry}
          </span>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="mt-auto border-brand/30 text-brand hover:border-brand/60 hover:bg-brand/10 hover:text-brand"
        >
          <Link href={`/events/${event.slug}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
