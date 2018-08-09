module.exports = {
    help: { name: "skip" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
        //message, bot, bot.commands, args, content, prefix, cmd

        var server = call.bot.servers[message.guild.id]
        if (!Mess_Member.voiceChannel) {
            message.reply(call.bot.current_lang.Music_Skip_Not_In_Vocal).then(function (msg) {
                call.bot.deleteMyMessage(msg, 12 * 1000);
            })
            return;
        } else if (!message.guild.voiceConnection) {
            message.reply(call.bot.current_lang.Music_No_Music_Playing).then(function (msg) {
                call.bot.deleteMyMessage(msg, 12 * 1000);
            })
            return;
        } else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
            message.reply(call.bot.current_lang.Music_Should_Not_Deafen).then(function (msg) {
                call.bot.deleteMyMessage(msg, 12 * 1000);
            })
            return;

        } else if (!Mess_Member.voiceChannel.name === message.guild.voiceConnection.channel.name) {
            message.reply(current_lang.Music_Not_In_The_Same_Vocal)
                .then(function (msg) {
                    call.bot.deleteMyMessage(msg, 12 * 1000);
                })
            return;
        } else if (!server.queue[1]) {
            message.reply(call.bot.current_lang.Music_Skip_No_Music_Found).then(function (msg) {
                call.bot.deleteMyMessage(msg, 10 * 1000)
            })
            return;
        }
        //console.log("User: " + Mess_Member.voicechannel.name + " | " + "Me: " + message.guild.voiceConnection.channel.name)

        //console.log(server.dispatcher);

        var video_id = server.queue[1]["id"];
        var title = server.queue[1]["title"];
        var user = server.queue[1]["user"];

        if (server.dispatcher) {
            var msg = [];
            msg.push(`${call.bot.current_lang.Music_Skip_Success} \n\`${server.now_playing_data["title"]}\` *(${call.bot.current_lang.Music_Requested_By} ${server.now_playing_data["user"]})* \n\n`);
            msg.push(`${call.bot.current_lang.Music_Now_Playing}: \`${title}\` *(${call.bot.current_lang.Music_Requested_By} ${user})*`)
            message.reply(msg).then(function (msg) {
                call.bot.deleteMyMessage(msg, 60 * 1000);
            })
            server.dispatcher.end();
        }

        server.now_playing_data["title"] = title;
        server.now_playing_data["user"] = user;

    }
}