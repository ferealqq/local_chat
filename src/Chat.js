import React, { Component,useState } from 'react';
import { size, map } from 'lodash';
import { Container,Row,Col,Input,Button,ListGroup,ListGroupItem } from 'reactstrap';

const ws = new WebSocket("ws://127.0.0.1:555");

ws.onopen = () => {
	ws.send("moi server");
}

function Chat(){

	const [messageList, setMessage] = useState([]);

	ws.onmessage = (evt) => {
		let r_msg = evt.data;
		console.log(r_msg);
		setMessage([...messageList,{message: r_msg,time: new Date().toLocaleTimeString()}])
	};

	return (
		<Container>
			<ListGroup>
				{
					(size(messageList) > 0) ? 
						map(messageList,(message)=><Message time={message.time}>{message.message}</Message>)
					:
						null
				}
				<ListGroupItem>
					<ChatInput/>
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
		ws.send(text)
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

export default Chat;