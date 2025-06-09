import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Disable middleware to avoid Edge Runtime issues
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  // Set server components to use Node.js runtime
  serverComponentsExternalPackages: ['bcrypt'],
};

export default nextConfig;
