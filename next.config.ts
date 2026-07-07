import type { NextConfig } from "next";

// NOTE: static export removed — the admin panel needs API routes and a
// writable data file, so the site now deploys as a Node server
// (npm run build && npm start) instead of a static out/ folder.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
