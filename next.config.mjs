/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" }
    ]
  },
  reactStrictMode: true,
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
