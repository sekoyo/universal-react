import fetch from 'isomorphic-fetch';

export const USERS_FETCHING = 'USERS_FETCHING';
export const USERS_FETCHED = 'USERS_FETCHED';
export const USERS_FETCH_FAILED = 'USERS_FETCH_FAILED';

function requestUsers() {
	return fetch('http://jsonplaceholder.typicode.com/users')
		.then(response => {
			return response.json()
		});
}

export function fetchUsers() {
	return (dispatch) => {
		dispatch({ type: USERS_FETCHING });

		return requestUsers().then(
			result => dispatch({ type: USERS_FETCHED, result }),
			error => dispatch({ type: USERS_FETCH_FAILED, error })
		);
	}
}