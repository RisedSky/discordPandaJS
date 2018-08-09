module.exports = {
    help: { name: "invite" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            message.author.createDM();
            message.author.send("Hello, thanks for inviting me to your server\n\nHere is my link: https://discordapp.com/oauth2/authorize?&client_id=" + call.bot.user.id + "&scope=bot&permissions=8");
            message.author.send("And here is the link of my official discord server: " + call.bot.Server_Link)
        } catch (error) {
            message.reply("Your DM are closed. I can't DM you :worried: ").then(function (msg) {
                call.bot.deleteMyMessage(msg, 15 * 1000);
            })
            console.log("Invite error: " + error + " | User: " + message.author.username)
        }

    }
}
