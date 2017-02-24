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
  },
  plugins: [
    new webpack.DefinePlugin({
      'DBIP': JSON.stringify(process.env.DBIP || 'localhost'),
      'DBPORT': JSON.stringify(process.env.DBPORT || 5000),
      'SOCKETIP': JSON.stringify(process.env.SOCKETIP || 'locahost'),
      'SOCKETPORT': JSON.stringify(process.env.SOCKETPORT || 5500)
    }),
  ]
};