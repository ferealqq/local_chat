import { get,post } from 'axios';
import { createAction } from './chat_actions';

export const REQUEST_CHANNELS = "REQUEST_CHANNELS";
export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";

export const SWITCH_CHANNEL = "SWITCH_CHANNEL";
export const CONNECT_DEFAULT = "CONNECT_DEFAULT";

function requestChannels(){
	return createAction(REQUEST_CHANNELS);
} 

function receiveChannels(channelData){
	return createAction(RECEIVE_CHANNELS,{ channels: channelData});
}

export function fetchChannels(){
	return (dispatch) => {
		dispatch(requestChannels());

		get('/channels')
			.then(res=>res.data)
			.then(data=>dispatch(receiveChannels(data)))
	};
}

