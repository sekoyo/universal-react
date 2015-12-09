import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { dispatch } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';

class User extends Component {

	static readyOnActions(dispatch, location, params) {
		console.log('params:', params);
		return [
			() => dispatch(UserActions.fetchUser(params.id))
		];
	}

	componentDidMount() {
		if (!this.props.user.user) {
			this.props.fetchUser();
		}
	}

	renderUsers() {
		// if (this.props.users.list) {
		// 	return (
		// 		<ul>
		// 			{this.props.users.list.map(user => {
		// 				return <li key={user.id}>{user.name}</li>
		// 			})}
		// 		</ul>
		// 	);
		// } else {
		// 	return (
		// 		<p>Fetching...</p>
		// 	);
		// }
	}

	render() {
		return (
			<div>
				<Helmet
					title='User'
					meta={[
						{'name': 'description', 'content': 'A list of our users'}
					]}
				/>
				<h5>Users:</h5>
				{this.renderUsers()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUser: (userId) => dispatch(UserActions.fetchUser(userId))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User);