import 'isomorphic-fetch';

if (CONFIG.mockApi) {
  require('./mocks');
}

export serverMiddleware from './Router';