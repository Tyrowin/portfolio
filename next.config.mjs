// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporary workaround: skip ESLint during build due to invalid options error from Next's lint runner.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
