const express = require('express');
const { getChannels } = require('../database/channel_data_resources.js');
const 

function ChannelRouter(socketServer){
	this.socketServer = socketServer;
	this.router = express.Router();
	
	this.handleNewChannelPost = this.handleNewChannelPost.bind(this);
	this.getRouter = this.getRouter.bind(this);

	this.router.get('/',(req,res)=>{
		getChannels().then((data)=>{
			res.json(data);
		})
	});

	this.router.post('/new',this.handleNewChannelPost);	
}

ChannelRouter.prototype.handleNewChannelPost = function(req,res){
	
}

ChannelRouter.prototype.getRouter = function(){
	return this.router;
}

module.exports = ChannelRouter;