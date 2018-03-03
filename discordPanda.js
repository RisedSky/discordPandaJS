const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const URL = require('url');
const request = require("request");
const moment = require("moment");
const bot = new Discord.Client({ autoReconnect: true });

var whitelistedServer = require("./whitelistServer.js");
var StringWhitelistServer = String(whitelistedServer.WhiteListServer);
var BlackListUser = require("./blacklistUser.js");
var StringBlackListUser = String(BlackListUser.BlackListUser);
var DefaultGuildID = 412262889156771842;

//#region Dev
//--------Dev----------
yt_api_key = process.env.yt_api_key;

var BOT_TOKEN = process.env.BOT_TOKEN;
bot.login(BOT_TOKEN);

var prefix = "*";
//--------Dev----------
//#endregion

var prefixLog = "[!] ";
var servers = {};
//var now_playing_data = {};
var online_since = 0;
function datenow() {
	online_since++;
}

var Server_Link = "htto://discord.gg/52PcVRh";

//---- ALL EMOJIS ------
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
//---- ALL EMOJIS ------


//Pour le request song
var YouTubeThumbnail //Défini la miniature
	, YouTubeTitle //Défini le titre de la vidéo
	, YouTubeTime //Défini le temps de la vidéo
	, YouTubeLink; //Défini le lien de la vidéo

//var CommandList = ["restart", "leave", "join", "", ""];

function ChangeState1() {
	bot.user.setActivity(prefix + "help | By RisedSky & PLfightX");
	setTimeout(ChangeState2, 30000);
}

function ChangeState2() {
	bot.user.setActivity(prefix + "help | GitHub : https://goo.gl/Q7JtrS");
	setTimeout(ChangeState3, 30000);
}

function ChangeState3() {
	bot.user.setActivity(prefix + "help | On " + bot.guilds.size + " servers with " + bot.users.size + " members");
	setTimeout(ChangeState1, 30000);
}

function AskedBy_EmbedFooter(author) {
	return `Asked by ${author.username} • ID: ${author.id}`;
	//.setFooter("Asked by " + message.member. + " • ID: " + message.author.id);
}

function deleteMyMessage(message, time) {
	try {
		if (time === null) {
			time = 750;
			//console.log("time changed to 750 bcs it's null")
		}

		if (!message.author.name === bot.user.name) {
			//console.log("Not my message")
			return;
		}
		//console.log("deleted: " + message)
		message.delete(time).catch(error => (console.log("deleteMyMessage prblm : " + error)));
	} catch (error) {
		console.log("Problem on deleteMyMessage function: " + error)
	}
}

function NotifyUser(ID) {
	return `<@${ID}>`
}

function PermissionCheck(PermToCheck) {
	if (PermToCheck === true) {
		return PermissionYes;
	} else {
		return PermissionNo;
	}
}


bot.on('ready', () => { //When bot is ready
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
	if (bot.guilds.exists("fetchAuditLogs", "ban")) {
		console.log("Il y'a eu des bans");
	} else {
		console.log("Pas eu de ban");
	}

	for (var i in bot.guilds.array()) {
		console.log(i + " » '" + bot.guilds.array()[i] + "'")
	}

})

bot.on('guildMemberAdd', member => {
	//When someone join a server wher the bot is too

	//console.log("Une nouvelle personne vient de rejoindre: " + member.displayName)

	if (member.guild.id == DefaultGuildID) {
		try {
			const defaultChannel = member.guild.channels.find(c => c.permissionsFor(member.guild.me).has("SEND_MESSAGES") && c.type === 'text');

			defaultChannel.send("Bienvenue sur mon serveur " + NotifyUser(member.id) + ", prend du bon temps parmi nous !")
			console.log(member.guild.roles.find("name", "Bêta-Tester").id);
			RoleMember = member.guild.roles.find("name", "Bêta-Tester").id;

			setTimeout(function () {
				member.addRole(RoleMember, "Auto joining role");
			}, 3000);
		} catch (error) {
			console.log("guildMemberAddError : " + error);
		}
	} else {
		return;
	}

})

bot.on('guildCreate', Guild => { //Quand le bot est ajouté sur un serveur

	const defaultChannel = Guild.channels.find(c => c.permissionsFor(Guild.me).has("SEND_MESSAGES") && c.type === 'text');

	var StringallListServers = "";
	var allListServers = bot.guilds.array();

	for (var i in whitelistedServer.WhiteListServer) {
		//Debug => console.log(whitelistedServer.WhiteListServer[i])
		StringallListServers += whitelistedServer.WhiteListServer[i] + ","
	}

	if (StringallListServers.includes(Guild.id)) {
		console.log("The server i joined is whitelisted" + Guild.name + "' | ID: " + Guild.id + " - Name: " + Guild.name);

		defaultChannel.send(EmojiGreenTickString + " This server is whitelisted").then(function (msg) {
			deleteMyMessage(msg, 8 * 1000)
		})
	}

	if (!StringallListServers.includes(Guild.id)) {
		console.log("I just left the server bcs it's not whitelisted: '" + Guild.name + "' | ID: " + Guild.id + " - Name: " + Guild.name);

		defaultChannel.send(EmojiProhibitedString + " This server is not whitelisted ! \nDM my creators to be whitelisted ! (or use *staff command where the bot is)")

		setTimeout(() => {
			Guild.leave();
		}, 3000);

		return;
	}

	msgToSend = [];
	msgToSend.push("Hey! I'm **" + bot.user.username + "**\n")
	msgToSend.push("You can use **`" + prefix + "help`** to see my commands.");
	//msgToSend.push("I'm also in development and, if you want to contribute to me you can simply go here: https://github.com/RisedSky/discordPandaJS");
	msgToSend.push("Here is my discord server: " + Server_Link)
	msgToSend.push("https://cdn.discordapp.com/attachments/413838786439544833/416972991360925698/tenor.png")

	defaultChannel.send(msgToSend);

})


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

			/*
			console.log(json.items[0].id);
			console.log(json.items[0].id.videoId);
			console.log(message.content + "\n");
			*/
		}
	})
}

