const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

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

const babelUse = (preset) => {
  const useProp = {
    loader: "babel-loader",
    options: {
      presets: ['@babel/preset-env']
    }
  }
  if (preset) {
    useProp.options.presets.push(preset)
  }
  return useProp
}

const jsLoaders = () => {
  const loaders = [
    babelUse()
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders
}

const plugins = () => {
  const base = [
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
  ]
  if (isProd) {
    base.push(new BundleAnalyzerPlugin())
  }
  return base
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry:{
    main: ['@babel/polyfill', './index.jsx'],
    analytics: './analytics.ts',
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
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: plugins(), //===</Plugins>===

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
        use: jsLoaders(),
      },
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: babelUse('@babel/preset-typescript'),
      },
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: babelUse('@babel/preset-react'),
      },
    ]
  }
}


