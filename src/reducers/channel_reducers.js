import { REQUEST_CHANNELS, RECEIVE_CHANNELS,SWITCH_CHANNEL,CONNECT_DEFAULT } from '../actions/channel_actions';

function channelReducer(state = {}, action){
	switch(action.type){
		case REQUEST_CHANNELS:
			return {
				...state,
				isFetching: true,
			}
		case RECEIVE_CHANNELS:
			return {
				...state,
				isFetching: false,
				channels: action.channels,
			}
		case SWITCH_CHANNEL:
			return {
				...state,

			}
		case CONNECT_DEFAULT:
			return {
				...state,
			}
		default:
			return state;
	}
}

export default channelReducer;