export const USER_INVALID = 'USER_INVALID';
export const USER_FETCHING = 'USER_FETCHING';
export const USER_FETCHED = 'USER_FETCHED';
export const USER_FETCH_FAILED = 'USER_FETCH_FAILED';

function fetchUser(userId) {
  return (dispatch) => {
    dispatch({ type: USER_FETCHING, userId: userId });

    return fetch('http://jsonplaceholder.typicode.com/users/' + userId)
      .then((response) => {
        return response.json();
      })
      .then(
        (result) => dispatch({ type: USER_FETCHED, userId: userId, result }),
        (error) => dispatch({ type: USER_FETCH_FAILED, userId: userId, error })
      );
  }
}

function shouldFetchUser(state, userId) {
  const user = state.user[userId];

  if (!user ||
    user.readyState === USER_FETCH_FAILED ||
    user.readyState === USER_INVALID) {
    return true;
  }

  return false;
}

export function fetchUserIfNeeded(userId) {
  return (dispatch, getState) => {
    if (shouldFetchUser(getState(), userId)) {
      return dispatch(fetchUser(userId));
    }
  }
}
