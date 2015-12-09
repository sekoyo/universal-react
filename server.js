require('babel-core/register')({
	stage: 0
});

require.extensions['.scss'] = function() {
	return;
};

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const server = express();

server.use(express.static(path.resolve(__dirname, 'dist')));

if (isDeveloping) {
	const compiler = webpack(config);

	server.use(webpackMiddleware(compiler, {
		publicpath: config.output.publicpath,
		contentBase: 'app',
		watch: true,
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	}));

	server.use(webpackHotMiddleware(compiler, {
		path: '/__webpack_hmr'
	}));
}

global.ENV = {
	mockApi: true
};

var app = require('./app');

console.log('app:', app);

server.get('*', app.serverMiddleware);

server.listen(port, 'localhost', function onStart(err) {
	if (err) {
		console.log(err);
	}
	console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});