const Discord = require('discord.js')
const YTDL = require("ytdl-core")
const bot = new Discord.Client();
const guild = 406356765748232194;

bot.login(process.env.BOT_TOKEN); //Le bot va désormais fonctionner 24h/24h

var prefix = "*";
var prefixLog = "[!] ";
var servers = {};
//var embed = new Discord.RichEmbed();

//Pour le request song
var YouTubeThumbnail = "";
var YouTubeTitle = "";
var YouTubeTime = "";
var YouTubeLink = "";

//Défini les derniers messages du bot
var DernierMessageIDDuBot;
var DernierMessageDuBot;

var CommandList = ["restart", "leave", "join", "", ""];

function ChangeState1() {
	bot.user.setActivity(prefix + 'help • By RisedSky & LePandaFou77');
	//console.log("1");
	setTimeout(ChangeState2, 15000);
}

function ChangeState2() {
	bot.user.setActivity(prefix + 'help • Actually working...');
	//console.log("2");
	setTimeout(ChangeState1, 15000);
}

function deleteMessageID(message) {
	message.delete(DernierMessageIDDuBot);
}

function play(connection, message) {
	var server = servers[message.guild.id];

	server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly", audioEncondig: "mp3" }));

	server.queue.shift();

	server.dispatcher.on("end", function () {
		if (server.queue[0]) {
			play(connection, message);
		}
		else connection.disconnect;
		console.log(DernierMessageIDDuBot);
		deleteMessageID(message);
	});
}

bot.on('ready', () => { //Quand le bot est prêt (chargé donc)
	bot.user.setStatus("online")
	console.log("------------------------------")
	console.log(prefixLog + "Bot created by RisedSky & LePandaFou77 <3")
	console.log(prefixLog + "All rights reserved")
	console.log(prefixLog + "Bot ready")
	console.log("------------------------------")
	bot.user.setActivity(prefix + "help • Started and ready !");
	setTimeout(ChangeState1, 20000);
	console.log("The bot is now ready !")
})

bot.on('guildMemberAdd', member => { //Quand une personne rejoint le discord
	try {
		console.log("Une nouvelle personne vient de rejoindre: " + member.displayName)
		setTimeout(
			function () {
				member.addRole('406488780711788547');
			}, 3000
		);

	} catch (error) {
		console.log(error)
	}

	//member.addRoles('406550660906221568')
})

