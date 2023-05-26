/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: 'https://chatmate-dw88.onrender.com'
  }
}

module.exports = nextConfig
