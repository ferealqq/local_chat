let assert = require('assert');
let Promises = require('bluebird'); 

let knex = require('../database/connections/knex_connection');
let { createChannelsTable } = require('../database/schemas/channels');
let { insertChannel } = require('../database/channel_data_resources');
let _ = require('lodash');

const tables = ['channels'];

function truncate () {
	return Promises.each(tables, function (table) {
		return knex.raw('truncate table ' + table);
	});
};

describe('Database testing', function() {
	describe('Channels testing', function() {
		beforeEach((done)=>{
			truncate().then(()=>knex.schema.hasTable("channels").then((exists)=>{
				if(exists) done();
				else createChannelsTable().then(()=>done())
			}))
		});
		afterEach((done)=>{
			done()
		});

		it('should create a table called channels', function(done) {
			knex.schema.dropTableIfExists('channels').then((res)=>{
				createChannelsTable().then((res)=>{
					return knex.schema.hasTable("channels").then((exists)=>{
						if(exists) done();
					})
				})
			})
		});

		it('should insert one channel', function(done){
			insertChannel(555,"programming").then((res)=>{
				if(_.size(res) === 1){
					done();
				}
			})
		})
	});
});
