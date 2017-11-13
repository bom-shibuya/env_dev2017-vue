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
 * ::::: NODE ENV ::::::::::::::::::::::::::::::
 */

const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';

/**
 * ::::: alias ::::::::::::::::::::::::::::::
 */

const alias = {
  modernizr$: Path.resolve(__dirname, '.modernizrrc'),
  ScrollToPlugin: 'gsap/ScrollToPlugin.js',
  EasePack: 'gsap/EasePack.js',
  vue$: 'vue/dist/vue.esm.js'
};


/**
 * ::::: RULE ::::::::::::::::::::::::::::::
 */

const sassSetting = {
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
};

const rules = [
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
          sass: sassSetting
        },
        cssSourceMap: ENV_DEVELOPMENT,
        extractCSS: ENV_PRODUCTION
      }
    }
];


/**
 * ::::: devtool ::::::::::::::::::::::::::::::
 */

const devtool = 'cheap-module-source-map';


/**
 * ::::: devserver ::::::::::::::::::::::::::::::
 */

const devServer = {
  contentBase: DIR.dest$,
  historyApiFallback: true,
  compress: true,
  port: 3000
};


/**
 * ::::: COMMON CONFIG ::::::::::::::::::::::::::::::
 */

const config = {
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
    alias: alias
  },
  // モジュール
  module: {
    rules: rules
  }
};

/**
 * ::::: DEVELOPMENT ::::::::::::::::::::::::::::::
 */

if (ENV_DEVELOPMENT) {
  config.devtool = devtool;
  config.devServer = devServer;
  config.plugins = [
    new webpack.optimize.AggressiveMergingPlugin()
  ];
}


/**
 * ::::: DEVELOPMENT ::::::::::::::::::::::::::::::
 */

if (ENV_PRODUCTION) {
  config.plugins = [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true
    })
  ];
}


/**
 * ::::: EXPORTS ::::::::::::::::::::::::::::::
 */

module.exports = config;
