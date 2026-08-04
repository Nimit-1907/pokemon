import { ShoppingCart } from "lucide-react";
import { CardArt } from "@/components/shared/CardArt";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

/** Product tile: gradient art, name, type, price, Add to Cart. */
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="glow-card group flex flex-col overflow-hidden rounded-xl">
      <CardArt
        name={product.name}
        gradient={product.gradient}
        className="aspect-square w-full"
        compact
      />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-semibold leading-tight text-foreground">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground">{product.type}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-display text-lg font-bold text-brand">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <Button size="sm" className="mt-3 w-full font-semibold">
          <ShoppingCart className="size-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
