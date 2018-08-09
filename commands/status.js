module.exports = {
    help: { name: "status" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var server = call.bot.servers[message.guild.id]
            if (!server.queue[0]) {
                message.reply(call.bot.current_lang.Music_Status_No_Music).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 15 * 1000)
                })
                return;
            }
            var disp_time = call.bot.moment.duration(server.dispatcher.time, "milliseconds")
            console.log(`Server disptacher => '${disp_time.get("seconds")}' - Time => '${server.queue[0]["YouTubeTimeSec"]}'`);
            
            var time_remainingSec = (server.queue[0]["YouTubeTimeSec"] - disp_time.get("seconds"))

            var de = new Date(null);
            de.setSeconds(time_remainingSec);
            var TimeRemaining = de.toISOString().substr(11, 8); // récupere le temps et le transforme en HH:mm:ss

            embedStatus = new Discord.RichEmbed()
                .setColor("#FFFF00")
                .setAuthor(call.bot.current_lang.Music_Status_Status, call.bot.user.avatarURL)
                .setDescription(`*${call.bot.current_lang.Music_Status_Current_Status}*`)
                .setThumbnail(server.queue[0]["YouTubeThumbnail"]).setURL(server.queue[0]["YouTubeLink"])

                .addField(`${call.bot.current_lang.Music_Status_Current_Song}: ${server.queue[0]["title"]}`, `*(${call.bot.current_lang.Music_Requested_By} ${server.queue[0]["user"]})*`)
                .addBlankField()

                .addField(call.bot.current_lang.Music_Status_Track_Loop, call.bot.CheckInfo_ToBooleanEmoji(server.loopit), true)
                .addField(call.bot.current_lang.Music_Status_Track_Paused, call.bot.CheckInfo_ToBooleanEmoji(server.dispatcher_paused), true)

                .addBlankField()

                .addField(call.bot.current_lang.Music_Status_Uploaded_By, server.queue[0]["YouTubeUploader"], true)
                .addField(call.bot.current_lang.Music_Status_Song_Duration, `**${server.queue[0]["YouTubeTime"]}**`, true) //temps
                .addBlankField(true)
                .addField(call.bot.current_lang.Music_Status_Time_Remaining, `**${TimeRemaining}**`, true)

                .addBlankField()

                .addField(call.bot.current_lang.Music_Status_Views, server.queue[0]["YouTubeViews"], true)
                .addField(call.bot.current_lang.Music_Status_Link, `[Click here](${server.queue[0]["YouTubeLink"]})`, true)

                .setFooter(`${call.bot.current_lang.Music_Status_Requested_By} ${message.author.username} • ID: ${message.author.id}`)

            message.channel.send(embedStatus).then(function (msg) {
                call.bot.deleteMyMessage(msg, 120 * 1000);
            })

        } catch (error) {
            console.log("Status command problem ")
            console.log(error)
        }
    }
}