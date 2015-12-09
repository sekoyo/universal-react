import { combineReducers } from 'redux';
import resetStore from './resetStore';
import users from './users';

export default combineReducers({
	resetStore,
	users
});