module.exports = {
    help: { name: "queue" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var server = call.bot.servers[message.guild.id]
                , xQueue = server.queue

            if (!xQueue[0]) {
                message.reply(call.bot.current_lang.Music_Currently_Queue_Empty).then(function (msg) {
                    call.bot.deleteMyMessage(msg, 20 * 1000);
                })
                return;
            }
            //console.log("Queue length: " + xQueue.length) //show us how many musics there is
            let embedQueue = new Discord.RichEmbed()
                .setColor("#ffa500")
                .setAuthor(`${call.bot.current_lang.Music_Queue_List}`, call.bot.user.avatarURL)
                .setDescription(`*${call.bot.current_lang.Music_Here_Queue_List}*`)
                .setFooter(`${call.bot.current_lang.Music_Queue_List_Requested_By} ${message.author.username} • ID: ${message.author.id}`)
                .addBlankField()

            var xQueue_AddedFields = 0;

            for (var i in xQueue) {
                //console.log(embedQueue.fields.length)
                if (embedQueue.fields.includes(call.bot.current_lang.Music_End_Of_Text)) return;

                if (embedQueue.fields.length <= 21) {
                    xQueue_AddedFields++;
                    embedQueue.addField(`[${i}] » ${xQueue[i]['title']}`, `*${call.bot.current_lang.Music_Requested_By} ${xQueue[i]['user']}*`)
                } else {
                    var RemainingNumber = xQueue.length - xQueue_AddedFields
                    embedQueue.addField(`${call.bot.current_lang.Music_And} ${RemainingNumber} ${call.bot.current_lang.Music_More}`, `${call.bot.current_lang.Music_End_Of_Text}`)
                }
            }

            embedQueue.addBlankField();

            message.channel.send(embedQueue).then(function (msg) {
                call.bot.deleteMyMessage(msg, 180 * 1000);
            })

        } catch (error) {
            console.log("Queue command problem")
            console.log(error)
        }
    }
}