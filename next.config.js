/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/mapaderisco",
        destination: "/mapaderisco/index.html",
      },
    ];
  },
};

module.exports = nextConfig;
