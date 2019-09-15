import React, { Component,useState } from 'react';
import { useDispatch,connect } from 'react-redux';
import { size, map } from 'lodash';
import { decodeData } from './handling_data';
import { Container,Row,Col,Input,Button,ListGroup,ListGroupItem } from 'reactstrap';
import { handleIncomingMessage,sendMessage } from './chat_actions';

const ws = new WebSocket("ws://127.0.0.1:555");

function Chat(props){
	const { name, messages } = props;
	const dispatch = useDispatch();

	ws.onmessage = (evt) => {
		dispatch(handleIncomingMessage(evt));
	};

	const sendMsg = (msg) => {
		dispatch(sendMessage(msg,ws))
	}
	console.log(map(messages,"time"))
	return (
		<Container>
			<p>
				{props.name}
			</p>
			<ListGroup>
				{
					(size(messages) > 0) ? 
						map(messages,(message)=><Message time={message.time}>{message.msg}</Message>)
					:
						null
				}
				<ListGroupItem>
					<ChatInput sendMsg={sendMsg}/>
				</ListGroupItem>
			</ListGroup>
		</Container>
	);
}

function ChatInput(props){
	const [ text, setText ] = useState('');

	const handleChange = (event) => {
		let { value } = event.target;
		setText(value);
	}

	const sendMsg = () => {
		props.sendMsg(text)
		setText('');
	}

	return(
		<Row>
			<Col sm="8">
				<Input type="text" value={text} onChange={handleChange}/>
			</Col>
			<Col xs="auto" className="m-0 p-0">
				<Button color="danger" onClick={sendMsg}>
					Button
				</Button>
			</Col>
		</Row>		
	);
}

const Message = (props) => (
	<ListGroupItem className="d-flex justify-content-between">
		<p className="ml-0 mr-5 my-auto">
			{props.children}
		</p>
		<p className="mr-0 ml-5 my-auto">
			{props.time}
		</p>
	</ListGroupItem>
);

const mapState = (state) => {
	return {
		name: state.name,
		messages: state.messages,
	};
};

export default connect(mapState)(Chat);