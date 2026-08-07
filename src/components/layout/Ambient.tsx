/**
 * The ground the whole site sits on.
 *
 * Rendered once in the root layout, so every route gets it — including the
 * ones with no artwork of their own, which is where it earns its place. The
 * coming-soon pages and `/contact` were flat ink from header to footer.
 *
 * Fixed, not scrolling: it behaves like the light in the room rather than a
 * pattern attached to the page, so content moves across it. See
 * `.ambient-*` in `globals.css` for the three layers.
 *
 * `-z-10` puts it behind everything without needing a stacking context on
 * `<body>` — the body's own background propagates to the canvas, which paints
 * below even negative z-index children.
 */
export function Ambient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="ambient-wash" />
      <div className="ambient-grain" />
      <div className="ambient-vignette" />
    </div>
  );
}
