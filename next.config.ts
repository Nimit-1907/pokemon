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
  images: {
    // Static export can't use the default image optimizer.
    unoptimized: isGithubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
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
