import React, { useState,useEffect } from 'react';
import { useDispatch,connect } from 'react-redux';
import { size, map } from 'lodash';
import { Container,Row,Col,Input,Button,ListGroup,ListGroupItem,Form } from 'reactstrap';
import { handleIncomingMessage,sendMessage,changeName } from './chat_actions';
import { MdModeEdit } from 'react-icons/md';


function Chat(props){
	const ws = props.websocket;
	
	const { name, messages } = props;
	const dispatch = useDispatch();

	ws.onmessage = (evt) => {
		dispatch(handleIncomingMessage(evt));
	};

	const sendMsg = (msg) => {
		dispatch(sendMessage(msg,ws))
	}

	return (
		<Container>
			<NameRow name={name} changeName={(name)=>dispatch(changeName(name,ws))}/> 
			<ListGroup>
				{
					(size(messages) > 0) ? 
						map(messages,(message)=><Message {...message}/>)
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

	const sendMsg = (event) => {
		event.preventDefault();
		props.sendMsg(text)
		setText('');
	}
	return(
		<Row>
			<Form onSubmit={sendMsg} className="w-100 d-flex">
				<Col sm="8">
					<Input type="text" value={text} onChange={handleChange}/>
				</Col>
				<Col xs="auto" className="m-0 p-0">
					<Button color="danger">
						Button
					</Button>
				</Col>
			</Form>
		</Row>		
	);
}

const Message = (props) => (
	<ListGroupItem>
		<Row className="text-left">
			<p className="m-0 small"> {props.name} </p>
		</Row>
		<Row className="d-flex justify-content-between">
			<p className="ml-1 mr-5 my-auto">
				{props.msg}
			</p>
			<p className="mr-1 ml-5 my-auto">
				{props.time}
			</p>
		</Row>
	</ListGroupItem>
);

function NameRow(props){
	const [showNameField,toggleNameField] = useState(true);
	const [name, setName] = useState(props.name)

	const handleClick = () => {
		if(showNameField && name !== props.name)
			props.changeName(name);
		toggleNameField(!showNameField)
	}

	const handleNameChange = (event) => setName(event.target.value);

	useEffect(()=>{
		if(showNameField){
			setName(props.name);
		}
	});

	return (
		<Row className="justify-content-center p-3 w-100">
			<Row className="justify-content-center w-100">
				{
					showNameField ? 
						<p className="p-2 my-auto">
							Acting as: {name||"Anonymous"}
						</p>										
					:
						<React.Fragment>
							<p className="p-2 my-auto">
								Acting as:
							</p>		
							<Input 
								className="w-auto my-auto"
								placeholder={name}
								onChange={handleNameChange}
								value={name}
							/>
						</React.Fragment>			
				}
				<Button className="w-auto h-auto" color="primary" onClick={handleClick}>
					<MdModeEdit/>
				</Button>
			</Row>
		</Row>		
	);
}

const mapState = (state) => {
	return {
		name: state.name,
		messages: state.messages,
	};
};

export default connect(mapState)(Chat);