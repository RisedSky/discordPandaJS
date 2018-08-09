module.exports = {
    help: { name: "staff" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            if (!call.args[0]) {
                message.reply(call.bot.current_lang.Command_Staff_No_Message).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 15 * 1000)
                });
                return;
            }

            var msgStaff = message.content.substr(6);
            call.bot.guilds.forEach(guild => {
                const staff_commands_channels = guild.channels.find("id", "418847993182289926");
                if (!staff_commands_channels) return;
                staff_commands_channels.send(
                    "Message de: `" + message.author.tag + "` - ID: `" + message.author.id + "`" +
                    "\nSur le serveur: `" + message.guild.name + "` - ID guild: `" + message.guild.id + "`" +
                    "\n(via la commande `" + call.bot.config.prefix + "staff`) \n```" + msgStaff + "```" +
                    "\n------------------------------------------------------------------------------------------"
                );

                message.reply(call.bot.current_lang.Command_Staff_Sended_Message).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 13 * 1000)
                })
            })

        } catch (error) {
            console.log("staff error")
            console.log(error)
        }
    }
}