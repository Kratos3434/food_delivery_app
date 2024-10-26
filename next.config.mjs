/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://99.252.98.97/:path*'
            }
        ]
    }
};

export default nextConfig;
