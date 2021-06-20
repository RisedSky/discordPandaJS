module.exports = {
    help: { name: "user-info" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

            let userArray = message.content.split(" ");
            let userArgs = userArray.slice(1);
            let infomember = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

            var infouser = infomember.user;
            var usercreated_date = call.bot.moment(infouser.createdTimestamp).format("DD-MM-YYYY HH:mm:ss");
            var userjoining_date = call.bot.moment(infomember.joinedTimestamp).format("DD-MM-YYYY HH:mm:ss");
            var embeduser_info = new Discord.RichEmbed()
                .setColor(infomember.displayHexColor)
                .setAuthor(infomember.displayName + " informations", infouser.displayAvatarURL)
                .setTitle("DiscordTag: " + infouser.tag + " | ID: " + infouser.id)
                .addBlankField()
                .addField("**Account created: **", usercreated_date, true)
                .addField("**Joining date: **", userjoining_date, true)
                .addBlankField()
                .addField("**Avatar url:**", infouser.displayAvatarURL)
                .setFooter(call.bot.AskedBy_EmbedFooter(message.author))
                .setTimestamp();

            message.channel.send(embeduser_info).then(function (msg) {
                call.bot.deleteMyMessage(msg, 300 * 1000)
            })


        } catch (error) {
            console.log("user-info error")
            console.log(error);
        }
    }
}
