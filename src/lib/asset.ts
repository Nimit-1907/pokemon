/**
 * Prefixes a path under `/public` with the deploy's `basePath`.
 *
 * `next/link` applies `basePath` on its own, but `next/image` does not — the
 * prefix has to be part of `src` (see next.config's `basePath` docs). On the
 * GitHub Pages export the site is served from /pokemon, so a bare
 * "/images/logo.webp" resolves at the domain root and 404s: every photo on the
 * deployed site came up blank while local dev looked fine.
 *
 * `NEXT_PUBLIC_BASE_PATH` is inlined at build time by next.config, which owns
 * the value — nothing here needs to know whether this build is the Pages one.
 * Off Pages it's an empty string and this is a no-op.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