function add_to_queue(video, message) {
	var server = servers[message.guild.id];

	//console.log("Add to queue | Video: " + video)
	var video_id = video;
	//console.log("Add to queue | video_id: " + video_id)

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

		var YouTubeTimeSec = info.length_seconds //défini en secondes
			, YouTubeViews = info.view_count //défini le nombre de vues de la vidéo
			, YouTubeUploader = info.author.name //récupere le nom du YTBeur
			, YouTubeTitle = info.title //récupere le titre
			, YouTubeThumbnail = info.thumbnail_url //récupere la minia
			, YouTubeLink = info.video_url //récupere le lien de la vidéo
			, YouTubeTime = result

		if (playit) {
			embed = new Discord.RichEmbed()
				.setColor("#00FF00")

				.setThumbnail(YouTubeThumbnail).setURL(YouTubeLink) //miniature + lien vers la vidéo en cliquant sur la minia

				//petit logo à gauche du titre
				.setTitle("Added to the queue in position [" + server.queue.length + "]")

				.addField("Added " + YouTubeTitle, "*requested by " + message.author.username + "*")
				.setFooter(AskedBy_EmbedFooter(message.author))
			message.channel.send(embed).then(function (msg) {
				deleteMyMessage(msg, (YouTubeTimeSec * 1000) - 10);
			})
		}

		if (!playit) {
			//Si on NE doit PAS jouer la musique alors
			EmbedAuthorName = "Song searched via YouTube";
			EmbedAuthorIcon = "https://cdn.discordapp.com/emojis/" + YouTube_Logo_ID + ".png?v=1";

			search_embed = new Discord.RichEmbed()
				.setColor("#00FF00")


				.setThumbnail(YouTubeThumbnail).setURL(YouTubeLink) //miniature + lien vers la vidéo en cliquant sur la minia

				//petit logo à gauche du titre
				.setAuthor(EmbedAuthorName, EmbedAuthorIcon)
				.setTitle(YouTubeTitle)

				.addField("Your request is", "```" + message.content + "```")

				.addBlankField()

				.addField("Uploaded by", YouTubeUploader, true)
				.addField("Duration", "**" + YouTubeTime + "**", true) //temps

				.addBlankField()

				.addField("Views", YouTubeViews, true)
				.addField("Link", "[Click here](" + YouTubeLink + ")", true)

				.setFooter("Asked by " + message.member.displayName + " • ID: " + message.author.id);


			message.channel.send(search_embed).then(function (msg) {

				deleteMyMessage(msg, 600 * 1000)
			})
		}

		/*
			if (playit) {
				//Si on doit jouer la musique alors
				EmbedAuthorName = "Song added via YouTube";
				EmbedAuthorIcon = "https://cdn.iconscout.com/public/images/icon/premium/png-512/volume-high-song-sound-35c8ba26d38fbd69-512x512.png";
			} else {
				//Si on NE doit PAS jouer la musique alors
				EmbedAuthorName = "Song searched via YouTube";
				EmbedAuthorIcon = "https://cdn.discordapp.com/emojis/" + YouTube_Logo_ID + ".png?v=1";
			}

			embed = new Discord.RichEmbed()
				.setColor("#00FF00")


				.setThumbnail(YouTubeThumbnail).setURL(YouTubeLink) //miniature + lien vers la vidéo en cliquant sur la minia

				//petit logo à gauche du titre
				.setAuthor(EmbedAuthorName, EmbedAuthorIcon)
				.setTitle(YouTubeTitle)

				.addField("Your request is", "```" + message.content + "```")

				.addBlankField()

				.addField("Uploaded by", YouTubeUploader, true)
				.addField("Duration", "**" + YouTubeTime + "**", true) //temps

				.addBlankField()

				.addField("Views", YouTubeViews, true)
				.addField("Link", "[Click here](" + YouTubeLink + ")", true)
					
				.setFooter("Asked by " + message.member.displayName + " • ID: " + message.author.id);


			message.channel.send(embed).then(function (msg) {
				if (playit) {
					//Si on doit jouer la musique alors
					deleteMyMessage(msg, YouTubeTimeSec * 1000);
				} else {
					deleteMyMessage(msg, 600 * 1000)
				}
			})
		*/

		if (playit) {
			if (!message.guild.voiceConnection) {
				server.loopit = false;
				server.disptacher_paused = false;
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

/*
//THIS SHOULD NOT BE USED NOW
function get_Video_Info(link, message, playit) {


	try {
		var parsed = URL.parse(link);

		if (parsed && parsed.host) {
			// YouTube URL
			if (parsed.host.match(/(www\.)?youtube.com|(www\.)?youtu.be/i)) {
				var video_id = get_video_id(link)
			}
		} else {
			var video_id = link;
		}

		//console.log("video_id => " + video_id)


		YTDL.getInfo(video_id, function (err, info) {

			YouTubeTimeSec = info.length_seconds; //défini en secondes
			YouTubeViews = info.view_count; //défini le nombre de vues de la vidéo
			YouTubeUploader = info.author.name; //récupere le nom du YTBeur
			YouTubeTitle = info.title; //récupere le titre
			YouTubeThumbnail = info.thumbnail_url; //récupere la minia
			YouTubeLink = info.video_url; //récupere le lien de la vidéo

			var date = new Date(null); //défini comme null la date
			date.setSeconds(YouTubeTimeSec); //défini la date avec des secondes
			var result = date.toISOString().substr(11, 8); // récupere le temps et le transforme en HH:mm:ss

			YouTubeTime = result;

			//console.log("get_video_info => " + YouTubeTimeSec, YouTubeViews, YouTubeUploader, YouTubeTitle, YouTubeThumbnail, YouTubeLink, YouTubeTime);
			//return YouTubeTimeSec, YouTubeViews, YouTubeUploader, YouTubeTitle, YouTubeThumbnail, YouTubeLink, YouTubeTime;setTimeout(() => {
			//get_Video_Info(String("https://www.youtube.com/watch?v=JOfqoq3_mEE"));

			if (server.playit) {
				//Si on doit jouer la musique alors
				EmbedAuthorName = "Song added via YouTube";
				EmbedAuthorIcon = "https://cdn.iconscout.com/public/images/icon/premium/png-512/volume-high-song-sound-35c8ba26d38fbd69-512x512.png";
			} else {
				//Si on NE doit PAS jouer la musique alors
				EmbedAuthorName = "Song searched via YouTube";
				EmbedAuthorIcon = "https://cdn.discordapp.com/emojis/" + YouTube_Logo_ID + ".png?v=1";
			}

			embed = new Discord.RichEmbed()
				.setColor("#00FF00")


				.setThumbnail(YouTubeThumbnail).setURL(YouTubeLink) //miniature + lien vers la vidéo en cliquant sur la minia

				//petit logo à gauche du titre
				.setAuthor(EmbedAuthorName, EmbedAuthorIcon)
				.setTitle(YouTubeTitle)

				.addField("Your request is", "```" + message.content + "```")

				.addBlankField()

				.addField("Uploaded by", YouTubeUploader, true)
				.addField("Duration", "**" + YouTubeTime + "**", true) //temps

				.addBlankField()

				.addField("Views", YouTubeViews, true)
				.addField("Link", "[Click here](" + YouTubeLink + ")", true)
				
				.setFooter("Asked by " + message.member.displayName + " • ID: " + message.author.id);


			message.channel.send(embed).then(function (msg) {
				if (playit) { //Si on doit jouer la musique alors
					deleteMyMessage(msg, YouTubeTimeSec * 1000);
				} else {
					deleteMyMessage(msg, 600 * 1000)
				}
			})
		}, 1000);

	} catch (error) {
		console.log("get_Video_Info problem => " + error)
	}
}
*/

function play(connection, message) {

	try {
		var server = servers[message.guild.id];

		var video_id = server.queue[0]["id"];
		var title = server.queue[0]["title"];
		var user = server.queue[0]["user"];

		server.now_playing_data["title"] = title;
		server.now_playing_data["user"] = user;

		//console.log("Le play => " + message)
		//console.log("[play] serveur queue [0] => " + server.queue[0])
		//console.log("[play] message.content => " + message.content)

		var playit = server.playit;

		/*
		var date = new Date(null); //défini comme null la date
		date.setSeconds(server.queue[0]["YouTubeTimeSec"]); //défini la date avec des secondes
		var result = date.toISOString().substr(11, 8); // récupere le temps et le transforme en HH:mm:ss
		*/

		/*
				if (playit) {
					//Si on doit jouer la musique alors
					EmbedAuthorName = "Song added via YouTube";
					EmbedAuthorIcon = "https://cdn.iconscout.com/public/images/icon/premium/png-512/volume-high-song-sound-35c8ba26d38fbd69-512x512.png";
				} else {
					//Si on NE doit PAS jouer la musique alors
					EmbedAuthorName = "Song searched via YouTube";
					EmbedAuthorIcon = "https://cdn.discordapp.com/emojis/" + YouTube_Logo_ID + ".png?v=1";
				}
		*/

		embed = new Discord.RichEmbed()
			.setColor("#00FF00")


			.setThumbnail(server.queue[0]["YouTubeThumbnail"]).setURL(server.queue[0]["YouTubeLink"]) //miniature + lien vers la vidéo en cliquant sur la minia

			//petit logo à gauche du titre
			.setAuthor("Now playing", "https://cdn.discordapp.com/emojis/" + YouTube_Logo_ID + ".png?v=1")
			.setTitle(server.queue[0]["YouTubeTitle"])

			.addField("Your request is", "```" + server.queue[0]["MessContent"] + "```")

			.addBlankField()

			.addField("Uploaded by", server.queue[0]["YouTubeUploader"], true)
			.addField("Duration", "**" + server.queue[0]["YouTubeTime"] + "**", true) //temps

			.addBlankField()

			.addField("Views", server.queue[0]["YouTubeViews"], true)
			.addField("Link", "[Click here](" + server.queue[0]["YouTubeLink"] + ")", true)
			/*.setAuthor(YouTubeTitle, message.author.avatarURL)
			Code qui permet de définir le titre et le logo du demandeur
			*/
			.setFooter("Asked by " + message.member.displayName + " • ID: " + message.author.id);


		message.channel.send(embed).then(function (msg) {
			/*
			if (playit) {
			//Si on doit jouer la musique alors
			*/
			deleteMyMessage(msg, server.queue[0]["YouTubeTimeSec"] * 1000);
			/*
		} else {
			deleteMyMessage(msg, 600 * 1000)
		}
		*/
		})



		server.dispatcher = connection.playStream(
			YTDL(video_id, { filter: "audioonly", audioEncondig: "opus", audioBitrate: "64" })
		);

		server.dispatcher.setVolume(0.3);

		/*
		message.channel.send(`Now playing: '${title}' requested by '${user}'`).then(function (msg) {
			deleteMyMessage(msg, server.queue[0]["YouTubeTimeSec"] * 1000)
		})
		*/

		//console.log(currentlySong)

		server.dispatcher.on("end", function () {

			if (!server.loopit) {
				server.queue.splice(0, 1);
			}

			if (server.queue[0]) {
				setTimeout(() => {
					play(connection, message);
				}, 1000);
			} else {
				//connection.disconnect;
				if (message.guild.voiceConnection) {
					message.channel.send("Finished the queue from channel: `" + message.guild.voiceConnection.channel.name + "` :wave:").then(function (msg) {
						deleteMyMessage(msg, 15 * 1000);
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

bot.on('message', message => { //Quand une personne envoi un message
	if (!message.guild) {
		if (message.content.startsWith(prefix + "invite")) {
			message.author.createDM();
			message.author.send("Hello, thanks for inviting me to your server\n\nHere is my link: https://discordapp.com/oauth2/authorize?&client_id=" + bot.user.id + "&scope=bot&permissions=8");
			message.author.send("And here is the link of my official discord server: " + Server_Link)
		}
		return;
	}

	//vérifie si le serveur est déjà dans la liste
	if (!servers[message.guild.id]) {
		servers[message.guild.id] = {
			queue: [],
			now_playing_data: {},
			loopit: Boolean,
			playit: Boolean,
			disptacher_paused: Boolean
		}
	}

	var channelTopic = String(message.channel.topic).toLowerCase();

	try {

		if (channelTopic.includes("<ideas>")) {
			if (!message.author.bot) {
				//console.log("Le salon " + message.channel.name + " | Contient 'ideas' | Serveur: " + message.guild.name)
				setTimeout(() => {
					message.react(EmojiUpvote)
				}, 400);
				setTimeout(() => {
					message.react(EmojiDownvote)
				}, 1000);
				//return;
			}
		}
		if (channelTopic.includes("<wait:")) {
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
			message.delete(purge_sec * 1000).catch(error => (console.log("autopurge prblm : " + error)));
			}
				}
			//return;
		}
		}
		if (channelTopic.includes("<nocmds>")) {
			if (!message.content.startsWith(prefix)) return;

			message.react(EmojiRedTick)
			setTimeout(() => {
				message.clearReactions();
			}, 6 * 1000);

			/*message.reply(EmojiProhibitedString + " Sorry, but in the channelTopic it say `<nocmds>` !").then(function (msg) {
				deleteMyMessage(msg, 6500)
			})*/
			return;
		}

	} catch (error) {
		console.log("channeTopic problem: " + error);
	}

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	//Declaring variable
	var MessageID = message.id;
	var args = message.content.substring(prefix.length).split(" ");
	var Mess = message;
	var Mess_Channel = message.channel;
	var Mess_Member = message.member;
	if (Mess_Member.voiceChannel) { var Mess_voiceChannel = message.member.voiceChannel; }

	//l'ajoute alors
	var server = servers[message.guild.id];

	//#region Permission Du Bot
	const BOT_SEND_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("SEND_MESSAGES") && message.channel.type === 'text'
	const BOT_MANAGE_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("MANAGE_MESSAGES") && message.channel.type === 'text'
	const BOT_ADMINISTRATORPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("ADMINISTRATOR") && message.channel.type === 'text'
	const BOT_USE_EXTERNAL_EMOJISPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("USE_EXTERNAL_EMOJIS") && message.channel.type === 'text'

	//#endregion


	//#region Permission de la personne
	const member_Has_BAN_MEMBERS = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("BAN_MEMBERS") && message.channel.type === 'text'

	const member_has_MANAGE_MESSAGES = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("MANAGE_MESSAGES") && message.channel.type === 'text'

	//#endregion

	try {
		message.delete(1500).catch(error => console.log("can't delete this message: " + error));
	} catch (error) {
		console.log("Can't delete this message: " + error)
	}

	switch (args[0].toLowerCase()) {


		//#region Musique
		// - - Musique
		case "play":
			if (!args[1]) {
				message.react("❌");
				message.reply("Please tell me something to play (a link or a title)").then(function (msg) {
					deleteMyMessage(msg, 16 * 1000);
				})
				return;

			} else if (!Mess_Member.voiceChannel) {
				message.react("❌");
				message.reply("You have to be connected to a vocal channel").then(function (msg) {
					deleteMyMessage(msg, 16 * 1000);
				})
				return;
			} else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
				message.react("❌");
				message.reply("You have to be listening (not deafen)").then(function (msg) {
					deleteMyMessage(msg, 16 * 1000);
				})
				return;
			}

			try {
				server.playit = true;

				var parsed = URL.parse(args[1]);
				if (parsed && parsed.host) {
					// YouTube URL
					if (parsed.host.match(/(www\.)?youtube.com|(www\.)?youtu.be/i)) {
						console.log("C'est un lien youtube")
						console.log(args[1]);

						q = args[1]

						if (args[1].includes("&t=")) {
							console.log("ça donnerait => " + args[1].split("&t="));
							q = args[1].split("&t=").shift();
						}


						search_video(message, q);

						return;

					} else if (parsed.host.match(/(www\.)?soundcloud.com/i)) {
						console.log("C'est du soundcloud")
						message.reply("Soundcloud isn't actually supported. Soon :tm:").then(function (msg) {
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
					//console.log(argsSearch)
					//console.log("q => " + q)
					search_video(message, q);
					return;
				}


			} catch (error) {
				console.log("Erreur dans le play, quelque chose ne va pas: " + error)
			}

			break;
		//-------
		case "search":
			if (!args[1]) {
				message.react("❌");
				message.reply("Please, put a music's title").then(function (msg) {
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
			/*console.log(argsSearch);
			console.log("q => " + q);*/
			search_video(message, q);

			break;
		//-------
		case "skip":

			if (!Mess_Member.voiceChannel) {
				message.reply("You should be in a vocal channel before asking me to skip some musics.").then(function (msg) {
					deleteMyMessage(msg, 6000);
				})
				return;
			} else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
				message.reply("You should not be deafen *(For saving some bandwidth of the bot)*").then(function (msg) {
					deleteMyMessage(msg, 6000);
				})
				return;

			} else if (!Mess_Member.voiceChannel.name === message.guild.voiceConnection.channel.name) {
				message.reply("You are not in the same vocal channel as me.")
					.then(function (msg) {
						deleteMyMessage(msg, 6000);
					})
				return;
			} else if (!server.queue[1]) {
				message.reply("I didn't found any other music.").then(function (msg) {
					deleteMyMessage(msg, 5000)
				})
				return;
			}
			//console.log("User: " + Mess_Member.voicechannel.name + " | " + "Me: " + message.guild.voiceConnection.channel.name)

			console.log(server.dispatcher);

			video_id = server.queue[1]["id"];
			title = server.queue[1]["title"];
			user = server.queue[1]["user"];

			/*if (currentlySong === null) {
				message.reply("No music is actually playing.").then(function (msg) {
					deleteMyMessage(msg, 10000)
				})
				return;
			}*/

			if (server.dispatcher) {
				var msg = [];
				msg.push("Successfuly skipped the song: `" + server.now_playing_data["title"] + "` *(requested by " + server.now_playing_data["user"] + ")* \n\n");
				msg.push("Now playing: `" + title + "` *(requested by " + user + ")*")
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

			//var server = servers[message.guild.id];

			if (message.guild.voiceConnection) {
				for (var i = server.queue.length - 1; i >= 0; i--) {
					server.queue.splice(i, 1);
				}
				Mess_Channel.send("Stopped all the music from channel: `" + message.guild.voiceConnection.channel.name + "` :wave:").then(function (msg) {
					deleteMyMessage(msg, 20 * 1000);
				})
				message.guild.voiceConnection.disconnect();
			}
			break;
		//-------
		case "queue":

			var argsQueue = message.content.substring(5).split(" ");
			//var server = servers[message.guild.id];
			var xQueue = server.queue;
			//var answer = "";

			try {
				// CE CODE FONCTIONNE
				/*if (argsQueue[1] === "list") {
					Mess_Channel.send("Oui.");
				}*/

				if (!xQueue[0]) {
					message.reply(EmojiRedTickString + " The queue is actually empty.").then(function (msg) {
						deleteMyMessage(msg, 20 * 1000);
					})
					return;
				}

				embedQueue = new Discord.RichEmbed()
					.setColor("#ffa500")
					.setAuthor("Queue list", bot.user.avatarURL)
					.setDescription("*Here is your queue list*")
					.setFooter("Queue list requested by " + message.author.username + " • ID: " + message.author.id)
					.addBlankField();

				for (var i in xQueue) {
					embedQueue.addField("[" + i + "] » " + xQueue[i]['title'], "*requested by " + xQueue[i]['user'] + "*")
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
					message.reply(`:ok_hand: \`${server.queue[0]["title"]}\` won't be repeated :wink: ${EmojiGreenTickString}`).then(function (msg) {
						deleteMyMessage(msg, 10000);
					})
				} else {
					server.loopit = true;
					message.reply(`:ok_hand: \`${server.queue[0]["title"]}\` will be repeated :wink: ${EmojiGreenTickString}`).then(function (msg) {
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
				message.reply(EmojiRedTickString + " There's no music").then(function (msg) {
					deleteMyMessage(msg, 15 * 1000)
				})
				return;
			}
			function CheckInfo_ToBooleanEmoji(thing) { if (thing) { return "Yes " + EmojiGreenTickString } else { return "No " + EmojiRedTickString } }
			try {
				embedStatus = new Discord.RichEmbed()
					.setColor("#FFFF00")
					.setAuthor("Status", bot.user.avatarURL)
					.setDescription("*The current status of the song*")
					.setThumbnail(server.queue[0]["YouTubeThumbnail"]).setURL(server.queue[0]["YouTubeLink"])

					.addField("The Current song: " + server.queue[0]["title"], " *(requested by " + server.queue[0]["user"] + ")*")
					.addBlankField()

					.addField("Is the track looped ?", CheckInfo_ToBooleanEmoji(server.loopit), true)
					.addField("Is the track paused ?", CheckInfo_ToBooleanEmoji(server.disptacher_paused), true)

					.addBlankField()

					.addField("Uploaded by", server.queue[0]["YouTubeUploader"], true)
					.addField("Duration", "**" + server.queue[0]["YouTubeTime"] + "**", true) //temps

					.addBlankField()

					.addField("Views", server.queue[0]["YouTubeViews"], true)
					.addField("Link", "[Click here](" + server.queue[0]["YouTubeLink"] + ")", true)


					.setFooter("Status requested by " + message.author.username + " • ID: " + message.author.id)

				message.channel.send(embedStatus).then(function (msg) {
					deleteMyMessage(msg, 120 * 1000);
				})
			} catch (error) {
				console.log("Status command problem: " + error)
			}
			break;

		//--------
		//#endregion

		/*
		case "google":

		break;
		*/
		//----------
		case "say":
			const SayMessage = message.content.substr(4);

			if (member_has_MANAGE_MESSAGES) {
				Mess_Channel.send(SayMessage);
			} else {
				message.reply("Vous n'avez pas la permission. **(MANAGE_MESSAGES)**").then(function (msg) {
					deleteMyMessage(msg, 10000);
				})
			}

			break;
		//----------
		case "ping":
			Mess_Channel.send(":ping_pong: My ping is: ?").then(function (newMessage) {
				newMessage.edit(newMessage.content.replace("?", ((newMessage.createdTimestamp - message.createdTimestamp) / 10) + ' ms'));
				deleteMyMessage(newMessage, 14 * 1000);
			});
			break;
		//----------
		case "pause":

			if (!server.dispatcher) {
				console.log("No dispatcher")
				message.reply(EmojiRedTickString + " There is no music actually playing !").then(msg => {
					deleteMyMessage(msg, 15 * 1000)
				});
				return;

			}
			if (server.disptacher_paused) {
				server.dispatcher.resume();
				server.disptacher_paused = false;
				message.reply("Successfully resumed :play_pause:, :headphones:").then(msg => {
					deleteMyMessage(msg, 20 * 1000)
				})
			} else {
				server.dispatcher.pause();
				server.disptacher_paused = true;
				message.reply("Successfully paused :stop_button:, :headphones:").then(msg => {
					deleteMyMessage(msg, 20 * 1000)
				})
			}
			break;
		//--------
		case "purge":
			//Ajouter la possibilité de supprimer uniquement les messages du bot (genre *purge-bot 100)
			//let can_manage_chans = message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES");

			var NumberToDelete = message.content.substr(7);

			if (!BOT_MANAGE_MESSAGESPerm) {
				message.reply("Sadly, I haven't the  **(MANAGE_MESSAGES)** permission.").then(function (msg) {
					deleteMyMessage(msg, 15 * 1000)
				});
				return;
			} else if (NumberToDelete < 0) {
				message.reply("Please put a number of message to purge").then(function (msg) {
					deleteMyMessage(msg, 5000);
				})
				return;

			} else if (NumberToDelete > 100) {
				message.reply("Sadly, the bot can only delete 100 messages at a time.").then(function (msg) {
					deleteMyMessage(msg, 6000);
				})

				return;
			} else if (!member_has_MANAGE_MESSAGES) {
				message.reply("Sadly, you don't have the permission: **(MANAGE_MESSAGES)**.").then(function (msg) {
					deleteMyMessage(msg, 7000);
				})

				return;
			} else if (!args[1]) {
				message.reply("You didn't put the number of message you want to clear.").then(function (msg) {
					deleteMyMessage(msg, 6000);
				})

				return;
			}

			try {
				setTimeout(function () {
					message.channel.bulkDelete(NumberToDelete);
					message.channel.send("Cleaning " + NumberToDelete + " messages... :cloud_tornado: :cloud_tornado: :cloud_tornado: ")
						.then(function (newMessage) {
							setTimeout(() => {
								newMessage.edit("The channel is now like a new one ! :wink: " + EmojiGreenTickString)
								deleteMyMessage(newMessage, 1500);
							}, 2500);
						});
				}, 1400)

			} catch (error) {
				console.log("Purge problem: " + error)
			}
			break;
		//-----------
		case "restart":
			if (message.author.username === "RisedSky" || message.author.username === "PLfightX") {
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
		case "randomnumber":
			if (!args[1]) {
				Mess.reply("You need to add a number (first should be the minimum)")
				return;
			} else if (!args[2]) {
				Mess.reply("You need to add a number (second should be the maximum)")
				return;
			}
			if (isNaN(args[1]) == true) {
				if (isNaN(args[2]) == true) {
					Mess.reply("Please, write a minimum and maximum value to generate a random number")
					return;
				} else {
					Mess.reply("Please, write a minimum value to generate a random number")
					return;
				}
			}
			if (isNaN(args[2]) == true) {
				Mess.reply("Please, write a minimum value to generate a random number")
				return;
			}
			args[1] = parseInt(args[1]);
			args[2] = parseInt(args[2]);

			try {

				var argsQueue = message.content.substring(12).split(" ");
				var argMini = args[1];
				var argMaxi = args[2];

				//Debug
				console.log("1: " + argMini)
				console.log("2: " + argMaxi)

				min = Math.ceil(argMini);
				max = Math.floor(argMaxi);

				Calcul = Math.floor(Math.random() * (max - min + 1)) + min;

				message.reply("Hmmm let me think, ..., between **" + min + "** and **" + max + "** I would choose **" + Calcul + "** !").then(function (msg) {
					deleteMyMessage(msg, 600 * 1000)
				});
			} catch (error) {
				console.log("Erreur #367: " + error)
				message.reply("You failed something... ex: " + prefix + "randomnumber 10 20");
			}
			break;
		//--------
		case "random-member":
			var nbMemb = message.guild.memberCount;
			var memb_list = message.guild.members;
			var rand_member = memb_list.random();
			message.reply("\n" + rand_member + " has been chosen between the " + nbMemb + " members of the server !").then(function (msg) {
				deleteMyMessage(msg, 600 * 1000)
			});
			break;
		//--------
		case "poll":
			cont = message.content
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

			question = cont.substr(5, b1 - 5);
			prop1 = cont.substr(b1 + 3, b2 - b1 - 3);
			prop2 = cont.substr(b2 + 3, b3 - b2 - 3);
			prop3 = cont.substr(b3 + 3, b4 - b3 - 3);
			prop4 = cont.substr(b4 + 3, b5 - b4 - 3);
			prop5 = cont.substr(b5 + 3, b6 - b5 - 3);
			prop6 = cont.substr(b6 + 3, b7 - b6 - 3);
			prop7 = cont.substr(b7 + 3, b8 - b7 - 3);
			prop8 = cont.substr(b8 + 3, b9 - b8 - 3);
			prop9 = cont.substr(b9 + 3);

			if (question == "" || prop1 == "" || prop2 == "") break;

			embed = new Discord.RichEmbed()
				.setColor("DARK_PURPLE")
				.setAuthor("Poll by " + message.member.displayName, message.author.displayAvatarURL)
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
			message.reply({ file: __dirname + "/images/Kappahd.png" })/*.then(function (msg) {
				deleteMyMessage(msg, 600 * 1000);
			})*/
			break;
		//-------
		case "rekt":
			if (!args[1]) {
				message.reply(EmojiRedTickString + " There is nobody to rekt (@ a user to rekt him)").then(function (msg) {
					deleteMyMessage(msg, 10 * 1000)
				})
				return;
			} else if (message.mentions.users.first() === message.author) {
				message.reply(EmojiRedTickString + " You can't rekt yourself").then(function (msg) {
					deleteMyMessage(msg, 10 * 1000)
				})
				return;
			}

			Mess_Channel.send("Wow, " + message.mentions.users.first() + " you got rekt by " + NotifyUser(message.member.id) + "\n\nhttps://www.tenor.co/wv88.gif")
			break;
		//-------
		case "bot-info":
			var d = new Date(null);
			d.setSeconds(online_since);
			var bot_online_since_time = d.toISOString().substr(11, 8); // récupere le temps et le transforme en HH:mm:ss
			console.log(bot_online_since_time)
			//var bot_online_since_time = moment(d).format("HH:mm:ss DD-MM-YYYY")
			var bot_date_created = moment(bot.user.createdTimestamp).format("HH:mm:ss DD-MM-YYYY");

			var embedbot_info = new Discord.RichEmbed()
				.setColor("#FFFFFF")
				.setAuthor("Bot-Information", bot.user.avatarURL)
				.setTitle("Created by RisedSky & PLfightX")
				.addField("I'm developed in Node.js", "**And I'm using Discord.js libraries.**")
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
				deleteMyMessage(msg, 60 * 1000)
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
				deleteMyMessage(msg, 60 * 1000)
			})

			break;
		//--------
		case "verif-perms":

			embed = new Discord.RichEmbed()
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
					message.reply(EmojiRedTickString + " There is no text in your message.").then(function (msg) {
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

					message.reply("Your message has been sent to my creators :wink: " + EmojiGreenTickString).then(function (msg) {
						deleteMyMessage(msg, 13 * 1000)
					})
				})

			} catch (error) {
				console.log(error)
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
		case "help":

			help_msgToSend = ("```fix\n" +
				"# » Created by RisedSky & PLfightX" + "\n" +
				"# » And obviously helped by the bêta - testers.```" + "\n" +
				"```dsconfig\n" +
				"The prefix for the server " + message.guild.name + " is '" + prefix + "'\n" +
				"```\n" +
				"```md\n" +
				"<» Music Commands>\n\n" +
				"#» " + prefix + "play [title / music's link]\nThe bot will join your channel and will play your music" + "\n\n" +
				"#» " + prefix + "search [title]\nSearch a music link (with embed info like " + prefix + "play)" + "\n\n" +
				"#» " + prefix + "skip\nThe bot will skip the current music" + "\n\n" +
				"#» " + prefix + "stop\nClear the queue and stop the music" + "\n\n" +
				"#» " + prefix + "queue\nShow the queue list" + "\n\n" +
				"#» " + prefix + "loop\nWill loop the currently song forever" + "\n\n" +
				"#» " + prefix + "status\nShow the status of the current song !" +
				"```\n" +
				"\n" +
				"```md\n" +
				"<» Other Commands>\n\n\n" +
				//prefix + "google", "Donne le lien de votre recherche"
				"#» " + prefix + "say [text]\nCommand to speak the bot (Need the perm 'MANAGE_MESSAGES'" + "\n\n" +
				"#» " + prefix + "ping\nShow the ping of the bot" + "\n\n" +
				"#» " + prefix + "purge [number]\nClear a selected number of messages (Max 100)" + "\n\n" +
				//prefix + "restart", "Redémarre le bot **(Expérimental**"
				"#» " + prefix + "randomnumber [min_number] [max_number]\nGenerate a number between one and another" + "\n\n" +
				"#» " + prefix + "random-member\nRandomly choose one member of the server" + "\n\n" +
				"#» " + prefix + "poll [question | answer1 | answer2 | answer3 ... ]\nCreate a poll with a maximum of 9 answers" + "\n\n" +
				"#» " + prefix + "kappa\nSend a kappa image" +
				"#» " + prefix + "rekt [@someone]\nRekt one of your friends" +
				"```" +

				"\n" +
				"```md\n" +
				"#» " + prefix + "bot-info\nSend you the information of the bot" + "\n\n" +
				"#» " + prefix + "server-info\nSend a lot of information about the currently server" + "\n\n" +
				"#» " + prefix + "user-info [@someone]\nGet secret informations about someone" + "\n\n" +
				"#» " + prefix + "verif-perms\nTell you about the perms I have in this channel" + "\n\n" +
				"#» " + prefix + "staff\nSend a message to my creators" + "\n\n" +
				"#» " + prefix + "invite\nGive you the invite link to add me ! \n(Actually you need to MP RisedSky to add your server in the whitelist)" + "\n\n" +
				"#» " + prefix + "help\nShow all the bot commands (This message ;-) )!" +
				"```" +

				"\n\n\n" +
				"```md\n" +
				"<» Channel Tags>\n\n\n" +
				"#» <nocmds>\nAvoid the use of commands in this channel \n\n" +
				"#» <ideas>\nWith this tag, the bot will add for or against reactions on every message \n \n" +
				"#» <autopurge:TIME:>\nDelete every message in this channel after TIME seconds" +
				"```")

			/*
			Mess_Channel.send(help_msgToSend).then(function (msg) {
				deleteMyMessage(msg, 120 * 1000);
			})
			*/
			try {
				message.author.createDM();
				message.author.send(help_msgToSend).then(function (msg) {
					deleteMyMessage(msg, 180 * 1000);
				});
			} catch (error) {
				console.log(error);
			}

			break;
		//----------
		default:
			Mess_Channel.send("Unknown command. " + EmojiThonkongString).then(function (msg) {
				setTimeout(() => {
					msg.react("❓");
					msg.react(EmojiThonkong);
				}, 250);
				deleteMyMessage(msg, 5000);
			})

			break;
	}
})

/*
bot.on('voiceStateUpdate', member => {
	console.log(`${member.displayName}\n${member.selfDeaf} `)

	//console.log("voiceStateUpdate =>" + GuildMember.voiceChannel.name);
})
*/

/*
//NOT INTERESTING FOR NOW
bot.on('messageReactionAdd', MessageReaction => {
	//En cours de création, risque de crash ou de problème technique si utilisé.
	if (!MessageReaction.message.author.equals(bot.user)) return;
	if (!MessageReaction.message.guild) return;

	console.log("Ajout d'une emote: " + MessageReaction.emoji.identifier)
	console.log(MessageReaction.emoji.name + " - " + MessageReaction.emoji.id)
	if (MessageReaction.emoji.equals = "😃") {
		console.log("oui")
	}
})
*/

bot.on('messageDelete', message => {
	//verifier si la personne qui supprime est le bot
	//si c'est le cas on doit vérifier si le message est pinned
	//si c'est le cas alors on ne le SUPPRIME PAS
})

bot.on('error', console => {
	console.log(Error)
})

bot.on('reconnecting', () => {
	console.log("reconnection");
})

bot.on('disconnect', () => {
	bot.user.setStatus("invisible");
	console.log("Je suis invisible")
})

bot.on('resume', () => {
	console.log("resumed!");
})
