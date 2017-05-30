import 'isomorphic-fetch';

export serverMiddleware from './Router';

if (module.hot) {
  module.hot.accept();
}
