import assign from 'object-assign';

import { RESET_STORE } from '../actions/resetStore';
import {
  USER_INVALID,
  USER_FETCHING,
  USER_FETCHED,
  USER_FETCH_FAILED
} from '../actions/user';

export default function user(state = {}, action) {
  switch (action.type) {
    case USER_FETCHING:
      return assign({}, state, {
        [action.userId]: {
          readyState: USER_FETCHING
        }
      });
    case USER_FETCH_FAILED:
      return assign({}, state, {
        [action.userId]: {
          readyState: USER_FETCH_FAILED,
          error: action.error
        }
      });
    case USER_FETCHED:
      return assign({}, state, {
        [action.userId]: {
          readyState: USER_FETCHED,
          data: action.result
        }
      });
    default:
      return state;
  }
}