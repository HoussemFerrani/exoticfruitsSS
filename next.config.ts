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
