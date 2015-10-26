import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Users from './components/Users'
import NoMatch from './components/NoMatch'

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Home} />
		<Route path='users' component={Users} />
		<Route path="*" component={NoMatch} />
	</Route>
);