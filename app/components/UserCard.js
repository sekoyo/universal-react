import React, { Component } from 'react';

class UserCard extends Component {

	render() {
		const user = this.props.user;
		
		return (
			<ul>
				<li>Name: {user.name}</li>
				<li>Email: {user.email}</li>
			</ul>
		)
	}
}

export default UserCard;