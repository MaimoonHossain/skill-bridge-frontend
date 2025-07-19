import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // add external url for images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
