/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, options) => {
    // For building on vercel: https://github.com/Automattic/node-canvas/issues/1779
    if (
      process.env.LD_LIBRARY_PATH == null ||
      !process.env.LD_LIBRARY_PATH.includes(
        `${process.env.PWD}/node_modules/canvas/build/Release:`
      )
    ) {
      process.env.LD_LIBRARY_PATH = `${
        process.env.PWD
      }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ""}`;
    }
    /**
     * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
     * Module parse failed: Unexpected character '�' (1:0)" error
     */
    config.resolve.alias.canvas = false;

    // You may not need this, it's just to support moduleResolution: 'node16'
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
    };

    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work
    return config;
  },
};

module.exports = nextConfig;
