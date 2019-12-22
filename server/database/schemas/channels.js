const knex = require('../connections/knex_connection');

function createChannelsTable(){
	return knex.schema.createTable('channels',(table)=>{
		table.increments();
		table.integer("port");
		table.string("channel");
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
		table.unique("channel");
	});
}

module.exports = {
	createChannelsTable,
}