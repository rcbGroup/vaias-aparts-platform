/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" }
    ]
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/apartament-:n(\\d+)",
        destination: "/apartments/apartament-:n",
        permanent: true
      },
      {
        source: "/apartamente",
        destination: "/apartments",
        permanent: true
      },
      {
        source: "/apartamente/:slug*",
        destination: "/apartments/:slug*",
        permanent: true
      },
      {
        source: "/pachete",
        destination: "/packages",
        permanent: true
      },
      {
        source: "/toata-vila",
        destination: "/vila-completa",
        permanent: true
      },
      {
        source: "/vila-intreaga",
        destination: "/vila-completa",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
