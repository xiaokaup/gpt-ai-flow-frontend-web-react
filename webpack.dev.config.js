const { merge } = require('webpack-merge');
const base = require('./webpack.config.js');
const path = require('path');

const Dotenv = require('dotenv-webpack');

module.exports = merge(base, {
  mode: 'development',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    open: true,
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  devtool: 'cheap-source-map',
  plugins: [new Dotenv({ path: './.env', systemvars: true })],
});
