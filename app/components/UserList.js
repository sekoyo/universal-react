import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.id}>
        <Link to={`user/${user.id}`}>{user.name}</Link>
      </li>
    ))}
  </ul>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default UserList;
