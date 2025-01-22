import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com','images.unsplash.com','plus.unsplash.com','media.istockphoto.com'], // Add the Cloudinary, Unsplash domain here
  },
};

export default nextConfig;
