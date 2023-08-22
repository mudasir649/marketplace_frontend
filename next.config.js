/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'eidcarosse.ch',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
