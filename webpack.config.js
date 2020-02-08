const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./js/app.js",
    output: {
      path: path.resolve(__dirname, "static/js"),
      filename: "app.bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
};

