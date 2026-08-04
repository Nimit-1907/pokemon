import Link from "next/link";
import { cn } from "@/lib/utils";

/** Faceted emerald-cut gem, matching the reference wordmark. */
function GemMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="gemFill" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8bf658" />
          <stop offset="1" stopColor="#3aa513" />
        </linearGradient>
      </defs>
      {/* Gem body */}
      <path
        d="M8 3 L16 3 L21 9 L12 21 L3 9 Z"
        fill="url(#gemFill)"
        stroke="#0b1f06"
        strokeWidth="0.7"
      />
      {/* Facet lines */}
      <g stroke="#0b1f06" strokeWidth="0.6" opacity="0.55">
        <path d="M3 9 H21" />
        <path d="M8 3 L9.5 9 M16 3 L14.5 9" />
        <path d="M9.5 9 L12 21 M14.5 9 L12 21" />
        <path d="M8 3 L12 9 L16 3" />
      </g>
    </svg>
  );
}

/** The Emerald Cards & Games wordmark: glowing gem + stacked name. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="Emerald Cards & Games — home"
    >
      <span className="relative grid size-9 place-items-center">
        <GemMark className="size-8 drop-shadow-[0_0_10px_rgba(85,231,27,0.6)] transition-transform duration-300 group-hover:scale-110" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-wide text-foreground">
          EMERALD
        </span>
        <span className="text-[0.62rem] font-medium tracking-[0.28em] text-muted-foreground">
          CARDS &amp; GAMES
        </span>
      </span>
    </Link>
  );
}
