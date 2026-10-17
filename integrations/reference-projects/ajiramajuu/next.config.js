/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  // Aliases for URLs named in the brief / commonly typed, so no old or
  // expected link 404s. Existing routes are untouched.
  async redirects() {
    return [
      { source: "/destinations/united-arab-emirates", destination: "/destinations/uae", permanent: true },
      { source: "/candidate-safety", destination: "/recruitment-safety", permanent: true },
      { source: "/jobs/house-driver-qatar", destination: "/jobs/house-drivers-qatar", permanent: true },
      { source: "/jobs/house-help-qatar", destination: "/jobs/house-help-first-time-qatar", permanent: false },
      { source: "/recruitment-agencies-kenya", destination: "/recruitment-agency-kenya", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
