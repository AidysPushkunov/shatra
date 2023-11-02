/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work
    return config;
  },
};

module.exports = nextConfig;
