//import { default as config } from "./config.js";
const Discord = require("discord.js")
const bot = new Discord.Client({ autoReconnect: true })
bot.YTDL = require("ytdl-core")
bot.request = require("request")
bot.moment = require("moment")
bot.URL = require("url")
bot.config = require("./config.js").config;

const fs = require("fs")

let lang = this.lang;
let current_lang;

const lang_english = require("./lang/english.js").lang;

const DBL = require("dblapi.js");
const dbl = new DBL(bot.config.dbl_token);

//#region Dev
var DefaultGuildID = bot.config.DefaultGuildID;
var yt_api_key = bot.config.yt_api_key;

var BOT_TOKEN = bot.config.BOT_TOKEN;
bot.login(BOT_TOKEN);

let prefix = bot.config.prefix;
let bot_version = bot.config.bot_version;

//#region MySQL
bot.DB_Model = bot.config.MySQL_DB_Model; //Model qu'on utilise pour récup les infos

const mysql = require('mysql2');

bot.con = mysql.createPool({
	host: bot.config.MySQL_host,
	user: bot.config.MySQL_user,
	database: bot.config.MySQL_database,
	password: bot.config.MySQL_password
});
//#endregion

//#endregion

bot.prefixLog = "[!] "
bot.servers = {};

bot.Server_Link = "https://discord.gg/52PcVRh";

//#region ---- ALL EMOJIS ------
//Emoji string
bot.EmojiThonkongString = "<:thonkong:414071099517698059>"
bot.EmojiGreenTickString = "<:greenTick:412663578009796619>"
bot.EmojiRedTickString = "<:redTick:412663578051477505>"
bot.EmojiYouTube_LogoString = "<:youtube-logo:413446051480076288>"
bot.EmojiUpvoteString = "<:upvote:416350074252034059>"
bot.EmojiDownvoteString = "<:downvote:416350074168279061>"
bot.EmojiProhibitedString = "<:prohibited:416350020355489803>"
bot.EmojiTwitchLogoString = "<:twitchlogo:416350019780870146>"

//Emoji
bot.EmojiThonkong = "thonkong:414071099517698059"
bot.EmojiYouTube_Logo = "youtube-logo:413446051480076288"
bot.EmojiGreenTick = "greenTick:412663578009796619"
bot.EmojiRedTick = "redTick:412663578051477505"
bot.EmojiUpvote = "upvote:416350074252034059"
bot.EmojiDownvote = "downvote:416350074168279061"
bot.EmojiProhibited = "prohibited:416350020355489803"
bot.EmojiTwitchLogo = "twitchlogo:416350019780870146"

//Emoji ID
bot.Thonkong_ID = "414071099517698059"
bot.YouTube_Logo_ID = "413446051480076288"
bot.GreenTick_ID = "412663578009796619"
bot.RedTick_ID = "412663578051477505"
bot.upvote_ID = "416350074252034059"
bot.downvote_ID = "416350074168279061"
bot.prohibited_ID = "416350020355489803"
bot.TwitchLogo_ID = "416350019780870146"


var PermissionYes = bot.EmojiGreenTickString;
var PermissionNo = bot.EmojiRedTickString;
//#endregion
//---- ALL EMOJIS ------

//var CommandList = ["restart", "leave", "join", "", ""];

bot.on('ready', () => { //When bot is ready
	setInterval(() => {
		try {
			dbl.postStats(bot.guilds.size);
			console.log("postStats is Done");
		} catch (error) {
			console.log("postStats error: " + error);
		}

	}, 1800000); //30 min

	bot.user.setStatus("online")
	console.log("------------------------------")
	console.log(bot.prefixLog + "Bot created by RisedSky & PLfightX <3")
	console.log(bot.prefixLog + "All rights reserved")
	console.log(bot.prefixLog + "Bot ready")
	console.log("------------------------------")

	bot.user.setActivity(prefix + "help | Started and ready !");
	setTimeout(ChangeState1, 20000);
	console.log("The bot is now ready !")

	for (var i in bot.guilds.array()) {
		console.log(i + " » '" + bot.guilds.array()[i] + "'")
	}

})

