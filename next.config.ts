import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://restful-api.dev/:path*"
      }
    ]
  }
};

export default nextConfig;
