import assign from 'object-assign';

import {
	USERS_FETCHING,
	USERS_FETCHED,
	USERS_FETCH_FAILED
} from '../actions/users';

export default function users(state = {
	list: null
}, action) {
	switch (action.type) {
		case USERS_FETCHING:
		case USERS_FETCH_FAILED:
			return assign({}, state, {
				list: null
			});
		case USERS_FETCHED:
			return assign({}, state, {
				list: action.result
			});
		default:
			return state;
	}
}