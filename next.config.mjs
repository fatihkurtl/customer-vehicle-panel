/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.freepik.com',
                pathname: '/512/4213/4213909.png',
            },
        ]
    }
};

export default nextConfig;
