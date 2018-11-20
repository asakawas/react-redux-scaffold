const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const CleanWebpackPlugin = require('clean-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const { CheckerPlugin } = require('awesome-typescript-loader');
// eslint-disable-next-line import/no-extraneous-dependencies
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const packageJson = require('./package.json');

const srcDir = 'src';
const outputDir = 'dist';
const projectName = packageJson.name;
const projectAuthor = packageJson.author;
const licenseName = packageJson.license;
const thisYear = new Date().getFullYear();
const copyright =
  thisYear === 2018
    ? `Copyright (C) 2018 ${projectAuthor}`
    : `Copyright (C) 2018 - ${thisYear} ${projectAuthor}`;
const banner = `${projectName} ${packageJson.version}
${packageJson.homepage}
This software is distributed under ${licenseName} license.
${copyright}`;

module.exports = {
  entry: [`./${packageJson.main}`],
  output: {
    path: path.resolve(__dirname, outputDir),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.resolve(__dirname, srcDir)],
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          configFile: './.eslintrc.js',
          failOnError: true,
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.resolve(__dirname, srcDir)],
        enforce: 'pre',
        loader: 'stylelint-custom-processor-loader',
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, srcDir)],
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, srcDir)],
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        include: [path.resolve(__dirname, 'node_modules')],
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner,
      raw: false,
      entryOnly: true,
    }),
    new CleanWebpackPlugin([outputDir]),
    new CheckerPlugin(),
    new HardSourceWebpackPlugin(),
  ],
};
