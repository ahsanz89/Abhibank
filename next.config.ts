import type { NextConfig } from "next";

const depositSlugs = [
  "niswan-rozana-munafa",
  "asaan-account",
  "sahulat-current-account",
  "rozana-munafa",
  "aitemad-bachat-account",
  "muhaffiz-term-deposit",
  "tahafuz-term-deposit",
  "sahulat-plus-current-account",
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  // Keep every URL from the original WordPress site working.
  async redirects() {
    return [
      ...depositSlugs.map((slug) => ({ source: `/${slug}`, destination: `/deposits/${slug}`, permanent: true })),
      { source: "/products/:slug", destination: "/loans/:slug", permanent: true },
      { source: "/news_and_press/:slug", destination: "/press-release/:slug", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
