"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, Navigation, Phone } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Container } from "@/components/layout/Container";
import { StoreStatus } from "@/components/shared/StoreStatus";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { collections } from "@/lib/data";
import { nav, site } from "@/lib/site";
import { mapsHref, telHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

function useIsActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** How far down the page the header tightens up. */
const CONDENSE_AT = 80;

export function Navbar() {
  const isActive = useIsActive();
  const [open, setOpen] = useState(false);

  /*
    Past the first screen the header gives some height back and deepens, so a
    long page reads as having been travelled rather than as one flat scroll.
    `setState` with the same value is a no-op in React, so this is one render
    per crossing rather than one per scroll event.
  */
  const [condensed, setCondensed] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > CONDENSE_AT));

  return (
    <header
      /*
        Lifts the header out of the route transition's root snapshot so it can
        be told to hold still — see the `site-header` rules in `globals.css`.
        Without it a sticky bar cross-fades against the content sliding beneath
        it, and the whole viewport appears to flinch on every navigation.
      */
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl",
        "transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none",
        condensed
          ? "border-border-strong bg-base/95 shadow-[0_12px_30px_-22px_rgba(0,0,0,0.95)]"
          : "border-border bg-base/85",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-4",
          "transition-[height] duration-300 motion-reduce:transition-none",
          condensed ? "h-13" : "h-16",
        )}
      >
        {/* Left group: logo + nav sit together */}
        <div className="flex items-center gap-6 lg:gap-10">
          {/*
            Scaled rather than resized: the badge and the wordmark shrink
            together, and from the left, so the nav beside it doesn't shift.
          */}
          <BrandLogo
            className={cn(
              "origin-left transition-transform duration-300 motion-reduce:transition-none",
              condensed && "scale-[0.82]",
            )}
          />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) =>
              item.label === "Products" ? (
                <ProductsDropdown key={item.href} active={isActive(item.href)} />
              ) : (
                <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/*
            The live status sits in the header on desktop because "are they
            open?" is the most common question a local shop's site gets, and
            it shouldn't need a scroll to answer. Phones get it in the fixed
            bottom bar instead, where it's always visible.
          */}
          <StoreStatus className="hidden lg:inline-flex" />

          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden md:inline-flex"
          >
            <a href={telHref(site.phone)}>
              <Phone className="size-4" />
              <span className="font-data">{site.phone}</span>
            </a>
          </Button>

          {/* Mobile trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="md:hidden"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-border bg-base">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <BrandLogo />
                </SheetTitle>
              </SheetHeader>

              {/* Scrolls independently so a long collection list stays reachable. */}
              <div className="min-h-0 flex-1 overflow-y-auto pb-8">
                <div className="border-b border-border px-4 pb-4">
                  <StoreStatus variant="bare" />
                </div>

                <nav className="mt-4 flex flex-col gap-1 px-4">
                  {nav.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-md px-3 py-2.5 text-control font-medium transition-colors",
                          isActive(item.href)
                            ? "bg-accent text-brand"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className={cn(
                        "rounded-md px-3 py-2.5 text-control font-medium transition-colors",
                        isActive("/contact")
                          ? "bg-accent text-brand"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      Contact
                    </Link>
                  </SheetClose>

                  <div className="mt-3 border-t border-border pt-3">
                    <p className="px-3 pb-1 text-eyebrow font-semibold uppercase text-muted-foreground">
                      Collections
                    </p>
                    {collections.map((c) => (
                      <SheetClose asChild key={c.slug}>
                        <Link
                          href={`/collections/${c.slug}`}
                          className="block rounded-md px-3 py-2 text-body-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          {c.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-4">
                    <Button asChild size="sm" variant="outline">
                      <a href={telHref(site.phone)}>
                        <Phone className="size-4" />
                        Call
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={mapsHref(site.mapQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="size-4" />
                        Directions
                      </a>
                    </Button>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-md px-3 py-2 text-control font-medium transition-colors",
        active ? "text-brand" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand transition-transform duration-300",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </Link>
  );
}

function ProductsDropdown({ active }: { active: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative flex items-center gap-1 rounded-md px-3 py-2 text-control font-medium outline-none transition-colors",
            active ? "text-brand" : "text-muted-foreground hover:text-foreground",
          )}
        >
          Products
          <ChevronDown className="size-3.5" />
          <span
            className={cn(
              "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand transition-transform duration-300",
              active ? "scale-x-100" : "scale-x-0",
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuItem asChild>
          <Link href="/collections" className="font-medium text-brand">
            All collections
          </Link>
        </DropdownMenuItem>
        {collections.map((c) => (
          <DropdownMenuItem asChild key={c.slug}>
            <Link href={`/collections/${c.slug}`}>{c.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
