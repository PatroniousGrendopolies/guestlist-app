import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Disable middleware to avoid Edge Runtime issues
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  // We've removed bcrypt from the project, so we don't need serverComponentsExternalPackages anymore
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
