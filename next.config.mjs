/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "vaiasaparts.ro" },
      { protocol: "https", hostname: "www.vaiasaparts.ro" },
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
