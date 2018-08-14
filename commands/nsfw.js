module.exports = {
    help: { name: "nsfw", aliases: ["NSFW"] },
    run: async (call) => {
        const Discord = require("discord.js")
            , NekoClient = require("nekos.life")
            , neko = new NekoClient()

        var message = call.message

        //message, bot, bot.commands, args, content, prefix, cmd

        let requested_nsfw;
        try {
            if (!message.channel.nsfw || !message.channel.name.toLowerCase() == "nsfw") return message.reply("This channel must be NSFW").then(msg => call.bot.deleteMyMessage(msg, 12000))

            //console.log(call.args[0]);
            if (!call.args[0]) return message.reply("List of all NSFW tag : \n" + `${call.bot.config.prefix}NSFW ` + "`random, bj, anal, pussy, ass, boobs, cum, futa, ero, yuri, neko, lesbian`").then(msg => call.bot.deleteMyMessage(msg, 15000))

            //if (call.args[0] == "neko") {

            message.react(call.bot.EmojiGreenTick)
            if (call.args[0] == "bj" || call.args[0] == "blowjob") return nsfw("BJ")
            else if (call.args[0] == "anal" || call.args[0] == "ass") return nsfw("anal")
            else if (call.args[0] == "pussy") return nsfw("pussy")
            else if (call.args[0] == "boobs" || call.args[0] == "boob") return nsfw("boobs")
            else if (call.args[0] == "cum" || call.args[0] == "cums") return nsfw("cum")
            else if (call.args[0] == "futa" || call.args[0] == "futanari") return nsfw("futanari")
            else if (call.args[0] == "ero") return nsfw("ero")
            else if (call.args[0] == "yuri") return nsfw("yuri")
            else if (call.args[0] == "neko") return nsfw("neko")
            else if (call.args[0] == "lesbian") return nsfw("lesbian")
            else if (call.args[0] == "random") return nsfw("randomhentaigif")
            else return nsfw("randomhentaigif")


            async function nsfw(getNSFW) {
                //console.log("getNSFW => " + getNSFW);

                var txt = "getNSFW" + getNSFW
                var txtNSFW = String(getNSFW.toLowerCase())

                if (txtNSFW.includes(["bj"])) {
                    requested_nsfw = "BlowJob";
                    //console.log("bj")
                    await neko.getNSFWBJ().then(e => nsfwembed(e.url))

                } else if (txtNSFW.includes(["anal"])) {
                    requested_nsfw = "Anal";
                    //console.log("anal")
                    await neko.getNSFWAnal().then(e => nsfwembed(e.url))

                } else if (txtNSFW.includes(["pussy"])) {
                    requested_nsfw = "Pussy";
                    //console.log("pussy")
                    await neko.getNSFWPussyGif().then(e => nsfwembed(e.url))

                } else if (txtNSFW.includes("randomhentaigif")) {
                    requested_nsfw = "Random Gif";
                    //console.log("random");
                    await neko.getNSFWRandomHentaiGif().then(e => nsfwembed(e.url))

                } else if (txtNSFW.includes("boobs")) {
                    requested_nsfw = "Boobs";
                    //console.log("Boobs");
                    await neko.getNSFWBoobs().then(e => nsfwembed(e.url))

                } else if (txtNSFW.includes("cum")) {
                    requested_nsfw = "cum";
                    //console.log("cum");
                    await neko.getNSFWCumsluts().then(e => nsfwembed(e.url))

                } else if (txtNSFW.includes("futa")) {
                    requested_nsfw = "futanari";
                    //console.log("futanari");
                    await neko.getNSFWFutanari().then(e => nsfwembed(e.url))

                } else if (txtNSFW.includes("ero")) {
                    requested_nsfw = "ero";
                    //console.log("ero");
                    await neko.getNSFWEro().then(e => nsfwembed(e.url))

                } else if (txtNSFW.includes("yuri")) {
                    requested_nsfw = "yuri";
                    //console.log("yuri");
                    await neko.getNSFWEroYuri().then(e => nsfwembed(e.url))

                } else if (txtNSFW.includes("neko")) {
                    requested_nsfw = "neko";
                    //console.log("neko");
                    await neko.getNSFWNekoGif().then(e => nsfwembed(e.url))

                } else if (txtNSFW.includes("lesbian")) {
                    requested_nsfw = "lesbian";
                    //console.log("lesbian");
                    await neko.getNSFWLesbian().then(e => nsfwembed(e.url))
                }


            }

            async function nsfwembed(url) {
                //console.log(requested_nsfw)
                if (!requested_nsfw) requested_nsfw = call.bot.user.username
                var embed_nsfw = new Discord.RichEmbed()
                    .setColor("GREEN")
                    .setDescription("Here's some " + requested_nsfw)
                    .setImage(url)
                    .setFooter(call.bot.AskedBy_EmbedFooter(message.author))
                    .setTimestamp()
                message.channel.send(embed_nsfw)
            }

        } catch (error) {
            console.log("nsfw error");
            console.log(error)
        }
    }
}