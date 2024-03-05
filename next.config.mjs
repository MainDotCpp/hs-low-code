
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config, {isServer}) => {
        return config;
    },
    sassOptions: {
        includePaths: [  "app"],
    }
};

export default nextConfig;
