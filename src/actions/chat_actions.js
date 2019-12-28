import { decodeData,objToBuffer } from '../handling_data';

export const SEND_MESSAGE = "SEND_MESSAGE";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const RECEIVE_NAME = "RECEIVE_NAME";
export const CHANGE_NAME = "CHANGE_NAME";

export const NEW_NOTIFICATION = "NEW_NOTIFICATION";

export const sendMessage = (msg,websocket) => {
	return (dispatch,getState) => {
		const { name } = getState();

		let messageObject = {msg: msg,name: name,time: new Date().toLocaleTimeString()};

		websocket.send(objToBuffer({...messageObject,type: "MSG"}));
		dispatch(createAction(SEND_MESSAGE,messageObject));
	}
}

export const receiveMessage = (msg,name,time) => createAction(RECEIVE_MESSAGE,{msg,name,time})

export const receiveName = (name) => createAction(RECEIVE_NAME,{name: name})

export const changeName = (name,websocket) => {
	return (dispatch,getState) => {
		let messageObject = {name: name, type: "CHANGE_NAME", time: new Date().toLocaleTimeString()};
		websocket.send(objToBuffer(messageObject));
		dispatch(createAction(CHANGE_NAME,{name: name}));
	}
}

export const addNotification = (obj) => createAction(NEW_NOTIFICATION,obj)

export const handleIncomingMessage = (event) => {
	return (dispatch,getState)=> {
		decodeData(event).then(obj=>{
			switch(obj.type){
				case "NEW_CONNECTION":
					dispatch(addNotification(newConnectionNotification(obj)))
					break;
				case "MSG":
					dispatch(receiveMessage(obj.msg,obj.name,obj.time));
					break;
				case "SET_NAME":
					dispatch(receiveName(obj.name));
					break;
				case "NAME_CHANGE":
					dispatch(addNotification(nameChangeNotification(obj)))
				default:
					break;
			}
		});
	}
}

export const newConnectionNotification = (obj) => ({text: `${obj.name} joined the chat!`, time: obj.time})

export const nameChangeNotification = (obj) => ({text:`${obj.oldName} has changed his name to ${obj.newName}`,time: obj.time})

export const createAction = (type,obj) => ({
	type: type, 
	...obj
})