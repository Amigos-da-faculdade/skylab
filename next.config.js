/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/inicio",
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fknnohbmtwswixyfkuvc.supabase.co",
      },
    ],
  },
}

module.exports = nextConfig
