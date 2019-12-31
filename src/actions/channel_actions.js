import { get,post } from 'axios';
import { createAction,handleIncomingMessage } from './chat_actions';
import { newWS } from '../handling_data';
import { find } from 'lodash';

export const REQUEST_CHANNELS = "REQUEST_CHANNELS";
export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";

export const CONNECT_CHANNEL = "CONNECT_CHANNEL";

function requestChannels(){
	return createAction(REQUEST_CHANNELS);
} 

function receiveChannels(channelData){
	return createAction(RECEIVE_CHANNELS,{ channelData: channelData});
}

export function connectDefault(){
	return dispatch => dispatch(connectChannel("default"))
}

export function connectChannel(channelName){
	return (dispatch,getState)=>{
		const state = getState();
		const port = find(state.channelReducer.channelData,{channel: channelName})?.port;
		console.log(port);
		if(!port) return;
		const channel = newWS(port);
		channel.onmessage = (event) =>{
			dispatch(handleIncomingMessage(event))
		}
		dispatch(createAction(CONNECT_CHANNEL,{channel: channel,name:channelName}));
	}
}

export function fetchChannels(){
	return (dispatch) => {
		dispatch(requestChannels());

		get('/channels')
			.then(res=>res.data)
			.then(data=>dispatch(receiveChannels(data)))
	};
}

