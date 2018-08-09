module.exports = {
    help: { name: "restart" },
    run: async (call) => {
        var message = call.message
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            if (message.author.id === "145632403946209280" || message.author.id === "268813812281376769") {
                message.channel.send("Restarting ...").then(m => {
                    call.bot.user.setStatus("invisible");
                    console.log("Disconnected")
                    call.bot.destroy().then(() => {
                        call.bot.login(call.bot.config.BOT_TOKEN).then(() => {
                            m.edit(`${call.bot.EmojiGreenTickString} Done`)
                        });
                    })

                })
            }

        } catch (error) {
            console.log("restart error");
            console.log(error)
        }
    }
}