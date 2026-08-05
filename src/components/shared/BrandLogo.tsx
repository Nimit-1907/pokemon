import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** The Emerald Cards & Games wordmark: shield mark + stacked name. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="Emerald Cards & Games — home"
    >
      <span className="relative grid size-9 shrink-0 place-items-center">
        <Image
          src="/images/logo.webp"
          alt=""
          aria-hidden
          width={72}
          height={72}
          priority
          className="size-9 object-contain drop-shadow-[0_0_10px_rgba(85,231,27,0.5)] transition-transform duration-300 group-hover:scale-110"
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
