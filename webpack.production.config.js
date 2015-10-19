'use strict';

var path = require('path');
var webpack = require('webpack');
var del = require('del');

class CleanPlugin {
	constructor(options) {
		this.options = options;
	}

	apply () {
		del.sync(this.options.files);
	}
}

module.exports = {
	entry: [
		path.join(__dirname, 'app/index.js')
	],
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: 'bundle.min.js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new CleanPlugin({
			files: ['dist/*']
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				screw_ie8: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	],
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel?cacheDirectory'
		}]
	}
};