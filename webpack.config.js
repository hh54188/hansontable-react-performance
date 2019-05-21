const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.css/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  plugins: [new HtmlWebpackPlugin()]
};
