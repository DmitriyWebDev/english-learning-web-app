import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import os from 'os';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { WEBPACK_COMMON_SETTINGS } from './webpack-common-settings';
import common from './webpack.common';

const { BUILD_DIR_PATH, COMMON_WEBPACK_PLUGINS } = WEBPACK_COMMON_SETTINGS;

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27570#issuecomment-474628163
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  ...common,
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    client: {
      overlay: false,
    },
    historyApiFallback: true,
    hot: true,
    static: {
      directory: BUILD_DIR_PATH,
    },
    port: 4447,
  },
  cache: {
    type: 'filesystem',
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: os.cpus().length - 1,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.module.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              import: true,
              importLoaders: 2,
              sourceMap: true,
              modules: {
                auto: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(scss)$/,
        exclude: /\.module.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          'css-hot-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: './img/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: './fonts/[name].[hash].[ext]',
        },
      },
    ],
  },
  plugins: [
    ...COMMON_WEBPACK_PLUGINS,
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
};

export default config;
