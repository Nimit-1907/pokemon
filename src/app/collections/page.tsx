import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CollectionCard } from "@/components/shared/CollectionCard";
import { collections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse every collection at Emerald Cards & Games — Pokémon, One Piece, Magic, Disney Lorcana, and Sports Cards.",
};

export default function CollectionsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 0%, rgba(85,231,27,0.12), transparent 65%)",
          }}
        />
        <Container className="py-14 text-center sm:py-20">
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Our <span className="text-glow">Collections</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            From sealed booster boxes to chase singles — explore every game we
            carry and start building your collection.
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {collections.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
