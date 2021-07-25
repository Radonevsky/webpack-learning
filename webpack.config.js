const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require("webpack");
const {plugins} = require("@babel/preset-env/lib/plugins-compat-data");

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}

if (isDev) {
  // only enable hot in development
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry:{
    main: ['@babel/polyfill', './index.js'],
    analytics: './analytics.js',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: isProd
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }
      ]
  }),
  new MiniCssExtractPlugin({
    filename: filename('css')
  }),
  ], //===</Plugins>===


  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(?:|gif|png|jpg|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: () => {
            return isDev ? '[name][ext]' : '[name].[hash][ext]';
          }
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        generator: {
          filename: () => {
            return isDev ? '[name][ext]' : '[name].[hash][ext]';
          }
        }
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  }
}


