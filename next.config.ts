import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isDevelopment,

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5050",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.mydomain.ir",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
