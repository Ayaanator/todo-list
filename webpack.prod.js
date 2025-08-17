const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      __BUILD_ID__: JSON.stringify(Date.now()), // or use [fullhash] if you want
    }),
  ],
});