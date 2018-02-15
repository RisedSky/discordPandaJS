const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const URL = require('url');
const request = require("request");
//const moment = require("moment");
const bot = new Discord.Client();

var whitelistedServer = require("./whitelistServer.js");
var StringWhitelistServer = String(whitelistedServer);
var DefaultGuildID = 412262889156771842;

//--------Dev----------
yt_api_key = process.env.yt_api_key;

var BOT_TOKEN = process.env.BOT_TOKEN;
bot.login(BOT_TOKEN); //Le bot va désormais fonctionner 24h/24h

var prefix = "*";
//--------Dev----------

var prefixLog = "[!] ";
var servers = {};
//var embed = new Discord.RichEmbed();


//---- ALL EMOJIS ------
//Emoji string
var EmojiGreenTickString = "<:greenTick:412663578009796619>";
var EmojiRedTickString = "<:redTick:412663578051477505>";
var EmojiYouTube_LogoString = "<:youtube-logo:413446051480076288>";

//Emoji 
var EmojiYouTube_Logo = "youtube-logo:413446051480076288";
var EmojiGreenTick = "greenTick:412663578009796619"
var EmojiRedTick = "redTick:412663578051477505";

//Emoji ID
var YouTube_Logo_ID = "413446051480076288";
var GreenTick_ID = "412663578009796619"
var RedTick_ID = "412663578051477505";

var PermissionYes = EmojiGreenTickString;
var PermissionNo = EmojiRedTickString;
//---- ALL EMOJIS ------


//Pour le request song
var YouTubeThumbnail; //Défini la miniature
var YouTubeTitle; //Défini le titre de la vidéo
var YouTubeTime; //Défini le temps de la vidéo
var YouTubeLink; //Défini le lien de la vidéo

var PlayingMusic;

//Défini les derniers messages du bot
var DernierMessageDuBot;
var DernierMessageIDDuBot;

//Défini les derniers embeds du bot
var DernierEmbedDuBot;
var DernierEmbedIDDuBot;


//var CommandList = ["restart", "leave", "join", "", ""];

function ChangeState1() {
	bot.user.setActivity(prefix + "help | By RisedSky & PLfightX");
	setTimeout(ChangeState2, 25000);
}

function ChangeState2() {
	bot.user.setActivity(prefix + "help | GitHub : https://goo.gl/Q7JtrS");
	setTimeout(ChangeState3, 25000);
}

function ChangeState3() {
	bot.user.setActivity(prefix + "help | I am on " + bot.guilds.size + " servers");
	setTimeout(ChangeState1, 25000);
}


function deleteMyMessageID(message) {
	try {
		if (!message.author.name === bot.user.name) {
			//console.log("Not my message")
			return;
		}
		console.log("deleted: " + message)
		message.delete(750);
	} catch (error) {
		console.log("Problem on ligne 92: " + error)
	}
}

function NotifyUser(ID) {
	return "<@" + ID + ">";
}

function PermissionCheck(PermToCheck) {
	if (PermToCheck === true) {
		return PermissionYes;
	} else {
		return PermissionNo;
	}
}

//#region "Functions pour la musique"

function search_video(message, query, playit) {
	request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, (error, response, body) => {

		var json = JSON.parse(body);

		if ("error" in json) {
			message.reply("Notify RisedSky with a screen to this error: \n An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason)
				.then(function () {
					lastMess_search_video_error = bot.user.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess_search_video_error);
					}, 10000);
				});;
		} else if (json.items.length === 0) {
			message.reply("No videos found with your criteria: " + query)
				.then(function () {
					lastMess_search_video = bot.user.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess_search_video);
					}, 10000);
				});
		} else {
			add_to_queue(json.items[0].id.videoId, message, playit);
			console.log(json.items[0].id);
			console.log(json.items[0].id.videoId);
			console.log(message.content + "\n");
		}
	})
}

