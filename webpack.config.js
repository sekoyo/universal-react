'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: '#source-map',
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
		path.join(__dirname, 'app/index.js')
	],
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				stage: 0,
				  "env": {
					// Only enable it when process.env.NODE_ENV is 'development' or undefined
					development: {
						plugins: ["react-transform"],
						extra: {
							'react-transform': {
								transforms: [{
									transform: 'react-transform-hmr',
									// If you use React Native, pass "react-native" instead:
									imports: ['react'],
									// This is important for Webpack HMR:
									locals: ['module']
								}]
							}
						}
					}
				}
			}
		}]
	}
};