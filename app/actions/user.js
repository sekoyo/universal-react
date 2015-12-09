import fetch from 'isomorphic-fetch';

export const USER_FETCHING = 'USER_FETCHING';
export const USER_FETCHED = 'USER_FETCHED';
export const USER_FETCH_FAILED = 'USER_FETCH_FAILED';

function requestUser(userId) {
	return fetch(`http://jsonplaceholder.typicode.com/user/${userId}`)
		.then(response => {
			return response.json()
		});
}

export function fetchUser(userId) {
	return (dispatch) => {
		dispatch({ type: USER_FETCHING });

		return requestUser(userId).then(
			result => dispatch({ type: USER_FETCHED, result }),
			error => dispatch({ type: USER_FETCH_FAILED, error })
		);
	}
}