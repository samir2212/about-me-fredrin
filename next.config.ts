import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (e.g. "/about-me-fredrin"); unset on Vercel and locally.
const pagesBasePath = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(pagesBasePath !== undefined && {
    output: "export",
    basePath: pagesBasePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
