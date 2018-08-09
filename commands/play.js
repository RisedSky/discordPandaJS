module.exports = {
    help: { name: "play" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var server = call.bot.servers[message.guild.id]
            
            if (!call.args[0]) {
                message.react("❌").catch(e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play > " + e);
                })
                message.reply(call.bot.current_lang.Music_Tell_Me_Something_Play).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;

            } else if (!Mess_Member.voiceChannel) {

                message.react("❌").catch(e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play > " + e);
                })
                message.reply(call.bot.current_lang.Music_Not_In_Vocal).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 16 * 1000);
                })
                return;

            } else if (Mess_Member.selfDeaf) {
                message.react("❌").catch(e => {
                    if (e.name === "DiscordAPIError") return;
                    console.log("Error play > " + e);
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

                //var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
                /*
                var match = args[1].match(regExp);
        
                if (match && match[2]) {
                    server.annonce_it = false;
                    queue_playlist(match[2], message);
                    return;
                }
                */

                server.annonce_it = true;
                if (parsed.host.match(/(www\.)?youtube.com|(www\.)?youtu.be/i)) {

                    var regExp = /^.*v=([^#\&\?]*).*/;
                    var match = call.args[0].match(regExp);

                    if (match[1]) {//if (match && match[2]) {
                        return call.bot.search_video(message, match[1]);
                    } else {
                        message.reply(call.bot.current_lang.Music_Not_Playlist).then(msg => {
                            call.bot.deleteMyMessage(msg, 14 * 1000)
                        })
                    }

                    return;

                } else if (parsed.host.match(/(www\.)?soundcloud.com/i)) {
                    console.log("C'est du soundcloud")
                    message.reply(call.bot.current_lang.Music_Soundcloud_Not_Supported).then(function (msg) {
                        call.bot.deleteMyMessage(msg, 16 * 1000);
                    })

                    return;
                }

            } else {
                var argsSearch = message.content.split(" ");

                var q = "";

                for (var i = 1; i < argsSearch.length; i++) {
                    q += argsSearch[i] + " ";
                }
                return call.bot.search_video(message, q);
            }


        } catch (error) {
            console.log("play error");
            console.log(error);

        }
    }

}