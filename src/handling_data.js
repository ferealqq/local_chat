import { toNumber,isNumber } from 'lodash';

/*
	buf = websocket event
	returns a promise with decoded object
*/
export function decodeData(evt){
	return new Promise((resolve, reject)=>{
		let message_blob = evt.data;
		const reader = new FileReader();
		reader.addEventListener('loadend', (e) => {
			const text = e.srcElement.result;
			resolve(JSON.parse(text));
		});
		reader.readAsText(message_blob)	
	});
}



export function objToBuffer(obj){
	return Buffer.from(JSON.stringify(obj));
}

export function newWS(port){
	const portNumber = toNumber(port);
	if(isNumber(portNumber)){
		return new WebSocket(`ws://127.0.0.1:${portNumber}`);
	}
}