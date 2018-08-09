module.exports = {
    help: { name: "pause" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        var server = call.bot.servers[message.guild.id]
        if (!server.dispatcher) {
            //console.log("No dispatcher")
            message.reply(call.bot.current_lang.Music_No_Music_Playing).then(msg => {
                call.bot.deleteMyMessage(msg, 15 * 1000)
            });
            return;

        } else if (!Mess_Member.voiceChannel.name === message.guild.voiceConnection.channel.name) {
            message.reply(call.bot.current_lang.Music_Not_In_The_Same_Vocal)
                .then(function (msg) {
                    call.bot.deleteMyMessage(msg, 12 * 1000);
                })
            return;
        }

        if (server.dispatcher_paused) {
            server.dispatcher.resume();
            server.dispatcher_paused = false;
            message.reply(`${call.bot.current_lang.Music_Resume_Success} :play_pause: :headphones:`).then(msg => {
                call.bot.deleteMyMessage(msg, 20 * 1000)
            })
        } else {
            server.dispatcher.pause();
            server.dispatcher_paused = true;
            message.reply(`${call.bot.current_lang.Music_Pause_Success} :stop_button: :headphones:`).then(msg => {
                call.bot.deleteMyMessage(msg, 20 * 1000)
            })
        }

    }
}