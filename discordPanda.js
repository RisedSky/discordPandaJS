//import { default as config } from "./config.js";
const config = require("./config.js").config;
const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const URL = require('url');
const request = require("request");
const moment = require("moment");
const bot = new Discord.Client({ autoReconnect: true });

let lang = this.lang;
let current_lang;

const lang_english = require("./lang/english.js").lang;
const lang_french = require("./lang/french.js").lang;
const lang_russian = require("./lang/russian.js").lang;

const DBL = require("dblapi.js");
const dbl = new DBL(config.dbl_token);

var BlackListUser = require("./blacklistUser.js");
var StringBlackListUser = String(BlackListUser.BlackListUser);

//#region Dev
var DefaultGuildID = config.DefaultGuildID;
var yt_api_key = config.yt_api_key;

var BOT_TOKEN = config.BOT_TOKEN;
bot.login(BOT_TOKEN);

let prefix = config.prefix;
let bot_version = config.bot_version;

//#region MySQL
var DB_Model = config.MySQL_DB_Model; //Model qu'on utilise pour récup les infos

const mysql = require('mysql2');

const con = mysql.createConnection({
	host: config.MySQL_host,
	user: config.MySQL_user,
	database: config.MySQL_database,
	password: config.MySQL_password,
	reconnect: true
});

con.connect(async err => {
	console.log("Connecting to the database...");
	if (err) throw err.message;
	console.log("Connected to the database: " + con.config.database);
})

//#endregion

//#endregion

var prefixLog = "[!] ";
var servers = {};
//var now_playing_data = {};
var online_since = 0;
function datenow() {
	online_since++;
}

var Server_Link = "https://discord.gg/52PcVRh";

//#region ---- ALL EMOJIS ------
//Emoji string
var EmojiThonkongString = "<:thonkong:414071099517698059>"
	, EmojiGreenTickString = "<:greenTick:412663578009796619>"
	, EmojiRedTickString = "<:redTick:412663578051477505>"
	, EmojiYouTube_LogoString = "<:youtube-logo:413446051480076288>"
	, EmojiUpvoteString = "<:upvote:416350074252034059>"
	, EmojiDownvoteString = "<:downvote:416350074168279061>"
	, EmojiProhibitedString = "<:prohibited:416350020355489803>"
	, EmojiTwitchLogoString = "<:twitchlogo:416350019780870146>"

//Emoji
var EmojiThonkong = "thonkong:414071099517698059"
	, EmojiYouTube_Logo = "youtube-logo:413446051480076288"
	, EmojiGreenTick = "greenTick:412663578009796619"
	, EmojiRedTick = "redTick:412663578051477505"
	, EmojiUpvote = "upvote:416350074252034059"
	, EmojiDownvote = "downvote:416350074168279061"
	, EmojiProhibited = "prohibited:416350020355489803"
	, EmojiTwitchLogo = "twitchlogo:416350019780870146"

//Emoji ID
var Thonkong_ID = "414071099517698059"
	, YouTube_Logo_ID = "413446051480076288"
	, GreenTick_ID = "412663578009796619"
	, RedTick_ID = "412663578051477505"
	, upvote_ID = "416350074252034059"
	, downvote_ID = "416350074168279061"
	, prohibited_ID = "416350020355489803"
	, TwitchLogo_ID = "416350019780870146"

var PermissionYes = EmojiGreenTickString;
var PermissionNo = EmojiRedTickString;
//#endregion
//---- ALL EMOJIS ------


//Pour le request song
var YouTubeThumbnail //Défini la miniature
	, YouTubeTitle //Défini le titre de la vidéo
	, YouTubeTime //Défini le temps de la vidéo
	, YouTubeLink; //Défini le lien de la vidéo

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


	setInterval(datenow, 1000);
	bot.user.setStatus("online")
	console.log("------------------------------")
	console.log(prefixLog + "Bot created by RisedSky & PLfightX <3")
	console.log(prefixLog + "All rights reserved")
	console.log(prefixLog + "Bot ready")
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
		con.query(`SELECT * FROM ${DB_Model} WHERE serverid = '${member.guild.id}'`, (err, results) => {
			if (err) return callback(err)

			callback(null, results[0])
		})
	}

	await SQL_GetResult(function (err, result) {
		if (err) console.log("Database error!");
		else {
			if (result == undefined) {
				SQL_Insert_NewServer(member)
				return;
			}

			if (!result.welcome_status) return;

			var t = String(result.welcome_channel).substr(2, 18)
			let welcome_channel = member.guild.channels.find("id", t);

			if (welcome_channel == undefined) return;
			if (!welcome_channel) return;

			let welcome_message = String(result.welcome_message)

			if (welcome_message.includes("{user}")) {
				let welcome_msg_new = ReplaceThing(welcome_message, "{user}", "<@" + member.id + ">")

				welcome_channel.send(welcome_msg_new)
			} else {
				welcome_channel.send(welcome_message)
			}
		}
	});

})

bot.on('guildCreate', async Guild => {

	const defaultChannel = Guild.channels.find(c => c.permissionsFor(Guild.me).has("SEND_MESSAGES") && c.type === 'text');

	var StringallListServers = "";
	var allListServers = bot.guilds.array();

	var msgToSend = [];
	msgToSend.push(`${current_lang.guild_joining1}`)
	//msgToSend.push(`${current_lang.guild_joining2} **${prefix}help** ${current_lang.guild_joining3}`);
	msgToSend.push(`${String(current_lang.guild_joining2).replace("{0}", `**${prefix}help**`)}`);
	//msgToSend.push("I'm also in development and, if you want to contribute to me you can simply go here: https://github.com/RisedSky/discordPandaJS");
	msgToSend.push(`${current_lang.guild_joining4}: ${Server_Link}`)
	msgToSend.push(`${current_lang.guild_joining5} ;-)`)
	msgToSend.push("https://cdn.discordapp.com/attachments/413838786439544833/416972991360925698/tenor.png")

	defaultChannel.send(msgToSend);

})


