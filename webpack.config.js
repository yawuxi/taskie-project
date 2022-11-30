const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerWebpackPlugin = require("html-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ESLintWebpackPlugin = require('eslint-webpack-plugin');


//getting mode, development or production
const mode = process.env.NODE_ENV === 'development'

module.exports = {
  //file i/o settings
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass']
  },

  //webpack settings
  mode: mode ? 'development' : 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        parallel: true,
      }),
      new CssMinimizerWebpackPlugin()
    ]
  },
  devtool: mode ? 'eval-source-map' : 'nosources-source-map',

  //dev server
  devServer: {
    port: 4250,
    historyApiFallback: true,
  },

  //loaders
  module: {
    rules: [

      //scss loaders
      {
        test: /.s[ac]ss/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },

      //js + jsx loaders
      {
        test: /.js$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader',
      },
      {
        test: /.jsx$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader',
      },

      //ts + tsx loaders
      {
        test: /.ts$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader'
      },
      {
        test: /.tsx$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader'
      },

      //image loader
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },

  // plugins
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, 'src/index.html'),
        },

        //Only for production
        mode ? undefined :
          {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          }
      )
    ),
    new CssMinimizerWebpackPlugin({
      minimizerOptions: {
        presets: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets')
        }
      ]
    }),
    new HtmlMinimizerWebpackPlugin(),
    new ESLintWebpackPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx',]
    }),
  ]
}
