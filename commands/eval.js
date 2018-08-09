module.exports = {
    help: { name: "eval" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd


        try {
            call.bot.DeleteUserMessage(false)
            let owner_list = "145632403946209280 - 268813812281376769";
            if (!owner_list.includes(message.author.id)) return;
            if (!message.author.username == "RisedSky" || !message.author.username == "PLfightX") return;
            if (!message.author.discriminator == "1250" || !message.author.discriminator == "8625") return;

            function clean(text) {
                if (typeof (text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
            }

            try {
                const code = call.content;
                let evaled = eval(code);

                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);

                message.channel.send(clean(evaled), { code: "xl", split: true });
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }

        } catch (error) {
            console.log("eval error");
            console.log(error)
        }

    }
}