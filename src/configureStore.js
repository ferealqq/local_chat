import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import chatReducer from './chat_reducers';

export default function configureStore() {
	const middleware = [
		thunkMiddleware,
		logger,
	];

	return createStore(
		chatReducer,
		{},
		applyMiddleware(...middleware)
	)
}