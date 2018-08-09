module.exports = {
    help: { name: "kappa" },
    run: async (call) => {
        var message = call.message
            , Mess_Member = call.message.member
            , Mess_Channel = call.message.channel
        //message, bot, bot.commands, args, content, prefix, cmd


        try {
            message.reply({file:"./images/kappa.png"})
        } catch (error) {
            console.log("kappa error");
            console.log(error);
        }
        /*
>use this only for deleting the msg after the image
        .then(function (msg) {
        deleteMyMessage(msg, 600 * 1000);
        })
        */

    }
}