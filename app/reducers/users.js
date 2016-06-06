import {
  USERS_INVALID,
  USERS_FETCHING,
  USERS_FETCHED,
  USERS_FETCH_FAILED
} from '../actions/users';

export default function users(state = {
  readyState: USERS_INVALID,
  list: null
}, action) {
  switch (action.type) {
    case USERS_FETCHING:
      return Object.assign({}, state, {
        readyState: USERS_FETCHING
      });
    case USERS_FETCH_FAILED:
      return Object.assign({}, state, {
        readyState: USERS_FETCH_FAILED,
        error: action.error
      });
    case USERS_FETCHED:
      return Object.assign({}, state, {
        readyState: USERS_FETCHED,
        list: action.result
      });
    default:
      return state;
  }
}
