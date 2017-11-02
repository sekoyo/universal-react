import 'cross-fetch/polyfill';

export serverMiddleware from './Router';

if (module.hot) {
  module.hot.accept();
}
