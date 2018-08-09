module.exports = {
    help: { name: "say" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        const SayMessage = message.content.substr(call.bot.config.prefix.length + 3);

        if (call.bot.member_has_MANAGE_MESSAGES) {
            Mess_Channel.send(SayMessage).catch(error => {
                //console.log(error + " -- " + error.name);

                if (error.name == "DiscordAPIError") {
                    return message.reply(call.bot.current_lang.Command_User_Message_Is_Empty).then(function (msg) {
                        call.bot.deleteMyMessage(msg, 9 * 1000)
                    })
                }
            })
        } else {
            message.reply(call.bot.current_lang.Command_User_Need_Permission_Manage_Messages).then(function (msg) {
                call.bot.deleteMyMessage(msg, 10000);
            })
        }
    }
}