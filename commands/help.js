module.exports = {
    help: { name: "help" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            var help_msgToSend_summary = ("```fix\n" +
                "# » Created by RisedSky & PLfightX" + "\n" +
                "# » And obviously helped by the bêta - testers.```" + "\n" +
                "```dsconfig\n" +
                "The prefix for the server " + message.guild.name + " is '" + call.bot.config.prefix + "'\n" +
                "```\n")

            var help_msgToSend_cmds = (
                "```md\n" +
                "<» Music Commands>\n\n" +
                `#» ${call.bot.config.prefix}play [title / music's link]\nThe bot will join your channel and will play your music\n\n` +
                `#» ${call.bot.config.prefix}play-list [playlist link]\nThe bot will join your channel and will play the playlist\n\n` +
                `#» ${call.bot.config.prefix}pause\nThe bot pause the music (resume & pause included in)\n\n` +
                `#» ${call.bot.config.prefix}search [title]\nSearch a music link (with embed info like ${call.bot.config.prefix}play)\n\n` +
                `#» ${call.bot.config.prefix}skip\nThe bot will skip the current music\n\n` +
                `#» ${call.bot.config.prefix}stop\nClear the queue and stop the music\n\n` +
                `#» ${call.bot.config.prefix}queue\nShow the queue list\n\n` +
                `#» ${call.bot.config.prefix}loop\nWill loop the currently song forever\n\n` +
                `#» ${call.bot.config.prefix}status\nShow the status of the current song !` +
                "```" +
                "\n\n" + "```md\n" +
                "<» Other Commands>\n\n\n" +
                `#» ${call.bot.config.prefix}lang\nChange the language of the bot!\n\n` +
                `#» ${call.bot.config.prefix}say [text]\nCommand to speak the bot (Need the perm 'MANAGE_MESSAGES'\n\n` +
                `#» ${call.bot.config.prefix}github\nSend you my GitHub project in your DMs\n\n` +
                `#» ${call.bot.config.prefix}ping\nShow the ping of the bot\n\n` +
                `#» ${call.bot.config.prefix}purge [number]\nClear a selected number of messages (Max 100)\n\n` +
                `#» ${call.bot.config.prefix}random-number [min_number] [max_number]\nGenerate a number between one and an another\n\n` +
                //call.bot.config.prefix + "restart", "Redémarre le bot **(Expérimental**"
                `#» ${call.bot.config.prefix}random-member\nRandomly choose one member of the server\n\n` +
                `#» ${call.bot.config.prefix}poll [question | answer1 | answer2 | answer3 ... ]\nCreate a poll with a maximum of 9 answers\n\n` +
                `#» ${call.bot.config.prefix}kappa\nSend a kappa image\n\n` +
                `#» ${call.bot.config.prefix}rekt [@someone]\nRekt one of your friends\n\n` +
                `#» ${call.bot.config.prefix}welcome\nSet a welcome message to your incredible user !\n\n` +
                `#» [NEW COMMAND!!] ${call.bot.config.prefix}auto-role\nSet an autorole to your incredible user !` +

                "\n" + "```" +

                "\n" +
                "```md\n" +
                `#» ${call.bot.config.prefix}bot-info\nSend you the information of the bot\n\n` +
                `#» ${call.bot.config.prefix}server-info\nSend a lot of information about the currently server\n\n` +
                `#» ${call.bot.config.prefix}user-info [@someone]\nGet secret informations about someone\n\n` +
                `#» ${call.bot.config.prefix}verif-perms\nTell you about the perms I have in this channel\n\n` +
                `#» ${call.bot.config.prefix}staff\nSend a message to my creators\n\n` +
                `#» ${call.bot.config.prefix}invite\nGive you the invite link to add me !\n\n` +
                `#» ${call.bot.config.prefix}nsfw\nGive you some NSFW image\n\n` +
                `#» ${call.bot.config.prefix}credits\nCredits for people who helped us !\n\n` +
                `#» ${call.bot.config.prefix}help\nShow all the bot commands (This message)!` +
                "\n" +
                "```" + "\n\n\n")

            var help_msgToSend_channelTags = (

                "```md\n" +
                "<» Channel Tags>\n\n\n" +
                "#» To use channel tags, just add the tags in a channel topic, it will be detected instantly\n\n" +
                "#» <nocmds>\nAvoid the use of commands in the channel \n\n" +
                "#» <ideas>\nWith this tag, the bot will add a upvote / downvote reaction to every message \n \n" +
                "#» <autopurge:TIME:>\nDelete every message in the channel after TIME seconds" +
                "```")

            call.bot.sendDMToUser(message, help_msgToSend_summary)
            call.bot.sendDMToUser(message, help_msgToSend_cmds)
            call.bot.sendDMToUser(message, help_msgToSend_channelTags)

        } catch (error) {
            console.log("help error")
            console.log(error);
        }

    }
}