bot.on('message', async message => { //Quand une personne envoi un message
	if (!message.guild) {
		if (message.content.startsWith(prefix + "invite")) {
			message.author.createDM();
			message.author.send("Hello, thanks for inviting me to your server\n\nHere is my link: https://discordapp.com/oauth2/authorize?&client_id=" + bot.user.id + "&scope=bot&permissions=8");
			message.author.send("And here is the link of my official discord server: " + Server_Link)
		}
		return;
	}

	let SQL_GetResult = async function (callback) {

		con.query(`SELECT * FROM ${DB_Model} WHERE serverid = '${message.guild.id}'`, (err, results) => {
			if (err) return callback(err);

			if (results == undefined) {
				SQL_Insert_NewServer(member)
				return;
			}

			callback(null, results[0])
		})
	}

	if (!servers[message.guild.id]) {
		servers[message.guild.id] = {
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
					message.react(EmojiUpvote).catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error ideas tag > " + e);
					})
				}, 400);
				setTimeout(() => {
					message.react(EmojiDownvote).catch(e => {
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
				message.react(EmojiRedTick).catch(e => {
					if (e.name === "DiscordAPIError") return;
					console.log("Error nocmds tag > " + e);
				})
				setTimeout(() => {
					message.clearReactions().catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error nocmds tag > " + e);
					})
				}, 6 * 1000);

				return;
			}
		}

	} catch (error) {
		console.log("channeTopic problem: " + error);
	}

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix) || message.content.startsWith(prefix + prefix)) return;

	await SQL_GetResult(function (err, result) {
		if (err) console.log("Database error!");
		else {
			if (result == undefined) {
				return message.reply(lang_english.Command_Welcome_Create_Server_To_Database).then(msg => {
					SQL_Insert_NewServer(message.member).then(msg.edit(`~~${lang_english.Command_Welcome_Create_Server_To_Database}~~ ${lang_english.Something_Done}`))
					deleteMyMessage(msg, 16 * 1000)
				})
			}
			lang = result.lang;
			if (lang == undefined || lang == null || lang == "") {
				console.log("not defined");

				return message.reply(`Currently changing the lang to default (english)...`).then(msg => {
					SQL_UpdateSomething(message, "lang", "english").then(msg.edit(`~~Currently changing the lang to default (english)...~~ ${lang_english.Something_Done}`))
					deleteMyMessage(msg, 16 * 1000)
				})
			}
			current_lang = require(`./lang/${lang}.js`).lang;

		}
	})


	//Declaring variable
	var MessageID = message.id;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const args_next = args.join(" ").trim();
	let args_eval = message.content.split(" ").slice(1);
	var Mess = message;
	var Mess_Channel = message.channel;
	var Mess_Member = message.member;
	if (Mess_Member.voiceChannel) { var Mess_voiceChannel = message.member.voiceChannel; }

	var server = servers[message.guild.id];

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

	//Auto-Delete Function
	var deleteUserMsg = setInterval(DeleteUserMessage, 1200);
	function DeleteUserMessage(deleteit = true) {
		clearInterval(deleteUserMsg);
		if (!deleteit) return;
		if (message.deletable) {
			message.delete(1500).catch(e => {
				if (e.name === "DiscordAPIError") return;
				console.log("can't delete this message: " + e)
			});
		}
	}

	setTimeout(async => {

		switch (args[0].toLowerCase()) {
			//Music Commands
			//#region
			// - - Musique
			// ("./lang/${lang}.js").lang
			case "lang":
				SQL_GetResult(function (err, result) {
					if (err) console.log("Database error!");
					if (result == undefined) {
						return
					}

					lang = result.lang;
					if (!args[1]) {
						if (lang == undefined || lang == null || lang == "") {
							return message.reply(`Current language: None`)
						} else return message.reply(`Current language: ${result.lang}`)

					} else if (!member_Has_MANAGE_GUILD) {
						return message.reply(`${current_lang.Command_User_Not_Allowed} ${current_lang.Permission_Manage_Server_Required}`)
					}

					switch (args[1].toLowerCase()) {
						case "help":

							var lang_embed = new Discord.RichEmbed()
								.setAuthor(bot.user.username, bot.user.avatarURL)
								.setColor("GREEN")
								.setDescription(
									`Available language:\nFrench, English, Russian\n\nCommand to change the language: \`${prefix}lang English\``
								)
							message.channel.send(lang_embed).then(msg => {
								deleteMyMessage(msg, 60 * 1000)
							})
							break;
						case "french":
							SQL_UpdateLang(message, "lang", "french").then(() => {
								setTimeout(() => {
									message.reply(current_lang.Lang_Defined_To_French)
								}, 350);
							})
							break;

						case "english":
							SQL_UpdateLang(message, "lang", "english").then(() => {
								setTimeout(() => {
									message.reply(current_lang.Lang_Defined_To_English)
								}, 350);
							})
							break;

						case "russian":
							SQL_UpdateLang(message, "lang", "russian").then(() => {
								setTimeout(() => {
									message.reply(current_lang.Lang_Defined_To_Russian)
								}, 350);
							})
							break;
						default:
							message.reply(String(current_lang.Lang_Didnt_Find_Lang).replace("{0}", args[1]))
							message.reply(`The help command is: ${prefix}lang help`)
							break;
					}

				})
				break;

			case "play-list":
				if (!args[1]) {
					message.react("❌").catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error play-list > " + e);
					})
					message.reply(current_lang.Music_Tell_Me_Something_Play_Playlist).then(function (msg) {
						deleteMyMessage(msg, 16 * 1000);
					})
					return;

				} else if (!Mess_Member.voiceChannel) {
					message.react("❌").catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error play-list > " + e);
					})
					message.reply(current_lang.Music_Not_In_Vocal).then(function (msg) {
						deleteMyMessage(msg, 16 * 1000);
					})
					return;
				} else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
					message.react("❌").catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error play-list > " + e);
					})
					message.reply(current_lang.Music_Should_Not_Deafen).then(function (msg) {
						deleteMyMessage(msg, 16 * 1000);
					})
					return;
				}

				server.playit = true;

				var parsed = URL.parse(args[1]);
				if (parsed && parsed.host) {
					// YouTube URL
					var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
					var match = args[1].match(regExp);

					if (match[2]) {//if (match && match[2]) {
						server.annonce_it = false;
						queue_playlist(match[2], message);
						return;
					} else {
						message.reply(current_lang.Music_Not_Playlist).then(msg => {
							deleteMyMessage(msg, 14 * 1000)
						})
					}
				} else {
					message.reply(current_lang.Music_Not_Link).then(msg => {
						deleteMyMessage(msg, 14 * 1000)
					})
				}
				break;
			//------
			case "play":
				if (!args[1]) {
					message.react("❌").catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error play > " + e);
					})
					message.reply(current_lang.Music_Tell_Me_Something_Play).then(function (msg) {
						deleteMyMessage(msg, 16 * 1000);
					})
					return;

				} else if (!Mess_Member.voiceChannel) {
					message.react("❌").catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error play > " + e);
					})
					message.reply(current_lang.Music_Not_In_Vocal).then(function (msg) {
						deleteMyMessage(msg, 16 * 1000);
					})
					return;
				} else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
					message.react("❌").catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error play > " + e);
					})
					message.reply(current_lang.Music_Should_Not_Deafen).then(function (msg) {
						deleteMyMessage(msg, 16 * 1000);
					})
					return;
				}

				try {
					server.playit = true;

					var parsed = URL.parse(args[1]);
					if (parsed && parsed.host) {
						// YouTube URL

						//var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
						/*
						var match = args[1].match(regExp);
		
						if (match && match[2]) {
							server.annonce_it = false;
							queue_playlist(match[2], message);
							return;
						}
						*/

						server.annonce_it = true;
						if (parsed.host.match(/(www\.)?youtube.com|(www\.)?youtu.be/i)) {

							var regExp = /^.*v=([^#\&\?]*).*/;
							var match = args[1].match(regExp);

							if (match[1]) {//if (match && match[2]) {
								search_video(message, match[1]);
								return;
							} else {
								message.reply(current_lang.Music_Not_Playlist).then(msg => {
									deleteMyMessage(msg, 14 * 1000)
								})
							}

							return;

						} else if (parsed.host.match(/(www\.)?soundcloud.com/i)) {
							console.log("C'est du soundcloud")
							message.reply(current_lang.Music_Soundcloud_Not_Supported).then(function (msg) {
								deleteMyMessage(msg, 16 * 1000);
							})

							return;
						}

					} else {
						var argsSearch = message.content.split(" ");

						var q = "";

						for (var i = 1; i < argsSearch.length; i++) {
							q += argsSearch[i] + " ";
						}
						search_video(message, q);
						return;
					}


				} catch (error) {
					console.log("Erreur dans le play, quelque chose ne va pas: " + error)
				}

				break;

			//----------
			case "pause":
				if (!server.dispatcher) {
					console.log("No dispatcher")
					message.reply(current_lang.Music_No_Music_Playing).then(msg => {
						deleteMyMessage(msg, 15 * 1000)
					});
					return;

				} else if (!Mess_Member.voiceChannel.name === message.guild.voiceConnection.channel.name) {
					message.reply(current_lang.Music_Not_In_The_Same_Vocal)
						.then(function (msg) {
							deleteMyMessage(msg, 12 * 1000);
						})
					return;
				}

				if (server.dispatcher_paused) {
					server.dispatcher.resume();
					server.dispatcher_paused = false;
					message.reply(`${current_lang.Music_Resume_Success} :play_pause:, :headphones:`).then(msg => {
						deleteMyMessage(msg, 20 * 1000)
					})
				} else {
					server.dispatcher.pause();
					server.dispatcher_paused = true;
					message.reply(`${current_lang.Music_Pause_Success} :stop_button:, :headphones:`).then(msg => {
						deleteMyMessage(msg, 20 * 1000)
					})
				}
				break;
			//-------
			case "search":
				if (!args[1]) {
					message.react("❌").catch(e => {
						if (e.name === "DiscordAPIError") return;
						console.log("Error search > " + e);
					})
					message.reply(current_lang.Music_Need_Music_Title).then(function (msg) {
						deleteMyMessage(msg, 12 * 1000);
					})
					return;
				}
				server.playit = false;
				var argsSearch = message.content.split(" ");

				var q = "";
				for (var i = 1; i < argsSearch.length; i++) {
					q += argsSearch[i] + " ";
				}
				search_video(message, q);

				break;
			//-------
			case "skip":

				if (!Mess_Member.voiceChannel) {
					message.reply(current_lang.Music_Skip_Not_In_Vocal).then(function (msg) {
						deleteMyMessage(msg, 12 * 1000);
					})
					return;
				} else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
					message.reply(current_lang.Music_Should_Not_Deafen).then(function (msg) {
						deleteMyMessage(msg, 12 * 1000);
					})
					return;

				} else if (!Mess_Member.voiceChannel.name === message.guild.voiceConnection.channel.name) {
					message.reply(current_lang.Music_Not_In_The_Same_Vocal)
						.then(function (msg) {
							deleteMyMessage(msg, 12 * 1000);
						})
					return;
				} else if (!server.queue[1]) {
					message.reply(current_lang.Music_Skip_No_Music_Found).then(function (msg) {
						deleteMyMessage(msg, 10 * 1000)
					})
					return;
				}
				//console.log("User: " + Mess_Member.voicechannel.name + " | " + "Me: " + message.guild.voiceConnection.channel.name)

				console.log(server.dispatcher);

				var video_id = server.queue[1]["id"];
				var title = server.queue[1]["title"];
				var user = server.queue[1]["user"];

				if (server.dispatcher) {
					var msg = [];
					msg.push(`${current_lang.Music_Skip_Success} \n\`${server.now_playing_data["title"]}\` *(${current_lang.Music_Requested_By} ${server.now_playing_data["user"]})* \n\n`);
					msg.push(`${current_lang.Music_Now_Playing}: \`${title}\` *(${current_lang.current_lang} ${user})*`)
					message.reply(msg).then(function (msg) {
						deleteMyMessage(msg, 60 * 1000);
					})
					server.dispatcher.end();
				}

				server.now_playing_data["title"] = title;
				server.now_playing_data["user"] = user;
				break;
			//-------
			case "stop":

				if (message.guild.voiceConnection) {
					for (var i = server.queue.length - 1; i >= 0; i--) {
						server.queue.splice(i, 1);
					}
					Mess_Channel.send(`${current_lang.Music_Stopped_From}: \`${message.guild.voiceConnection.channel.name}\` :wave:`).then(function (msg) {
						deleteMyMessage(msg, 20 * 1000);
					})
					message.guild.voiceConnection.disconnect();
				}
				break;
			//-------
			case "queue":

				var argsQueue = message.content.substring(5).split(" ");
				var xQueue = server.queue;

				try {

					if (!xQueue[0]) {
						message.reply(current_lang.Music_Currently_Queue_Empty).then(function (msg) {
							deleteMyMessage(msg, 20 * 1000);
						})
						return;
					}
					//console.log("Queue length: " + xQueue.length) //show us how many musics there is
					let embedQueue = new Discord.RichEmbed()
						.setColor("#ffa500")
						.setAuthor(`${current_lang.Music_Queue_List}`, bot.user.avatarURL)
						.setDescription(`*${current_lang.Music_Here_Queue_List}*`)
						.setFooter(`${current_lang.Music_Queue_List_Requested_By} ${message.author.username} • ID: ${message.author.id}`)
						.addBlankField()

					var xQueue_AddedFields = 0;

					for (var i in xQueue) {
						//console.log(embedQueue.fields.length)
						if (embedQueue.fields.includes("It's the end of the text")) return;

						if (embedQueue.fields.length <= 22) {
							xQueue_AddedFields++;
							embedQueue.addField(`[${i}] » ${xQueue[i]['title']}`, `*${current_lang.Music_Requested_By} ${xQueue[i]['user']}*`)
						} else {
							var RemainingNumber = xQueue.length - xQueue_AddedFields
							embedQueue.addField(`${current_lang.Music_And} ${RemainingNumber} ${current_lang.Music_More}`, `${current_lang.Music_End_Of_Text}`)
						}
					}

					embedQueue.addBlankField();

					message.channel.send(embedQueue).then(function (msg) {
						deleteMyMessage(msg, 180 * 1000);
					})

				} catch (error) {
					console.log("Queue command problem: " + error)
				}
				break;
			//----------
			case "loop":
				try {
					if (server.loopit) {
						server.loopit = false;
						message.reply(`:ok_hand: ${EmojiGreenTickString} \`${server.queue[0]["title"]}\` ${current_lang.Music_Song_Will_Not_Repeated} :wink:`).then(function (msg) {
							deleteMyMessage(msg, 10000);
						})
					} else {
						server.loopit = true;
						message.reply(`:ok_hand: ${EmojiGreenTickString} \`${server.queue[0]["title"]}\` ${current_lang.Music_Song_Will_Be_Repeated} :wink:`).then(function (msg) {
							deleteMyMessage(msg, 10000);
						})
					}
				} catch (error) {
					console.log("Loop error: " + error)
				}
				break;

			//----------
			case "status":
				if (!server.queue[0]) {
					message.reply(current_lang.Music_Status_No_Music).then(function (msg) {
						deleteMyMessage(msg, 15 * 1000)
					})
					return;
				}
				function CheckInfo_ToBooleanEmoji(thing) { if (thing) { return `${current_lang.Music_Status_Yes} ${EmojiGreenTickString}` } else { return `${current_lang.Music_Status_No} ${EmojiRedTickString}` } }
				var disp_time = moment.duration(server.dispatcher.time, "milliseconds")
				var time_remainingSec = (server.queue[0]["YouTubeTimeSec"] - disp_time.get("seconds"))

				var de = new Date(null);
				de.setSeconds(time_remainingSec);
				var TimeRemaining = de.toISOString().substr(11, 8); // récupere le temps et le transforme en HH:mm:ss

				try {
					embedStatus = new Discord.RichEmbed()
						.setColor("#FFFF00")
						.setAuthor(current_lang.Music_Status_Status, bot.user.avatarURL)
						.setDescription(`*${current_lang.Music_Status_Current_Status}*`)
						.setThumbnail(server.queue[0]["YouTubeThumbnail"]).setURL(server.queue[0]["YouTubeLink"])

						.addField(`${current_lang.Music_Status_Current_Song}: ${server.queue[0]["title"]}`, `*(${current_lang.Music_Requested_By} ${server.queue[0]["user"]})*`)
						.addBlankField()

						.addField(current_lang.Music_Status_Track_Loop, CheckInfo_ToBooleanEmoji(server.loopit), true)
						.addField(current_lang.Music_Status_Track_Paused, CheckInfo_ToBooleanEmoji(server.dispatcher_paused), true)

						.addBlankField()

						.addField(current_lang.Music_Status_Uploaded_By, server.queue[0]["YouTubeUploader"], true)
						.addField(current_lang.Music_Status_Song_Duration, `**${server.queue[0]["YouTubeTime"]}**`, true) //temps
						.addBlankField(true)
						.addField(current_lang.Music_Status_Time_Remaining, `**${TimeRemaining}**`, true)

						.addBlankField()

						.addField(current_lang.Music_Status_Views, server.queue[0]["YouTubeViews"], true)
						.addField(current_lang.Music_Status_Link, `[Click here](${server.queue[0]["YouTubeLink"]})`, true)

						.setFooter(`${current_lang.Music_Status_Requested_By} ${message.author.username} • ID: ${message.author.id}`)

					message.channel.send(embedStatus).then(function (msg) {
						deleteMyMessage(msg, 120 * 1000);
					})
				} catch (error) {
					console.log("Status command problem: " + error)
				}
				break;

			//--------
			//#endregion

			//Other Commands
			//#region Other commands

			case "say":
				const SayMessage = message.content.substr(prefix.length + 3);

				if (member_has_MANAGE_MESSAGES) {
					Mess_Channel.send(SayMessage).catch(error => {
						//console.log(error + " -- " + error.name);

						if (error.name == "DiscordAPIError") {
							return message.reply(current_lang.Command_User_Message_Is_Empty).then(function (msg) {
								deleteMyMessage(msg, 9 * 1000)
							})
						}
					});
				} else {
					message.reply(current_lang.Command_User_Need_Permission_Manage_Messages).then(function (msg) {
						deleteMyMessage(msg, 10000);
					})
				}

				break;
			//----------
			case "github":
				sendDMToUser(message, `${current_lang.Command_Github_Project} : https://github.com/RisedSky/discordPandaJS`)

				break;
			//----------
			case "ping":
				Mess_Channel.send(`:ping_pong: ${current_lang.Command_Bot_My_Ping}: ?`).then(function (newMessage) {
					newMessage.edit(newMessage.content.replace("?", ((newMessage.createdTimestamp - message.createdTimestamp) / 10) + ' ms'));
					deleteMyMessage(newMessage, 14 * 1000);
				});
				break;
			//--------
			case "purge":
				try {

					var NumberToDelete = message.content.substr(7);

					if (!args[1]) {
						message.reply(current_lang.Command_Purge_No_Number).then(function (msg) {
							deleteMyMessage(msg, 6000);
						})

						return;
					} else if (!parseInt(NumberToDelete)) {
						console.log("pas un int")
						message.reply(current_lang.Command_Purge_Not_Number.replace("{0}", NumberToDelete)).then(msg => {
							deleteMyMessage(msg, 9 * 1000)
						})
						return;
					}

					if (!BOT_MANAGE_MESSAGESPerm) {
						message.reply(current_lang.Command_Bot_Need_Permission_Manage_Messages).then(function (msg) {
							deleteMyMessage(msg, 15 * 1000)
						});
						return;
					} else if (NumberToDelete <= 0) {
						message.reply(current_lang.Command_Purge_Need_Number).then(function (msg) {
							deleteMyMessage(msg, 5000);
						})
						return;

					} else if (NumberToDelete > 100) {
						message.reply(current_lang.Command_Purge_Max_100_Message_Delete).then(function (msg) {
							deleteMyMessage(msg, 6000);
						})

						return;
					} else if (!member_has_MANAGE_MESSAGES) {
						message.reply(current_lang.Command_User_Need_Permission_Manage_Messages).then(function (msg) {
							deleteMyMessage(msg, 7000);
						})

						return;
					}

					var nmbr = 0;
					var nmbrdeleted = 0;
					setTimeout(() => {
						var allMsgs = message.channel.fetchMessages({ limit: NumberToDelete })
							.then(async messages => {
								let msg = messages.array()
								NumberToDelete = messages.size;
								console.log("Number to delete: " + NumberToDelete);
								Mess_Channel.send(String(current_lang.Command_Purge_X_Messages).replace("{0}", NumberToDelete)).then(msgdeleted => {

									var IntervalDelete = setInterval(DeleteCollectionMessage, 1250)

									function DeleteCollectionMessage() {
										try {
											if (nmbrdeleted == NumberToDelete) {
												msgdeleted.edit(String(current_lang.Command_Purged_X_Messages).replace("{0}", nmbrdeleted).replace("{1}", NumberToDelete))
												deleteMyMessage(msgdeleted, 8 * 1000)
												return clearInterval(IntervalDelete)
											}
											if (time == undefined || time == null) time = 750;
											if (!message.deletable) return
											if (message.pinned) return;

											if (!msg || msg == undefined || msg == null) {

												return clearInterval(IntervalDelete)
											}

											let MsgToDelete = msg.shift()
											console.log(MsgToDelete)
											if (MsgToDelete == null || MsgToDelete == undefined) {
												return clearInterval(IntervalDelete)
											}
											nmbrdeleted++;
											msgdeleted.edit(String(current_lang.Command_Purge_Deleted_X_Messages).replace("{0}", nmbrdeleted))
											MsgToDelete.delete(time)
										} catch (error) {
											console.log(error);

										}
									}

								})
							});
					}, 3500);
				} catch (error) {
					console.log("Purge command problem: " + error)
				}
				break;
			//----------
			case "restart":
				if (message.author.id === "145632403946209280" || message.author.id === "268813812281376769") {
					Mess_Channel.send("Restarting ...");
					bot.user.setStatus("invisible");
					bot.disconnect;
					console.log("Disconnected")
					setTimeout(function () {
						bot.login(BOT_TOKEN);
						console.log("Reconnected")
						bot.user.setStatus("online")
					}, 5000);
				}
				break;
			//-------
			case "random-number":
				if (!args[1]) {
					Mess.reply(current_lang.Command_Random_Number_No_First_Number)
					return;
				} else if (!args[2]) {
					Mess.reply(current_lang.Command_Random_Number_No_Second_Number)
					return;
				}

				if (isNaN(args[1]) == true) {
					if (isNaN(args[2]) == true) {
						Mess.reply(current_lang.Command_Random_Number_No_Number)
						return;
					} else {
						Mess.reply(current_lang.Command_Random_Number_No_Minimum_Value)
						return;
					}
				}
				if (isNaN(args[2]) == true) {
					Mess.reply(current_lang.Command_Random_Number_No_Maximum_Value)
					return;
				}
				args[1] = parseInt(args[1]);
				args[2] = parseInt(args[2]);

				try {

					var argsQueue = message.content.substring(13).split(" ");
					var argMini = args[1];
					var argMaxi = args[2];

					//Debug
					console.log("1: " + argMini)
					console.log("2: " + argMaxi)

					let random_number_min = Math.ceil(argMini);
					let random_number_max = Math.floor(argMaxi);

					let random_number_Calcul = Math.floor(Math.random() * (random_number_max - random_number_min + 1)) + random_number_min;

					message.reply(String(current_lang.Command_Random_Number_Result).replace("{0}", random_number_min).replace("{1}", random_number_max).replace("{2}", random_number_Calcul)).then(function (msg) {
						deleteMyMessage(msg, 600 * 1000)
					});
				} catch (error) {
					console.log("Erreur #367: " + error)
					//message.reply("You failed something... ex: " + prefix + "randomnumber 10 20");
				}
				break;
			//--------
			case "random-member":
				var nbMemb = message.guild.memberCount;
				var memb_list = message.guild.members;
				var rand_member = memb_list.random();
				var embed = new Discord.RichEmbed()
					.setColor("RED")
					.setAuthor(`${current_lang.Command_Random_Member_By} ${message.author.username}`, message.author.avatarURL)
					.setDescription(String(current_lang.Command_Random_Member_User_Chosen).replace("{0}", rand_member).replace("{1}", nbMemb))
				message.channel.send(embed)
				break;
			//--------
			case "poll":
				DeleteUserMessage(false)
				var cont = message.content
				b1 = cont.indexOf(" | ");
				b2 = cont.indexOf(" | ", b1 + 3);
				b3 = cont.indexOf(" | ", b2 + 3);
				if (b3 == -1) b3 = cont.length;
				b4 = cont.indexOf(" | ", b3 + 3);
				if (b4 == -1) b4 = cont.length;
				b5 = cont.indexOf(" | ", b4 + 3);
				if (b5 == -1) b5 = cont.length;
				b6 = cont.indexOf(" | ", b5 + 3);
				if (b6 == -1) b6 = cont.length;
				b7 = cont.indexOf(" | ", b6 + 3);
				if (b7 == -1) b7 = cont.length;
				b8 = cont.indexOf(" | ", b7 + 3);
				if (b8 == -1) b8 = cont.length;
				b9 = cont.indexOf(" | ", b8 + 3);
				if (b9 == -1) b9 = cont.length;

				var question = cont.substr(5, b1 - 5);
				prop1 = cont.substr(b1 + 3, b2 - b1 - 3);
				prop2 = cont.substr(b2 + 3, b3 - b2 - 3);
				prop3 = cont.substr(b3 + 3, b4 - b3 - 3);
				prop4 = cont.substr(b4 + 3, b5 - b4 - 3);
				prop5 = cont.substr(b5 + 3, b6 - b5 - 3);
				prop6 = cont.substr(b6 + 3, b7 - b6 - 3);
				prop7 = cont.substr(b7 + 3, b8 - b7 - 3);
				prop8 = cont.substr(b8 + 3, b9 - b8 - 3);
				prop9 = cont.substr(b9 + 3);

				if (question == "" || prop1 == "" || prop2 == "") {
					message.reply(String(current_lang.Command_Poll_No_Question_Or_Answer.replace("{0}", prefix))).then(msg => {
						deleteMyMessage(msg, 13 * 1000)
					})
					break;
				}

				var embed = new Discord.RichEmbed()
					.setColor("DARK_PURPLE")
					.setAuthor(`${current_lang.Command_Poll_By} ${message.author.username}`, message.author.displayAvatarURL)
					.setTitle(question)
					.addField(prop1, ":one:", true)
					.addField(prop2, ":two:", true)
					.setFooter(AskedBy_EmbedFooter(message.author))
					.setTimestamp();

				if (prop3 != "") embed.addField(prop3, ":three:", true);
				if (prop4 != "") embed.addField(prop4, ":four:", true);
				if (prop5 != "") embed.addField(prop5, ":five:", true);
				if (prop6 != "") embed.addField(prop6, ":six:", true);
				if (prop7 != "") embed.addField(prop7, ":seven:", true);
				if (prop8 != "") embed.addField(prop8, ":eight:", true);
				if (prop9 != "") embed.addField(prop9, ":nine:", true);
				Mess_Channel.send(embed)
					.then(function (msg) {
						msg.react("1%E2%83%A3")
						setTimeout(function () { msg.react("2%E2%83%A3") }, 1000);
						setTimeout(function () { if (prop3 != "") msg.react("3%E2%83%A3") }, 2000);
						setTimeout(function () { if (prop4 != "") msg.react("4%E2%83%A3") }, 3000);
						setTimeout(function () { if (prop5 != "") msg.react("5%E2%83%A3") }, 4000);
						setTimeout(function () { if (prop6 != "") msg.react("6%E2%83%A3") }, 5000);
						setTimeout(function () { if (prop7 != "") msg.react("7%E2%83%A3") }, 6000);
						setTimeout(function () { if (prop8 != "") msg.react("8%E2%83%A3") }, 7000);
						setTimeout(function () { if (prop9 != "") msg.react("9%E2%83%A3") }, 8000);
					});

				break;

			//--------
			case "kappa":
				message.reply({ file: __dirname + "/images/kappa.png" })/*.then(function (msg) {
				deleteMyMessage(msg, 600 * 1000);
			})*/
				break;
			//-------
			case "rekt":
				if (!args[1]) {
					message.reply(current_lang.Command_Rekt_Nobody_To_Rekt).then(function (msg) {
						deleteMyMessage(msg, 10 * 1000)
					})
					return;
				} else if (message.mentions.users.first() === message.author) {
					message.reply(current_lang.Command_Rekt_Cant_Rekt_Yourself).then(function (msg) {
						deleteMyMessage(msg, 10 * 1000)
					})
					return;
				}
				var embed = new Discord.RichEmbed()
					.setColor("RED")
					.setAuthor(`${current_lang.Command_Rekt_By} ${message.author.username}`, message.author.avatarURL)
					.setDescription(String(current_lang.Command_Rekt_Got_Rekt_By).replace("{0}", message.mentions.users.first()).replace("{1}", NotifyUser(message.member.id)))
					.setImage("https://media1.tenor.com/images/f0515e416fd1ba95974412c18fd90d46/tenor.gif?itemid=5327720")
				message.channel.send(embed)
				break;
			//-------
			case "message":
				if (message.author.id != "145632403946209280" && message.author.id != "268813812281376769" && message.author.id != "308674089873309696") return;
				if (!args[2]) {
					message.reply(EmojiRedTickString + "Some arguments are missing").then(function (msg) {
						deleteMyMessage(msg, 10 * 1000)
					});
				}
				bot.fetchUser(args[1]).catch(() => {
					message.reply(EmojiRedTickString + " Sorry, can't find this user ! :thinking:").then(msg => {
						deleteMyMessage(msg, 8 * 1000)
					})
				}).then(function (user) {
					var message_to_send = message.content.slice(prefix.length + args[0].length + args[1].length + 2)
					user.send(message_to_send)
						.then(() => {
							Mess_Channel.send(`${message.author.tag} Sended the message to ${user.tag} - ${NotifyUser(user.id)} \n\`\`\`${message_to_send}\`\`\` `)
						})
						.catch(() => {
							message.reply(EmojiRedTickString + " Sorry but i can't DM him.").then(msg => {
								deleteMyMessage(msg, 8 * 1000)
							});
						});

				});
				break

			//-------
			case "welcome":
				let argsCMD = "`" + "help, on, off, set, show, delete" + "`"

				if (!member_Has_MANAGE_GUILD) {
					message.reply(current_lang.Command_Welcome_User_Dont_Have_Permission)
					return;
				}

				if (args[1] === "on") {
					let activated;
					SQL_GetResult(function (err, result) {
						if (err) console.log("Database error!");
						else {
							if (result == undefined) {
								SQL_Insert_NewServer(message.member)
								message.reply(current_lang.Command_Welcome_Create_Server_To_Database).then(msg => {
									deleteMyMessage(msg, 12 * 1000)
								})
								return;
							}

							activated = result.welcome_status;
							console.log(result.welcome_status);

							if (activated == undefined) {
								SQL_Insert_NewServer(message.member)
								return false;
							}

							if (activated === 1) {
								console.log("Already activated");
								message.reply(current_lang.Command_Welcome_Already_Activated)
								return false;
							} else {
								console.log("Now Activated");
								con.query(`UPDATE ${DB_Model} SET welcome_status = true WHERE serverid = '${message.guild.id}'`, (err, results) => {
									if (err) throw err;

									console.log("welcome_status activated!");
									message.reply(current_lang.Command_Welcome_Now_Activated)
									console.log(result)
								});
							}
						}
					});

				} else if (args[1] === "off") {
					let activated;
					SQL_GetResult(function (err, result) {
						if (err) console.log("Database error!");
						else {
							if (result == undefined) {
								SQL_Insert_NewServer(message.member)
								message.reply(current_lang.Command_Welcome_Create_Server_To_Database).then(msg => {
									deleteMyMessage(msg, 12 * 1000)
								})
								return;
							}

							activated = result.welcome_status;
							console.log(result.welcome_status);

							if (activated === 0) {
								console.log("Already deactivated");
								message.reply(current_lang.Command_Welcome_Already_Deactivated)
								return;
							} else {
								console.log("Now Activated");
								con.query(`UPDATE ${DB_Model} SET welcome_status = false WHERE serverid = '${message.guild.id}'`, (err, results) => {
									if (err) throw err;

									console.log("welcome_status deactivated !");
									message.reply(current_lang.Command_Welcome_Now_Deactivated)
									console.log(results[0])
								});
							}
						}
					});

				} else if (args[1] === "set") {
					let channel = message.mentions.channels.first();
					if (!channel) { message.reply(String(current_lang.Command_Welcome_No_Channel_In_Message).replace("{0}", prefix)); return; }

					console.log(args)
					console.log(args_next)
					const channelMsg = args_next.substr(args[0].length + 1 + args[1].length + 1 + ("<#" + channel.id + ">").length + 1)
					console.log("channelmsg: '" + channelMsg + "'")

					if (channelMsg.length === 0) {
						message.reply(current_lang.Command_Welcome_No_Welcome_Channel_In_Message)
						return;
					}

					message.reply(`${current_lang.Command_Welcome_Setting_Up_Your_Welcome_Message} ${channel} \n\`\`\`\n ${channelMsg} \`\`\` `)

					try {
						//const srv = await ${DB_Model}_DB.findOne({ where: { serverid: message.guild.id } })
						//const welcome_server = await ${DB_Model}_DB.update({ welcome_message: channelMsg, welcome_channel: channel }, { where: { serverid: message.guild.id } })

						//console.log("SQL_GetResult pour le welcome set" + SQL_GetResult(message).welcome_message)
						SQL_UpdateChannelMessage(message, channel);
						SQL_UpdateWelcomeMessage(message, channelMsg)
						return message.channel.send(String(current_lang.Command_Welcome_Message_In_Channel_Changed).replace("{0}", channel));
					}
					catch (e) {
						return message.reply(`${current_lang.Command_Welcome_Error_On_Setting_Welcome_Message} ${e}`);
					}

					//console.log(args[2].split(" ").join(" "))

				} else if (args[1] === "show") {
					var msgToSend = [];
					var show_welcome_channel = "";
					var show_welcome_message = "";
					var show_welcome_status;

					SQL_GetResult(function (err, result) {
						if (err) console.log("Database error!");
						else {
							if (err) throw err;

							if (result == undefined) {
								SQL_Insert_NewServer(message.member)
								message.reply(current_lang.Command_Welcome_Create_Server_To_Database).then(msg => {
									deleteMyMessage(msg, 12 * 1000)
								})
								return;
							}

							show_welcome_channel = result.welcome_channel;

							show_welcome_message = result.welcome_message;

							show_welcome_status = CheckInfo_ToBooleanEmoji(result.welcome_status)

							if (result.welcome_channel == null) {
								show_welcome_channel = "`Not defined`"
							}
							if (result.welcome_message == null) {
								show_welcome_message = "`Not defined`"
							}


							msgToSend.push(String(current_lang.Command_Welcome_Welcome_Channel).replace("{0}", show_welcome_channel))
							msgToSend.push(String(current_lang.Command_Welcome_Welcome_Message).replace("{0}", show_welcome_message))
							msgToSend.push(String(current_lang.Command_Welcome_Welcome_Status).replace("{0}", show_welcome_status))

							message.channel.send(msgToSend)
							msgToSend = [];
						}
					});

				} else if (args[1] === "help") {
					message.reply(
						current_lang.Command_Welcome_Help_Line1 +
						String(current_lang.Command_Welcome_Help_Line2).replace("{0}", prefix) +
						String(current_lang.Command_Welcome_Help_Line3).replace("{0}", prefix) +
						current_lang.Command_Welcome_Help_Line4 +
						current_lang.Command_Welcome_Help_Line5
					)
					return;
				} else {
					message.reply(`${current_lang.Command_Welcome_User_Their_Args} ${argsCMD}`)
					argsCMD = "";
				}
				break;

			//#endregion

			//Encore d'autres commandes
			//#region
			case "bot-info":
				var d = new Date(null);
				d.setSeconds(online_since);
				var bot_online_since_time = d.toISOString().substr(11, 8); // récupere le temps et le transforme en HH:mm:ss

				var time = moment.duration(bot.uptime, "milliseconds");
				console.log(bot.uptime);

				var time_string;
				if (time.get("days") > 1) {
					time_string = time.get("days") + " days, " + time.get("hours") + " hours, " + time.get("minutes") + " minutes, " + time.get("s") + " seconds."

				} else if (time.get("hours") > 1) {
					time_string = time.get("hours") + " hours, " + time.get("minutes") + " minutes, " + time.get("s") + " seconds."

				} else if (time.get("minutes") > 1) {
					time_string = time.get("minutes") + " minutes, " + time.get("s") + " seconds."

				} else if (time.get("seconds") > 1) {
					time_string = time.get("s") + " seconds."

				}


				console.log(bot_online_since_time)
				//var bot_online_since_time = moment(d).format("HH:mm:ss DD-MM-YYYY")
				var bot_online_since_time = time_string
				var bot_date_created = moment(bot.user.createdTimestamp).format("HH:mm:ss DD-MM-YYYY");

				var embedbot_info = new Discord.RichEmbed()
					.setColor("#FFFFFF")
					.setAuthor("Bot-Information", bot.user.avatarURL)
					.setTitle("Created by RisedSky & PLfightX")
					.addField("I'm developed in Node.js", "I'm using Discord.js libraries", true)
					.addField("My node version", process.version, true)
					.addBlankField()
					.addField("Memory Usage", Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 * 100 / 100) + " / " + Math.floor(process.memoryUsage().heapTotal / 1024 / 1024 * 100 / 100) + " Mb", true)
					.addField("My version", bot_version, true)
					.addBlankField()
					.addField("I am created since", bot_date_created, true)
					.addField("I am online since", bot_online_since_time, true)
					.addBlankField()
					.addField("I am in", bot.guilds.size + " servers", true)
					.addField("With", bot.users.size + " users", true)
					//.setFooter("Asked by " + message.author.username + "")
					.setFooter(AskedBy_EmbedFooter(message.author))
					.setTimestamp();
				//.addField("")
				//liste des bêta-testers
				Mess_Channel.send(embedbot_info).then(function (msg) {
					deleteMyMessage(msg, 300 * 1000)
				})

				break;
			//---------
			case "server-info":
				var server_date_created = moment(message.guild.createdTimestamp).format("HH:mm:ss DD-MM-YYYY");

				var embedbot_info = new Discord.RichEmbed()
					.setColor("#FFFFFF")
					.setAuthor("Server-Information", message.guild.iconURL)
					.setTitle("Server: '" + message.guild.name + "' | ID: '" + message.guild.id + "'")
					.addField("Members number", message.guild.memberCount, true)
					.addField("Channels number", message.guild.channels.size, true)
					.addBlankField()
					.addField("Server Region", message.guild.region, true)
					.addField("Server created since", server_date_created, true)
					.addBlankField()
					.addField("Server owner", message.guild.owner + " (" + message.guild.owner.id + ")", true)
					.addField("Roles", message.guild.roles.size, true)
					//.setFooter("Asked by " + message.author.username + "")
					.setFooter(AskedBy_EmbedFooter(message.author))
					.setTimestamp();

				Mess_Channel.send(embedbot_info).then(function (msg) {
					deleteMyMessage(msg, 300 * 1000)
				})

				break;
			//--------
			case "user-info":
				if (!args[1] || !message.mentions.members.first()) {
					message.reply(EmojiRedTickString + " Please add someone to get informations about him (@ him)").then(function (msg) {
						deleteMyMessage(msg, 10 * 1000)
					})
					return;
				}
				var infomember = message.mentions.members.first();
				var infouser = infomember.user;
				var usercreated_date = moment(infouser.createdTimestamp).format("DD-MM-YYYY HH:mm:ss");
				var userjoining_date = moment(infomember.joinedTimestamp).format("DD-MM-YYYY HH:mm:ss");
				var embeduser_info = new Discord.RichEmbed()
					.setColor(infomember.displayHexColor)
					.setAuthor(infomember.displayName + " informations", infouser.displayAvatarURL)
					.setTitle("DiscordTag: " + infouser.tag + " | ID: " + infouser.id)
					.addBlankField()
					.addField("**Account created: **", usercreated_date, true)
					.addField("**Joining date: **", userjoining_date, true)
					.addBlankField()
					.addField("**Avatar url:**", infouser.displayAvatarURL)
					.setFooter(AskedBy_EmbedFooter(message.author))
					.setTimestamp();

				Mess_Channel.send(embeduser_info).then(function (msg) {
					deleteMyMessage(msg, 300 * 1000)
				})

				break;
			//--------
			case "verif-perms":

				var embed = new Discord.RichEmbed()
					.setColor("#00FF00")
					.setAuthor("Permissions checking", bot.user.avatarURL)
					.setThumbnail(message.author.avatarURL)
					.setDescription("Looking **my** permission for **<#" + Mess_Channel.id + ">**")

					.addField("SEND_MESSAGES", PermissionCheck(BOT_SEND_MESSAGESPerm), true)
					.addField("MANAGE_MESSAGES", PermissionCheck(BOT_MANAGE_MESSAGESPerm), true)
					.addField("ADMINISTRATOR", PermissionCheck(BOT_ADMINISTRATORPerm), true)
					.addField("USE_EXTERNAL_EMOJIS", PermissionCheck(BOT_USE_EXTERNAL_EMOJISPerm), true)

					.setFooter("Asked by " + Mess_Member.displayName + " • ID: " + Mess_Member.id);

				Mess_Channel.send(embed).then(function (msg) {
					deleteMyMessage(msg, 25 * 1000);
				})

				//message.guild.me).hasPermissions("SEND_MESSAGES") && c.type === 'text')
				//const truc = message.guild.channels.find(c => c.permissionsFor(message.guild.me).hasPermissions("SEND_MESSAGES") && c.type === 'text')

				break;
			//-------
			case "staff":
				try {
					if (!args[1]) {
						message.reply(current_lang.Command_Staff_No_Message).then(function (msg) {
							deleteMyMessage(msg, 15 * 1000)
						});
						return;
					}

					var msgStaff = message.content.substr(6);
					bot.guilds.forEach(guild => {
						const staff_commands_channels = guild.channels.find("id", "418847993182289926");
						if (!staff_commands_channels) return;
						staff_commands_channels.send(
							"Message de: `" + message.author.tag + "` - ID: `" + message.author.id + "`" +
							"\nSur le serveur: `" + message.guild.name + "` - ID guild: `" + message.guild.id + "`" +
							"\n(via la commande `" + prefix + "staff`) \n```" + msgStaff + "```" +
							"\n------------------------------------------------------------------------------------------"
						);

						message.reply(current_lang.Command_Staff_Sended_Message).then(function (msg) {
							deleteMyMessage(msg, 13 * 1000)
						})
					})

				} catch (error) {
					console.log(error)
				}
				break;

			//--------
			case "servers":
				if (message.author.id === "145632403946209280" || message.author.id === "268813812281376769") {
					var ServerListArray = bot.guilds.array();
					var ServerListString = "";
					ServerListString = "I am on " + bot.guilds.size + " servers\n\n"
					for (var i in ServerListArray) {
						ServerListString += `${i} » Server Name: ${ServerListArray[i].name} - Server ID: ${ServerListArray[i].id}\n| Containing: ${ServerListArray[i].memberCount} members\n| Server Owner: ${ServerListArray[i].owner} - Owner ID: ${ServerListArray[i].ownerID}\n\n`

					}
					message.author.send(ServerListString, { split: true }).then(msg => {
						deleteMyMessage(msg, 600 * 1000);
						ServerListString.length = 0;
						ServerListString = "";
					})
				}
				break;

			//-------
			case "invite":
				try {
					message.author.createDM();
					message.author.send("Hello, thanks for inviting me to your server\n\nHere is my link: https://discordapp.com/oauth2/authorize?&client_id=" + bot.user.id + "&scope=bot&permissions=8");
					message.author.send("And here is the link of my official discord server: " + Server_Link)

				} catch (error) {
					message.reply("Your DM are closed. I can't DM you :worried: ").then(function (msg) {
						deleteMyMessage(msg, 15 * 1000);
					})
					console.log("Invite error: " + error + " | User: " + message.author.username)
				}

				break;
			//-------
			case "credits":
				var embed_credits = new Discord.RichEmbed()
					.setAuthor(bot.user.username, bot.user.avatarURL)
					.setDescription(
						"A big thanks to:\n" +
						"gt-c for the big help in contributing to the bot in github" +
						"Amoky#2264 & Pyrothec06#1012 for the french translation\n" +
						"Showehanle2000#9772 for the russian translation\n" +
						"\nSpecial thanks: \n" +
						"Sloper39#9509, Tard0sTV#8871 for being so active in our server !"
					)
				Mess_Channel.send(embed_credits)
				break;
			//-------
			case "help":

				var help_msgToSend_summary = ("```fix\n" +
					"# » Created by RisedSky & PLfightX" + "\n" +
					"# » And obviously helped by the bêta - testers.```" + "\n" +
					"```dsconfig\n" +
					"The prefix for the server " + message.guild.name + " is '" + prefix + "'\n" +
					"```\n")

				var help_msgToSend_cmds = (
					"```md\n" +
					"<» Music Commands>\n\n" +
					`#» ${prefix}play [title / music's link]\nThe bot will join your channel and will play your music\n\n` +
					`#» ${prefix}play-list [playlist link]\nThe bot will join your channel and will play the playlist\n\n` +
					`#» ${prefix}pause\nThe bot pause the music (resume & pause included in)\n\n` +
					`#» ${prefix}search [title]\nSearch a music link (with embed info like ${prefix}play)\n\n` +
					`#» ${prefix}skip\nThe bot will skip the current music\n\n` +
					`#» ${prefix}stop\nClear the queue and stop the music\n\n` +
					`#» ${prefix}queue\nShow the queue list\n\n` +
					`#» ${prefix}loop\nWill loop the currently song forever\n\n` +
					`#» ${prefix}status\nShow the status of the current song !` +
					"```" +
					"\n\n" + "```md\n" +
					"<» Other Commands>\n\n\n" +
					`#» [NEW COMMAND!!] ${prefix}lang\nChange the language of the bot!\n\n` +
					`#» ${prefix}say [text]\nCommand to speak the bot (Need the perm 'MANAGE_MESSAGES'\n\n` +
					`#» ${prefix}github\nSend you my GitHub project in your DMs\n\n` +
					`#» ${prefix}ping\nShow the ping of the bot\n\n` +
					`#» ${prefix}purge [number]\nClear a selected number of messages (Max 100)\n\n` +
					`#» ${prefix}random-number [min_number] [max_number]\nGenerate a number between one and an another\n\n` +
					//prefix + "restart", "Redémarre le bot **(Expérimental**"
					`#» ${prefix}random-member\nRandomly choose one member of the server\n\n` +
					`#» ${prefix}poll [question | answer1 | answer2 | answer3 ... ]\nCreate a poll with a maximum of 9 answers\n\n` +
					`#» ${prefix}kappa\nSend a kappa image\n\n` +
					`#» ${prefix}rekt [@someone]\nRekt one of your friends\n\n` +
					`#» ${prefix}welcome\nSet a welcome message to your incredibleer !` +

					"\n" + "```" +

					"\n" +
					"```md\n" +
					`#» ${prefix}bot-info\nSend you the information of the bot\n\n` +
					`#» ${prefix}server-info\nSend a lot of information about the currently server\n\n` +
					`#» ${prefix}user-info [@someone]\nGet secret informations about someone\n\n` +
					`#» ${prefix}verif-perms\nTell you about the perms I have in this channel\n\n` +
					`#» ${prefix}staff\nSend a message to my creators\n\n` +
					`#» ${prefix}invite\nGive you the invite link to add me !\n\n` +
					`#» [NEW COMMAND!!] ${prefix}credits\nCredits for people who helped us !\n\n` +
					`#» ${prefix}help\nShow all the bot commands (This message)!` +
					"\n" +
					"```" + "\n\n\n")

				var help_msgToSend_channelTags = (

					"```md\n" +
					"<» Channel Tags>\n\n\n" +
					"#» To use channel tags, just add the tags in a channel topic, it will be detected instantly\n\n" +
					"#» <nocmds>\nAvoid the use of commands in the channel \n\n" +
					"#» <ideas>\nWith this tag, the bot will add a upvote / downvote reaction to every message \n \n" +
					"#» <autopurge:TIME:>\nDelete every message in the channel after TIME seconds" +
					"```")

				sendDMToUser(message, help_msgToSend_summary)
				sendDMToUser(message, help_msgToSend_cmds)
				sendDMToUser(message, help_msgToSend_channelTags)

				break;
			//----------
			case "eval":
				DeleteUserMessage(false)
				let owner_list = "145632403946209280 - 268813812281376769";
				if (!String(owner_list).includes(message.author.id)) return;
				if (!message.author.username == "RisedSky" || !message.author.username == "PLfightX") return;
				if (!message.author.discriminator == "1250" || !message.author.discriminator == "8625") return;

				function clean(text) {
					if (typeof (text) === "string")
						return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
					else
						return text;
				}

				try {
					const code = args_eval.join(" ");
					let evaled = eval(code);

					if (typeof evaled !== "string")
						evaled = require("util").inspect(evaled);

					message.channel.send(clean(evaled), { code: "xl", split: true });
				} catch (err) {
					message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
				}
				break;
			//----------
			default:

				clearInterval(deleteUserMsg);
				try {
					setTimeout(() => {
						message.react("❓").catch(e => {
							if (e.name === "DiscordAPIError") return;
							console.log("Error default > " + e);
						})
						message.react(EmojiThonkong).catch(e => {
							if (e.name === "DiscordAPIError") return;
							console.log("Error default > " + e);
						})
					}, 250);
					setTimeout(() => {
						message.clearReactions().catch(e => {
							if (e.name === "DiscordAPIError") return;
							console.log("Error default > " + e);
						})
					}, 5 * 1000);
				} catch (error) {
					console.log("I can't add any reaction in this message: " + message.content + "\n" + error)
				}
				break;

			//#endregion

		}

	}, 220);
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
//#region Functions

