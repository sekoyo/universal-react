import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Users from './components/Users'
import isClient from './utils/isClient'
import getPropsFromRoute from './utils/getPropsFromRoute'

function onRouteChange(nextState) {
	if (isClient) {
		let props = getPropsFromRoute(nextState, ['pageTitle']);
		document.title = props.pageTitle;
	}
}

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Home} onEnter={onRouteChange} />
		<Route path='users' component={Users} onEnter={onRouteChange} />
	</Route>
);