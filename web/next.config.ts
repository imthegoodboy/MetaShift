import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    domains: ['localhost'], // Add more domains if needed for production
  }
};

export default nextConfig;
