import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');

export default {
  entry: {
    index: '../src/index.js'
    account: '../src/account.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: path.resolve(__dirname, '../public'),
    filename: isDebug ? '[name.js]' : '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|browser_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['env', {
                browser: ["last 2 versions", "safari >= 7"]
              }],
              'stage-2',
              'react'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Account',
      chunks: ['account']
    }),

    new HtmlWebpackPlugin({
      title: 'Index',
      chunks: ['index']
    })
  ],

  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    hash: isVerbose,
    modules: isVerbose,
    reasons: isDebug,
    timings: true,
    version: isVerbose
  }
}
