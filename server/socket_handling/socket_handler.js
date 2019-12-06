const _ = require('lodash');
const WebSocket = require('ws');

function OpenSocket(port){
  this.wSocketServer = new WebSocket.Server({port});
  
  this.handleConnection = this.handleConnection.bind(this);
  this.handleIncomingMessage = this.handleIncomingMessage.bind(this);

  this.wSocketServer.on('connection',this.handleConnection);
}

OpenSocket.prototype.handleIncomingMessage = function(data){
  console.log(data.toString());
  let parsedData = JSON.parse(data.toString());
  this.wSocketServer.clients.forEach(function each(client,index) {
    console.log("user: ",parsedData.name, " sent a message: ",parsedData.msg);
    client.send(data);
  });    
}

OpenSocket.prototype.handleConnection = function(ws){
  let obj = {
    type: "NAME", 
    name: "Anonymous "+_.size(this.wSocketServer.clients)
  };
  console.log(JSON.stringify(obj));
  ws.send(
    objToBuffer(obj)
  );  

  ws.on('message',this.handleIncomingMessage)    
}  

function objToBuffer(obj){
  return Buffer.from(JSON.stringify(obj));
}

module.exports = {
  OpenSocket,
}