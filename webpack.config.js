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
      'DBIP': JSON.stringify(process.env.DBIP || '104.131.147.199'),
      'DBPORT': JSON.stringify(process.env.DBPORT || 5000),
      'SOCKETIP': JSON.stringify(process.env.SOCKETIP || '104.131.147.199'),
      'SOCKETPORT': JSON.stringify(process.env.SOCKETPORT || 5500),
      'AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID || 'qjGwtKBFdcc0chj52rGul3p3nEa0LW3J'),
      'AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN || 'saivickna.auth0.com'),
    }),
  ]
};