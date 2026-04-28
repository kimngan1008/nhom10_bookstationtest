/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Bắt buộc để deploy lên GitHub Pages 
  basePath: '/nhom10_bookstationtest', // Tên repository của bạn 
  images: {
    unoptimized: true, // Giúp hiển thị ảnh mà không cần server NextJS [cite: 1286]
  },
};

module.exports = nextConfig;