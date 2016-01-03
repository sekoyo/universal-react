import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as UsersActions from '../actions/users';
import LoadingIndicator from '../components/LoadingIndicator';

// @connect(state => { users: state.users })
class Home extends Component {

	static readyOnActions(dispatch, location, params) {
		return [
			() => dispatch(UsersActions.fetchUsersIfNeeded())
		];
	}

	componentWillMount() {
		const { dispatch, location, params } = this.props;
		
		Home.readyOnActions(dispatch, location, params)
			.forEach(action => action());
	}

	renderUsers() {
		const users = this.props.users;

		if (users.readyState === UsersActions.USERS_INVALID ||
			users.readyState === UsersActions.USERS_FETCHING) {
			return <LoadingIndicator />;
		}

		if (users.readyState === UsersActions.USERS_FETCH_FAILED) {
			return (
				<p>Failed to fetch users</p>
			);
		}

		return (
			<ul>
				{users.list.map(user => {
					return (
						<li key={user.id}>
							<Link to={`user/${user.id}`}>{user.name}</Link>
						</li>
					);
				})}
			</ul>
		);
	}

	render() {
		return (
			<div>
				<Helmet title='Home' />
				<h5>Users:</h5>
				{this.renderUsers()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		users: state.users
	};
}

export default connect(mapStateToProps)(Home);