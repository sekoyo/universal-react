'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { createHistory } from 'history';
import { Router, match, RoutingContext } from 'react-router';
import Routes from './Routes';
import Root from './components/Root';

function isClient() {
	return typeof document !== 'undefined';
}

if (isClient()) {
	ReactDOM.render(
		<Router history={createHistory()}>{Routes}</Router>,
		document.getElementById('root')
	);
}

function AppRouter(req, res) {
	let isDeveloping = process.env.NODE_ENV !== 'production' ? true : false;

	match({ routes: Routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			// console.log('renderProps:', renderProps);
			let content = renderToStaticMarkup(<RoutingContext {...renderProps} />);
			let wholeHtml = renderToStaticMarkup(<Root development={isDeveloping} title="Home" content={content} />);
			res.status(200).send(wholeHtml);
		} else {
			res.status(404).send('Not found');
		}
	});
}

export default AppRouter;