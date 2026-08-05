import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Section title with an emerald tick and an optional "View All" link. */
export function SectionHeading({
  title,
  viewAllHref,
  viewAllLabel = "View All",
}: {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 sm:mb-8">
      <h2 className="flex items-center gap-2.5 font-display text-h2 font-bold uppercase text-foreground sm:gap-3">
        {/* Sized in `em` so the tick tracks the fluid heading instead of stepping. */}
        <span className="h-[0.85em] w-[0.28em] shrink-0 rounded-full bg-brand shadow-[0_0_12px_rgba(85,231,27,0.7)]" />
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="group -my-2 inline-flex shrink-0 items-center gap-1.5 py-2 text-body-sm font-medium text-brand transition-colors hover:text-brand-dim"
        >
          {/* The long label is the useful one, but it crowds a phone header. */}
          <span className="sm:hidden">View All</span>
          <span className="hidden sm:inline">{viewAllLabel}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
