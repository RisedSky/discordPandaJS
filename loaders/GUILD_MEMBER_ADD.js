const mysql = require('mysql2');

const con = mysql.createConnection({
	host: config.MySQL_host,
	user: config.MySQL_user,
	database: config.MySQL_database,
	password: config.MySQL_password,
	reconnect: true
});

module.exports = {
	id: "GUILD_MEMBER_ADD",
	exec: (client) => {
	
	}
}
