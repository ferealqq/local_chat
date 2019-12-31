import { REQUEST_CHANNELS, RECEIVE_CHANNELS, CONNECT_CHANNEL } from '../actions/channel_actions';

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
				channelData: action.channelData,
			}
		case CONNECT_CHANNEL:
			return {
				...state,
				channels: {
					...state.channels,
					[action.name]: action.channel,
				},
				current_channel: {
					channel: action.channel,
					name: action.name,
				}
			}
		default:
			return state;
	}
}

export default channelReducer;