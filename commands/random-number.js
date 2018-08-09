module.exports = {
    help: { name: "random-number" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Discord = require("discord.js")
        //message, bot, bot.commands, args, content, prefix, cmd

        try {
            if (!call.args[0]) {
                return message.reply(call.bot.current_lang.Command_Random_Number_No_First_Number)
            } else if (!call.args[1]) {
                return message.reply(call.bot.current_lang.Command_Random_Number_No_Second_Number)
            }

            if (isNaN(call.args[0]) == true) {
                if (isNaN(call.args[1]) == true) {
                    return message.reply(call.bot.current_lang.Command_Random_Number_No_Number)
                } else {
                    return message.reply(call.bot.current_lang.Command_Random_Number_No_Minimum_Value)
                }
            }
            if (isNaN(call.args[1]) == true) {
                return message.reply(call.bot.current_lang.Command_Random_Number_No_Maximum_Value)
            }
            call.args[0] = parseInt(call.args[0]);
            call.args[1] = parseInt(call.args[1]);

            var argMini = call.args[0];
            var argMaxi = call.args[1];

            //Debug
            //console.log("1: " + argMini)
            //console.log("2: " + argMaxi)

            let random_number_min = Math.ceil(argMini);
            let random_number_max = Math.floor(argMaxi);

            let random_number_Calcul = Math.floor(Math.random() * (random_number_max - random_number_min + 1)) + random_number_min;

            message.reply(String(call.bot.current_lang.Command_Random_Number_Result).replace("{0}", random_number_min).replace("{1}", random_number_max).replace("{2}", random_number_Calcul)).then(function (msg) {
                call.bot.deleteMyMessage(msg, 600 * 1000)
            });
        } catch (error) {
            console.log("random-number error");
            console.log(error);
            //console.log("Erreur #367: " + error)
            //message.reply("You failed something... ex: " + prefix + "randomnumber 10 20");
        }
    }
}