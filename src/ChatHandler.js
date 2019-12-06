import React, { Component } from 'react';
import Chat from './Chat';

const websocket = new WebSocket("ws://127.0.0.1:555");

class ChatHandler extends Component {
	render() {
		return (
			<div>
				<Chat websocket={websocket} />
			</div>
		);
	}
}


export default ChatHandler;