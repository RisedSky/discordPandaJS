module.exports = {
    help: { name: "message" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            //console.log(call.args);

            if (message.author.id != "516033691525447680" && message.author.id != "268813812281376769" && message.author.id != "308674089873309696") return;
            if (!call.args[1]) {
                message.reply(call.bot.EmojiRedTickString + "Some arguments are missing").then(function (msg) {
                    call.bot.deleteMyMessage(msg, 10 * 1000)
                });
                return;
            }
            call.bot.fetchUser(call.args[0]).catch(() => {
                message.reply(call.bot.EmojiRedTickString + " Sorry, can't find this user ! :thinking:").then(msg => {
                    call.bot.deleteMyMessage(msg, 8 * 1000)
                })
            }).then(function (user) {
                var message_to_send = call.content.slice(call.args[0].length + 1)
                //console.log(message_to_send);

                user.send(message_to_send)
                    .then(() => {
                        Mess_Channel.send(`${message.author.tag} Sended the message to ${user.tag} - ${call.bot.NotifyUser(user.id)} \n\`\`\`${message_to_send}\`\`\` `)
                    })
                    .catch(() => {
                        message.reply(call.bot.EmojiRedTickString + " Sorry but i can't DM him.").then(msg => {
                            call.bot.deleteMyMessage(msg, 8 * 1000)
                        });
                    });

            });


        } catch (error) {
            console.log("message error")
            console.log(error);
        }
    }
}
