import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import routes from './routes';
import { isClient } from './utils';

let createStoreWithMiddleware;

if (isClient) {
	const loggerMiddleware = createLogger();

	createStoreWithMiddleware = applyMiddleware(
		loggerMiddleware,
		thunkMiddleware
	)(createStore);
} else {
	createStoreWithMiddleware = applyMiddleware(
		thunkMiddleware
	)(createStore);
}

export default function configureStore(initialState) {
	return createStoreWithMiddleware(rootReducer, initialState)
};