bot.on('guildMemberAdd', async member => {

	let SQL_GetResult = function (callback) {
		bot.con.query(`SELECT * FROM ${bot.DB_Model} WHERE serverid = '${member.guild.id}'`, (err, results) => {
			if (err) return callback(err)

			callback(null, results[0])
		})
	}

	await SQL_GetResult(function (err, result) {
		if (err) console.log("Database error!");
		else {
			if (result == undefined) {
				bot.SQL_Insert_NewServer(member)
				return;
			}

			if (!result.welcome_status) return;

			var t = String(result.welcome_channel).substr(2, 18)
			let welcome_channel = member.guild.channels.find("id", t);

			if (welcome_channel == undefined) return;
			if (!welcome_channel) return;

			let welcome_message = String(result.welcome_message)

			if (welcome_message.includes("{user}")) {
				let welcome_msg_new = bot.ReplaceThing(welcome_message, "{user}", "<@" + member.id + ">")

				welcome_channel.send(welcome_msg_new)
			} else {
				welcome_channel.send(welcome_message)
			}
		}
	});

})

bot.on('guildCreate', async guild => {
	guild.channels.find(c => c.permissionsFor(guild.me).has("SEND_MESSAGES") && c.type === "text").fetchMessages({ limit: "1" }).then(m => {
		bot.SQL_GetResult(m.array().shift(), guild.me).then(result => {
			if (result == undefined) bot.SQL_Insert_NewServer(guild.me)
			else {
				console.log("The server already exist");
			}
		})
	})

	setTimeout(() => {
		const defaultChannel = guild.channels.find(c => c.permissionsFor(guild.me).has("SEND_MESSAGES") && c.type === 'text');

	var msgToSend = [];
		msgToSend.push(`${lang_english.guild_joining1}`)
	//msgToSend.push(`${current_lang.guild_joining2} **${prefix}help** ${current_lang.guild_joining3}`);
		msgToSend.push(`${String(lang_english.guild_joining2).replace("{0}", `**${prefix}help**`)}`);
	//msgToSend.push("I'm also in development and, if you want to contribute to me you can simply go here: https://github.com/RisedSky/discordPandaJS");
		msgToSend.push(`${lang_english.guild_joining4}: ${bot.Server_Link}`)
		msgToSend.push(`${lang_english.guild_joining5} ;-)`)
	msgToSend.push("https://cdn.discordapp.com/attachments/413838786439544833/416972991360925698/tenor.png")

	defaultChannel.send(msgToSend);
	}, 2500);
})

bot.commands = new Discord.Collection();
bot.disabledCommands = [];
var jsfiles;

function checkCommand(command, name) {
	var resultOfCheck = [true, null];
	if (!command.run) resultOfCheck[0] = false; resultOfCheck[1] = `Missing Function: "module.run" of ${name}.`;
	if (!command.help) resultOfCheck[0] = false; resultOfCheck[1] = `Missing Object: "module.help" of ${name}.`;
	if (command.help && !command.help.name) resultOfCheck[0] = false; resultOfCheck[1] = `Missing String: "module.help.name" of ${name}.`;
	return resultOfCheck;
}

fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);
	jsfiles = files.filter(f => f.endsWith(".js"));
	if (jsfiles.length <= 0) return console.log("Couldn't find commands.");
	jsfiles.forEach((f) => {
		try {
			var props = require(`./commands/${f}`);
			if (checkCommand(props, f)[0]) {
				bot.commands.set(props.help.name, props);
			} else {
				throw checkCommand(props, f)[1];
			}
		} catch (err) {
			bot.disabledCommands.push(f);
			console.log(`\nThe ${f} command failed to load:`);
			console.log(err);
		}
	});
});

