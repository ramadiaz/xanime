/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        
        remotePatterns: [
            {
                hostname: "cdn.myanimelist.net"
            },
            {
                hostname: "drive.google.com"
            },
            {
                hostname: "api.github.com"
            },
            {
                hostname: "avatars.githubusercontent.com"
            },
            {
                hostname: "ramadiaz.github.com"
            }
        ]
    }
}

module.exports = nextConfig
