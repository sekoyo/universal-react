import assign from 'object-assign';

import {
	USER_FETCHING,
	USER_FETCHED,
	USER_FETCH_FAILED
} from '../actions/user';

export default function user(state = {
	user: null
}, action) {
	switch (action.type) {
		case USER_FETCHING:
		case USER_FETCH_FAILED:
			return assign({}, state, {
				user: null
			});
		case USER_FETCHED:
			return assign({}, state, {
				user: action.result
			});
		default:
			return state;
	}
}