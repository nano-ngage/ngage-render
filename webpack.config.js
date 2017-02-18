var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: "style!css"
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};