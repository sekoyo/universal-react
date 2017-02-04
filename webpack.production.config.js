const path = require('path');
const webpack = require('webpack');
const del = require('del');

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply() {
    del.sync(this.options.files);
  }
}

module.exports = {
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.min.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanPlugin({
      files: ['dist/*'],
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'app'),
    }],
  },
};
