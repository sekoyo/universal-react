import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import UserCard from '../components/UserCard';

class User extends PureComponent {

  static readyOnActions(dispatch, params) {
    return Promise.all([
      dispatch(UserActions.fetchUserIfNeeded(params.id)),
    ]);
  }

  componentDidMount() {
    User.readyOnActions(this.props.dispatch, this.props.params);
  }

  getUser() {
    return this.props.user[this.props.params.id];
  }

  renderUser() {
    const user = this.getUser();

    if (!user || user.readyState === UserActions.USER_FETCHING) {
      return <p>Loading...</p>;
    }

    if (user.readyState === UserActions.USER_FETCH_FAILED) {
      return <p>Failed to fetch user</p>;
    }

    if (user.readyState === UserActions.USER_FETCHED) {
      return (
        <div>
          <Helmet
            title={user.info.name || ''}
            meta={[
              { name: 'description', content: 'User Profile' },
            ]}
          />
          <UserCard user={user.info} />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderUser()}
      </div>
    );
  }
}

User.defaultProps = {
  user: null,
};

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({}),
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(User);
