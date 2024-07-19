const webpack = require('webpack')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config, { isServer, nextRuntime }) => {
    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === 'nodejs') config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ }))
    return config
  }
}

module.exports = nextConfig
