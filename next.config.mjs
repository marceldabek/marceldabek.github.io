/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode (kept from original config)
  reactStrictMode: true,
  // Export a fully static site to the /out directory (for GitHub Pages)
  output: 'export',
  // Disable Next.js Image Optimization so <Image> works in static export & Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
