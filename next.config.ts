import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@near-wallet-selector/core",
    "@near-wallet-selector/modal-ui",
    "@near-wallet-selector/my-near-wallet",
    "@near-wallet-selector/here-wallet",
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;
