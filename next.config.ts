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
  ...(isGithubPages
    ? {
        output: "export",
        basePath: repoBasePath,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
