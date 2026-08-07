import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Section header: optional eyebrow, title, a brass rule running out to the
 * right, and an optional "view all" link.
 *
 * The rule replaces the glowing green tick the headings used to carry. A tick
 * is decoration; the rule does structural work — it draws the eye across to
 * the section's action and makes each band on the page visibly a band.
 */
export function SectionHeading({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="mb-stack">
      {eyebrow && (
        /* No `tracking-*` — the eyebrow token carries its own 0.14em. */
        <p className="mb-2 text-eyebrow font-semibold uppercase text-brass">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <h2 className="font-display text-h2 font-extrabold uppercase text-foreground">
          {title}
        </h2>

        {/*
          `min-w-*` keeps the rule from collapsing to nothing when the title
          nearly fills the row; below that width it wraps to its own line
          rather than showing a 3px stub.
        */}
        <span
          aria-hidden
          className="hidden h-px min-w-16 flex-1 sm:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(217,168,87,0.5), rgba(217,168,87,0.05))",
          }}
        />

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group -my-2 inline-flex shrink-0 items-center gap-1.5 py-2 text-body-sm font-medium text-brand transition-colors hover:text-brand-dim"
          >
            {/* The long label is the useful one, but it crowds a phone header. */}
            <span className="sm:hidden">View all</span>
            <span className="hidden sm:inline">{viewAllLabel}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
