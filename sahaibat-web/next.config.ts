import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bahasa Indonesia moved from /id to the bare paths; keep old links working.
  async redirects() {
    return [
      { source: "/id", destination: "/", permanent: true },
      { source: "/id/impact", destination: "/impact", permanent: true },
      // The older pages are not part of the redesign; send visitors to the
      // matching part of the new site. Temporary, so they can come back.
      { source: "/contact", destination: "/impact#ip-partner", permanent: false },
      { source: "/partner", destination: "/impact#ip-partner", permanent: false },
      { source: "/enterprise", destination: "/#dok", permanent: false },
      { source: "/technology", destination: "/#why", permanent: false },
      { source: "/investors", destination: "/", permanent: false },
      { source: "/terms", destination: "/privacy", permanent: false },
    ];
  },
};

export default nextConfig;
