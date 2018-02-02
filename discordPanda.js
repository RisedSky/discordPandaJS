//import { Message, Guild, DMChannel } from 'discord.js';

const Discord = require("discord.js")
const YTDL = require("ytdl-core")
const bot = new Discord.Client();
const DefaultGuildID = 406356765748232194;

var BOT_TOKEN = process.env.BOT_TOKEN;
bot.login(BOT_TOKEN); //Le bot va désormais fonctionner 24h/24h

var prefix = "*";
var prefixLog = "[!] ";
var servers = {};
//var embed = new Discord.RichEmbed();

//Pour le request song
var YouTubeThumbnail; //Défini la miniature
var YouTubeTitle; //Défini le titre de la vidéo
var YouTubeTime; //Défini le temps de la vidéo
var YouTubeLink; //Défini le lien de la vidéo

//Défini les derniers messages du bot
var DernierMessageDuBot;
var DernierMessageIDDuBot;

//Défini les derniers embeds du bot
var DernierEmbedDuBot;
var DernierEmbedIDDuBot;

var CommandList = ["restart", "leave", "join", "", ""];

function ChangeState1() {
	bot.user.setActivity(prefix + "help | By RisedSky & LePandaFou77");
	setTimeout(ChangeState2, 15000);
}

function ChangeState2() {
	bot.user.setActivity(prefix + "help | Actually working...");
	setTimeout(ChangeState3, 15000);
}

function ChangeState3() {
	bot.user.setActivity(prefix + "help | I am on " + bot.guilds.size + " servers");
	setTimeout(ChangeState1, 15000);
}


function deleteMyMessageID(message, id) {
	//console.log("message = " + message + " | id=" + id);
	//console.log(message.author + " - " + bot.user)
	try {
		if (message.author.name != bot.user.name) {
			console.log("Not me")
			return;
		}

		console.log("deleted: " + message)
		message.delete(id);
	} catch (error) {
		console.log("Problem on ligne 51 : " + error)
	}
}

function play(connection, message) {
	/*
	setTimeout(() => {
		deleteMyMessageID(message, message.id);
	}, 1500);
	*/

	console.log("Le play => " + message)
	var server = servers[message.guild.id];

	server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly", audioEncondig: "opus" }));
	//connection.

	server.queue.shift();

	server.dispatcher.on("end", function () {
		if (server.queue[0]) {
			if (DernierEmbedIDDuBot != null) {
				deleteMyMessageID(DernierEmbedDuBot, DernierEmbedIDDuBot);
			}
			play(connection, message);
		} else {
			//connection.disconnect;
			if (message.guild.voiceConnection) {
				message.channel.send("Finished the queue from channel: '" + message.guild.voiceConnection.channel.name + "' :wave:").then(function () {
					DernierMessageDuBot = message.channel.lastMessage;
					DernierMessageIDDuBot = message.channel.lastMessageID;

					setTimeout(() => {
						deleteMyMessageID(DernierMessageDuBot, DernierMessageIDDuBot);
					}, 10000);
				});
				message.guild.voiceConnection.disconnect();
			}
		}

	});
}

bot.on('ready', () => { //Quand le bot est prêt (chargé donc)
	bot.user.setStatus("online")
	console.log("------------------------------")
	console.log(prefixLog + "Bot created by RisedSky & LePandaFou77 <3")
	console.log(prefixLog + "All rights reserved")
	console.log(prefixLog + "Bot ready")
	console.log("------------------------------")

	bot.user.setActivity(prefix + "help | Started and ready !");
	setTimeout(ChangeState1, 20000);
	console.log("The bot is now ready !")
	if (bot.user.client.guilds.exists("fetchAuditLogs", "ban")) {
		console.log("oui");
	} else console.log("non");
})

bot.on('guildMemberAdd', member => { //Quand une personne rejoint le discord
	try {
		console.log("Une nouvelle personne vient de rejoindre: " + member.displayName)
		const defaultChannel = member.guild.channels.find(c => c.permissionsFor(member.guild.me).has("SEND_MESSAGES"));
		defaultChannel.send("Bienvenue <@" + member.id + ">")
		setTimeout(
			function () {
				member.addRole("Membre");
			}, 3000
		);
	} catch (error) {
		console.log(error)
	}
})

bot.on('guildCreate', Guild => {
	console.log("I just join the server: " + Guild.name + " | ID: " + Guild.id)
	if (Guild.id != DefaultGuildID) {
		console.log("I just left the server: " + Guild.name);
		Guild.leave();
	}
})

