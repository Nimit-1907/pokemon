import { CardArt } from "@/components/shared/CardArt";
import type { Product } from "@/types";

/** Product tile: photo (or gradient stand-in), name, type. */
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="glow-card group flex h-full flex-col overflow-hidden rounded-xl">
      <CardArt
        name={product.name}
        gradient={product.gradient}
        image={product.image}
        sizes="(min-width: 1280px) 20vw, (min-width: 640px) 30vw, 45vw"
        className="aspect-square w-full"
        compact
      />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-body font-semibold leading-tight text-foreground">
          {product.name}
        </h3>
        <p className="text-caption text-muted-foreground">{product.type}</p>
      </div>
    </div>
  );
}
