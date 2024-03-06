/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    experimental: {
        serverActions: {
            allowedOrigins: [
                'http://localhost',
                'http://leuandev.xyz'
            ]
        }
    },
    sassOptions: {
        includePaths: ["app"],
    }
};

export default nextConfig;
