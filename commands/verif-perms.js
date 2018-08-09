module.exports = {
    help: { name: "verif-perms" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd
        try {

            var embed = new Discord.RichEmbed()
                .setColor("#00FF00")
                .setAuthor("Permissions checking", call.bot.user.avatarURL)
                .setThumbnail(message.author.avatarURL)
                .setDescription("Looking **my** permission for **<#" + message.channel.id + ">**")

                .addField("SEND_MESSAGES", call.bot.PermissionCheck(call.bot.BOT_SEND_MESSAGESPerm), true)
                .addField("MANAGE_MESSAGES", call.bot.PermissionCheck(call.bot.BOT_MANAGE_MESSAGESPerm), true)
                .addField("ADMINISTRATOR", call.bot.PermissionCheck(call.bot.BOT_ADMINISTRATORPerm), true)
                .addField("USE_EXTERNAL_EMOJIS", call.bot.PermissionCheck(call.bot.BOT_USE_EXTERNAL_EMOJISPerm), true)

                .setFooter("Asked by " + Mess_Member.displayName + " • ID: " + Mess_Member.id);

            message.channel.send(embed).then(function (msg) {
                call.bot.deleteMyMessage(msg, 25 * 1000);
            })

            //message.guild.me).hasPermissions("SEND_MESSAGES") && c.type === 'text')
            //const truc = message.guild.channels.find(c => c.permissionsFor(message.guild.me).hasPermissions("SEND_MESSAGES") && c.type === 'text')

        } catch (error) {
            console.log("verif-perms error")
            console.log(error);
        }
    }
}