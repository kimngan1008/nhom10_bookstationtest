/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nhom10_bookstationtest',
  images: {
    unoptimized: true,
  },
  // THÊM DÒNG NÀY ĐỂ SỬA LỖI TRANG DYNAMIC
  trailingSlash: true, 
  distDir: 'out',
  
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;