/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nhom10_bookstationtest',
  images: {
    unoptimized: true,
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;