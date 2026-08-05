import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CardArt } from "@/components/shared/CardArt";
import type { Collection } from "@/types";

/** Featured-collection tile: gradient art + name + "Shop Now". */
export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="glow-card group flex h-full flex-col overflow-hidden rounded-xl"
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
        <span className="text-body font-semibold text-foreground">
          {collection.name}
        </span>
        <span className="mt-auto inline-flex items-center gap-1 pt-1 text-body-sm font-medium text-brand">
          Shop Now
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
