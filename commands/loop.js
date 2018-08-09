module.exports = {
    help: { name: "loop" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var server = call.bot.servers[message.guild.id]

            if (!server.queue[0]) return message.reply(call.bot.current_lang.Music_No_Music_Playing)

            if (server.loopit) {
                server.loopit = false;
                message.reply(`:ok_hand: ${call.bot.EmojiGreenTickString} \`${server.queue[0]["title"]}\` ${call.bot.current_lang.Music_Song_Will_Not_Repeated}`).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 10000);
                })
            } else {
                server.loopit = true;
                message.reply(`:ok_hand: ${call.bot.EmojiGreenTickString} \`${server.queue[0]["title"]}\` ${call.bot.current_lang.Music_Song_Will_Be_Repeated}`).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 10000);
                })
            }
        } catch (error) {
            console.log("Loop error")
            console.log(error)
        }
    }
}