bot.on('message', message => { //Quand une personne envoit un message
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	var MessageID = message.id;
	var args = message.content.substring(prefix.length).split(" ");
	var Mess = message;
	var Mess_Channel = message.channel;
	var Mess_Member = message.member;
	var Mess_voiceChannel = message.member.voiceChannel;

	switch (args[0].toLowerCase()) {

		case "play":

			setTimeout(() => {
				message.delete(MessageID);
			}, 750);

			if (!args[1]) {
				message.react("❌");
				message.reply("Merci de spécifier un lien").then(function () {
					DernierMessageDuBot = Mess_Channel.lastMessage;
					DernierMessageIDDuBot = Mess_Channel.lastMessageID;
					setTimeout(() => {
						deleteMyMessageID(DernierMessageDuBot, Mess_Channel.lastMessageID);
					}, 4000);
				})
				return;
			} else if (!Mess_voiceChannel) {
				message.react("❌");
				message.reply("Tu dois être dans un salon vocal").then(function () {
					DernierMessageDuBot = Mess_Channel.lastMessage;
					DernierMessageIDDuBot = Mess_Channel.lastMessageID;
					setTimeout(() => {
						deleteMyMessageID(DernierMessageDuBot, Mess_Channel.lastMessageID);
					}, 4000);
				})
				return;
			} else if (Mess_Member.selfDeaf) { //Si la personnealors on fait éviter de faire user la bande passante pour rien
				message.react("❌");
				message.reply("Tu ne dois pas être deafen.").then(function () {
					DernierMessageDuBot = Mess_Channel.lastMessage;
					DernierMessageIDDuBot = Mess_Channel.lastMessageID;
					setTimeout(() => {
						deleteMyMessageID(DernierMessageDuBot, Mess_Channel.lastMessageID);
					}, 4000);
				})
				return;
			}

			var MusicLink = message.content.split("&");
			console.log(MusicLink)

			//vérifie si le serveur est déjà dans la liste
			if (!servers[message.guild.id]) servers[message.guild.id] = {
				queue: []
			};

			//l'ajoute alors
			var server = servers[message.guild.id];

			//récupere le *play <song> et supprime *play pour mettre que le lien de la musique
			server.queue.push(String(args).substring(5));

			//Ajoute les infos pour le embed
			YTDL.getInfo(args[1], function (err, info) {
				YouTubeTitle = info.title; //récupere le titre
				YouTubeThumbnail = info.thumbnail_url; //récupere la minia
				YouTubeLink = args[1]; //récupere le lien de la vidéo
				YouTubeTime = new Date(info.timestamp * 1000).toISOString().substr(11, 8); // récupere le temps et le transforme en h: i: s
				console.log("Timestamp : " + info.timestamp);
				console.log("Testnewtimestamp : " + new Date(Date.now() + info.timestamp));

				var time = new Date(Date.parse(info.timestamp));
				//Mess_Channel.send("Le temps est de : " + time.toLocaleLowerCase);
			})

			setTimeout(() => {

				embed = new Discord.RichEmbed()
					.setColor(0, 255, 255)
					.setAuthor(YouTubeTitle, message.author.avatarURL)
					.setThumbnail(YouTubeThumbnail).setURL(YouTubeLink)
					.setTitle("Musique ajoutée")
					.addField("Durée de: ", "**" + YouTubeTime + "**")
					.setFooter("Demandé par " + Mess_Member.displayName + " • ID: " + Mess_Member.id)

				Mess_Channel.send(embed).then(function () {
					DernierEmbedDuBot = message.lastMessage;
					DernierEmbedIDDuBot = message.lastMessageID;
					setTimeout(() => {
						deleteMyMessageID(DernierEmbedDuBot, DernierEmbedIDDuBot)
					}, 300000);
				})

				if (!message.guild.voiceConnection) {
					message.member.voiceChannel.join()
						.then(function (connection) {
							play(connection, message);
						})
				};

			}, 3000);

			//Récupere le dernier message (donc celui du bot)
			setTimeout(() => {
				console.log("Content: '" + Mess_Channel.lastMessage.content + "'");
				DernierMessageDuBot = Mess_Channel.lastMessage.content;
				DernierMessageIDDuBot = Mess_Channel.lastMessageID;
			}, 4000);

			break;
		//-------
		case "skip":
			var server = servers[message.guild.id];

			if (server.dispatcher) {
				server.dispatcher.end();
			}

			message.delete(MessageID);
			message.reply("Successfuly skipped the currently song").then(function () {
				DernierMessageDuBot = Mess_Channel.lastMessage;
				DernierMessageIDDuBot = Mess_Channel.lastMessageID;
				deleteMyMessageID(DernierMessageDuBot, DernierMessageIDDuBot)
			});

			break;
		//-------
		case "stop":
			var server = servers[message.guild.id];
			message.delete(MessageID);
			if (message.guild.voiceConnection) {
				for (var i = server.queue.length - 1; i >= 0; i--) {
					server.queue.splice(i, 1);
				}
				Mess_Channel.send("Stopped all the music from channel: " + message.guild.voiceConnection.channel.name);
				message.guild.voiceConnection.disconnect();
			}
			break;
		//-------
		case "queue":
			var server = servers[message.guild.id];

			try {
				for (var i = server.queue.length - 1; i >= 0; i--) {
					console.log(i)
					Mess_Channel.send(i)
				}
			} catch (error) {
				console.log("Ligne 285: " + error)
			}
			break;
		case "say":
			if (message.member.roles.some(r => ["Staff", "Développeur"].includes(r.name))) {
				const SayMessage = message.content.substr(4);
				message.channel.send(SayMessage);
				message.delete(MessageID);
			} else {
				message.reply("Vous n'avez pas la permission.");
			}
			break;
		//----------
		case "ping":
			Mess_Channel.send("J'ai actuellement un ping de: " + parseInt(bot.ping) + " ms :ping_pong:");
			break;
		//----------
		case "restart":
			Mess_Channel.send("Redémarrage en cours ...");
			bot.setStatus("invisible");
			bot.disconnect;
			console.log("Disconnected")
			setTimeout(function () {
				bot.login(BOT_TOKEN);
				console.log("Reconnected")
			}, 5000);
			break;
		//-------
		case "purge": //Ajouter la possibilité de supprimer uniquement les messages du bot (genre *purge-bot 100)
			setTimeout(function () {
				message.delete(MessageID);
			}, 750);

			var NumberToDelete = message.content.substr(7);

			if (NumberToDelete <= 0) {
				message.reply("Merci de mettre un nombre de message à purger");
				return;
			} else if (NumberToDelete > 100) {
				message.reply("Malheureusement, ce bot ne peut supprimer que 100 messages à la fois.");
				return;
			}

			setTimeout(function () {
				message.channel.bulkDelete(NumberToDelete);
				message.channel.send("Nettoyage en cours...");
			}, 1500);
			setTimeout(function () {
				message.channel.send("Nettoyage terminé ! :white_check_mark:");
				message.channel.bulkDelete(2);
			}, 2500);
			break;
		//-----------
		case "help":
			embed = new Discord.RichEmbed()
				.setColor(225, 0, 0)
				.setAuthor("Voici la liste de toutes les commandes")
				.setThumbnail(message.author.avatarURL)
				.addField("*play <lien de la musique>", "Le bot va rejoindre ton channel et va jouer de la musique")
				.addField("*skip", "Le bot va ignorer la musique actuelle")
				.addField("*stop", "Le bot va arrêter de jouer de la musique")
				.addField("*queue", "Affiche la liste des musiques")
				.addField("*say", "Commande pour faire parler le bot (Requiert un rôle Staff)")
				.addField("*ping", "Affiche le ping du bot")
				.addField("*purge", "Nettoie un nombre de message donné **(Max 100)**")
				.addField("*restart", "Redémarre le bot (**Expérimental**)")

				.addField("*help", "Affichage de toutes les commandes du bot !")

				//.addField("*Join", "Le bot va rejoindre ton channel")

				.setFooter("Demandé par " + Mess_Member.displayName + " • ID: " + Mess_Member.id);
			Mess_Channel.send(embed);
			setTimeout(() => {
				Mess_Channel.lastMessage.react("✅");
				message.delete(MessageID);
			}, 500);
			break;

		//----------
		default:
			message.delete(MessageID);

			Mess_Channel.send("Commande non reconnue.").then(function () {
				setTimeout(() => {
					Mess_Channel.lastMessage.react("❓");
				}, 250);
			})

			break;
	}
})

/*
✅👌🐼🗑️
Site 1 : https://emojiterra.com
Site 2 : http://smiley.cool/fr/twitter-emoji.php
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
	bot.user.setStatus("invisible")
	console.log("Je suis invisible")
})

bot.on('resume', () => {
	console.log("resumed!");
})
