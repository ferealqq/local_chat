const OpenSocket = require('./OpenSocket');
const { getChannels } = require('../database/channel_data_resources');
const _ = require('lodash');

function SocketServer(){
	this.openSockets = {};

	getChannels().then((data)=>{
		_.each(data,(object)=>{
			this.openSockets[object.channel] = new OpenSocket(object.port);
		});
	});
	
	this.openNewSocket = this.openNewSocket.bind(this);
}

SocketServer.prototype.openNewSocket = function(port,channel){
	this.openSockets[channel] = new OpenSocket(port);
}

SocketServer.prototype.getOpenSockets = function(){
	return this.openSockets;
}

module.exports = SocketServer;