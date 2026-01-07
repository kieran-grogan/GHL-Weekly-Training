/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/app/modules/[moduleId]/page": ["./modules/**"]
  }
};

module.exports = nextConfig;
