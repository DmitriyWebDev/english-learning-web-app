import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const config: Configuration = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: () => false,
      }),
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
});

export default config;
