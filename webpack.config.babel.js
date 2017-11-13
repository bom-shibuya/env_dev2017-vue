'use strict';
/*
    ██╗    ██╗███████╗██████╗ ██████╗  █████╗  ██████╗██╗  ██╗
    ██║    ██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
    ██║ █╗ ██║█████╗  ██████╔╝██████╔╝███████║██║     █████╔╝
    ██║███╗██║██╔══╝  ██╔══██╗██╔═══╝ ██╔══██║██║     ██╔═██╗
    ╚███╔███╔╝███████╗██████╔╝██║     ██║  ██║╚██████╗██║  ██╗
      ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 */


/**
 * ::::: REQUIRE MODULES ::::::::::::::::::::::::::::::
 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Path = require('path');

/**
 * ::::: DIRECTORY PATH ::::::::::::::::::::::::::::::
 */
const DIR_BASE = {
  src: 'app/src/',
  dest: 'app/dest/'
};

const DIR = {
  src: `./${DIR_BASE.src}`,
  src$: Path.resolve(__dirname, DIR_BASE.src),
  dest: `./${DIR_BASE.dest}`,
  dest$: Path.resolve(__dirname, DIR_BASE.dest)
};

/**
 * ::::: COMMON CONFIG ::::::::::::::::::::::::::::::
 */

const commonConfig = {
  entry: `./${DIR_BASE.src}`,
  output: {
    path: DIR.dest$,
    publicPath: '',
    filename: 'bundle.js'
  },
  // ファイル名解決のための設定
  resolve: {
    // 拡張子の省略
    extensions: ['.js'],
    // moduleのディレクトリ指定
    modules: ['node_modules'],
    // プラグインのpath解決
    alias: {
      modernizr$: Path.resolve(__dirname, '.modernizrrc'),
      ScrollToPlugin: 'gsap/ScrollToPlugin.js',
      EasePack: 'gsap/EasePack.js',
      vue$: 'vue/dist/vue.esm.js'
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
                  Path.resolve(
                    __dirname,
                    'app/src/styles/variables/**/*.sass'
                  ),
                  Path.resolve(
                    __dirname,
                    'app/src/styles/mixins/**/*.sass'
                  ),
                  Path.resolve(
                    __dirname,
                    'node_modules/tokyo-shibuya-reset/_reset.sass'
                  ),
                  Path.resolve(
                    __dirname,
                    'app/src/styles/presets/_preset.sass'
                  )
                ]
              }
            }
          },
          cssSourceMap: true,
          extractCSS: true
        }
      }
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
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true
    })
  ],
  devServer: {
    contentBase: DIR.dest$,
    historyApiFallback: true,
    compress: true,
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