function add_to_queue(video, message, playit) {
	console.log("video: " + video)
	//var video_id = get_video_id(video);

	//vérifie si le serveur est déjà dans la liste
	if (!servers[message.guild.id]) servers[message.guild.id] = {
		queue: []
	};

	//l'ajoute alors
	var server = servers[message.guild.id];

	YTDL.getInfo("https://www.youtube.com/watch?v=" + video, (error, info) => {
		if (error) {
			message.reply("The requested video (" + video + ") does not exist or cannot be played.")
				.then(function () {
					lastMess_search_video = bot.user.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess_search_video);
					}, 10000);
				})
			console.log("Error (" + video + "): " + error);
		} else {
			//queue.push({ title: info["title"], id: video_id, user: message.author.username });

			if (playit) {
				if (!message.guild.voiceConnection) {
					message.member.voiceChannel.join()
						.then(function (connection) {

							play(connection, message);
						})
				};
				server.queue.push("https://www.youtube.com/watch?v=" + video);
			}

			get_Video_Info(video, message, playit)
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

		console.log("video_id => " + video_id)


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

			console.log("get_video_info => " + YouTubeTimeSec, YouTubeViews, YouTubeUploader, YouTubeTitle, YouTubeThumbnail, YouTubeLink, YouTubeTime);
			//return YouTubeTimeSec, YouTubeViews, YouTubeUploader, YouTubeTitle, YouTubeThumbnail, YouTubeLink, YouTubeTime;setTimeout(() => {
			//get_Video_Info(String("https://www.youtube.com/watch?v=JOfqoq3_mEE"));

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
				/*.setAuthor(YouTubeTitle, message.author.avatarURL)
				Code qui permet de définir le titre et le logo du demandeur
				*/
				.setFooter("Asked by " + message.member.displayName + " • ID: " + message.member.id);


			message.channel.send(embed).then(function () {
				if (playit) { //Si on doit jouer la musique alors
					lastMessEmbed = bot.user.lastMessage;

					//lastMessIDEmbed = bot.user.lastMessageID;
					//si l'id du message = celle de la musique actuelle alors on prend l'ancien
					//aussi définir une var qui va changer ex: new music => var curentplay qui change puis on s'assure que ça c'est nettoyé avec le ="" !

					setTimeout(() => {
						deleteMyMessageID(lastMessEmbed);
						lastMessEmbed = "";
					}, YouTubeTimeSec * 1000);
				}
			})
		}, 1000);

	} catch (error) {
		console.log("get_Video_Info problem => " + error)
	}
}

var currentlySong;
function play(connection, message) {
	try {

		var server = servers[message.guild.id];

		//console.log("Le play => " + message)
		console.log("[play] serveur queue [0] => " + server.queue[0])
		console.log("[play] message.content => " + message.content)

		server.dispatcher = connection.playStream(
			//YTDL(server.queue[0], { filter: "audioonly", audioEncondig: "opus" })
			YTDL(server.queue[0], { filter: "audioonly", audioEncondig: "opus", volume: 0.1 })

		);
		server.dispatcher.volume = 0.5;

		currentlySong = server.queue.shift();
		//console.log(currentlySong)

		server.queue.shift();

		server.dispatcher.on("end", function () {
			if (server.queue[0]) {

				currentlySong = null;
				play(connection, message);
			} else {
				//connection.disconnect;
				if (message.guild.voiceConnection) {
					message.channel.send("Finished the queue from channel: '" + message.guild.voiceConnection.channel.name + "' :wave:")
						.then(function () {
							var lastMess2 = bot.user.lastMessage;
							setTimeout(() => {
								deleteMyMessageID(lastMess2);
							}, 10000);
						});

					message.guild.voiceConnection.disconnect();
				}
			}

		});
	} catch (error) {
		console.log("[play] Function play: " + error)
	}
}

//#endregion

bot.on('ready', () => { //Quand le bot est prêt (chargé donc)
	bot.user.setStatus("online")
	console.log("------------------------------")
	console.log(prefixLog + "Bot created by RisedSky & PLfightX <3")
	console.log(prefixLog + "All rights reserved")
	console.log(prefixLog + "Bot ready")
	console.log("------------------------------")

	bot.user.setActivity(prefix + "help | Started and ready !");
	setTimeout(ChangeState1, 20000);
	console.log("The bot is now ready !")
	if (bot.user.client.guilds.exists("fetchAuditLogs", "ban")) {
		console.log("Il y'a eu des bans");
	} else {
		console.log("Pas eu de ban");
	}

})

