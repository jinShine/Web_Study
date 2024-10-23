import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  logging: {
    // fetch 요청 시 전체 log 표시
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
