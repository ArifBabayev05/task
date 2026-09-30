import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Assets are pre-optimized; serving them directly keeps every file behind the Basic Auth proxy
  // (the image optimizer's internal fetch would otherwise be rejected by it).
  images: { unoptimized: true },
  async redirects() {
    return [{ source: "/", destination: "/az", permanent: false }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Internal material: keep it out of search engines and caches.
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
