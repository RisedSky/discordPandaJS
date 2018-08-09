module.exports = {
    help: { name: "rekt" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            if (!call.args[0]) {
                message.reply(call.bot.current_lang.Command_Rekt_Nobody_To_Rekt).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 10 * 1000)
                })
                return;
            } else if (message.mentions.users.first() === message.author) {
                message.reply(call.bot.current_lang.Command_Rekt_Cant_Rekt_Yourself).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 10 * 1000)
                })
                return;
            }
            var embed = new Discord.RichEmbed()
                .setColor("RED")
                .setAuthor(`${call.bot.current_lang.Command_Rekt_By} ${message.author.username}`, message.author.avatarURL)
                .setDescription(String(call.bot.current_lang.Command_Rekt_Got_Rekt_By).replace("{0}", message.mentions.users.first()).replace("{1}", call.bot.NotifyUser(message.member.id)))
                .setImage("https://media1.tenor.com/images/f0515e416fd1ba95974412c18fd90d46/tenor.gif?itemid=5327720")
            message.channel.send(embed)

        } catch (error) {
            console.log("rekt error")
            console.log(error)
        }
    }
}