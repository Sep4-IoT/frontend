const webpack = require("webpack");

module.exports = {
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],
};
