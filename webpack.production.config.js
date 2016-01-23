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
	entry: './app/index',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.min.js'
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
		})
	],
	module: {
		loaders: [{
			test: /\.js?$/,
			loader: 'babel',
			include: path.join(__dirname, 'app'),
			query: {
				plugins: [
					['transform-object-assign']
				]
			}
		}]
	}
};