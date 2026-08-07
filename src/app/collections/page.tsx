import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CardArt } from "@/components/shared/CardArt";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion/Reveal";
import { collections, getListedProducts } from "@/lib/data";
import { site } from "@/lib/site";
import { comingSoon, showPrices } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Pokémon, One Piece, Magic: The Gathering, Disney Lorcana and Sports Cards at Emerald Cards & Games in Windsor, Ontario.",
};

export default function CollectionsPage() {
  /*
    Held back for the client demo — see `lib/flags.ts`. The full index below is
    finished and working; setting `collectionsIndex` to `false` publishes it.
    Individual collection pages (`/collections/[slug]`) stay live either way,
    and are what the homepage tiles and the Products dropdown link to.
  */
  if (comingSoon.collectionsIndex) {
    return (
      <ComingSoon
        eyebrow="Full product index"
        title="Coming soon"
        description="We're still getting the full catalogue online. In the meantime, pick a game from the Products menu, or call the shop and we'll check the shelf for you."
      />
    );
  }

  return <CollectionsIndex />;
}

/*
  The collection index.

  Rather than repeat the homepage's poster grid, each line gets a row with room
  for its description and the categories it stocks, so this page answers "what
  do you actually carry?" instead of just relisting five names.
*/
function CollectionsIndex() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 0%, rgba(62,221,107,0.1), transparent 65%), radial-gradient(40% 50% at 10% 100%, rgba(217,168,87,0.07), transparent 60%)",
          }}
        />
        <Container className="py-section-tight">
          <p className="text-eyebrow font-semibold uppercase text-brass">
            {collections.length} card games
          </p>
          <h1 className="mt-3 font-display text-h1 font-extrabold uppercase text-foreground">
            What we <span className="text-brass">stock</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lead text-muted-foreground">
            Singles, sealed product and supplies across five card games.
            {showPrices &&
              ` Every price is in Canadian dollars — ${site.taxName} is added at the till.`}
          </p>
        </Container>
      </section>

      <section className="band py-section">
        <Container>
          <StaggerGrid className="flex flex-col gap-tile">
            {collections.map((collection) => {
              const count = getListedProducts(collection.slug).length;

              return (
                <StaggerItem key={collection.slug}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="slab group grid gap-5 overflow-hidden p-4 sm:grid-cols-[200px_1fr] sm:p-5"
                  >
                    <CardArt
                      name={collection.name}
                      tagline={collection.tagline}
                      gradient={collection.gradient}
                      image={collection.image}
                      sizes="(min-width: 640px) 200px, 100vw"
                      className="aspect-[16/9] w-full rounded-lg sm:aspect-[4/5]"
                    />

                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h2 className="font-display text-h3 font-bold uppercase text-foreground">
                          {collection.name}
                        </h2>
                        <span className="font-data text-caption text-brass">
                          {count} {count === 1 ? "item" : "items"}
                        </span>
                      </div>

                      <p className="mt-2 max-w-2xl text-body-sm text-muted-foreground">
                        {collection.description}
                      </p>

                      {/*
                        The categories double as a preview of the filters on the
                        collection page, so the reader knows what shape the next
                        page takes before they tap. "All Products" is dropped —
                        it's a filter control, not a thing the shop stocks.
                      */}
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {collection.categories
                          .filter((c) => c !== "All Products")
                          .map((category) => (
                            <li
                              key={category}
                              className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-caption text-muted-foreground"
                            >
                              {category}
                            </li>
                          ))}
                      </ul>

                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-body-sm font-medium text-brand">
                        Browse {collection.name}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGrid>

          <Reveal>
            <p className="mt-8 text-body-sm text-muted-foreground">
              Looking for something that isn&apos;t listed? Singles stock moves
              daily —{" "}
              <Link
                href="/contact"
                className="font-medium text-brand underline-offset-4 hover:underline"
              >
                ask us
              </Link>{" "}
              and we&apos;ll check the case.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
