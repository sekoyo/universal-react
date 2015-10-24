'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { createHistory } from 'history'
import { Router, match, RoutingContext } from 'react-router'
import Routes from './Routes'
import Provider from './Provider'
import Root from './components/Root'
import NoMatch from './components/NoMatch'
import isClient from './utils/isClient'
import getPropsFromRoute from './utils/getPropsFromRoute'

if (isClient) {
	ReactDOM.render(
		<Provider>
			<Router history={createHistory()}>{Routes}</Router>
		</Provider>,
		document.getElementById('root')
	);
}

function getContentWithRoot(content, rootProps, initialData) {
	return renderToStaticMarkup(
		<Root content={content} initialData={initialData} {...rootProps} />
	);
}

function getComponentContent(Component, props, initialData) {
	return renderToStaticMarkup(
		<Provider initialData={initialData}> 
			<Component {...props} />
		</Provider>
	);
}

function handle404(res) {
	const content = getComponentContent(NoMatch);
	const wholeHtml = getContentWithRoot(content, {
		meta: NoMatch.meta,
		pageTitle: NoMatch.pageTitle
	});

	res.status(404).send(wholeHtml);
}

function handleError(res, error) {
	res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
	res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function handleRoute(res, renderProps) {

	const isDeveloping = process.env.NODE_ENV !== 'production' ? true : false;
	const routeProps = getPropsFromRoute(renderProps, ['pageTitle', 'meta', 'requestState']);

	function renderPage(response) {

		const content = getComponentContent(RoutingContext, renderProps, response);
		const wholeHtml = getContentWithRoot(content, routeProps, response);

		res.status(200).send(wholeHtml);
	}

	if (routeProps.requestState) {
		routeProps.requestState().then(renderPage);
	} else {
		renderPage();
	}
}

function ServerRouter(req, res) {

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
	});
}

export default ServerRouter;