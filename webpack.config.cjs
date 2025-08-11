const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './iconPicker.js',
  output: {
    filename: 'iconPicker.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
    library: {
      type: 'module'
    },
    module: true
  },
  experiments: {
    outputModule: true
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.cjs')
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'webfonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: path.resolve(__dirname, 'dist', 'index.html'),
      inject: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'favicon.ico'),
          to: path.resolve(__dirname, 'dist', 'favicon.ico')
        },
        {
          from: path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'),
          to: path.resolve(__dirname, 'dist', 'webfonts')
        },
        {
          from: path.resolve(__dirname, 'fontawesome-free-all.json'),
          to: path.resolve(__dirname, 'dist', 'fontawesome-free-all.json')
        }
      ]
    })
  ],
  stats: {
    warnings: true
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 850000,
    maxEntrypointSize: 850000
  }
};