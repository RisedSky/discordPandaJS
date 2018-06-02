const mysql = require('mysql2');

const con = mysql.createConnection({
	host: config.MySQL_host,
	user: config.MySQL_user,
	database: config.MySQL_database,
	password: config.MySQL_password,
	reconnect: true
});

function SQL_Insert_NewServer(member) {
	con.query(`INSERT INTO ${DB_Model} (servername, serverid, prefix, lang, welcome_status) VALUES (?, ?, ?, ?, ?)`, [member.guild.name, member.guild.id, prefix, "english", false], (err, results) => {
		if (err) console.log(err);
		console.log("Inserted the new server !");
	});
}

function ReplaceThing(text, ThingToReplace, ReplaceTo) {
	let new_text = String(text)
	let new_ThingToReplace = String(ThingToReplace)
	let new_ReplaceTo = String(ReplaceTo)

	if (new_text.includes(new_ThingToReplace)) {
		//var re = /`${new_ThingToReplace}`/gi
		var re = new RegExp(new_ThingToReplace, "gi")

		var result = new_text.replace(re, new_ReplaceTo)
		console.log(result);

		return result;
	} else return new_text;
}

module.exports = {
	id: "GUILD_MEMBER_ADD",
	exec: (client) => {
		bot.on("guildMemberAdd", async (member) => {
			let SQL_GetResult = function(callback) {
				con.query(`SELECT * FROM ${DB_Model} WHERE serverid = '${member.guild.id}'`, (err, results) => {
					if (err) return callback(err)

					callback(null, results[0])
				})
			}

			await SQL_GetResult(function(err, result) {
				if (err) console.log("Database error!");
				else {
					if (result == undefined) {
						SQL_Insert_NewServer(member)
						return;
					}

					if (!result.welcome_status) return;
					//console.log(result);
					//console.log(result.welcome_channel);

					var t = String(result.welcome_channel).substr(2, 18);
					var welcome_channel = member.guild.channels.find("id", t);

					if (welcome_channel == null) return;
					if (!welcome_channel) return; //if channel don't exist then return
					//console.log("le welcome_channel: " + t);

					var welcome_message = String(result.welcome_message);

					if (welcome_message.includes("{user}")) {
						var welcome_msg_new = ReplaceThing(welcome_message, "{user}", "<@" + member.id + ">");

						welcome_channel.send(welcome_msg_new);
					} else {
						welcome_channel.send(welcome_message);
					}
				}
			});

		})
	}
}
