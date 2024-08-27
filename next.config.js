/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    swcPlugins: [
        ["next-superjson-plugin", {}]
    ]
  },
  images: {
    domains: [
        "res.cloudinary.com",
        "avatars.githubsercontent.com",
        "lh3.googleusercontent.com",
        "i.pinimg.com",
    ]
  }
}

module.exports = nextConfig
