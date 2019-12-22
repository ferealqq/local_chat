const knex = require('knex')({
	client: 'mysql2',
	connection: {
		host : '127.0.0.1',
		user : 'this',
		password : '',
		database : 'local_chat'
	},
 	log: {
		warn(message) {
			console.log(message);
		},
		error(message) {
			console.log(message);
		},
		deprecate(message) {
			console.log(message);
		},
		debug(message) {
			console.log(message);
		},
	},	
	pool: { min: 0, max: 7 }	
});

module.exports = knex;