class Call {
	constructor(message, bot, commands, args, content, prefix, cmd) {
		this.message = message;
		this.bot = bot;
		this.commands = commands;
		this.args = args;
		this.content = content;
		this.prefix = prefix;
		this.cmd = cmd;
	}
}

bot.on('message', async message => { //Quand une personne envoi un message
	if (!message.guild) {
		if (message.content.startsWith(bot.config.prefix + "invite")) {
			message.author.createDM();
			message.author.send("Hello, thanks for inviting me to your server\n\nHere is my link: https://discordapp.com/oauth2/authorize?&client_id=" + bot.user.id + "&scope=bot&permissions=8");
			message.author.send("And here is the link of my official discord server: " + bot.Server_Link)
		}
		return;
	}

	const prefix = bot.config.prefix,
		cmd = message.content.slice(bot.config.prefix.length).trim().split(/ +/g).shift(),
		args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g).join(" ").slice(cmd.length + 1).split(" "),
		//cmd = message.content.slice(bot.config.prefix.length).trim().split(/ +/g),
		content = args.join(" ");


	if (!bot.servers[message.guild.id]) {
		bot.servers[message.guild.id] = {
			queue: [],
			now_playing_data: {},
			loopit: Boolean,
			playit: Boolean,
			dispatcher_paused: Boolean,
			annonce_it: Boolean
		}
	}

	var channelTopic = String(message.channel.topic).toLowerCase();

	try {

		if (channelTopic.includes("<ideas>")) {
			if (!message.author.bot) {
				setTimeout(() => {
					message.react(bot.EmojiUpvote).catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error ideas tag > " + e);
					})
				}, 400);
				setTimeout(() => {
					message.react(bot.EmojiDownvote).catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error ideas tag > " + e);
					})
				}, 1000);
				//return;
			}
		}
		if (channelTopic.includes("<wait:")) {
			//Ignore the comments

			/*
			//doit trouver où est le wait pour récuperer le nombre (en terme de timeout en s).

			var waitsearch = channelTopic.startsWith("<wait:");
			var waitNumber = channelTopic.substr(6);
			var waitnumber1 = channelTopic.split("<wait:")


			console.log("Waitsearch: " + waitsearch + " -- waitNumber: " + waitNumber + " -- waitnumber1: " + waitnumber1)
			*/
		}
		if (channelTopic.includes("<autopurge:")) {

			var array_purge_sec = channelTopic.split("<autopurge:")[1];
			var purge_sec = array_purge_sec.split(":>")[0];
			//DEBUG => console.log(purge_sec)
			if (!message.pinned) {
				if (purge_sec <= 0) {
					if (message.deletable) {
						message.delete()
					}
				} else {
					if (message.deletable) {
						message.delete(purge_sec * 1000)
							.catch(e => {
								if (e.name === "DiscordAPIError") return;
								console.log("autopurge prblm : " + e)
							});
					}
				}
			}
		}
		if (channelTopic.includes("<nocmds>")) {
			if (!message.content.startsWith(prefix)) return;
			var wlComs = ["purge"];

			if (!wlComs.includes(message.content.substring(prefix.length).split(" ")[0])) {
				message.react(bot.EmojiRedTick).catch(e => {
					if (e.name === "DiscordAPIError") return;
					console.log("Error nocmds tag > " + e);
				})
				setTimeout(() => {

					message.reactions.forEach(reaction => {
						reaction.remove(bot.user)
						//remove(bot.user).then(t => {
						//console.log("deleted " + t);

					})
					/*message.clearReactions().catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error nocmds tag > " + e);
					})*/
				}, 6 * 1000);

				return;
			}
		}

	} catch (error) {
		console.log("channeTopic problem: " + error);
	}

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix) || message.content.startsWith(prefix + prefix)) return;

	bot.SQL_GetResult(message, message.member).then(result => {
		if (result == undefined) return;

		lang = result.lang;
		if (lang == undefined || lang == null || lang == "") {
			console.log("not defined");

			return message.reply(`Currently changing the lang to default (english)...`).then(msg => {
				bot.SQL_UpdateSomething(message, "lang", "english").then(msg.edit(`~~Currently changing the lang to default (english)...~~ ${lang_english.Something_Done}`))
				bot.deleteMyMessage(msg, 16 * 1000)
			})
		}
		current_lang = require(`./lang/${lang}.js`).lang
		bot.current_lang = require(`./lang/${lang}.js`).lang
	})

	//Declaring variable
	bot.server = bot.servers[message.guild.id]
	var server = bot.servers[message.guild.id]

	//#region Permission Du Bot
	bot.BOT_SEND_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("SEND_MESSAGES") && message.channel.type === 'text'
	bot.BOT_MANAGE_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("MANAGE_MESSAGES") && message.channel.type === 'text'
	bot.BOT_ADMINISTRATORPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("ADMINISTRATOR") && message.channel.type === 'text'
	bot.BOT_USE_EXTERNAL_EMOJISPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("USE_EXTERNAL_EMOJIS") && message.channel.type === 'text'
	bot.BOT_ADD_REACTIONSPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("ADD_REACTIONS") && message.channel.type === 'text'
	//#endregion


	//#region Permission de la personne
	bot.member_Has_BAN_MEMBERS = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("BAN_MEMBERS") && message.channel.type === 'text'
	bot.member_Has_MANAGE_GUILD = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("MANAGE_GUILD") && message.channel.type === 'text'
	bot.member_has_MANAGE_MESSAGES = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("MANAGE_MESSAGES") && message.channel.type === 'text'

	//#endregion

	//Auto-Delete Function

	bot.DeleteUserMessage = function (deleteit = true) {
		clearInterval(deleteUserMsg);
		if (!deleteit) return;
		if (message.deletable) {
			message.delete(1500).catch(e => {
				if (e.name === "DiscordAPIError") return;
				console.log("can't delete this message: " + e)
			});
		}
	}
	var deleteUserMsg = setInterval(bot.DeleteUserMessage, 1200);


	if (message.content.startsWith(prefix) && !message.author.bot) {
		setTimeout(() => {
			const commandFile = bot.commands.find((command) => (command.help.aliases || []).concat([command.help.name]).includes(cmd));
			if (commandFile != null) {
				if (message.channel.type !== "dm" || (commandFile.help.dm || false)) {
					commandFile.run(new Call(message, bot, bot.commands, args, content, prefix, cmd));
				} else message.reply("This command isn't working in DM")
			} else {
				try {
					bot.DeleteUserMessage(false)
					//message.react(bot.EmojiThonkong)

					try {
						message.react("❓").catch(e => {
							if (e.name === "DiscordAPIError") return;
							console.log("Error default > " + e);
						})
						message.react(bot.EmojiThonkong).catch(e => {
							if (e.name === "DiscordAPIError") return;
							console.log("Error default > " + e);
						})
						setTimeout(() => {
							message.reactions.forEach(reaction => {
								reaction.remove(bot.user)
								//remove(bot.user).then(t => {
								//console.log("deleted " + t);

							})

							/*message.clearReactions().catch(e => {
								if (e.name === "DiscordAPIError") return;
								console.log("Error default > " + e);
							})*/
						}, 5000);
					} catch (error) {
						console.log("I can't add any reaction in this message: " + message.content + "\n" + error)
					}
				} catch (error) {

				}
			}
		}, 500);
	}

})

