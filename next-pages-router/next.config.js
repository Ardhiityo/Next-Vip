/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // cara 1
    // domains: ["static.nike.com"],
    // cara 2
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nike.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
