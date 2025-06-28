import type { NextConfig } from "next";


const { withNetlify } = require('@netlify/next');

module.exports = withNetlify({
  reactStrictMode: true,
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
