import React, { PropTypes } from 'react';

const UserCard = ({ user }) => (
  <ul>
    <li>Name: {user.name}</li>
    <li>Username: {user.username}</li>
    <li>Email: {user.email}</li>
    <li>Phone: {user.phone}</li>
    <li>Website: {user.website}</li>
  </ul>
);

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
