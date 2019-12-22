const knex = require('./connections/knex_connection');

function insertChannel(port,channelName){
	return knex.insert({port: port, channel: channelName}).into("channels");
}


module.exports = {
	insertChannel,
	getChannels: () => knex.select("*").from('channels'),
} 