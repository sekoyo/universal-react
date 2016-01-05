import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import User from './containers/User';
import NoMatch from './containers/NoMatch';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='user/:id' component={User} />
    <Route path="*" component={NoMatch} />
  </Route>
);