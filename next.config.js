/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  async rewrites() {
    console.log("rewrite happen!!");
    return [
      {
        source: "/api/:path*",
        destination: "https://api.binance.com/api/v3/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
