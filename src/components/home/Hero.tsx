"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { CardFan } from "@/components/home/CardFan";
import { cn } from "@/lib/utils";

export function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Dimmed photographic texture */}
      <Image
        src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1600&q=70"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-15"
      />
      {/* Emerald atmosphere overlays */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 78% 40%, rgba(85,231,27,0.16), transparent 60%), linear-gradient(180deg, rgba(5,5,5,0.7), rgba(5,5,5,0.95))",
        }}
      />

      <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-6 lg:py-24">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/5 px-4 py-1.5 text-xs font-medium tracking-wide text-brand">
            Windsor, Ontario · Trading Cards &amp; Gaming
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Ultimate
            <br />
            Card <span className="text-glow">Destination</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground sm:text-lg lg:mx-0">
            Pokémon, One Piece, Magic, Sports Cards, Disney Lorcana &amp; more!
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="font-semibold uppercase tracking-wide">
              <Link href="/collections">
                Explore Collections
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border font-semibold uppercase tracking-wide hover:border-brand/60 hover:text-brand"
            >
              <Link href="/events">
                <Calendar className="size-4" />
                Upcoming Events
              </Link>
            </Button>
          </div>

          {/* Carousel dots */}
          <div className="mt-8 flex justify-center gap-2 lg:justify-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  active === i
                    ? "w-6 bg-brand shadow-[0_0_10px_rgba(85,231,27,0.7)]"
                    : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70",
                )}
              />
            ))}
          </div>
        </div>

        {/* Card fan */}
        <div className="order-first lg:order-last">
          <CardFan />
        </div>
      </Container>
    </section>
  );
}
