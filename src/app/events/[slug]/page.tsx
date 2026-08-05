import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CardArt } from "@/components/shared/CardArt";
import { Button } from "@/components/ui/button";
import { events, getCollection, getEvent } from "@/lib/data";
import { eventDateParts, formatEventDateLong } from "@/lib/format";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(
  props: PageProps<"/events/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const event = getEvent(slug);
  if (!event) return { title: "Event" };
  return { title: event.title, description: event.description };
}

export default async function EventPage(props: PageProps<"/events/[slug]">) {
  const { slug } = await props.params;
  const event = getEvent(slug);
  if (!event) notFound();

  const collection = getCollection(event.collection);
  const { month, day } = eventDateParts(event.date);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 60% at 80% 0%, rgba(85,231,27,0.1), transparent 60%)",
        }}
      />
      <Container className="py-10 sm:py-14">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-body-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" />
          Back to Events
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Main */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <CardArt
                name={collection?.name ?? event.title}
                gradient={event.gradient}
                image={collection?.banner}
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority
                className="aspect-video w-full"
              />
              <div className="absolute left-4 top-4 flex flex-col items-center rounded-xl border border-border/60 bg-background/90 px-4 py-2 backdrop-blur-sm">
                <span className="text-eyebrow font-bold uppercase text-brand">
                  {month}
                </span>
                <span className="font-display text-h2 font-bold leading-none text-foreground">
                  {day}
                </span>
              </div>
            </div>

            {collection && (
              <span className="mt-6 inline-block rounded-full border border-brand/40 bg-brand/5 px-3 py-1 text-body-sm font-medium text-brand">
                {collection.name}
              </span>
            )}
            <h1 className="mt-3 font-display text-h1 font-bold uppercase text-foreground">
              {event.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lead text-muted-foreground">
              {event.description}
            </p>
          </div>

          {/* Details sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="glow-ring rounded-2xl border bg-card p-6">
              <h2 className="mb-4 font-display text-h3 font-bold uppercase text-foreground">
                Event Details
              </h2>
              <dl className="space-y-4">
                <DetailRow icon={<CalendarDays className="size-4" />} label="Date">
                  {formatEventDateLong(event.date)}
                </DetailRow>
                <DetailRow icon={<Clock className="size-4" />} label="Time">
                  {event.time}
                </DetailRow>
                <DetailRow icon={<MapPin className="size-4" />} label="Location">
                  {event.location}
                </DetailRow>
              </dl>

              {/*
                Both inert for now. The second was an `asChild` link — an
                anchor ignores `disabled`, so it renders as a real button
                instead, which also gets the native disabled semantics.
              */}
              <Button size="lg" className="mt-6 w-full font-semibold" disabled>
                Register Interest
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="mt-3 w-full font-semibold"
                disabled
              >
                Contact the Store
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
        {icon}
      </span>
      <div>
        <dt className="text-eyebrow font-semibold uppercase text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5 text-body-sm text-foreground">{children}</dd>
      </div>
    </div>
  );
}
