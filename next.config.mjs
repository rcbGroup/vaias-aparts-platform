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
  reactStrictMode: true
};

export default nextConfig;
