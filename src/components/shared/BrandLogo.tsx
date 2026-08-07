import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/** The Emerald Cards & Games wordmark: shield mark + stacked name. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="Emerald Cards & Games — home"
    >
      {/*
        The whole badge, never a crop. It was briefly cut down to the shield to
        avoid repeating the lettering it carries, but this artwork has no clean
        sub-shape — the gem's lower points sit behind the banner, so every crop
        clips something and reads as a broken image. Whole and small beats
        neat and cut.
      */}
      <span className="relative grid size-10 shrink-0 place-items-center">
        <Image
          src={asset("/images/logo.webp")}
          alt=""
          aria-hidden
          width={96}
          height={96}
          priority
          className="size-10 object-contain drop-shadow-[0_0_10px_rgba(62,221,107,0.45)] transition-transform duration-300 group-hover:scale-110"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-wide text-foreground">
          EMERALD
        </span>
        {/* Tighter letter-spacing on narrow phones keeps this on one line. */}
        <span className="whitespace-nowrap text-[0.62rem] font-medium tracking-[0.18em] text-muted-foreground sm:tracking-[0.28em]">
          CARDS &amp; GAMES
        </span>
      </span>
    </Link>
  );
}
