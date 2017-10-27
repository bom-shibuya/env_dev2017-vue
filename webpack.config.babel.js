'use strict';
/*
    ██╗    ██╗███████╗██████╗ ██████╗  █████╗  ██████╗██╗  ██╗
    ██║    ██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
    ██║ █╗ ██║█████╗  ██████╔╝██████╔╝███████║██║     █████╔╝
    ██║███╗██║██╔══╝  ██╔══██╗██╔═══╝ ██╔══██║██║     ██╔═██╗
    ╚███╔███╔╝███████╗██████╔╝██║     ██║  ██║╚██████╗██║  ██╗
      ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 */

// require webpack && plugins
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const Path = require('path');
// const DirectoryManager = require('./DirectoryManager.js');

const DIR = {
  src: './app/src/',
  src_assets: './app/src/assets/',
  dest: './app/dest/',
  dest_assets: './app/dest/assets/'
}

const commonConfig = {
  entry: ['./app/src/assets/js/script.js', './app/src/assets/sass/style.css'],
  output: {
    path: Path.resolve(__dirname, 'app/dest'),
    publicPath: 'app/dest',
    filename: '[name].js'
  },
  // ファイル名解決のための設定
  resolve: {
    // 拡張子の省略
    extensions: ['.js'],
    // moduleのディレクトリ指定
    modules: ['node_modules'],
    // プラグインのpath解決å
    alias: {
      'modernizr$': Path.resolve(__dirname, '.modernizrrc'),
      'ScrollToPlugin': Path.resolve(__dirname, 'node_modules/gsap/ScrollToPlugin.js'),
      'EasePack': Path.resolve(__dirname, 'node_modules/gsap/EasePack.js'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  // モジュール
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.modernizrrc$/,
        loader: 'modernizr-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: {
            config: {
              path: Path.resolve('./')
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          loader: 'css-loader!postcss-loader'
      })
      }
    ]
  },
  // プラグイン
  plugins: [
    // ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する
    new webpack.optimize.AggressiveMergingPlugin(),
    // jQueryをグローバルに出す
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // html
    // new HtmlWebpackPlugin(),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'bundle.css'
  })
  ],
  devServer: {
    contentBase: Path.resolve(__dirname, 'app/dest'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 3000
  }
};

// for development Config
// const devConfig = {
//   ...commonConfig,
//   devtool: 'cheap-module-source-map'
// };

// for production Config
// const prodConfig = {...commonConfig,
//   plugins: [...commonConfig.plugins, new webpack.optimize.UglifyJsPlugin()]
// };


// module.exports = {
//   dev: devConfig,
//   prod: prodConfig
// };

module.exports = commonConfig;
