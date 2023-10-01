import { Configuration } from 'webpack';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WEBPACK_COMMON_SETTINGS } from './webpack-common-settings';

/** Important for Github actions deployment - https://github.com/vercel/next.js/discussions/21844 */

const { APP_DIR_PATH, BUILD_DIR_PATH, RESOLVE_SETTING_VALUE, COMMON_WEBPACK_PLUGINS } = WEBPACK_COMMON_SETTINGS;

const config: Configuration = {
  entry: [APP_DIR_PATH + '/app.tsx'],
  output: {
    path: BUILD_DIR_PATH,
    filename: 'bundle.[fullhash].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.module.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-hot-loader',
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
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [autoprefixer({ browsers: ['ie >= 10', 'last 4 version'] })] } },
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
            loader: MiniCssExtractPlugin.loader,
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
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [autoprefixer({ browsers: ['ie >= 10', 'last 4 version'] })] } },
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
            loader: MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
  ],
  resolve: RESOLVE_SETTING_VALUE,
};

export default config;
