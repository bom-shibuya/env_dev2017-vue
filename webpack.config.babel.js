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
const sugarss = require('sugarss');

const DIR = {
  src: './app/src/',
  src_assets: './app/src/assets/',
  dest: './app/dest/',
  dest_assets: './app/dest/assets/'
}

const commonConfig = {
  entry: './app/src/assets/js/script.js',
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
    // プラグインのpath解決
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
          loaders: {
            sass: {
              loader: 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax!sass-resources-loader',
              options: {
                resources: [
                  Path.resolve(__dirname, 'app/src/assets/sass/libs/variables/**/*.sass'),
                  Path.resolve(__dirname, 'app/src/assets/sass/libs/mixins/**/*.sass'),
                  Path.resolve(__dirname, 'node_modules/tokyo-shibuya-reset/_reset.sass'),
                  Path.resolve(__dirname, 'app/src/assets/sass/libs/presets/_preset.sass')
                ]
              }
            }
          },
          cssSourceMap: true,
          extractCSS: true
        }
      }
      // },
      // {
      //   test: /\.sass$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           importLoaders: 1
      //         }
      //       },
      //       'postcss-loader',
      //       'sass-loader'
      //     ]
      // })
    ]
  },
  devtool: 'cheap-module-source-map',
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
      filename: 'bundle.css',
      allChunks: true
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
