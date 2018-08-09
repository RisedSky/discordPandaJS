module.exports = {
    help: { name: "github" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            call.bot.sendDMToUser(message, `${call.bot.current_lang.Command_Github_Project} : https://github.com/RisedSky/discordPandaJS`)
        } catch (err) {
            console.log("Github error")
            console.log(err);
        }
    }
}