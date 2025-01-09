import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports={
  images:{
    domains: ["lh3.googleusercontent.com", "th.bing.com", "cdn.pixabay.com", "plus.unsplash.com"]  
    // Add your domain here
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

export default nextConfig;
