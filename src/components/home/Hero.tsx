"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { StoreStatus } from "@/components/shared/StoreStatus";
import { CardFan, FAN_CENTER, fanCards } from "@/components/home/CardFan";
import { WordWipe } from "@/components/motion/WordWipe";
import { collectionsHref, eventsHref, showPrices } from "@/lib/flags";
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

/*
  The three things a first-time visitor is actually checking. Each is a fact
  the site can stand behind — the hours in `site.ts` cover all seven days, the
  calendar has an event most weeks, and every price in the catalogue is CAD.
*/
const ASSURANCES = [
  // Dropped along with the prices — nothing on screen backs the claim up.
  ...(showPrices ? ["Priced in CAD"] : []),
  "Open 7 days",
  "Events most weeks",
];

export function Hero() {
  // Which card is held at the front of the fan; starts on the middle one.
  const [active, setActive] = useState(FAN_CENTER);
  const reduce = useReducedMotion();

  // With reduced motion, render everything statically.
  const container = reduce ? undefined : copyContainer;
  const item = reduce ? undefined : copyItem;

  /*
    Parallax. The fan and the atmosphere behind it climb slightly slower than
    the page does, so scrolling off the hero separates them instead of sliding
    one flat picture away. Small numbers on purpose — this should register as
    depth, not as the hero coming apart.
  */
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const fanY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 150]);

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
    /* No bottom border — the next section's `.band` seam draws the join, and
       running both put a flat grey rule directly under a brass one. */
    <section ref={section} className="relative overflow-hidden">
      {/*
        The ground is the back of a card — see `.card-back`. It replaced a
        blurred photo of the shop, which at 14% opacity read as an image that
        had failed to load rather than as a deliberate texture, and cost a
        priority image fetch in front of the LCP for the privilege.
      */}
      <div aria-hidden className="card-back absolute inset-0" />
      {/* Emerald atmosphere, warmed with a low brass wash from the left */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 78% 40%, rgba(62,221,107,0.14), transparent 60%), radial-gradient(50% 50% at 5% 90%, rgba(217,168,87,0.09), transparent 65%), linear-gradient(180deg, rgba(6,16,11,0.72), rgba(6,16,11,0.96))",
          ...(reduce ? {} : { y: glowY }),
        }}
      />

      <Container className="relative grid items-center gap-stack py-section lg:grid-cols-2 lg:gap-6">
        {/* Copy */}
        <motion.div
          className="text-center lg:text-left"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : "show"}
        >
          {/*
            The eyebrow slot used to hold a static "Windsor, Ontario · Trading
            Cards & Gaming" pill, which repeated the headline and the strapline
            underneath. The live open/closed state is the one thing worth
            spending that position on.

            Hidden below `md`, where the fixed bottom bar already carries the
            same status — on a phone the two sat on screen together saying the
            same thing.
          */}
          <motion.div
            variants={item}
            className="hidden justify-center md:flex lg:justify-start"
          >
            <StoreStatus />
          </motion.div>

          {/*
            No `item` variant here. The words carry their own mask-wipe (see
            `WordWipe`) and take their turn in this container's stagger by
            inheriting its state — running the block fade as well would move
            the headline twice for one arrival.
          */}
          <h1 className="mt-5 font-display text-display font-extrabold uppercase text-foreground sm:mt-6">
            <WordWipe
              lines={[
                { text: "Windsor’s" },
                { text: "card shop", accent: true },
              ]}
            />
          </h1>

          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-md text-lead text-muted-foreground sm:mt-5 lg:mx-0"
          >
            Pokémon, One Piece, Magic, Lorcana and sports cards — singles,
            sealed product and supplies, on the shelf on Talbot Road.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row lg:justify-start"
          >
            <Button asChild size="lg" className="w-full font-semibold sm:w-auto">
              <Link href={collectionsHref}>
                Browse collections
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full font-semibold hover:border-brand/60 hover:text-brand sm:w-auto"
            >
              <Link href={eventsHref}>
                <Calendar className="size-4" />
                What&apos;s on
              </Link>
            </Button>
          </motion.div>

          {/* Assurances */}
          <motion.ul
            variants={item}
            className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-caption text-muted-foreground lg:justify-start"
          >
            {ASSURANCES.map((line, i) => (
              <li key={line} className="flex items-center gap-x-4">
                {i > 0 && (
                  <span aria-hidden className="text-border-strong">
                    ·
                  </span>
                )}
                {line}
              </li>
            ))}
          </motion.ul>

          {/* One dot per card — picking one rotates it to the front of the fan */}
          <motion.div
            variants={item}
            className="mt-6 flex justify-center gap-1 lg:justify-start"
          >
            {fanCards.map((card, i) => (
              /*
                Padding gives each dot a finger-sized hit area. At `px-1.5` the
                inactive dots measured 18px wide — under the 24x24 minimum
                (WCAG 2.5.8). The negative margin keeps the visual row height.
              */
              <button
                key={card.slug}
                type="button"
                aria-label={`Show ${card.collection.name}`}
                aria-current={active === i}
                onClick={() => setActive(i)}
                className="group -my-3 px-2.5 py-3"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all",
                    active === i
                      ? "w-6 bg-brass"
                      : "w-1.5 bg-muted-foreground/40 group-hover:bg-muted-foreground/70",
                  )}
                />
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/*
          Card fan. A fade only — the fan deals itself out of a stack on mount
          (see `CardFan`), and scaling the whole group at the same time turned
          one clear gesture into two competing ones.
        */}
        <motion.div
          className="relative order-first lg:order-last"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? false : { opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={reduce ? undefined : { y: fanY }}
        >
          <CardFan active={active} onActiveChange={setActive} />
        </motion.div>
      </Container>
    </section>
  );
}
