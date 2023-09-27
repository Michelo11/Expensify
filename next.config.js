/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ui-avatars.com",
      "4oxima0e8nv2antp.public.blob.vercel-storage.com",
      "cdn.discordapp.com",
      "avatars.githubusercontent.com",
      "cdn.wikily.app",
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
