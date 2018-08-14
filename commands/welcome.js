module.exports = {
    help: { name: "welcome" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            let argsCMD = `\`help, on, off, set, show, delete\``

            if (!call.bot.member_Has_MANAGE_GUILD) {
                return message.reply(call.bot.current_lang.Command_Welcome_User_Dont_Have_Permission)
            }

            if (call.args[0] === "on") {
                let activated;
                call.bot.SQL_GetResult(message, message.member).then(result => {
                    if (result == undefined) return;

                    activated = result.welcome_status;
                    //console.log(result.welcome_status);

                    if (activated == undefined) {
                        call.bot.SQL_Insert_NewServer(message.member)
                        return;
                    }

                    if (activated === 1) {
                        //console.log("Already activated");
                        message.reply(call.bot.current_lang.Command_Welcome_Already_Activated)
                        return;
                    } else {
                        //console.log("Now Activated");
                        call.bot.con.query(`UPDATE ${call.bot.DB_Model} SET welcome_status = true WHERE serverid = '${message.guild.id}'`, (err, results) => {
                            if (err) throw err;

                            //console.log("welcome_status activated!");
                            message.reply(call.bot.current_lang.Command_Welcome_Now_Activated)
                            //console.log(result)
                        });
                    }
                })


            } else if (call.args[0] === "off") {
                let activated;
                call.bot.SQL_GetResult(message, message.member).then(result => {
                    if (result == undefined) return;

                    activated = result.welcome_status;
                    //console.log(result.welcome_status);

                    if (activated === 0) {
                        //console.log("Already deactivated");
                        return message.reply(call.bot.current_lang.Command_Welcome_Already_Deactivated)
                        
                    } else {
                        //console.log("Now Activated");
                        call.bot.con.query(`UPDATE ${call.bot.DB_Model} SET welcome_status = false WHERE serverid = '${message.guild.id}'`, (err, results) => {
                            if (err) throw err;

                            //console.log("welcome_status deactivated !");
                            message.reply(call.bot.current_lang.Command_Welcome_Now_Deactivated)
                            //console.log(results[0])
                        });
                    }

                });

            } else if (call.args[0] === "set") {
                let channel = message.mentions.channels.first();
                if (!channel) { message.reply(String(call.bot.current_lang.Command_Welcome_No_Channel_In_Message).replace("{0}", call.bot.config.prefix)); return; }

                //console.log(call.args)

                //console.log("TEST >> " + call.content.substr(call.args[0].length + 1 + call.args[1].length + 1))
                //console.log(call.args_next)
                const channelMsg = call.content.substr(call.args[0].length + 1 + call.args[1].length + 1)
                //console.log("channelmsg: '" + channelMsg + "'")

                if (channelMsg.length === 0) {
                    return message.reply(call.bot.current_lang.Command_Welcome_No_Welcome_Channel_In_Message)
                }

                message.reply(`${call.bot.current_lang.Command_Welcome_Setting_Up_Your_Welcome_Message} ${channel} \n\`\`\`\n${channelMsg}\`\`\` `)

                try {
                    //const srv = await ${call.bot.DB_Model}_DB.findOne({ where: { serverid: message.guild.id } })
                    //const welcome_server = await ${call.bot.DB_Model}_DB.update({ welcome_message: channelMsg, welcome_channel: channel }, { where: { serverid: message.guild.id } })

                    //console.log("SQL_GetResult pour le welcome set" + SQL_GetResult(message).welcome_message)
                    call.bot.SQL_UpdateChannelMessage(message, channel);
                    call.bot.SQL_UpdateWelcomeMessage(message, channelMsg)
                    return message.channel.send(String(call.bot.current_lang.Command_Welcome_Message_In_Channel_Changed).replace("{0}", channel));
                }
                catch (e) {
                    return message.reply(`${call.bot.current_lang.Command_Welcome_Error_On_Setting_Welcome_Message} ${e}`);
                }

                //console.log(args[2].split(" ").join(" "))

            } else if (call.args[0] === "show") {
                var msgToSend = []
                    , show_welcome_channel = ""
                    , show_welcome_message = ""
                    , show_welcome_status;

                call.bot.SQL_GetResult(message, message.member).then(result => {
                    if (result == undefined) return;

                    show_welcome_channel = result.welcome_channel;

                    show_welcome_message = result.welcome_message;

                    show_welcome_status = call.bot.CheckInfo_ToBooleanEmoji(result.welcome_status)

                    if (result.welcome_channel == null) {
                        show_welcome_channel = "`Not defined`"
                    }
                    if (result.welcome_message == null) {
                        show_welcome_message = "`Not defined`"
                    }


                    msgToSend.push(String(call.bot.current_lang.Command_Welcome_Welcome_Channel).replace("{0}", show_welcome_channel))
                    msgToSend.push(String(call.bot.current_lang.Command_Welcome_Welcome_Message).replace("{0}", `\`\`\`${show_welcome_message}\`\`\``))
                    msgToSend.push(String(call.bot.current_lang.Command_Welcome_Welcome_Status).replace("{0}", show_welcome_status))

                    message.channel.send(msgToSend)
                    msgToSend = [];

                });

            } else if (call.args[0] === "help") {
                message.reply(
                    call.bot.current_lang.Command_Welcome_Help_Line1 +
                    String(call.bot.current_lang.Command_Welcome_Help_Line2).replace("{0}", call.bot.config.prefix) +
                    String(call.bot.current_lang.Command_Welcome_Help_Line3).replace("{0}", call.bot.config.prefix) +
                    call.bot.current_lang.Command_Welcome_Help_Line4 +
                    call.bot.current_lang.Command_Welcome_Help_Line5
                )
                return;
            } else {
                message.reply(`${call.bot.current_lang.Command_Welcome_User_Their_Args} \n${argsCMD}`)
                argsCMD = "";
            }

        } catch (error) {
            console.log("welcome error")
            console.log(error);
        }
    }
}