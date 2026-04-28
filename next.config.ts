/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Bắt buộc để xuất static 
  basePath: '/nhom10_bookstationtest', // 
  images: { unoptimized: true }, // Giúp ảnh hiển thị được trên GitHub Pages
};

export default nextConfig;