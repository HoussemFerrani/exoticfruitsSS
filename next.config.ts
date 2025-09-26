import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow specific external origins to access dev assets (e.g., /_next/*) during development
  // This prevents cross-origin warnings when testing from other devices on your LAN.
  allowedDevOrigins: [
    "http://192.168.1.7:3000",
    "http://192.168.56.1:3000",
    "http://localhost:3000",
  ],

  // Disable source maps in development to prevent 404 errors
  productionBrowserSourceMaps: false,

  // Image optimization for better performance
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for better development
  experimental: {
    // Enable better error handling
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // Security headers
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      {
        // No cache for HTML files and pages only
        source: "/((?!_next|api|favicon.ico|.*\\.(jpg|jpeg|png|gif|webp|avif|svg)).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
          {
            key: "Surrogate-Control",
            value: "no-store",
          },
        ],
      },
      {
        // Cache images for better performance
        source: "/.*\\.(jpg|jpeg|png|gif|webp|avif|svg)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable", // 30 days
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      {
        // Shorter cache for static assets with ETag support
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=1800, must-revalidate, stale-while-revalidate=86400",
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      {
        // No cache for service worker and manifest
        source: "/(sw.js|manifest.json)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },

  // Redirect HTTP to HTTPS in production
  async redirects() {
    return [
      {
        source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://:host:443/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
