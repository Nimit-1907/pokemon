import * as React from "react";

/*
  The cross-fade between routes.

  Worth reading before changing: this does NOT use a client-side presence
  wrapper in the layout, which is the usual way to animate App Router
  navigation and is the wrong tool here. Next 16 supports React's
  `<ViewTransition>` natively with no configuration, and it works from a server
  component — so page transitions cost no client JS and no layout-level
  `"use client"` boundary. See
  `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`.

  Two consequences of that guide worth restating here, because both are easy to
  undo by accident:

    - This belongs in each `page.tsx`, never in a layout. Layouts persist
      across navigation, so enter and exit never fire inside one.
    - The header is deliberately excluded, via `view-transition-name` on the
      `<header>` itself. A sticky bar that cross-fades with the content it is
      pinned above reads as the whole viewport flinching; it needs to stay
      still and be the thing the movement is measured against.

  `@types/react` 19 does not declare `ViewTransition` even though the React
  that Next bundles exports it, hence the cast. The fallback is not decorative
  either — if a future React drops or renames the export, pages keep rendering
  and simply lose their transition.
*/

type ViewTransitionProps = {
  children?: React.ReactNode;
  name?: string;
  default?: string;
  enter?: string | Record<string, string>;
  exit?: string | Record<string, string>;
  share?: string;
  update?: string;
};

const ViewTransition = (
  React as unknown as {
    ViewTransition?: React.ComponentType<ViewTransitionProps>;
  }
).ViewTransition;

/** Wraps a route's content so it fades and lifts into place on navigation. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  if (!ViewTransition) return <>{children}</>;

  return (
    /*
      `default="none"` keeps this from animating on transitions it has nothing
      to do with — a Suspense reveal elsewhere on the page, or a refresh.
    */
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
