import { SEND_MESSAGE,RECEIVE_MESSAGE,RECEIVE_NAME,CHANGE_NAME,NEW_NOTIFICATION } from './chat_actions';
import { combineReducers } from 'redux'; 

function chatObjects(state = [],action){
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
						type: "msg"
					}
				];
		case NEW_NOTIFICATION:
			return [...state,{
				text: action.text,
				time: action.time, 
				type: "noti"
			}];		
		default:
			return state;
	}
};

function nameReducer(state = "",action){
	switch(action.type){
		case RECEIVE_NAME: 
			return state = action.name;
		case CHANGE_NAME:
			return state = action.name;
		default: return state;
	}
}

export default combineReducers({
	chatObjects: chatObjects,
	name: nameReducer,
});