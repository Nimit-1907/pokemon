"use client";

import { useMemo, useState } from "react";
import { PackageOpen, Search } from "lucide-react";
import { ProductCard } from "@/components/shared/ProductCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Collection, Product } from "@/types";

const ALL = "All Products";

export function CollectionProducts({
  collection,
  products,
}: {
  collection: Collection;
  products: Product[];
}) {
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === ALL || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  // Count per category for the sidebar
  const countFor = (cat: string) =>
    cat === ALL
      ? products.length
      : products.filter((p) => p.category === cat).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      {/*
        Sidebar categories. `min-w-0` is load-bearing: a grid item defaults to
        `min-width: auto`, so on mobile the horizontally-scrolling chip row
        below sized the whole column to its content and pushed the page ~300px
        wider than the viewport.
      */}
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <h2 className="mb-3 text-body-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Categories
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
          {collection.categories.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors lg:w-full",
                  active
                    ? "bg-brand/15 text-brand ring-1 ring-brand/40"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {cat}
                <span
                  className={cn(
                    "hidden text-caption lg:inline",
                    active ? "text-brand/80" : "text-muted-foreground/60",
                  )}
                >
                  {countFor(cat)}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Products */}
      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="pl-9"
            />
          </div>
          <p className="text-body-sm text-muted-foreground">
            {filtered.length}{" "}
            {filtered.length === 1 ? "product" : "products"}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <PackageOpen className="size-10 text-muted-foreground/50" />
            <p className="mt-4 text-h3 font-semibold text-foreground">
              No products found
            </p>
            <p className="mt-1 text-body-sm text-muted-foreground">
              Try a different category or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
