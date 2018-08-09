module.exports = {
    help: { name: "play-list" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var server = call.bot.servers[message.guild.id]
            if (!call.args[0]) {
                message.react("❌").catch(e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play-list > " + e);
                })
                message.reply(call.bot.current_lang.Music_Tell_Me_Something_Play_Playlist).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;

            } else if (!Mess_Member.voiceChannel) {
                message.react("❌").catch(e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play-list > " + e);
                })
                message.reply(call.bot.current_lang.Music_Not_In_Vocal).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;

            } else if (Mess_Member.selfDeaf) { //Si la personne est deafen alors on fait éviter de faire user la bande passante pour rien
                message.react("❌").catch(e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play-list > " + e);
                })
                message.reply(call.bot.current_lang.Music_Should_Not_Deafen).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;
            }

            server.playit = true;

            var parsed = call.bot.URL.parse(call.args[0]);
            if (parsed && parsed.host) {
                // YouTube URL
                var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
                var match = call.args[0].match(regExp);

                if (match[2]) {//if (match && match[2]) {
                    server.annonce_it = false;
                    call.bot.queue_playlist(match[2], message);
                    return;
                } else {
                    message.reply(call.bot.current_lang.Music_Not_Playlist).then(msg => {
                        call.bot.deleteMyMessage(msg, 14 * 1000)
                    })
                }
            } else {
                message.reply(call.bot.current_lang.Music_Not_Link).then(msg => {
                    call.bot.deleteMyMessage(msg, 14 * 1000)
                })
            }

        } catch (error) {
            console.log("play-list error");
            console.log(error);
        }
    }
}