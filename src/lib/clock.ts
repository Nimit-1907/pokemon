"use client";

import { useSyncExternalStore } from "react";

/*
  A single shared clock for every time-aware component on the page.

  Three things this solves at once:

  1. Static export. The site is prerendered, so the build-time clock is frozen
     into the HTML. Components need the *browser's* time, but reading it during
     render would make the client markup disagree with the server's. The server
     snapshot is `0` — "unknown" — and the real time arrives after mount, which
     keeps hydration identical and lets each component render a neutral
     placeholder in the meantime.

  2. One timer, not N. The status badge, the hours list, the events list and
     the homepage preview all need the same "now". Each owning its own
     `setInterval` meant four timers drifting out of step, so a minute could
     tick over in the header and not in the footer.

  3. It's the right primitive. `useSyncExternalStore` exists for subscribing to
     something outside React — a clock is exactly that. The previous
     `useEffect(() => setState(...))` version tripped the React Compiler's
     `set-state-in-effect` rule, which was a fair complaint rather than noise.
*/

/** How often the shared clock ticks. Enough for "closes in N min" to stay honest. */
const TICK_MS = 30_000;

const listeners = new Set<() => void>();
let snapshot = 0;
let timer: ReturnType<typeof setInterval> | null = null;

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  if (timer === null) {
    timer = setInterval(() => {
      snapshot = Date.now();
      notify();
    }, TICK_MS);
  }

  // First mount: move off the server's "unknown" snapshot and re-render.
  if (snapshot === 0) {
    snapshot = Date.now();
    onStoreChange();
  }

  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0 && timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };
}

/* Returns a number, so React's snapshot-identity check is satisfied for free. */
const getSnapshot = () => snapshot;
const getServerSnapshot = () => 0;

/**
 * The current time, or `null` before the first client render.
 *
 * `null` is the signal to render a neutral placeholder — never a guess. A
 * store status that briefly claims "Closed" because it defaulted to the epoch
 * would be worse than one that says nothing for a frame.
 */
export function useNow(): Date | null {
  const ms = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return ms === 0 ? null : new Date(ms);
}
