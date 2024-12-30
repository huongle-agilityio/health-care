/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'original-novelty-5db9244e3f.strapiapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