bot.on('messageDelete', message => {
	//verifier si la personne qui supprime est le bot
	//si c'est le cas on doit vérifier si le message est pinned
	//si c'est le cas alors on ne le SUPPRIME PAS
})

bot.on('error', err => {
	console.log(err)
})

bot.on('reconnecting', () => {
	console.log("reconnecting");
})

bot.on('disconnect', () => {
	bot.user.setStatus("invisible");
	console.log("Je suis invisible")
})

bot.on('resume', () => {
	console.log("resumed!");
})

bot.on('guildUpdate', async (old, now) => {
	//console.log(`Detected a guildUpdate`);

	if (old.name !== now.name) {
		//console.log(`Detected a guildUpdate#NameChange`);
		bot.Update_Server_Name(now)
	}
})
//#region Functions

//#region SQL

bot.Update_Server_Name = async function (guild) {
	bot.con.query(`UPDATE ${bot.DB_Model} SET servername = ? WHERE serverid = ${guild.id}`, [guild.name], (err, results) => {
		if (err) console.log(err);

		console.log(`Changed successfully 'servername' of '${guild.id}' to '${guild.name}'`);
	});
}

bot.SQL_Insert_NewServer = async function (member) {
	bot.con.query(`INSERT INTO ${bot.DB_Model} (servername, serverid, prefix, lang, welcome_status) VALUES (?, ?, ?, ?, ?)`, [member.guild.name, member.guild.id, prefix, "english", false], (err, results) => {
		if (err) console.log(err);
		console.log("Inserted the new server !");
	});
}

