const _ = require('lodash');
const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 555 });
 
wss.on('connection', function connection(ws) {
  let obj = {
  	type: "NAME", 
  	name: "Anonymous "+_.size(wss.clients)
  };
  console.log(JSON.stringify(obj));
  ws.send(
  	objToBuffer(obj)
  );	

  ws.on('message', function incoming(data) {
  	console.log(data.toString());
  	let l = JSON.parse(data.toString());
  	console.log(l);
    wss.clients.forEach(function each(client,index) {
      console.log("user: ",l.name, " sent a message: ",l.msg);
      client.send(data);
    });
  })
});

console.log("Socket running on port: 555");

function objToBuffer(obj){
	return Buffer.from(JSON.stringify(obj));
}