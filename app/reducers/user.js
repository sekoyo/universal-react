import {
  USER_INVALID,
  USER_FETCHING,
  USER_FETCHED,
  USER_FETCH_FAILED
} from '../actions/user';

export default function user(state = {}, action) {
  switch (action.type) {
    case USER_FETCHING:
      return Object.assign({}, state, {
        [action.userId]: {
          readyState: USER_FETCHING
        }
      });
    case USER_FETCH_FAILED:
      return Object.assign({}, state, {
        [action.userId]: {
          readyState: USER_FETCH_FAILED,
          error: action.error
        }
      });
    case USER_FETCHED:
      return Object.assign({}, state, {
        [action.userId]: {
          readyState: USER_FETCHED,
          info: action.result
        }
      });
    default:
      return state;
  }
}
