import React from 'react'
import Fetch from 'isomorphic-fetch'
import getInitialData from '../utils/getInitialData'

class Users extends React.Component {

	static pageTitle = 'MyApp - Users'

	static meta = [{
		name: 'description',
		content: 'A list of our users'
	}]

	static requestForProps() {
		return fetch('http://jsonplaceholder.typicode.com/users')
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			})
	}

	constructor(props) {
		super(props);

		console.log('userData:', props);

		// let userData = getInitialData();

		// console.log('userData', userData);

		// if (userData) {
		// 	this.state = {
		// 		users: userData
		// 	}			
		// } else {
		// 	Users.requestForProps().then(users => {
		// 		this.setState({
		// 			users: users
		// 		});
		// 	}.bind(this));
		// }

	}

	render() {
		// {this.state.users.map(user => {
		// 	<ul>
		// 		<li>{user.name}</li>
		// 	</ul>
		// })}
		return (
			<div>
				<h5>Users:</h5>
			</div>
		)
	}
}

export default Users;