//#region SQL

async function SQL_Insert_NewServer(member) {
	con.query(`INSERT INTO ${DB_Model} (servername, serverid, prefix, lang, welcome_status) VALUES (?, ?, ?, ?, ?)`, [member.guild.name, member.guild.id, prefix, "english", false], (err, results) => {
		if (err) console.log(err);
		console.log("Inserted the new server !");
	});
}


async function SQL_UpdateLang(message, set_this, set_that) {
	con.query(`UPDATE ${DB_Model} SET ${set_this} = ? WHERE serverid = ${message.guild.id}`, [set_that], (err, results) => {
		if (err) console.log(err);

		console.log(`Changed successfully '${set_this}' to '${set_that}'`); // results contains rows returned by server
		lang = set_that;
		current_lang = require(`./lang/${lang}.js`).lang;
	});
}

async function SQL_UpdateSomething(message, set_this, set_that) {
	con.query(`UPDATE ${DB_Model} SET ${set_this} = ? WHERE serverid = ${message.guild.id}`, [set_that], (err, results) => {
		if (err) console.log(err);

		console.log(`Changed successfully '${set_this}' to '${set_that}'`); // results contains rows returned by server
	});
}

async function SQL_UpdateWelcomeMessage(message, welcome_msg) {
	con.query(`UPDATE ${DB_Model} SET welcome_message = ? WHERE serverid = ${message.guild.id}`, [welcome_msg], (err, results) => {
		if (err) console.log(err);

		console.log("Changed successfully the welcome message to " + welcome_msg); // results contains rows returned by server
	});
}

