/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  env: {
    BASE_URL: 'https://chatmate-dw88.onrender.com'
  }
}

module.exports = nextConfig
