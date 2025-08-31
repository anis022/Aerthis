import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "aerthis-backend.onrender.com",
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
