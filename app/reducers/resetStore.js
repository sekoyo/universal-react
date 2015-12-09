import { RESET_STORE } from '../actions/resetStore';

export default function resetStore(state = {}, action) {
	switch (action.type) {
		case RESET_STORE:
			return {};
		default:
			return state
	}
}