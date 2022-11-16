/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_DEV_URL: process.env.NEXT_PUBLIC_API_DEV_URL,
    NEXT_PUBLIC_API_PROD_URL: process.env.NEXT_PUBLIC_API_PROD_URL
  }
}

module.exports = nextConfig
