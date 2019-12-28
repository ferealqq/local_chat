const express = require('express');
const { getChannels,insertChannel } = require('../database/channel_data_resources.js');
const portfinder = require('portfinder');
const _ = require('lodash');

function ChannelRouter(socketServer){
	this.socketServer = socketServer;
	this.router = express.Router();
	
	this.handleNewChannelPost = this.handleNewChannelPost.bind(this);
	this.getRouter = this.getRouter.bind(this);

	this.router.get('/',this.getChannels);
	this.router.post('/new',this.handleNewChannelPost);	
}

ChannelRouter.prototype.handleNewChannelPost = function(req,res){
	let { channel } = req.body;
	if(!_.isNil(channel)){
		portfinder.getPort((err,port)=>{
			if(!err){
				insertChannel(port,channel).then((response)=>{
					if(_.size(response) === 1 ){
						this.socketServer.openNewSocket(port,channel);
						res.json({msg: "New channel is now open!", port: port, channel: channel});
					}else{
						res.status(500).json({msg: "Something went wrong while saving the new channel!"});
					}
				}).catch((err)=>{
					res.status(500).json({msg: "Something went wrong! Channel by this name probably exists already!"});
				});
			}
		});
	}
}

ChannelRouter.prototype.getChannels = (req,res)	=> {
	getChannels().then(data => res.json(data))
};	

ChannelRouter.prototype.getRouter = function(){
	return this.router;
}

module.exports = ChannelRouter;