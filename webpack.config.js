const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  let isProduction;
  process.env.NODE_ENV === "production"
    ? (isProduction = true)
    : (isProduction = false);

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    devtool: isProduction ? false : "inline-source-map",
    devServer: {
      port: 3010,
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Phototagging",
        template: "./src/template.html",
      }),
      new MiniCssExtractPlugin(),
      new Dotenv(),
    ],
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          include: path.resolve(__dirname, "src"),
          sideEffects: true,
          use: [
            isProduction
              ? {
                  loader: MiniCssExtractPlugin.loader,
                }
              : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
};
