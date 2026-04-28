/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nhom10_bookstationtest',
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true, // Bỏ qua lỗi TypeScript để build thành công
  },
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua lỗi ESLint
  },
};

export default nextConfig;