/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        port: "",
        protocol: "https",
        hostname: "cloud.modyocdn.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
