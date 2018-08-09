module.exports = {
    help: { name: "credits" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd


        try {
            var embed_credits = new Discord.RichEmbed()
                .setAuthor(call.bot.user.username, call.bot.user.avatarURL)
                .setColor("ORANGE")
                .setDescription(
                    "A big thanks to:\n" +
                    "`gt-c#0495` for the big help in contributing to the bot in github & in DM\n\n" +
                    "`Amoky#2264` & `Pyrothec06#1012` - For the french translation\n\n" +
                    "`Showehanle2000#9772` - For the russian translation\n\n" +
                    "\nSpecial thanks: \n\n" +
                    "`Sloper39#9509` & `Tard0sTV#8871` - For being so active in our server !\n\n" +
                    "`KoyLL_#7806, ilian0112#4033, X-ray984589#8466, Arnor Leaderlight#3895, Sheltai#9181` - For testing the bot"
                )
            message.channel.send(embed_credits)
        } catch (error) {
            console.log("credits error");
            console.log(error);
        }
    }
}