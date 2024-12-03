import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard/consumers/test",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
      {
        pathname: "/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/my-bucket/**",
      },
    ],
  },
};

export default nextConfig;
