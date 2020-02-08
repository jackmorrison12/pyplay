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
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: 'style-loader',
              options: { injectType: 'singletonStyleTag' },
            },
            'css-loader'
          ],
        }
      ]
    }
};

