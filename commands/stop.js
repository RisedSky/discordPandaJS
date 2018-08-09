module.exports = {
    help: { name: "stop" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        var server = call.bot.servers[message.guild.id]
        if (message.guild.voiceConnection) {
            for (var i = server.queue.length - 1; i >= 0; i--) {
                server.queue.splice(i, 1);
            }
            Mess_Channel.send(`${call.bot.current_lang.Music_Stopped_From}: \`${message.guild.voiceConnection.channel.name}\` :wave:`).then(function (msg) {
                call.bot.deleteMyMessage(msg, 20 * 1000);
            })
            message.guild.voiceConnection.disconnect();
        } else {
            message.reply(call.bot.current_lang.Music_No_Music_Playing).then(msg => {
                call.bot.deleteMyMessage(msg, 5 * 1000)
            })
        }
    }
}