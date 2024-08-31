const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.maretol.xyz']
  }
}

module.exports = withBundleAnalyzer(nextConfig)
