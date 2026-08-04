import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CardArt } from "@/components/shared/CardArt";
import type { Collection } from "@/types";

/** Featured-collection tile: gradient art + name + "Shop Now". */
export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="glow-card group flex flex-col overflow-hidden rounded-xl"
    >
      <CardArt
        name={collection.name}
        tagline={collection.tagline}
        gradient={collection.gradient}
        className="aspect-[4/5] w-full"
      />
      <div className="flex flex-col gap-1 p-4">
        <span className="font-semibold text-foreground">{collection.name}</span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
          Shop Now
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
