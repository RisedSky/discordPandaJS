module.exports = {
    help: { name: "purge" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var NumberToDelete = message.content.substr(7);

            if (!call.args[0]) {
                message.reply(call.bot.current_lang.Command_Purge_No_Number).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 6000);
                })
                return;

            } else if (!parseInt(NumberToDelete)) {
                //console.log("pas un int")
                message.reply(call.bot.current_lang.Command_Purge_Not_Number.replace("{0}", NumberToDelete)).then(msg => {
                    call.bot.deleteMyMessage(msg, 9 * 1000)
                })
                return;
            }

            if (!call.bot.BOT_MANAGE_MESSAGESPerm) {
                message.reply(call.bot.current_lang.Command_Bot_Need_Permission_Manage_Messages).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 15 * 1000)
                });
                return;

            } else if (NumberToDelete <= 0) {
                message.reply(call.bot.current_lang.Command_Purge_Need_Number).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 5000);
                })
                return;

            } else if (NumberToDelete > 100) {
                message.reply(call.bot.current_lang.Command_Purge_Max_100_Message_Delete).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 6000);
                })
                return;

            } else if (!call.bot.member_has_MANAGE_MESSAGES) {
                message.reply(call.bot.current_lang.Command_User_Need_Permission_Manage_Messages).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 7000);
                })
                return;
            }
            message.react(call.bot.EmojiGreenTick)

            var nmbrdeleted = 0
                , nmbrNotdeleted = 0
                , time = 0;
            setTimeout(() => {
                var allMsgs = message.channel.fetchMessages({ limit: NumberToDelete })
                    .then(async messages => {
                        let msg = messages.array()
                        NumberToDelete = messages.size;
                        console.log("Number to delete: " + NumberToDelete);
                        Mess_Channel.send(String(call.bot.current_lang.Command_Purge_X_Messages).replace("{0}", NumberToDelete)).then(msgdeleted => {

                            var IntervalDelete = setInterval(DeleteCollectionMessage, 1500)

                            function DeleteCollectionMessage() {
                                //if (time == undefined || time == null) time = 750;
                                if (!msg || msg == undefined || msg == null) return clearInterval(IntervalDelete)

                                let MsgToDelete = msg.shift()
                                //console.log(MsgToDelete)
                                if (MsgToDelete == null || MsgToDelete == undefined) return clearInterval(IntervalDelete)
                                if (!MsgToDelete.deletable) { nmbrNotdeleted++; MsgNmbrVerification() }
                                if (MsgToDelete.pinned) { nmbrNotdeleted++; MsgNmbrVerification() }
                                nmbrdeleted++;
                                MsgToDelete.delete(time)
                                msgdeleted.edit(String(call.bot.current_lang.Command_Purge_Deleted_X_Messages).replace("{0}", nmbrdeleted))
                                MsgNmbrVerification()
                            }

                            function MsgNmbrVerification() {
                                if ((nmbrdeleted + nmbrNotdeleted) == NumberToDelete) {
                                    msgdeleted.edit(String(call.bot.current_lang.Command_Purged_X_Messages).replace("{0}", nmbrdeleted).replace("{1}", NumberToDelete))
                                    call.bot.deleteMyMessage(msgdeleted, 10 * 1000)
                                    return clearInterval(IntervalDelete)
                                }
                            }
                        })
                    });
            }, 3500);
        } catch (error) {
            console.log("Purge command problem")
            console.log(error)
        }
    }
}