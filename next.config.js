/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure content files are included in the build
  output: 'standalone',
  // Explicitly include content directory
  serverExternalPackages: [],
};

module.exports = nextConfig;
