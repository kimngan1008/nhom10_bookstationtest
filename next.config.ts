/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nhom10_bookstationtest',
  images: { unoptimized: true },
  
  // THÊM ĐOẠN NÀY VÀO:
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;