async function SQL_UpdateChannelMessage(message, channel) {
	con.query(`UPDATE ${DB_Model} SET welcome_channel = ? WHERE serverid = '${message.guild.id}'`, ["<#" + channel.id + ">"], (err, results) => {
		if (err) console.log(err);

		console.log("Changed successfully the channel to " + channel); // results contains rows returned by server
	});
}
//#endregion

//#region Important functions
function sendDMToUser(message, msgToSend) {
	message.author.createDM().catch(e => {
		if (e.name === "DiscordAPIError") {
			message.reply("Sorry but i can't DM you, open your DM please.")
			return;
		}
	})

	message.author.send(msgToSend)
		.then(msg => {
			deleteMyMessage(msg, 600 * 1000)
		})
		.catch(e => {
			if (e.name === "DiscordAPIError") {
				message.reply("Sorry but i can't DM you, open your DM please.")
				return;
			}
		})
}

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
	setTimeout(ChangeState1, 30000);
}

function AskedBy_EmbedFooter(author) {
	return `Asked by ${author.username} • ID: ${author.id}`;
}

function deleteMyMessage(message, time) {
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

function DeleteTheMessage(message, time) {
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
			console.log(`Deleted ${message.content}`);
		} else console.log(`Not permitted`);

	} catch (error) {
		console.log(error);

	}
}

