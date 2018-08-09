module.exports = {
    help: { name: "servers" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {

            if (message.author.id === "145632403946209280" || message.author.id === "268813812281376769") {
                var ServerListArray = call.bot.guilds.array();
                var ServerListString = "";
                ServerListString = "I am on " + call.bot.guilds.size + " servers\n\n"
                for (var i in ServerListArray) {
                    //console.log(ServerListArray[i])
                    ServerListString += `╔  \`${i} » Server Name: ${ServerListArray[i].name} - Server ID: ${ServerListArray[i].id}\`\n╟  \` Containing: ${ServerListArray[i].memberCount} members\`\n╚  \` Server Owner: \`${ServerListArray[i].owner}\` (${ServerListArray[i].owner.user.username}) - Owner ID: ${ServerListArray[i].ownerID}\`\n\n`

                }
                message.author.send(ServerListString, { split: true }).then(msg => {
                    call.bot.deleteMyMessage(msg, 600 * 1000);
                    ServerListString.length = 0;
                    ServerListString = "";
                })
            }

        } catch (error) {
            console.log("servers error");
            console.log(error);
        }
    }
}