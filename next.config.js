/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "cdn.myanimelist.net"
            },
            {
                hostname: "drive.google.com"
            },
            {
                hostname: "ramadiaz.github.com"
            }
        ]
    }
}

module.exports = nextConfig