bot.SQL_UpdateLang = async function (message, set_this, set_that) {
	bot.con.query(`UPDATE ${bot.DB_Model} SET ${set_this} = ? WHERE serverid = ${message.guild.id}`, [set_that], (err, results) => {
		if (err) console.log(err);

		console.log(`Changed successfully '${set_this}' to '${set_that}'`);
		lang = set_that;
		current_lang = require(`./lang/${lang}.js`).lang;
	});
}

bot.SQL_UpdateSomething = async function (message, set_this, set_that) {
	bot.con.query(`UPDATE ${bot.DB_Model} SET ${set_this} = ? WHERE serverid = ${message.guild.id}`, [set_that], (err, results) => {
		if (err) console.log(err);

		console.log(`Changed successfully '${set_this}' to '${set_that}'`);
	});
}

bot.SQL_UpdateWelcomeMessage = async function (message, welcome_msg) {
	bot.con.query(`UPDATE ${bot.DB_Model} SET welcome_message = ? WHERE serverid = ${message.guild.id}`, [welcome_msg], (err, results) => {
		if (err) console.log(err);

		console.log("Changed successfully the welcome message to " + welcome_msg);
	});
}

bot.SQL_UpdateChannelMessage = async function (message, channel) {
	bot.con.query(`UPDATE ${bot.DB_Model} SET welcome_channel = ? WHERE serverid = '${message.guild.id}'`, ["<#" + channel.id + ">"], (err, results) => {
		if (err) console.log(err);

		console.log("Changed successfully the channel to " + channel);
	});
}
//#endregion

//#region Important functions
bot.SQL_GetResult = function (message, member) {
	return new Promise((resolve, reject) => {
		bot.con.query(`SELECT * FROM ${bot.DB_Model} WHERE serverid = '${message.guild.id}'`, (err, results) => {
			if (!err) {
				if (results == null) {
					bot.SQL_Insert_NewServer(member);
					resolve();
				} else resolve(results[0]);
			} else reject(err);
		});
	});
}

bot.sendDMToUser = function (message, msgToSend) {
	message.author.createDM().catch(e => {
		if (e.name === "DiscordAPIError") {
			message.reply("Sorry but i can't DM you, open your DM please.")
			return;
		}
	})

	message.author.send(msgToSend)
		.then(msg => {
			bot.deleteMyMessage(msg, 600 * 1000)
		})
		.catch(e => {
			if (e.name === "DiscordAPIError") {
				message.reply("Sorry but i can't DM you, open your DM please.")
				return;
			}
		})
}

bot.CheckInfo_ToBooleanEmoji = function (thing) { if (thing) { return `${bot.current_lang.Music_Status_Yes} ${bot.EmojiGreenTickString}` } else { return `${current_lang.Music_Status_No} ${bot.EmojiRedTickString}` } }

let ChangeBotState = true;
function ChangeState1() {
	if (!ChangeBotState) return;
	bot.user.setActivity(prefix + "help | By RisedSky & PLfightX");
	setTimeout(ChangeState2, 30000);
}

