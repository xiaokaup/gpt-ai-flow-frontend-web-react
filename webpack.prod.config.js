const { merge } = require('webpack-merge');
const base = require('./webpack.config.js');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const Dotenv = require('dotenv-webpack');

module.exports = merge(base, {
  mode: 'production',
  target: 'web',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // 如果你需要 source map，请将此设置为 true
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new Dotenv({ path: './.env.prod', systemvars: true }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
});
