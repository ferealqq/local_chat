import { decodeData,objToBuffer } from './handling_data';

export const SEND_MESSAGE = "SEND_MESSAGE";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const RECEIVE_NAME = "RECEIVE_NAME";
export const CHANGE_NAME = "CHANGE_NAME";

export const sendMessage = (msg,websocket) => {
	return (dispatch,getState) => {
		const { name } = getState();

		let messageObject = {msg: msg,name: name,time: new Date().toLocaleTimeString()};

		websocket.send(objToBuffer({...messageObject,type: "MSG"}));
		dispatch(createAction(SEND_MESSAGE,messageObject));
	}
}

export const recieveMessage = (msg,name,time) => createAction(RECEIVE_MESSAGE,{msg,name,time})

export const receiveName = (name) => createAction(RECEIVE_NAME,{name: name})

export const changeName = (name,websocket) => {
	return (dispatch,getState) => {
		let messageObject = {name: name, type: "CHANGE_NAME"};
		websocket.send(objToBuffer(messageObject));
		dispatch(createAction(CHANGE_NAME,{name: name}));
	}
}

export const handleIncomingMessage = (event) => {
	return (dispatch,getState)=> {
		decodeData(event).then(obj=>{
			switch(obj.type){
				case "MSG":
					dispatch(recieveMessage(obj.msg,obj.name,obj.time));
					break;
				case "NAME":
					dispatch(receiveName(obj.name));
					break;
				default:
					break;
			}
		});
	}
}

export const createAction = (type,obj) => ({
	type: type, 
	...obj
})