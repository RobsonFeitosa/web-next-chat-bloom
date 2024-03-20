/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
 
  pageExtensions: ['page.tsx', 'middle.ts', 'api.ts', 'api.tsx'],
}

module.exports = nextConfig
