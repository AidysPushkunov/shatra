/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    /**
     * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
     * Module parse failed: Unexpected character '�' (1:0)" error
     */
    config.resolve.alias.canvas = false;

    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work
    return config;
  },
};

module.exports = nextConfig;
