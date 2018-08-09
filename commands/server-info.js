module.exports = {
    help: { name: "server-info" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var server_date_created = call.bot.moment(message.guild.createdTimestamp).format("HH:mm:ss DD-MM-YYYY");

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
                .setFooter(call.bot.AskedBy_EmbedFooter(message.author))
                .setTimestamp();

            message.channel.send(embedbot_info).then(function (msg) {
                call.bot.deleteMyMessage(msg, 300 * 1000)
            })


        } catch (error) {
            console.log("server-info error");
            console.log(error)
        }
    }
}