function ChangeState2() {
	if (!ChangeBotState) return;
	bot.user.setActivity(prefix + "help | Version: " + bot_version);
	setTimeout(ChangeState3, 30000);
}

function ChangeState3() {
	if (!ChangeBotState) return;
	bot.user.setActivity(prefix + "help | On " + bot.guilds.size + " servers with " + bot.users.size + " members");
	setTimeout(ChangeState4, 30000);
}

function ChangeState4() {
	if (!ChangeBotState) return;
	bot.user.setActivity(prefix + "help | Hosted by DelyaHosting (delya.eu)");
	setTimeout(ChangeState1, 60000);
}

bot.AskedBy_EmbedFooter = function (author) {
	return `Asked by ${author.tag} • ID: ${author.id}`;
}

bot.deleteMyMessage = function (message, time) {
	try {
		if (time === null) {
			time = 750;
		}

		if (!message.author.name === bot.user.name || !message.author.name === bot.user.username) {
			return;
		}
		message.delete(time).catch(error => (console.log("deleteMyMessage prblm : " + error)));
	} catch (error) {
		console.log("Problem on deleteMyMessage function: " + error)
	}
}

bot.DeleteTheMessage = function (message, time) {
	//#region Permission Du Bot
	const BOT_SEND_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("SEND_MESSAGES") && message.channel.type === 'text'
	const BOT_MANAGE_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("MANAGE_MESSAGES") && message.channel.type === 'text'
	const BOT_ADMINISTRATORPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("ADMINISTRATOR") && message.channel.type === 'text'
	const BOT_USE_EXTERNAL_EMOJISPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("USE_EXTERNAL_EMOJIS") && message.channel.type === 'text'
	const BOT_ADD_REACTIONSPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("ADD_REACTIONS") && message.channel.type === 'text'
	//#endregion

	//#region Permission de la personne
	const member_Has_BAN_MEMBERS = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("BAN_MEMBERS") && message.channel.type === 'text'
	const member_Has_MANAGE_GUILD = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("MANAGE_GUILD") && message.channel.type === 'text'
	const member_has_MANAGE_MESSAGES = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("MANAGE_MESSAGES") && message.channel.type === 'text'
	//#endregion

	try {
		if (time == null || time == undefined) {
			time = 750;
		}

		if (message.deletable && !message.pinned) {
			message.delete(time)
			//console.log(`Deleted ${message.content}`);
		} else console.log(`Not permitted`);

	} catch (error) {
		console.log(error);

	}
}

bot.NotifyUser = function (ID) {
	return `<@${ID}>`
}

