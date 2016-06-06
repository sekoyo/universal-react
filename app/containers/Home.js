import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as UsersActions from '../actions/users';
import UserList from '../components/UserList';

// @connect(state => { users: state.users })
class Home extends Component {

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(UsersActions.fetchUsersIfNeeded())
    ]);
  }

  componentDidMount() {
    Home.readyOnActions(this.props.dispatch);
  }

  renderUsers() {
    const users = this.props.users;

    if (users.readyState === UsersActions.USERS_INVALID ||
      users.readyState === UsersActions.USERS_FETCHING) {
      return <p>Loading...</p>;
    }

    if (users.readyState === UsersActions.USERS_FETCH_FAILED) {
      return <p>Failed to fetch users</p>;
    }

    return <UserList users={users.list} />;
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
