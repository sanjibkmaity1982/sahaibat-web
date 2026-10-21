import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bahasa Indonesia moved from /id to the bare paths; keep old links working.
  async redirects() {
    return [
      { source: "/id", destination: "/", permanent: true },
      { source: "/id/impact", destination: "/impact", permanent: true },
    ];
  },
};

export default nextConfig;
