import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import * as packageJson from './package.json';
import ESLintPlugin from 'eslint-webpack-plugin';

const APP_DIR_NAME = 'app';
const APP_DIR_PATH = path.join(__dirname, 'src', APP_DIR_NAME);
const BUILD_DIR_PATH = path.join(__dirname, 'public/static');

const FRONTEND_APP_VERSION = JSON.stringify(packageJson.version);

const RESOLVE_SETTING_VALUE = {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
};

const COMMON_WEBPACK_DEFINE_PLUGIN = new webpack.DefinePlugin({
  FRONTEND_APP_VERSION,
});
const COMMON_WEBPACK_PLUGINS = [
  new HtmlWebpackPlugin({
    inject: true,
    template: './public/index.html',
  }),
  new CopyWebpackPlugin({
    patterns: [{ from: './public/img', to: 'img' }],
  }),
  new ESLintPlugin({
    extensions: RESOLVE_SETTING_VALUE.extensions,
  }),
  COMMON_WEBPACK_DEFINE_PLUGIN,
];

export const WEBPACK_COMMON_SETTINGS = {
  APP_DIR_NAME,
  APP_DIR_PATH,
  BUILD_DIR_PATH,
  RESOLVE_SETTING_VALUE,
  COMMON_WEBPACK_DEFINE_PLUGIN,
  COMMON_WEBPACK_PLUGINS,
};
