module.exports = {
    help: { name: "auto_role", aliases: ["autorole"] },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {

            if (!call.bot.member_Has_MANAGE_GUILD || !call.bot.member_Has_MANAGE_ROLES) {
                message.reply(call.bot.current_lang.Command_User_Not_Allowed)
            }

            if (!call.args[0]) {
                return help_embed(message)

            } else if (call.args[0]) {
                call.bot.SQL_GetResult(message, message.member)
                    .then(result => {
                        //console.log(result)
                        if (result == undefined) return
                        autorole_status = result.autorole_status;

                        if (call.args[0].toLowerCase() == "help") {
                            return help_embed(message)

                        } else if (call.args[0].toLowerCase() == "show") {
                            autorole_role = result.autorole_role;
                            call.bot.DeleteUserMessage(false)
                            let autorole_status_msg = ""
                            if (autorole_status) {
                                autorole_status_msg = call.bot.current_lang.Command_Autorole_Activated
                            } else {
                                autorole_status_msg = call.bot.current_lang.Command_Autorole_Deactivated
                            }

                            if (autorole_role == undefined || autorole_role == null) {
                                autorole_status_msg += `\n${call.bot.current_lang.Command_AutoRole_Not_Defined}`
                            } else {
                                autorole_status_msg += `\nRole: <@&${autorole_role}>`
                            }

                            call.bot.DeleteTheMessage(message, 15000)
                            return message.reply(autorole_status_msg).then(m => { call.bot.deleteMyMessage(m, 20000) })

                        } else if (call.args[0].toLowerCase() == "on") {
                            console.log("detected on");
                            call.bot.DeleteUserMessage(false);

                            if (autorole_status == true) {
                                //already activated
                                message.reply(call.bot.current_lang.Command_Autorole_Already_Activated)
                            } else if (autorole_status == false) {
                                //we can now activate it
                                call.bot.SQL_UpdateSomething(message, "autorole_status", true)
                                message.reply(call.bot.current_lang.Command_Autorole_Now_Activated)
                            }

                        } else if (call.args[0].toLowerCase() == "off") {
                            console.log("detected off");
                            call.bot.DeleteUserMessage(false);

                            if (autorole_status == false) {
                                //already deactivated
                                message.reply(call.bot.current_lang.Command_Autorole_Already_Deactivated)
                            } else if (autorole_status == true) {
                                //we can now deactivate it
                                call.bot.SQL_UpdateSomething(message, "autorole_status", false)
                                message.reply(call.bot.current_lang.Command_Autorole_Now_Deactivated)
                            }

                        } else if (call.args[0].toLowerCase() == "set") {
                            if (!call.args[1]) {
                                return message.reply(call.bot.current_lang.Command_Args_Missing).then(msg => { call.bot.deleteMyMessage(msg, 10000) })
                            } else {
                                call.bot.DeleteUserMessage(false)
                                if (message.mentions.roles) {
                                    console.log("detected mention");
                                    var role = message.mentions.roles.first()
                                    if (role) {
                                        return call.bot.SQL_UpdateSomething(message, "autorole_role", role.id).then((e, r) => {
                                            if (r) console.log(r)
                                            message.reply(String(call.bot.current_lang.Command_Autorole_Is_Now_Defined_As).replace("{0}", role.name))
                                        })
                                        //console.log(role);
                                    } else {
                                        return message.reply(String(call.bot.current_lang.Command_AutoRole_Not_Found_Role).replace("{0}", call.args[1]))
                                    }
                                } else {
                                    console.log(`args1 = ${call.args[1]}`);

                                    for (var i in message.guild.roles.array()) {
                                        if (message.guild.roles.array()[i].name.toLowerCase() == call.args[1].toLowerCase()) {
                                            console.log("FOUND THE ROLE !!!!!");

                                        }
                                    }
                                }
                            }
                        }
                    })
            }



            function help_embed(message) {
                var help_embed_msg = new Discord.RichEmbed()
                    .setColor("ORANGE")
                    .setAuthor("AutoRole Help", call.bot.user.avatarURL)
                    /*
                    .setDescription(`To use the \`auto_role\` command here is some tips:\n` +
                        `:one: First, you need to put the role you want to define when a user come in your user, with that command: \`${call.bot.config.prefix}auto_role set @role\`\n\n` +
                        `:two: After that, if the first command is good, you need to enable the auto_role, here's how: \`${call.bot.config.prefix}auto_role on\`\n\n\n` +

                        `:information_source: List of args: \`help, show, on, off\`\n` +
                        `:information_source: If you need to **disable** it, just do: \`${call.bot.config.prefix}auto_role off\`\n` +
                        `:information_source: You can use the command \`${call.bot.config.prefix}autorole\` **instead of** \`${call.bot.config.prefix}auto_role\` \n`
                    )
                    */
                    .setDescription(`${call.bot.current_lang.Command_AutoRole_Embed_Description1}` +
                        `${String(call.bot.current_lang.Command_AutoRole_Embed_Description2).replace("{0}", `${call.bot.config.prefix}`)}` +
                        `${String(call.bot.current_lang.Command_AutoRole_Embed_Description3).replace("{0}", `${call.bot.config.prefix}`)}` +

                        `${call.bot.current_lang.Command_AutoRole_Embed_Description4}` +
                        `${String(call.bot.current_lang.Command_AutoRole_Embed_Description5).replace("{0}", `${call.bot.config.prefix}`)}` +
                        `${String(call.bot.current_lang.Command_AutoRole_Embed_Description6).replace("{0}", `${call.bot.config.prefix}`).replace("{1}", `${call.bot.config.prefix}`)}`
                    )
                    .setFooter(call.bot.AskedBy_EmbedFooter(message.author))

                message.channel.send(help_embed_msg)
            }
        } catch (error) {
            console.log("auto_role error");
            console.log(error);

        }
    }
}