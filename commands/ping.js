module.exports = {
    help: { name: "ping" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            Mess_Channel.send(`:ping_pong: ${call.bot.current_lang.Command_Bot_My_Ping}: ?`).then(function (newMessage) {
                newMessage.edit(newMessage.content.replace("?", ((newMessage.createdTimestamp - message.createdTimestamp) / 10) + ' ms'));
                call.bot.deleteMyMessage(newMessage, 14 * 1000);
            })

        } catch (err) {
            console.log("ping error");
            console.log(err);
        }
    }
}