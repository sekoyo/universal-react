import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router, match, RouterContext, browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import routes from './Routes';
import { Provider } from 'react-redux';
import Root from './containers/Root';
import NoMatch from './containers/NoMatch';
import configureStore from './configureStore';

const isClient = typeof document !== 'undefined';

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
		<Root content={componentHtml} initialState={initialState} head={head} />
	);
}

function handleError(res, error) {
	res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
	res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function handleRoute(res, renderProps, store) {
	const readyOnAllActions = renderProps.components
		.filter((component) => component.readyOnActions)
		.map((component) => component.readyOnActions(store.dispatch, renderProps.params));

	Promise
		.all(readyOnAllActions)
		.then(() => res.status(200).send(renderComponentWithRoot(RouterContext, renderProps, store)));
}

function handle404(res, store) {
	res.status(404).send(renderComponentWithRoot(NoMatch, null, store));
}

function serverMiddleware(req, res) {
	const store = configureStore();

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			handleError(error);
		} else if (redirectLocation) {
			handleRedirect(res, redirectLocation);
		} else if (renderProps) {
			handleRoute(res, renderProps, store);
		} else {
			handle404(res, store);
		}
	});
}

export default serverMiddleware;
