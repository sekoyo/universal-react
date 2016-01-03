import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { dispatch } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';

// @connect(state => { user: state.user })
class User extends Component {

	static readyOnActions(dispatch, location, params) {
		return [
			() => dispatch(UserActions.fetchUserIfNeeded(params.id))
		];
	}

	constructor(props) {
		super(props);

		const { dispatch, location, params } = this.props;

		User.readyOnActions(dispatch, location, params)
			.forEach(action => action());
	}

	getUser() {
		return this.props.user[this.props.params.id];
	}

	getPageTitle() {
		const user = this.getUser();
		
		if (!user || user.readyState !== UserActions.USER_FETCHED) {
			return 'User';
		}

		return user.data.name;
	}

	renderUser() {
		const user = this.getUser();

		if (!user || user.readyState === UserActions.USER_FETCHING) {
			return (
				<p>Fetching...</p>
			);
		}

		if (user.readyState === UserActions.USER_FETCH_FAILED) {
			return (
				<p>Failed to fetch user</p>
			);
		}

		return (
			<ul>
				<li>Name: {user.data.name}</li>
				<li>Email: {user.data.email}</li>
			</ul>
		);
	}

	render() {
		return (
			<div>
				<Helmet
					title={this.getPageTitle()}
					meta={[
						{'name': 'description', 'content': 'User Profile'}
					]}
				/>
				{this.renderUser()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps)(User);