bot.on('guildMemberAdd', member => {
	//Quand une personne rejoint un des serveurs discord du bot

	console.log("Une nouvelle personne vient de rejoindre: " + member.displayName)

	if (member.guild.id === DefaultGuildID) {
		try {
			const defaultChannel = member.guild.channels.find(c => c.permissionsFor(member.guild.me).has("SEND_MESSAGES") && c.type === 'text');

			defaultChannel.send("Bienvenue sur le serveur officiel Boti-Panda,  <@" + member.id + ">")
			setTimeout(function () {
				RoleMember = member.guild.roles.find("name", "Bêta-Tester");
				member.addRole(RoleMember);
			}, 3000);
		} catch (error) {
			console.log("Erreur: " + error);
		}
	} else {
		return;
	}

})

bot.on('guildCreate', Guild => {
	console.log("I just join the server: '" + Guild.name + "' | ID: " + Guild.id + " - Name: " + Guild.name)


	if (!StringWhitelistServer.indexOf(Guild.id)) {
		console.log("I just left the server: '" + Guild.name + "' | ID: " + Guild.id + " - Name: " + Guild.name);
		Guild.leave();
		return;
	} else {
		console.log("server whitelisted")
	}

	const defaultChannel = Guild.channels.find(c => c.permissionsFor(Guild.me).has("SEND_MESSAGES") && c.type === 'text');
	console.log(defaultChannel.name)

	msgToSend = [];
	msgToSend.push("Hey! I'm **" + bot.user.username + "**\n")
	msgToSend.push("You can use **`" + prefix + "help`** to see my commands.");
	msgToSend.push("I'm also in development and, if you want to contribute to me you can simply go here: https://github.com/RisedSky/discordPandaJS");

	defaultChannel.send(msgToSend);

})

