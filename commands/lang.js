module.exports = {
    help: { name: "lang" },
    run: async (call) => {
        var message = call.message
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        /*call.bot.SQL_GetResult(function (err, result) {
            if (err) console.log("Database error!");
            if (result == undefined) return

            lang = result.lang;
            if (!call.args[0]) {
                if (lang == undefined || lang == null || lang == "") {
                    return message.reply(`Current language: None`)
                } else return message.reply(`Current language: ${result.lang}`)
        */

        call.bot.SQL_GetResult(message, message.member)
            .then(result => {
                //console.log(result)
                if (result == undefined) return
                lang = result.lang;

                //console.log(call.args);
                
                if (!call.args[0]) {
                    if (lang == undefined || lang == null || lang == "") {
                        return message.reply(`Current language: None`)
                    } else return message.reply(`Current language: ${result.lang}`)


                } else if (!call.bot.member_Has_MANAGE_GUILD) {
                    return message.reply(`${call.bot.current_lang.Command_User_Not_Allowed} ${call.bot.current_lang.Permission_Manage_Server_Required}`)
                }

                switch (call.args[0].toLowerCase()) {
                    case "help":
                        var lang_embed = new Discord.RichEmbed()
                            .setAuthor(call.bot.user.username, call.bot.user.avatarURL)
                            .setColor("GREEN")
                            .setDescription(
                                `Available language:\nFrench, English, Russian\n\nCommand to change the language: \`${call.bot.config.prefix}lang english\``
                            )
                        message.channel.send(lang_embed).then(msg => {
                            call.bot.deleteMyMessage(msg, 60 * 1000)
                        })
                        break;
                    case "french":
                        call.bot.SQL_UpdateLang(message, "lang", "french").then(() => {
                            setTimeout(() => {
                                message.reply(call.bot.current_lang.Lang_Defined_To_French)
                            }, 350);
                        })
                        break;

                    case "english":
                        call.bot.SQL_UpdateLang(message, "lang", "english").then(() => {
                            setTimeout(() => {
                                message.reply(call.bot.current_lang.Lang_Defined_To_English)
                            }, 350);
                        })
                        break;

                    case "russian":
                        call.bot.SQL_UpdateLang(message, "lang", "russian").then(() => {
                            setTimeout(() => {
                                message.reply(call.bot.current_lang.Lang_Defined_To_Russian)
                            }, 350);
                        })
                        break;
                    default:
                        message.reply(String(call.bot.current_lang.Lang_Didnt_Find_Lang).replace("{0}", call.args[0]))
                        message.reply(`The help command is: ${call.bot.config.prefix}lang help`)
                        break;
                }

            })
            .catch(err => {
                console.log(err)
            })
    }
}
