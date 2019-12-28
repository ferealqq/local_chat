import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import chatReducers from './reducers/chat_reducers';
import channelReducer from './reducers/channel_reducers';

export default function configureStore() {
	const middleware = [
		thunkMiddleware,
		logger,
	];
	const reducers = combineReducers({
		...chatReducers,
		channelReducer
	});
	return createStore(
		reducers,
		{},
		applyMiddleware(...middleware)
	)
}