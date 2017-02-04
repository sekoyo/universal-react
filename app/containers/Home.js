import React, { PropTypes, PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as UsersActions from '../actions/users';
import UserList from '../components/UserList';

class Home extends PureComponent {

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(UsersActions.fetchUsersIfNeeded()),
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
        <Helmet title="Home" />
        {this.renderUsers()}
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.shape({
    readyState: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Home);
