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
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 className="flex items-center gap-3 font-display text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
        <span className="h-6 w-1.5 rounded-full bg-brand shadow-[0_0_12px_rgba(85,231,27,0.7)]" />
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-dim"
        >
          {viewAllLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
