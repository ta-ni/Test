'use strict';
const args = require('minimist')(process.argv.slice(2));
const path = require('path');

const srcPath = path.join(__dirname, '../src');
const publicPath = '/assets/';
// List of allowed environments
const allowedEnvs = ['local' , ''];

let env = 'local';

if (args.env && allowedEnvs.indexOf(args.env) !== -1) {
  env = args.env;
}

module.exports = {
  cache: false,
  devServer: {
    contentBase: './src/',
    compress: true,
    clientLogLevel: 'error',
    hot: true,
    publicPath: publicPath,
    historyApiFallback: true,
    stats: {
      chunks: false,
      modules: false,
      colors: true,
      children: false,
      errorDetails: true
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions: `${srcPath}/actions`,
      reducers: `${srcPath}/reducers`,
      components: `${srcPath}/components`,
      sources: `${srcPath}/sources`,
      stores: `${srcPath}/stores`,
      styles: `${srcPath}/styles`,
      routes: `${srcPath}/routes`,
      node_modules: path.join(__dirname, '../node_modules'),
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [].concat([srcPath]),
        options: {
          failOnWarning: true,
          failOnError: true,
          emitErrors: true,
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [].concat([srcPath])
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  }
};
