'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router, match, RouterContext, browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import routes from './routes';
import { Provider } from 'react-redux';
import Root from './containers/Root';
import NoMatch from './containers/NoMatch';
import { isClient, getPropsFromRoute } from './utils';
import configureStore from './configureStore';

if (isClient) {
	const store = configureStore(window.__INITIAL_STATE__);

	ReactDOM.render(
		<Provider store={store}>
			<Router history={browserHistory}>{routes}</Router>
		</Provider>,
		document.getElementById('root')
	);
}

function renderComponentWithRoot(Component, componentProps, store) {
	const componentHtml = renderToStaticMarkup(
		<Provider store={store}> 
			<Component {...componentProps} />
		</Provider>
	);

	const head = Helmet.rewind();
	const initialState = store.getState();

	return '<!doctype html>\n' + renderToStaticMarkup(
		<Root content={componentHtml} config={global.CONFIG} initialState={initialState} head={head} />
	);
}

function handle404(res) {
	const store = configureStore();
	const wholeHtml = renderComponentWithRoot(NoMatch, store);
	res.status(404).send(wholeHtml);
}

function handleError(res, error) {
	res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
	res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function handleRoute(res, renderProps) {
	const { readyOnActions } = getPropsFromRoute(renderProps, ['readyOnActions']);
	const { location, params } = renderProps;
	const store = configureStore();

	function renderPage() {
		const wholeHtml = renderComponentWithRoot(RouterContext, renderProps, store);
		res.status(200).send(wholeHtml);
	}

	if (readyOnActions) {
		const unwrappedActions = readyOnActions(store.dispatch, location, params)
			.map(action => action());
		Promise.all(unwrappedActions).then(renderPage);
	} else {
		renderPage();
	}
}

function serverMiddleware(req, res) {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			handleError(error);
		} else if (res, redirectLocation) {
			handleRedirect(res, redirectLocation);
		} else if (renderProps) {
			handleRoute(res, renderProps);
		} else {
			handle404(res);
		}
	});
}

export default serverMiddleware;