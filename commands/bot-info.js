module.exports = {
    help: { name: "bot-info" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var d = new Date(null);
            d.setMilliseconds(call.bot.uptime);
            var bot_online_since_time = d.toISOString().substr(11, 8); // récupere le temps et le transforme en HH:mm:ss

            var time = call.bot.moment.duration(call.bot.uptime, "milliseconds");
            //console.log(bot.uptime);

            var time_string;
            if (time.get("days") > 1) {
                time_string = time.get("days") + " days, " + time.get("hours") + " hours, " + time.get("minutes") + " minutes, " + time.get("s") + " seconds."

            } else if (time.get("hours") > 1) {
                time_string = time.get("hours") + " hours, " + time.get("minutes") + " minutes, " + time.get("s") + " seconds."

            } else if (time.get("minutes") > 1) {
                time_string = time.get("minutes") + " minutes, " + time.get("s") + " seconds."

            } else if (time.get("seconds") > 1) {
                time_string = time.get("s") + " seconds."

            }


            //console.log(bot_online_since_time)
            //var bot_online_since_time = moment(d).format("HH:mm:ss DD-MM-YYYY")
            var bot_online_since_time = time_string
            var bot_date_created = call.bot.moment(call.bot.user.createdTimestamp).format("HH:mm:ss DD-MM-YYYY");

            var embedbot_info = new Discord.RichEmbed()
                .setColor("#FFFFFF")
                .setAuthor("Bot-Information", call.bot.user.avatarURL)
                .setTitle("Created by RisedSky & PLfightX")
                .addField("I'm developed in Node.js", "I'm using Discord.js libraries", true)
                .addField("My node version", process.version, true)
                .addBlankField()
                .addField("Memory Usage", Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 * 100 / 100) + " / " + Math.floor(process.memoryUsage().heapTotal / 1024 / 1024 * 100 / 100) + " Mb", true)
                .addField("My version", call.bot.config.bot_version, true)
                .addBlankField()
                .addField("I am created since", bot_date_created, true)
                .addField("I am online since", bot_online_since_time, true)
                .addBlankField()
                .addField("I am in", call.bot.guilds.size + " servers", true)
                .addField("With", call.bot.users.size + " users", true)
                //.setFooter("Asked by " + message.author.username + "")
                .setFooter(call.bot.AskedBy_EmbedFooter(message.author))
                .setTimestamp();
            //.addField("")
            //liste des bêta-testers
            message.channel.send(embedbot_info).then(function (msg) {
                call.bot.deleteMyMessage(msg, 300 * 1000)
            })


        } catch (error) {
            console.log("bot-info error");
            console.log(error);

        }
    }
}