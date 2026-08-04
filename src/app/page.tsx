import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { collections } from "@/lib/data";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient emerald glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(85,231,27,0.14), transparent 70%)",
        }}
      />
      <Container className="flex flex-col items-center py-24 text-center sm:py-32">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/5 px-4 py-1.5 text-xs font-medium tracking-wide text-brand">
          Windsor, Ontario · Trading Cards &amp; Gaming
        </span>

        <h1 className="max-w-3xl font-display text-5xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Your Ultimate Card <span className="text-glow">Destination</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          Pokémon, One Piece, Magic, Sports Cards, Disney Lorcana &amp; more —
          all under one glowing roof.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/collections">
              Explore Collections
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-border font-semibold hover:border-brand/60 hover:text-brand"
          >
            <Link href="/events">
              <Calendar className="size-4" />
              Upcoming Events
            </Link>
          </Button>
        </div>

        {/* Collection chips — demonstrates the shared glow-card treatment */}
        <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {collections.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="glow-card group flex flex-col items-center gap-3 rounded-xl p-4"
            >
              <span
                className="size-12 rounded-lg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${c.gradient.from}, ${c.gradient.to})`,
                }}
              />
              <span className="text-center text-sm font-medium text-foreground">
                {c.name}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-16 text-xs text-muted-foreground">
          Phase 1 · Foundation, navigation &amp; layout shell — full home page next.
        </p>
      </Container>
    </section>
  );
}