bot.on('message', message => { //Quand une personne envoit un message
	if (message.author.bot) return;
	if (!message.guild) return;

	var MessageID = message.id;
	var args = message.content.substring(prefix.length).split(" ");
	var Mess = message;
	var Mess_Channel = message.channel;
	var Mess_Member = message.member;
	var Mess_voiceChannel = message.member.voiceChannel;

	var channelTopic = String(message.channel.topic).toLowerCase();

	if (channelTopic.includes("<ideas>")) {
		console.log("Le salon " + message.channel.name + " | Contient 'ideas' | Serveur: " + message.guild.name)
		setTimeout(() => {
			Mess.react(EmojiGreenTick)
		}, 500);

		setTimeout(() => {
			Mess.react(EmojiRedTick)

			channelTopic = "";
		}, 750);
		return;
	} else if (channelTopic.includes("<wait:")) {
		//doit trouver où est le wait pour récuperer le nombre (en terme de timeout en s).

		var waitsearch = channelTopic.startsWith("<wait:");
		var waitNumber = channelTopic.substr(6);
		var waitnumber1 = channelTopic.split("<wait:")


		console.log("Waitsearch: " + waitsearch + " -- waitNumber: " + waitNumber + " -- waitnumber1: " + waitnumber1)
	}

	if (!message.content.startsWith(prefix)) return;

	try {
		message.delete(1000)
	} catch (error) {
		console.log("Can't delete this message: " + error)
	}

	//vérifie si le serveur est déjà dans la liste
	if (!servers[message.guild.id]) servers[message.guild.id] = {
		queue: []
	};

	//l'ajoute alors
	var server = servers[message.guild.id];

	switch (args[0].toLowerCase()) {


		// - - Musique
		case "play":
			if (!args[1]) {
				message.react("❌");
				message.reply("Merci de spécifier un lien / un titre de musique").then(function () {
					lastMess = Mess_Channel.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 4000);
				})
				return;

			} else if (!Mess_voiceChannel) {
				message.react("❌");
				message.reply("Tu dois être dans un salon vocal").then(function () {
					lastMess = Mess_Channel.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 4000);
				})
				return;
			} else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
				message.react("❌");
				message.reply("Tu ne dois pas être deafen.").then(function () {
					lastMess = Mess_Channel.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 4000);
				})
				return;
			}

			try {
				var parsed = URL.parse(args[1]);
				if (parsed && parsed.host) {
					// YouTube URL
					if (parsed.host.match(/(www\.)?youtube.com|(www\.)?youtu.be/i)) {
						console.log("C'est du youtube")
						console.log(args[1]);

						q = args[1];
						search_video(message, q, true);

						return;

					} else if (parsed.host.match(/(www\.)?soundcloud.com/i)) {
						console.log("C'est du soundcloud")
						message.reply("Soundcloud n'est pas encore pris en compte")
						return;
					}

				} else {
					var argsSearch = message.content.split(" ");

					var q = "";

					for (var i = 1; i < argsSearch.length; i++) {
						q += argsSearch[i] + " ";
					}
					console.log(argsSearch)
					console.log("q => " + q)
					search_video(message, q, true);
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
				message.reply("Merci de mettre le nom d'une musique").then(function () {
					lastMess = Mess_Channel.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 4000);
				})
				return;
			}

			var argsSearch = message.content.split(" ");

			var q = "";
			for (var i = 1; i < argsSearch.length; i++) {
				q += argsSearch[i] + " ";
			}
			console.log(argsSearch)
			console.log("q => " + q)
			search_video(message, q, false);

			break;
		//-------
		case "skip":

			if (!Mess_voiceChannel) {
				message.reply("You should be in a vocal channel before asking me to play some musics.").then(function () {
					lastMess = Mess_Channel.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 4000);
				})
				return;
			} else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
				message.reply("You should not be deafen *(For saving some bandwidth.").then(function () {
					lastMess = Mess_Channel.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 10000);
				})
				return;

			} else if (!Mess_voiceChannel.name === message.guild.voiceConnection.channel.name) {
				message.reply("You are not in the same vocal channel as me.")
					.then(function () {
						lastMess = Mess_Channel.lastMessage;
						setTimeout(() => {
							deleteMyMessageID(lastMess)
						}, 4000);
					})
				return;
			}
			//console.log("User: " + Mess_voiceChannel.name + " | " + "Me: " + message.guild.voiceConnection.channel.name)

			var server = servers[message.guild.id];

			console.log(server.dispatcher)
			if (server.dispatcher) {
				server.dispatcher.end();
			}

			message.reply("Successfuly skipped the song: " + currentlySong)
				.then(function () {
					lastMess = Mess_Channel.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 10000);
				});

			break;
		//-------
		case "stop":

			var server = servers[message.guild.id];

			if (message.guild.voiceConnection) {
				for (var i = server.queue.length - 1; i >= 0; i--) {
					server.queue.splice(i, 1);
				}
				Mess_Channel.send("Stopped all the music from channel: '" + message.guild.voiceConnection.channel.name + "' :wave:").then(function () {
					lastMess = Mess_Channel.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 10000);
				});
				message.guild.voiceConnection.disconnect();
			}
			break;
		//-------
		case "queue":

			var argsQueue = message.content.substring(5).split(" ");
			var server = servers[message.guild.id];
			var xQueue = server.queue;

			try {
				// CE CODE FONCTIONNE
				/*if (argsQueue[1] === "list") {
					Mess_Channel.send("Oui.");
				}*/
				var xString = String(xQueue);

				for (var i in xQueue) {
					var Result = ""
					var y = server.queue.length;
					x = xString.split(",");
					console.log(i + " » " + x + " > " + y);
					Mess_Channel.send(i + " » " + x + " > " + y);
				}
			} catch (error) {
				console.log("Ligne 300: " + error)
			}
			break;
		//-----------
		// - - Musique
		//-----------
		case "say":
			const SayMessage = message.content.substr(4);

			let member_has_ADMINISTRATOR = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("ADMINISTRATOR") && message.channel.type === 'text'

			if (member_has_ADMINISTRATOR) {
				Mess_Channel.send(SayMessage);
			} else {
				message.reply("Vous n'avez pas la permission. **(ADMINISTRATOR)**").then(function () {
					lastMessSay = Mess_Channel.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMessSay)
					}, 10000)
				})
			}

			break;

		//----------
		case "ping":
			message.reply("J'ai actuellement un ping de: " + parseInt(bot.ping) + " ms :ping_pong:").then(function () {
				lastMess = Mess_Channel.lastMessage;
				setTimeout(() => {
					deleteMyMessageID(lastMess)
				}, 10000)
			})
			break;
		//----------
		case "purge":
			//Ajouter la possibilité de supprimer uniquement les messages du bot (genre *purge-bot 100)
			//let can_manage_chans = message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES");


			//Vérfie si la personne a bien la perm MANAGE_MESSAGES
			let member_has_MANAGE_MESSAGES = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("MANAGE_MESSAGES") && message.channel.type === 'text'

			//Vérifie si le bot à la perm MANAGE_MESSAGES
			let BOT_HAS_MANAGE_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("MANAGE_MESSAGES") && message.channel.type === 'text'

			var NumberToDelete = message.content.substr(7);

			if (!BOT_HAS_MANAGE_MESSAGESPerm) {
				message.reply("Malheureusement, je n'ai pas la permission **(MANAGE_MESSAGES)**.");
				return;
			} else if (NumberToDelete < 0) {
				message.reply("Merci de mettre un nombre de message à purger").then(function () {
					lastMess = Mess_Channel.lastMessage;
					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 3000)
				})
				return;

			} else if (NumberToDelete > 100) {
				message.reply("Sadly, the bot can only delete 100 messages at a time.").then(function () {
					lastMess = Mess_Channel.lastMessage;

					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 3000)
				})

				return;
			} else if (!member_has_MANAGE_MESSAGES) {
				message.reply("Sadly, you don't have the permission: **(MANAGE_MESSAGES)**.").then(function () {
					lastMess = Mess_Channel.lastMessage;

					setTimeout(() => {
						deleteMyMessageID(lastMess)
					}, 3000)
				})

				return;
			}

			setTimeout(function () {
				message.channel.bulkDelete(NumberToDelete);
				message.channel.send("Cleaning " + NumberToDelete + " messages... :cloud_tornado: :cloud_tornado: :cloud_tornado: ")
					.then(function () {
						lastMess = Mess_Channel.lastMessage;

						setTimeout(() => {
							deleteMyMessageID(lastMess);
						}, 4500)

					}, 1500);

				setTimeout(function () {
					message.channel.send("The channel is now like a new one ! :wink: " + EmojiGreenTickString)
						.then(function () {
							lastMess1 = Mess_Channel.lastMessage;

							setTimeout(() => {
								deleteMyMessageID(lastMess1)
							}, 6500)

						}, 1500);
				}, 1700)
			}, 1250)

			break;
		//-----------
		case "restart":
			if (message.author.username === "RisedSky" || message.author.username === "PLfightX") {
				Mess_Channel.send("Redémarrage en cours ...");
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
			} if (!args[2]) {
				Mess.reply("You need to add a number (second should be the maximum)")
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

				console.log(Math.floor(Math.random() * (max - min + 1)) + min)
				console.log("Calcul : " + Calcul)
				message.reply("Hmmm voyons voir, entre **" + min + "** et **" + max + "** je choisirais **" + Calcul + "** !");
			} catch (error) {
				console.log("Erreur #367: " + error)
				message.reply("Tu t'es trompé dans quelque part... ex: " + prefix + "randomnumber 10 20");
			}
			break;
		//--------
		case "randomuser":
			message.reply("This command is not available for now, she's in dev right now :wink:").then(function () {
				lastMess = Mess_Channel.lastMessage;
				setTimeout(() => {
					deleteMyMessageID(lastMess)
				}, 4000);
			});


			console.log(
				message.guild.memberCount
			)
			break;
		//--------
		case "poll":
			message.reply("La commande `* poll` n'est pas encore disponible, elle viendra soon :tm: :wink:");
			break;
		//--------
		case "kappa":
			Mess_Channel.send("", { file: __dirname + "/images/Kappahd.png" })
			break;
		//-------
		case "verif-perms":
			const SEND_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("SEND_MESSAGES") && message.channel.type === 'text'
			const MANAGE_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("MANAGE_MESSAGES") && message.channel.type === 'text'
			const ADMINISTRATORPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("ADMINISTRATOR") && message.channel.type === 'text'
			const USE_EXTERNAL_EMOJISPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("USE_EXTERNAL_EMOJIS") && message.channel.type === 'text'

			//console.log(bot.emojis.array())

			/*if (SEND_MESSAGESPerm) PermissionYes
			else PermissionNo*/



			embed = new Discord.RichEmbed()
				.setColor("#00FF00")
				.setAuthor("Permissions checking", bot.user.avatarURL)
				.setThumbnail(message.author.avatarURL)
				.setDescription("Looking **my** permission for **<#" + Mess_Channel.id + ">**")

				.addField("SEND_MESSAGES", PermissionCheck(SEND_MESSAGESPerm), true)
				.addField("MANAGE_MESSAGES", PermissionCheck(MANAGE_MESSAGESPerm), true)
				.addField("ADMINISTRATOR", PermissionCheck(ADMINISTRATORPerm), true)
				.addField("USE_EXTERNAL_EMOJIS", PermissionCheck(USE_EXTERNAL_EMOJISPerm), true)

				.setFooter("Asked by " + Mess_Member.displayName + " • ID: " + Mess_Member.id);

			Mess_Channel.send(embed).then(function () {
				lastMessPermEmbed = bot.user.lastMessage;
				setTimeout(() => {
					deleteMyMessageID(lastMessPermEmbed);
				}, 25000);
			});

			//message.guild.me).hasPermissions("SEND_MESSAGES") && c.type === 'text')
			//const truc = message.guild.channels.find(c => c.permissionsFor(message.guild.me).hasPermissions("SEND_MESSAGES") && c.type === 'text')

			break;
		//-------
		case "help":

			embed = new Discord.RichEmbed()
				.setColor(225, 0, 0)
				.setAuthor("Voici la liste de toutes les commandes", bot.user.avatarURL)
				.setThumbnail(message.author.avatarURL)
				.setDescription("Créé par RisedSky & PLfightX")
				//Musique
				//.addField(prefix + "help music", "Affiche toutes les commandes **music** du bot !")
				.addField(prefix + "play [title/music's link]", "The bot will join your server and will play your music")
				.addField(prefix + "search", "Search a music link **(with embed info like " + prefix + "play)**")
				.addField(prefix + "skip", "The bot will skip your music")
				.addField(prefix + "stop", "Le bot va arrêter de jouer de la musique")
				.addField(prefix + "queue", "Affiche la liste des musiques **(Expérimental)**")

				.addField(prefix + "say", "Commande pour faire parler le bot **(Requiert un rôle Staff)**")
				.addField(prefix + "ping", "Affiche le ping du bot")
				.addField(prefix + "purge", "Nettoie un nombre de message donné **(Max 100)**")
				.addField(prefix + "restart", "Redémarre le bot **(Expérimental)**")
				.addField(prefix + "randomnumber", "Génère un nombre entre un chiffre et un autre | **ex: " + prefix + "randomnumber 2 50**")
				.addField(prefix + "poll", "Soon :tm:")
				.addField(prefix + "kappa", "Kappa")

				.addField(prefix + "help", "Affiche toutes les commandes du bot !")

				//.addField("*Join", "Le bot va rejoindre ton channel")

				.setFooter("Asked by " + Mess_Member.displayName + " • ID: " + Mess_Member.id);

			Mess_Channel.send(embed).then(function () {
				lastMessHelp = message.guild.me.lastMessage;
				setTimeout(() => {
					deleteMyMessageID(lastMessHelp)
				}, 30000);
			})

			break;
		//----------
		default:
			Mess_Channel.send("Commande non reconnue.").then(function () {
				lastMess = message.guild.me.lastMessage;

				setTimeout(() => {
					lastMess.react("❓");
				}, 250);

				setTimeout(() => {
					deleteMyMessageID(lastMess)
				}, 10000);
			})

			break;
	}
})



/*
bot.on('voiceStateUpdate', GuildMember => {
	console.log(GuildMember.displayName)
	//console.log("voiceStateUpdate =>" + GuildMember.voiceChannel.name);
})
*/

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
