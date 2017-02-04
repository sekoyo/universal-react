/* global window, document */
import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router, match, RouterContext, browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import routes from './Routes';
import Root from './containers/Root';
import configureStore from './configureStore';

const isClient = typeof document !== 'undefined';

if (isClient) {
  const store = configureStore(window.INITIAL_STATE);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('root'),
  );
}

function renderComponentWithRoot(Component, componentProps, store) {
  const componentHtml = renderToStaticMarkup(
    <Provider store={store}>
      <Component {...componentProps} />
    </Provider>,
  );

  const head = Helmet.rewind();
  const initialState = store.getState();
  const rootMarkup = renderToStaticMarkup(
    <Root content={componentHtml} initialState={initialState} head={head} />,
  );

  return `<!doctype html>\n${rootMarkup}`;
}

function handleError(res, error) {
  res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
  res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function routeIsUnmatched(renderProps) {
  return renderProps.routes[renderProps.routes.length - 1].path === '*';
}

function handleRoute(res, renderProps) {
  const store = configureStore();
  const status = routeIsUnmatched(renderProps) ? 404 : 200;
  const readyOnAllActions = renderProps.components
    .filter(component => component.readyOnActions)
    .map(component => component.readyOnActions(store.dispatch, renderProps.params));

  Promise
    .all(readyOnAllActions)
    .then(() => res.status(status)
      .send(renderComponentWithRoot(RouterContext, renderProps, store)));
}

function serverMiddleware(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      handleError(error);
    } else if (redirectLocation) {
      handleRedirect(res, redirectLocation);
    } else if (renderProps) {
      handleRoute(res, renderProps);
    } else {
      // This should actually never happen, as Routes.js has a catch-all '*' path.
      res.sendStatus(404);
    }
  });
}

export default serverMiddleware;
