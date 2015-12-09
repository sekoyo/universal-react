import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { dispatch } from 'redux';
import { connect } from 'react-redux';
import * as UsersActions from '../actions/users';

class Home extends Component {

	static readyOnActions(dispatch) {
		return [
			() => dispatch(UsersActions.fetchUsers())
		];
	}

	componentDidMount() {
		if (!this.props.users.list) {
			this.props.fetchUsers();
		}
	}

	renderUsers() {
		if (this.props.users.list) {
			return (
				<ul>
					{this.props.users.list.map(user => {
						return (
							<li key={user.id}>
								<a href={`user/${user.id}`}>{user.name}</a>
							</li>
						);
					})}
				</ul>
			);
		} else {
			return (
				<p>Fetching...</p>
			);
		}
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

function mapDispatchToProps(dispatch) {
	return {
		fetchUsers: () => dispatch(UsersActions.fetchUsers())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);