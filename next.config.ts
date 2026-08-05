import type { NextConfig } from "next";

/*
  GitHub Pages deploy (project page at /pokemon) is enabled only when the CI
  workflow sets DEPLOY_TARGET=github-pages, so local `pnpm dev` / `pnpm build`
  keep running at the root path with normal image optimization.
*/
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";
const repoBasePath = "/pokemon";

const nextConfig: NextConfig = {
  reactCompiler: true,
  /*
    `next dev` blocks cross-origin requests to /_next dev assets by default, so
    opening the LAN URL on a phone serves the HTML but not the JS/CSS chunks and
    the page renders unstyled. Allow the local subnet — the wildcard keeps this
    working when DHCP hands the machine a different address. Dev-only; it has no
    effect on the static export.
  */
  allowedDevOrigins: ["192.168.1.*"],
  images: {
    // Static export can't use the default image optimizer. Artwork in
    // `public/images` is pre-sized by `scripts/optimize-images.mjs` instead.
    unoptimized: isGithubPages,
  },
  env: {
    /*
      `basePath` is applied to next/link automatically but NOT to next/image —
      its `src` has to carry the prefix itself. Publishing the value here keeps
      next.config the only place that knows the repo path; `asset()` in
      src/lib/asset.ts reads it. Empty off Pages, so dev is unaffected.
    */
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? repoBasePath : "",
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath: repoBasePath,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