bot.on('message', message => { //Quand une personne envoit un message
	if (message.author.equals(bot.user)) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	var MessageID = message.id;
	var args = message.content.substring(prefix.length).split(" ");
	var Mess = message;
	var Mess_Channel = message.channel;
	var Mess_Member = message.member;
	var Mess_voiceChannel = message.member.voiceChannel;

	switch (args[0].toLowerCase()) {

		/*case "join":
			if (message.member.voiceChannel) {
				message.member.voiceChannel.join()
					.then(connection => {
						message.channel.send("J'ai rejoint le channel vocal `" + Mess_voiceChannel.name + "`");

						const broadcast = bot.createVoiceBroadcast();
						broadcast.playFile('./test.mp4');
						// Play "music.mp3" in all voice connections that the client is in
						for (const connection of bot.voiceConnections.values()) {
							connection.playBroadcast(broadcast);
						}
					})
					.catch(console.log)
			} else {
				message.react("❌");
				message.reply("Tu dois être dans un channel vocal pour faire cette commande.");
			}
			break;*/

		//------
		case "play":

			setTimeout(() => {
				message.delete(MessageID);
			}, 1000);

			if (!args[1]) {
				message.react("❌");
				Mess_Channel.send("Merci de spécifier un lien");
				return;
			}

			if (!Mess_voiceChannel) {
				message.react("❌");
				Mess_Channel.send("Tu dois être dans un salon vocal");
				return;
			}

			if (!servers[message.guild.id]) servers[message.guild.id] = {
				queue: []
			};

			var MusicLink = message.content.split("&");
			console.log(MusicLink)

			var server = servers[message.guild.id];

			server.queue.push(String(args).substring(5));

			//Ajoute les infos pour le embed
			YTDL.getInfo(args[1], function (err, info) {
				YouTubeTitle = info.title;
				YouTubeThumbnail = info.thumbnail_url;
				YouTubeLink = args[1];
				YouTubeTime = (new Date(info.timestamp / 1000).toISOString().substr(11, 8));

				console.log("Testnew : " + new Date(info.timestamp / 1000).toISOString());
				console.log("temps : " + info.timestamp.length + " -- " + info.timestamp);
				console.log(new Date(info.timestamp / 1000).toISOString().substr(11, 8));

				//console.log(info.title);
			})

			setTimeout(() => {

				embed = new Discord.RichEmbed()
					.setColor(0, 255, 255)
					.setAuthor(YouTubeTitle, message.author.avatarURL)
					.setThumbnail(YouTubeThumbnail).setURL(YouTubeLink)
					.setTitle("Musique ajoutée")
					.addField("Durée de: ", "**" + YouTubeTime + "**")
					.setFooter("Demandé par " + Mess_Member.displayName + " • ID: " + Mess_Member.id)

				Mess_Channel.send(embed);

				//Récupere le dernier message (donc celui du bot)
				setTimeout(() => {
					console.log("Content: " + Mess_Channel.lastMessage.content);
					DernierMessageIDDuBot = Mess_Channel.lastMessageID;
				}, 1000);

			}, 2500);

			if (!message.guild.voiceConnection) {

				message.member.voiceChannel.join()
					.then(function (connection) {
						play(connection, message);
					})
			};
			break;
		//-------
		case "skip":
			var server = servers[message.guild.id];

			if (server.dispatcher) {
				server.dispatcher.end();
			}

			message.delete(MessageID);
			Mess_Channel.send("Succefuly skipped the currently song");
			break;
		//-------
		case "stop":
			var server = servers[message.guild.id];
			message.delete(MessageID);
			if (message.guild.voiceConnection) {
				Mess_Channel.send("Stopped the music from channel: " + message.guild.voiceConnection.channel.name);
				message.guild.voiceConnection.disconnect();
			}

			if (message.guild.voiceConnection) {
				for (var i = server.queue.length - 1; i >= 0; i--) {
					server.queue.splice(i, 1);
				}
				Mess_Channel.send("Stopped the queue.");
				//server.dispatcher.end;
			}
			break;
		//-------
		case "leave":
			if (bot.voiceConnections.exists) {
				//bot.voiceConnections.findAll("disconnect", bot.voiceConnections.size);
				//bot.voiceConnections.find("disconnect");			
				Mess_Channel.send("Déconnecté du salon `" + message.guild.voiceConnection.channel.name + "`");

				if (message.guild.voiceConnection) {
					console.log("Disconnected from the channel: " + message.guild.voiceConnection.channel.name)
					message.guild.voiceConnection.disconnect();
				}
				//Mess_voiceChannel.leave();
			}
			break;
		//----------
		case "say":
			//if (message.author.) {
			const SayMessage = message.content.substr(4);
			message.channel.send(SayMessage);
			message.delete(MessageID);
			//} else {
			//	Mess_Channel.send("Vous n'avez pas la permission.");
			//}
			//message.channel.send("mdr");
			break;
		//----------
		case "ping":
			Mess_Channel.send("J'ai actuellement un ping de: " + parseInt(bot.ping) + " ms :ping_pong:");
			break;
		//----------
		case "help":

			embed = new Discord.RichEmbed()
				.setColor(225, 0, 0)
				.setAuthor("Voici la liste de toutes les commandes")
				.setThumbnail(message.author.avatarURL)
				.addField("*help", "Affichage de toute les commande du bot !")
				.addField("*join", "Le bot va rejoindre ton channel")
				.addField("*leave", "Le bot va quitter ton channel")
				.addField("*stop", "Le bot va arrêter de jouer de la musique")
				.addField("*play <lien de la musique>", "Le bot va rejoindre ton channel et va jouer de la musique")
				.addField("*ping", "Pong")

				//.addField("*Join", "Le bot va rejoindre ton channel")

				.setFooter("Demandé par " + Mess_Member.displayName + " • ID: " + Mess_Member.id);
			Mess_Channel.send(embed);
			setTimeout(() => {
				Mess_Channel.lastMessage.react("✅");
				message.delete(MessageID);
			}, 500);
			break;

		//----------
		case "restart":
			Mess_Channel.send("Redémarrage en cours ...");
			//bot.reconnecting('Mzk1MTU2NzYyMDI3NjIyNDAw.DUSI5A.IyXwu9kKl9Y2rf42jQEgbR-V5QA');
			bot.disconnect;
			console.log("Disconnected")
			setTimeout(function () {
				bot.login('Mzk1MTU2NzYyMDI3NjIyNDAw.DUSI5A.IyXwu9kKl9Y2rf42jQEgbR-V5QA');
				console.log("Reconnected")
			}, 5000);
			break;
		//-------
		case "purge":
			message.delete(MessageID);
			var NomberToDelete = message.content.substr(7);
			if (NomberToDelete <= 0) {
				message.channel.send("Merci de mettre un nombre de message à purger");
				return;
			}
			setTimeout(function () {
				message.channel.bulkDelete(NomberToDelete);
				message.channel.send("Nettoyage en cours...");
			}, 1500);
			setTimeout(function () {
				message.channel.send("Nettoyage terminé ! :white_check_mark:");
				message.channel.bulkDelete(2);
				;
			}, 2500);
			break;
		default:
			message.delete(MessageID);
			Mess_Channel.send("Commande non reconnue");
			setTimeout(() => {
				Mess_Channel.lastMessage.react("❓");
			}, 1000);
			break;
	}

	/*
	✅👌🐼🗑️
	Site 1 : https://emojiterra.com
	Site 2 : http://smiley.cool/fr/twitter-emoji.php
	*/
})

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

bot.on('disconnect', disconnect => {
	bot.user.setStatus("invisible")
})