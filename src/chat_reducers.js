import { SEND_MESSAGE,RECEIVE_MESSAGE,RECEIVE_NAME } from './chat_actions';
import { combineReducers } from 'redux'; 

function messageReducer(state = [],action){
	switch(action.type){
		case SEND_MESSAGE:
			return state;
		case RECEIVE_MESSAGE: 
			return [
					...state,
					{
						msg: action.msg,
						name: action.name,
						time: action.time,
					}
				];
		default:
			return state;
	}
};

function nameReducer(state = "",action){
	switch(action.type){
		case RECEIVE_NAME: 
			return state = action.name;
		default: return state;
	}
}

export default combineReducers({
	messages: messageReducer,
	name: nameReducer
});