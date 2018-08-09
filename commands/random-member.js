module.exports = {
    help: { name: "random-member" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var nbMemb = message.guild.memberCount;
            var memb_list = message.guild.members;
            var rand_member = memb_list.random();
            var embed = new Discord.RichEmbed()
                .setColor("RED")
                .setAuthor(`${call.bot.current_lang.Command_Random_Member_By} ${message.author.username}`, message.author.avatarURL)
                .setDescription(String(call.bot.current_lang.Command_Random_Member_User_Chosen).replace("{0}", rand_member).replace("{1}", nbMemb))
            message.channel.send(embed)

        } catch (error) {
            console.log("random-member error");
            console.log(error);
        }
    }
}