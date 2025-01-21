import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com','images.unsplash.com'], // Add the Cloudinary, Unsplash domain here
  },
};

export default nextConfig;
