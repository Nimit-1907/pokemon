import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CardArt } from "@/components/shared/CardArt";
import { TiltCard } from "@/components/motion/TiltCard";
import { getListedProducts } from "@/lib/data";
import type { Collection } from "@/types";

/** Featured-collection tile: artwork, name, and what's in it. */
export function CollectionCard({ collection }: { collection: Collection }) {
  const count = getListedProducts(collection.slug).length;

  return (
    <TiltCard>
      <Link
        href={`/collections/${collection.slug}`}
        className="slab group flex h-full flex-col overflow-hidden"
      >
        <CardArt
          name={collection.name}
          tagline={collection.tagline}
          gradient={collection.gradient}
          image={collection.image}
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="aspect-[3/4] w-full sm:aspect-[4/5]"
        />
        <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
          <span className="text-body font-semibold leading-tight text-foreground">
            {collection.name}
          </span>
          {/*
            A count beats "Shop Now" here: it tells the reader whether the tile
            is worth a tap, which the generic label never did.
          */}
          <span className="font-data text-caption text-muted-foreground">
            {count} {count === 1 ? "item" : "items"}
          </span>
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-body-sm font-medium text-brand">
            Browse
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