function NotifyUser(ID) {
	return `<@${ID}>`
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

function PermissionCheck(PermToCheck) {
	if (PermToCheck === true) {
		return PermissionYes;
	} else {
		return PermissionNo;
	}
}
//#endregion



//#region "Functions pour la musique"

function search_video(message, query) {
	request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, (error, response, body) => {

		var json = JSON.parse(body);

		if ("error" in json) {
			message.reply("Notify RisedSky with a screen to this error: ```\n An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason + "```")
				.then(function (msg) {
					deleteMyMessage(msg, 10000);
				})
		} else if (json.items.length === 0) {
			message.reply("No videos found with your criteria: ```" + query + "```")
				.then(function (msg) {
					deleteMyMessage(msg, 20 * 1000);
				})
		} else {
			add_to_queue(json.items[0].id.videoId, message);
		}
	})
}

function add_to_queue(video, message) {
	var server = servers[message.guild.id];

	var video_id = video;

	var playit = server.playit;

	YTDL.getInfo("https://www.youtube.com/watch?v=" + video, (error, info) => {
		if (error) {
			message.reply("The requested video (" + video + ") does not exist or cannot be played.").then(function (msg) {
				deleteMyMessage(msg, 15000);
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
					.setFooter(AskedBy_EmbedFooter(message.author))
				message.channel.send(embed).then(function (msg) {
					deleteMyMessage(msg, (YouTubeTimeSec * 1000) - 10);
				})
			}
		}

		if (!playit) {//Si on NE doit PAS jouer la musique alors

			let EmbedAuthorName = "Song searched via YouTube";
			let EmbedAuthorIcon = "https://cdn.discordapp.com/emojis/" + YouTube_Logo_ID + ".png?v=1";

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

				deleteMyMessage(msg, 600 * 1000)
			})
		}

		if (playit) {
			if (!message.guild.voiceConnection) {
				server.loopit = false;
				server.dispatcher_paused = false;
				message.member.voiceChannel.join().then(function (connection) {
					if (!message.guild.me.serverDeaf) { message.guild.me.setDeaf(true, "Save bot's bandwith") }

					play(connection, message);
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

function queue_playlist(playlistId, message, pageToken = '') {
	var Number_Added = 0;
	var server = servers[message.guild.id];


	request("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + "&key=" + yt_api_key + "&pageToken=" + pageToken, (error, response, body) => {
		var json = JSON.parse(body);

		if ("error" in json) {
			message.reply("An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason).then(msg => {
				deleteMyMessage(msg, 15 * 1000)
			});
		} else if (json.items.length === 0) {
			message.reply("No videos found within playlist.").then(msg => {
				deleteMyMessage(msg, 15 * 1000)
			});
		} else {
			for (var i = 0; i < json.items.length; i++) {
				server.annonce_it = false;
				add_to_queue(json.items[i].snippet.resourceId.videoId, message)
				Number_Added++;
			}

			if (json.nextPageToken == null) {
				message.channel.send("I added a total of " + Number_Added + " musics.").then(msg => {
					deleteMyMessage(msg, 20 * 1000)
				})

				Number_Added = 0;
				return;
			}

			queue_playlist(playlistId, message, json.nextPageToken)
		}
	});
}


function get_video_id(string) {
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

function play(connection, message) {

	try {
		var server = servers[message.guild.id];

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
			.setAuthor("Now playing", "https://cdn.discordapp.com/emojis/" + YouTube_Logo_ID + ".png?v=1")
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
			.setFooter("Asked by " + message.member.displayName + " • ID: " + message.author.id);


		message.channel.send(embed).then(function (msg) {
			deleteMyMessage(msg, server.queue[0]["YouTubeTimeSec"] * 1000);
		})

		server.dispatcher = connection.playStream(
			YTDL(video_id, { filter: "audioonly", audioEncondig: "opus", audioBitrate: "64" })
		);

		server.dispatcher.setVolume(0.3);

		server.dispatcher.on("end", function () {

			if (!server.loopit) {
				server.queue.splice(0, 1);
			}

			if (server.queue[0]) {
				setTimeout(() => {
					play(connection, message);
				}, 1000);
			} else {
				if (message.guild.voiceConnection) {
					message.channel.send(EmojiGreenTickString + " Finished the queue from channel: `" + message.guild.voiceConnection.channel.name + "` :wave:").then(function (msg) {
						deleteMyMessage(msg, 13 * 1000);
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