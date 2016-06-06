export const USERS_INVALID = 'USERS_INVALID';
export const USERS_FETCHING = 'USERS_FETCHING';
export const USERS_FETCHED = 'USERS_FETCHED';
export const USERS_FETCH_FAILED = 'USERS_FETCH_FAILED';

function fetchUsers() {
  return (dispatch) => {
    dispatch({ type: USERS_FETCHING });

    return fetch('http://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then(
        (result) => dispatch({ type: USERS_FETCHED, result }),
        (error) => dispatch({ type: USERS_FETCH_FAILED, error })
      );
  }
}

function shouldFetchUsers(state) {
  const users = state.users;

  if (!users.list ||
    users.readyState === USERS_FETCH_FAILED ||
    users.readyState === USERS_INVALID) {
    return true;
  }

  return false;
}

export function fetchUsersIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchUsers(getState())) {
      return dispatch(fetchUsers());
    }
  }
}
