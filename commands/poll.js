module.exports = {
    help: { name: "poll" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            call.bot.DeleteUserMessage(false)

            var cont = message.content
            b1 = cont.indexOf(" | ");
            b2 = cont.indexOf(" | ", b1 + 3);
            b3 = cont.indexOf(" | ", b2 + 3);
            if (b3 == -1) b3 = cont.length;
            b4 = cont.indexOf(" | ", b3 + 3);
            if (b4 == -1) b4 = cont.length;
            b5 = cont.indexOf(" | ", b4 + 3);
            if (b5 == -1) b5 = cont.length;
            b6 = cont.indexOf(" | ", b5 + 3);
            if (b6 == -1) b6 = cont.length;
            b7 = cont.indexOf(" | ", b6 + 3);
            if (b7 == -1) b7 = cont.length;
            b8 = cont.indexOf(" | ", b7 + 3);
            if (b8 == -1) b8 = cont.length;
            b9 = cont.indexOf(" | ", b8 + 3);
            if (b9 == -1) b9 = cont.length;

            var question = cont.substr(5, b1 - 5);
            prop1 = cont.substr(b1 + 3, b2 - b1 - 3);
            prop2 = cont.substr(b2 + 3, b3 - b2 - 3);
            prop3 = cont.substr(b3 + 3, b4 - b3 - 3);
            prop4 = cont.substr(b4 + 3, b5 - b4 - 3);
            prop5 = cont.substr(b5 + 3, b6 - b5 - 3);
            prop6 = cont.substr(b6 + 3, b7 - b6 - 3);
            prop7 = cont.substr(b7 + 3, b8 - b7 - 3);
            prop8 = cont.substr(b8 + 3, b9 - b8 - 3);
            prop9 = cont.substr(b9 + 3);

            if (question == "" || prop1 == "" || prop2 == "") {
                message.reply(String(call.bot.current_lang.Command_Poll_No_Question_Or_Answer.replace("{0}", call.bot.config.prefix))).then(msg => {
                    call.bot.deleteMyMessage(msg, 16 * 1000)
                })
                return;
            }

            var embed = new Discord.RichEmbed()
                .setColor("DARK_PURPLE")
                .setAuthor(`${call.bot.current_lang.Command_Poll_By} ${message.author.username}`, message.author.displayAvatarURL)
                .setTitle(question)
                .addField(prop1, ":one:", true)
                .addField(prop2, ":two:", true)
                .setFooter(call.bot.AskedBy_EmbedFooter(message.author))
                .setTimestamp();

            if (prop3 != "") embed.addField(prop3, ":three:", true);
            if (prop4 != "") embed.addField(prop4, ":four:", true);
            if (prop5 != "") embed.addField(prop5, ":five:", true);
            if (prop6 != "") embed.addField(prop6, ":six:", true);
            if (prop7 != "") embed.addField(prop7, ":seven:", true);
            if (prop8 != "") embed.addField(prop8, ":eight:", true);
            if (prop9 != "") embed.addField(prop9, ":nine:", true);

            Mess_Channel.send(embed)
                .then(function (msg) { 
                    msg.react("1⃣")
                    setTimeout(function () { msg.react("2⃣") }, 500);
                    setTimeout(function () { if (prop3 != "") msg.react("3⃣") }, 1500);
                    setTimeout(function () { if (prop4 != "") msg.react("4⃣") }, 2000);
                    setTimeout(function () { if (prop5 != "") msg.react("5⃣") }, 2500);
                    setTimeout(function () { if (prop6 != "") msg.react("6⃣") }, 3000);
                    setTimeout(function () { if (prop7 != "") msg.react("7⃣") }, 3500);
                    setTimeout(function () { if (prop8 != "") msg.react("8⃣") }, 4000);
                    setTimeout(function () { if (prop9 != "") msg.react("9⃣") }, 4500);
                });

        } catch (error) {
            console.log("poll error");
            console.log(error);
        }
    }
}