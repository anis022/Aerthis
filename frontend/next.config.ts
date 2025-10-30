import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // NEXT_PUBLIC_API_URL: "https://aerthis-backend-wq42.onrender.com",
    NEXT_PUBLIC_API_URL: "http://localhost:8000",
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
