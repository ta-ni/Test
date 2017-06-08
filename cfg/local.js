const { resolve } = require('path');
const webpack = require('webpack');
let srcPath = resolve(__dirname, '../src');
module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
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
      node_modules: resolve(__dirname, '../node_modules'),
    }
  },
  output: {
    filename: 'app.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  context: resolve(__dirname, '../src'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, '../src'),
    publicPath: '/',
    historyApiFallback: true,
    stats: {
      chunks: false,
      modules: false,
      colors: true,
      children: false,
      errorDetails: true
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [{loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'postcss-loader'}]
      }, {
        test: /\.scss$/,
        use: ['style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
          'image-webpack-loader'
        ]
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
