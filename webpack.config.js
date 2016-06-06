'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      include: path.join(__dirname, 'app'),
      query: {
        plugins: [
          ['react-transform', {
            'transforms': [{
              transform: 'react-transform-hmr',
              // If you use React Native, pass 'react-native' instead:
              imports: ['react'],
              // This is important for Webpack HMR:
              locals: ['module']
            }]
          }],
          ['transform-object-assign']
        ]
      }
    }]
  }
};
