const _ = require('lodash');
const WebSocket = require('ws');

function OpenSocket(port){
  this.wSocketServer = new WebSocket.Server({port});
  
  this.handleConnection = this.handleConnection.bind(this);
  this.handleIncomingMessage = this.handleIncomingMessage.bind(this);
  this.sendMessageToClients = this.sendMessageToClients.bind(this);

  this.wSocketServer.on('connection',this.handleConnection);
}

OpenSocket.prototype.handleIncomingMessage = function(data,ws){
  console.log(data.toString());
  console.log("ws name",ws.__clientName);
  let parsedData = JSON.parse(data.toString());
  switch(parsedData.type){
    case "MSG":
      this.sendMessageToClients(parsedData)
      break;
    case "CHANGE_NAME":
      this.sendMessageToClients({newName: parsedData.name, oldName: ws.__clientName,type: "NAME_CHANGE", time: data.time})
      break;
    default:
      break;
  }
}

OpenSocket.prototype.handleConnection = function(ws){
  const name = "Anonymous "+_.size(this.wSocketServer.clients);
  let obj = {
    type: "SET_NAME", 
    name: name
  };
  console.log(JSON.stringify(obj));
  ws.send(
    objToBuffer(obj)
  );  
  this.sendMessageToClients({name: name, type: "NEW_CONNECTION", time: new Date().toLocaleTimeString()});
  ws.__clientName = "Anonymous "+_.size(this.wSocketServer.clients);
  ws.on('message',(data) => this.handleIncomingMessage(data,ws))    
}  

/**
  data {Object} sends a encoded version of this object to every client
**/
OpenSocket.prototype.sendMessageToClients = function(data){
  this.wSocketServer.clients.forEach(function each(client,index) {
    client.send(objToBuffer(data));
  });   
}

function objToBuffer(obj){
  return Buffer.from(JSON.stringify(obj));
}

module.exports = {
  OpenSocket,
}