bot.ReplaceThing = function (text, ThingToReplace, ReplaceTo) {
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

bot.PermissionCheck = function (PermToCheck) {
	if (PermToCheck === true) {
		return PermissionYes;
	} else {
		return PermissionNo;
	}
}
//#endregion



//#region "Functions pour la musique"
bot.search_video = function (message, query) {
	bot.request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, (error, response, body) => {

		var json = JSON.parse(body);

		if ("error" in json) {
			message.reply("Notify RisedSky#1250 with a screen to this error: ```\n An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason + "```")
				.then(function (msg) {
					bot.deleteMyMessage(msg, 10000);
				})
		} else if (json.items.length === 0) {
			message.reply("No videos found with your criteria: ```" + query + "```")
				.then(function (msg) {
					bot.deleteMyMessage(msg, 20 * 1000);
				})
		} else {
			bot.add_to_queue(json.items[0].id.videoId, message);
		}
	})
}

bot.add_to_queue = function (video, message) {
	var server = bot.servers[message.guild.id]
		, video_id = video
		, playit = server.playit

	bot.YTDL.getInfo("https://www.youtube.com/watch?v=" + video, (error, info) => {
		if (error) {
			message.reply("The requested video (" + video + ") does not exist or cannot be played.").then(function (msg) {
				bot.deleteMyMessage(msg, 15000);
			})
			console.log("Error (" + video + "): " + error);
			return;
		}

		var date = new Date(null); //défini comme null la date
		date.setSeconds(info.length_seconds); //défini la date avec des secondes
		var result = date.toISOString().substr(11, 8); // récupere le temps et le transforme en HH:mm:ss

		var YouTubeTimeSec = info.length_seconds
			, YouTubeViews = info.view_count
			, YouTubeUploader = info.author.name
			, YouTubeTitle = info.title
			, YouTubeThumbnail = info.thumbnail_url
			, YouTubeLink = info.video_url
			, YouTubeTime = result

		if (playit) {
			if (server.annonce_it) {
				var embed = new Discord.RichEmbed()
					.setColor("#00FF00")

					.setThumbnail(YouTubeThumbnail).setURL(YouTubeLink)

					//petit logo à gauche du titre
					.setTitle(`Added to the queue in position [${server.queue.length}]`)

					.addField(`Added ${YouTubeTitle}`, `*${current_lang.Music_Requested_By} ${message.author.username}*`)
					.setFooter(bot.AskedBy_EmbedFooter(message.author))
				message.channel.send(embed).then(function (msg) {
					bot.deleteMyMessage(msg, (YouTubeTimeSec * 1000) - 10);
				})
			}
		}

		if (!playit) {//Si on NE doit PAS jouer la musique alors

			let EmbedAuthorName = "Song searched via YouTube";
			let EmbedAuthorIcon = "https://cdn.discordapp.com/emojis/" + bot.YouTube_Logo_ID + ".png?v=1";

			var search_embed = new Discord.RichEmbed()
				.setColor("#00FF00")


				.setThumbnail(YouTubeThumbnail).setURL(YouTubeLink)

				//petit logo à gauche du titre
				.setAuthor(EmbedAuthorName, EmbedAuthorIcon)
				.setTitle(YouTubeTitle)

				.addField("Your request is", "```" + message.content + "```")

				.addBlankField()

				.addField(current_lang.Music_Status_Uploaded_By, YouTubeUploader, true)
				.addField(current_lang.Music_Status_Song_Duration, "**" + YouTubeTime + "**", true)

				.addBlankField()

				.addField(current_lang.Music_Status_Views, YouTubeViews, true)
				.addField(current_lang.Music_Status_Link, "[Click here](" + YouTubeLink + ")", true)

				.setFooter("Asked by " + message.member.displayName + " • ID: " + message.author.id);


			message.channel.send(search_embed).then(function (msg) {
				bot.deleteMyMessage(msg, 600 * 1000)
			})
		}

		if (playit) {
			if (!message.member.voiceChannel) return bot.current_lang.Music_Not_In_Vocal

			if (!message.guild.voiceConnection) {
				server.loopit = false;
				server.dispatcher_paused = false;

				message.member.voiceChannel.join().then(function (connection) {
					if (!message.guild.me.serverDeaf) { message.guild.me.setDeaf(true, "Save bot's bandwith") }

					bot.play(connection, message);
				})
			};

			server.queue.push(
				{
					title: info["title"],
					id: video_id,
					user: message.author.username,
					YouTubeTimeSec: YouTubeTimeSec,
					YouTubeViews: YouTubeViews,
					YouTubeUploader: YouTubeUploader,
					YouTubeTitle: YouTubeTitle,
					YouTubeThumbnail: YouTubeThumbnail,
					YouTubeLink: YouTubeLink,
					YouTubeTime: YouTubeTime,
					MessContent: message.content
				}
			);
		};
	})
}

bot.queue_playlist = function (playlistId, message, pageToken = '') {
	var Number_Added = 0;
	var server = bot.servers[message.guild.id];


	bot.request("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + "&key=" + yt_api_key + "&pageToken=" + pageToken, (error, response, body) => {
		var json = JSON.parse(body);

		if ("error" in json) {
			message.reply("An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason).then(msg => {
				bot.deleteMyMessage(msg, 15 * 1000)
			});
		} else if (json.items.length === 0) {
			message.reply("No videos found within playlist.").then(msg => {
				bot.deleteMyMessage(msg, 15 * 1000)
			});
		} else {
			for (var i = 0; i < json.items.length; i++) {
				server.annonce_it = false;
				bot.add_to_queue(json.items[i].snippet.resourceId.videoId, message)
				Number_Added++;
			}

			if (json.nextPageToken == null) {
				message.channel.send("I added a total of " + Number_Added + " musics.").then(msg => {
					bot.deleteMyMessage(msg, 20 * 1000)
				})

				Number_Added = 0;
				return;
			}

			bot.queue_playlist(playlistId, message, json.nextPageToken)
		}
	});
}


bot.get_video_id = function (string) {
	try {
		var regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
		console.log("String: " + string)
		var matches = String(string.match(regex));
		console.log("Matches: " + matches)

		if (matches) {
			return matches[1];
		} else {
			return string;
		}

	} catch (error) {
		console.log("get_video_id problem => " + error)
	}
}

bot.play = function (connection, message) {

	try {
		var server = bot.servers[message.guild.id];

		var video_id = server.queue[0]["id"];
		var title = server.queue[0]["title"];
		var user = server.queue[0]["user"];

		server.now_playing_data["title"] = title;
		server.now_playing_data["user"] = user;

		var playit = server.playit;

		var embed = new Discord.RichEmbed()
			.setColor("#00FF00")


			.setThumbnail(server.queue[0]["YouTubeThumbnail"]).setURL(server.queue[0]["YouTubeLink"]) //miniature + lien vers la vidéo en cliquant sur la minia

			//petit logo à gauche du titre
			.setAuthor(bot.current_lang.Music_Now_Playing, "https://cdn.discordapp.com/emojis/" + bot.YouTube_Logo_ID + ".png?v=1")
			.setTitle(server.queue[0]["YouTubeTitle"])

			.addField("Your request is", "```" + server.queue[0]["MessContent"] + "```")

			.addBlankField()

			.addField(current_lang.Music_Status_Uploaded_By, server.queue[0]["YouTubeUploader"], true)
			.addField(current_lang.Music_Status_Song_Duration, "**" + server.queue[0]["YouTubeTime"] + "**", true) //temps

			.addBlankField()

			.addField(current_lang.Music_Status_Views, server.queue[0]["YouTubeViews"], true)
			.addField(current_lang.Music_Status_Link, "[Click here](" + server.queue[0]["YouTubeLink"] + ")", true)
			/*.setAuthor(YouTubeTitle, message.author.avatarURL)
			Code qui permet de définir le titre et le logo du demandeur
			*/
			.setFooter(bot.AskedBy_EmbedFooter(message.author));


		message.channel.send(embed).then(function (msg) {
			bot.deleteMyMessage(msg, server.queue[0]["YouTubeTimeSec"] * 1000);
		})

		server.dispatcher = connection.playStream(
			bot.YTDL(video_id, { filter: "audioonly", audioEncondig: "opus", audioBitrate: "64" })
		);

		server.dispatcher.setVolume(0.3);

		server.dispatcher.on("end", function () {

			if (!server.loopit) {
				server.queue.splice(0, 1);
			}

			if (server.queue[0]) {
				setTimeout(() => {
					bot.play(connection, message);
				}, 1000);
			} else {
				if (message.guild.voiceConnection) {
					message.channel.send(bot.EmojiGreenTickString + " Finished the queue from channel: `" + message.guild.voiceConnection.channel.name + "` :wave:").then(function (msg) {
						bot.deleteMyMessage(msg, 13 * 1000);
					});

					message.guild.voiceConnection.disconnect();
				}
			}

		})

	} catch (error) {
		console.log("[play] Function play: " + error)
	}
}
//#endregion

//#endregion

module.exports = bot, Call;