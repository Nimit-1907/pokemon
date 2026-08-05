"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { CardFan, FAN_CENTER, fanCards } from "@/components/home/CardFan";
import { cn } from "@/lib/utils";

const copyContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const copyItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** How long a card is held at the front before the fan deals the next one. */
const AUTOPLAY_MS = 3000;

export function Hero() {
  // Which card is held at the front of the fan; starts on the middle one.
  const [active, setActive] = useState(FAN_CENTER);
  const reduce = useReducedMotion();

  // With reduced motion, render everything statically.
  const container = reduce ? undefined : copyContainer;
  const item = reduce ? undefined : copyItem;

  /*
    Deal the next card on a timer. The effect is keyed on `active`, so picking
    a dot or swiping the fan restarts the full countdown instead of leaving
    whatever was left of the previous one. Reduced motion opts out entirely —
    the fan then only moves when someone asks it to.
  */
  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(
      () => setActive((i) => (i + 1) % fanCards.length),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(id);
  }, [active, reduce]);

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/*
        Store artwork as atmosphere. It's blurred and dimmed on purpose: the
        source has the logo lockup dead centre, and left sharp it reads as a
        second wordmark competing with the headline.
      */}
      <Image
        src="/images/hero-backdrop.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover opacity-20 blur-[3px]"
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

      <Container className="relative grid items-center gap-8 py-10 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-6 lg:py-24">
        {/* Copy */}
        <motion.div
          className="text-center lg:text-left"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : "show"}
        >
          <motion.span
            variants={item}
            /* No `tracking-*` here — the eyebrow token carries its own 0.1em. */
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand/40 bg-brand/5 px-3 py-1.5 text-eyebrow font-medium text-brand sm:px-4"
          >
            {/*
              The type scale bottoms out at a 360px phone; below that the full
              line needs ~312px and wraps the pill onto two lines, so the
              narrowest screens get the location alone — the copy underneath
              already says what we sell.
            */}
            <span className="min-[360px]:hidden">Windsor, Ontario</span>
            <span className="hidden min-[360px]:inline">
              Windsor, Ontario · Trading Cards &amp; Gaming
            </span>
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-display font-bold uppercase text-foreground sm:mt-6"
          >
            Your Ultimate
            <br />
            Card <span className="text-glow">Destination</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-md text-lead text-muted-foreground sm:mt-5 lg:mx-0"
          >
            Pokémon, One Piece, Magic, Sports Cards, Disney Lorcana &amp; more!
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row lg:justify-start"
          >
            <Button
              asChild
              size="lg"
              className="w-full font-semibold uppercase tracking-wide sm:w-auto"
            >
              <Link href="/collections">
                Explore Collections
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-border font-semibold uppercase tracking-wide hover:border-brand/60 hover:text-brand sm:w-auto"
            >
              <Link href="/events">
                <Calendar className="size-4" />
                Upcoming Events
              </Link>
            </Button>
          </motion.div>

          {/* One dot per card — picking one rotates it to the front of the fan */}
          <motion.div
            variants={item}
            className="mt-7 flex justify-center gap-1 sm:mt-8 lg:justify-start"
          >
            {fanCards.map((card, i) => (
              /* Padding gives each dot a finger-sized hit area on touch. */
              <button
                key={card.slug}
                type="button"
                aria-label={`Show ${card.collection.name}`}
                aria-current={active === i}
                onClick={() => setActive(i)}
                className="group -my-3 px-1.5 py-3"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all",
                    active === i
                      ? "w-6 bg-brand shadow-[0_0_10px_rgba(85,231,27,0.7)]"
                      : "w-2 bg-muted-foreground/40 group-hover:bg-muted-foreground/70",
                  )}
                />
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Card fan */}
        <motion.div
          className="order-first lg:order-last"
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={reduce ? false : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <CardFan active={active} onActiveChange={setActive} />
        </motion.div>
      </Container>
    </section>
  );
}
