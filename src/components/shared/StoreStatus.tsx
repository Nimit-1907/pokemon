"use client";

import { getStoreStatus, type StoreStatus as Status } from "@/lib/hours";
import { useNow } from "@/lib/clock";
import { cn } from "@/lib/utils";

/*
  Live "are they open right now?" badge.

  Client-only by necessity. The site is exported statically, so anything this
  component rendered on the server would be the status at *build* time — frozen
  and wrong within hours. It renders a neutral placeholder for the first paint
  and fills in once the shared clock reports in, which also keeps the server
  and client markup identical so there's no hydration mismatch.

  The clock ticks every 30s (see `lib/clock.ts`) so the badge flips at opening
  and closing time, and the "closes in N min" countdown stays honest, without a
  reload.
*/

const DOT_COLOUR: Record<Status["state"], string> = {
  open: "bg-brand",
  "closing-soon": "bg-brass",
  closed: "bg-muted-foreground",
};

const TEXT_COLOUR: Record<Status["state"], string> = {
  open: "text-brand",
  "closing-soon": "text-brass",
  closed: "text-muted-foreground",
};

/**
 * Compact status pill.
 *
 * `variant="bare"` drops the border and background for placement inside a
 * surface that already has its own — the mobile menu, the footer.
 */
export function StoreStatus({
  className,
  variant = "pill",
  showDetail = true,
}: {
  className?: string;
  variant?: "pill" | "bare";
  showDetail?: boolean;
}) {
  const now = useNow();
  const status: Status | null = now ? getStoreStatus(now) : null;

  const shell = cn(
    "inline-flex items-center gap-2 text-body-sm",
    variant === "pill" &&
      "rounded-full border border-border bg-surface-1 px-3 py-1.5",
    className,
  );

  // First paint: hold the space, say nothing we can't stand behind.
  if (!status) {
    return (
      <span className={shell} aria-hidden>
        <span className="size-2 shrink-0 rounded-full bg-muted-foreground/40" />
        <span className="text-muted-foreground/60">Store hours</span>
      </span>
    );
  }

  return (
    /*
      One live region rather than a badge plus a separate detail: a screen
      reader should hear "Open now, closes 8:00 PM" as a single fact.
    */
    <span className={shell} role="status">
      <span
        className={cn(
          "size-2 shrink-0 rounded-full",
          DOT_COLOUR[status.state],
          status.state === "open" && "pulse-dot",
        )}
      />
      <span className={cn("font-medium", TEXT_COLOUR[status.state])}>
        {status.label}
      </span>
      {showDetail && (
        <>
          <span aria-hidden className="text-border-strong">
            ·
          </span>
          <span className="font-data text-muted-foreground">
            {status.detail}
          </span>
        </>
      )}
    </span>
  );
}
