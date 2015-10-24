import React, { Component, PropTypes } from 'react'
import Fetch from 'isomorphic-fetch'
import isClient from '../utils/isClient'

class Users extends Component {

	static pageTitle = 'MyApp - Users'

	static meta = [{
		name: 'description',
		content: 'A list of our users'
	}]

	static contextTypes = {
		getInitialData: PropTypes.func
	}

	static requestState() {
		return fetch('http://jsonplaceholder.typicode.com/users')
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			})
	}

	constructor(props, context) {
		super(props, context);

		if (!context.getInitialData(this)) {
			Users.requestState().then(users => {
				this.setState({ users: users });
			});
		}

		this.state = {
			users: context.getInitialData(this)
		}
	}

	renderUsers() {
		if (this.state.users) {
			return (
				<ul>
					{this.state.users.map(user => {
						return <li key={user.id}>{user.name}</li>;
					})}
				</ul>
			)
		} else {
			return (
				<p>Fetching...</p>
			);
		}
	}

	render() {
		return (
			<div>
				<h5>Users:</h5>
				{this.renderUsers()}
			</div>
		)
	}
}

export default Users;