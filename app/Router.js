'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { createHistory } from 'history'
import { Router, match, RoutingContext } from 'react-router'
import Routes from './Routes'
import Root from './components/Root'
import isClient from './utils/isClient'
import getPropsFromRoute from './utils/getPropsFromRoute'

if (isClient) {
	ReactDOM.render(
		<Router history={createHistory()}>{Routes}</Router>,
		document.getElementById('root')
	)
}

function handle404(res) {
	res.status(404).send('Not found');
}

function handleError(res, error) {
	res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
	res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function handleRoute(res, renderProps) {
	const isDeveloping = process.env.NODE_ENV !== 'production' ? true : false;
	let extraProps = getPropsFromRoute(renderProps, ['pageTitle', 'meta', 'requestForProps']);

	function renderPage(response) {

		// console.log('renderProps:', renderProps);
		// renderProps.params.initialData = response;

		let content = renderToStaticMarkup(<RoutingContext {...renderProps} />);
		let responseStr = response ? JSON.stringify(response) : null;

		let wholeHtml = renderToStaticMarkup(
			<Root development={isDeveloping} content={content} initialData={responseStr} {...extraProps} />
		);

		res.status(200).send(wholeHtml);
	}

	if (extraProps.requestForProps) {
		extraProps.requestForProps().then(renderPage);
	} else {
		renderPage();
	}
}

function AppRouter(req, res) {
	match({ routes: Routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			handle404(error);
		} else if (res, redirectLocation) {
			handleRedirect(res, redirectLocation)
		} else if (renderProps) {
			handleRoute(res, renderProps);
		} else {
			handle404(res);
		}
	})
}

export default AppRouter;