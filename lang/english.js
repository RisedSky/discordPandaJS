//#region ---- ALL EMOJIS ------
//Emoji string
var EmojiThonkongString = "<:thonkong:414071099517698059>"
	, EmojiGreenTickString = "<:greenTick:412663578009796619>"
	, EmojiRedTickString = "<:redTick:412663578051477505>"
	, EmojiYouTube_LogoString = "<:youtube-logo:413446051480076288>"
	, EmojiUpvoteString = "<:upvote:416350074252034059>"
	, EmojiDownvoteString = "<:downvote:416350074168279061>"
	, EmojiProhibitedString = "<:prohibited:416350020355489803>"
	, EmojiTwitchLogoString = "<:twitchlogo:416350019780870146>"

//Emoji
var EmojiThonkong = "thonkong:414071099517698059"
	, EmojiYouTube_Logo = "youtube-logo:413446051480076288"
	, EmojiGreenTick = "greenTick:412663578009796619"
	, EmojiRedTick = "redTick:412663578051477505"
	, EmojiUpvote = "upvote:416350074252034059"
	, EmojiDownvote = "downvote:416350074168279061"
	, EmojiProhibited = "prohibited:416350020355489803"
	, EmojiTwitchLogo = "twitchlogo:416350019780870146"

//Emoji ID
var Thonkong_ID = "414071099517698059"
	, YouTube_Logo_ID = "413446051480076288"
	, GreenTick_ID = "412663578009796619"
	, RedTick_ID = "412663578051477505"
	, upvote_ID = "416350074252034059"
	, downvote_ID = "416350074168279061"
	, prohibited_ID = "416350020355489803"
	, TwitchLogo_ID = "416350019780870146"

var PermissionYes = EmojiGreenTickString;
var PermissionNo = EmojiRedTickString;
//#endregion
//---- ALL EMOJIS ------
const lang = {
	//exemple: "exemple_text"
	Something_Done: `${EmojiGreenTickString} Done`,
	Permission_Manage_Server_Required: `(**MANAGE_SERVER** is required)`,

	//Database_Error: ``,
	Command_User_Not_Allowed: `${EmojiRedTickString} You are not allowed to use that command !`,
	Command_User_Message_Is_Empty: `${EmojiRedTickString} Your message is empty`,
	Command_User_Need_Permission_Manage_Messages: `${EmojiRedTickString} You need the permission **(MANAGE_MESSAGES)** to do that`,

	Command_Github_Project: `My GitHub project`,
	Command_Bot_My_Ping: `My ping is`,
	Command_Bot_Need_Permission_Manage_Messages: `${EmojiProhibitedString} Sadly, I haven't the **(MANAGE_MESSAGES)** permission`,

	Command_Purge_No_Number: `You didn't put the number of message you want to clear`,
	Command_Purge_Not_Number: `${EmojiRedTickString} \`{0}\` isn't a number.`,
	Command_Purge_Need_Number: `${EmojiRedTickString} Please put a number of message to purge`,
	Command_Purge_Max_100_Message_Delete: `${EmojiRedTickString} Sadly, the bot can only delete 100 messages at a time`,

	Command_Purge_X_Messages: `Deleting \`{0}\` message(s) :cloud_tornado: :cloud_tornado: :cloud_tornado:`, //don't change emoji plz
	Command_Purged_X_Messages: `That's it, I deleted a total of \`{0}\` / \`{1}\` messages`,
	Command_Purge_Deleted_X_Messages: `Deleted \`{0}\` message(s) ! :cloud_tornado: :cloud_tornado: :cloud_tornado: `,


	Command_Random_Number_No_First_Number: `You need to add a number (first should be the minimum)`,
	Command_Random_Number_No_Second_Number: `You need to add a number (second should be the maximum)`,

	Command_Random_Number_No_Number: `Please, write a minimum and maximum value to generate a random number`,
	Command_Random_Number_No_Minimum_Value: `Please, write a minimum value to generate a random number`,
	Command_Random_Number_No_Maximum_Value: `Please, write a maximum value to generate a random number`,
	Command_Random_Number_Result: `Hmmm let me think, ..., between **{0}** and **{1}** I would choose **{2}** !`,


	Command_Random_Member_By: `Random-Member by`, //Don't translate Random-Member
	Command_Random_Member_User_Chosen: `{0} has been chosen between the {1} members of the server !`,

	Command_Poll_No_Question_Or_Answer: `${EmojiRedTickString} Sorry, you didn't put any question/answer1/answer2 in your poll.\n(just follow this exemple: \`{0}poll Question | Answer1 | Answer2\`)`,
	Command_Poll_By: `Poll by`,

	Command_Rekt_Nobody_To_Rekt: `${EmojiRedTickString} There is nobody to rekt (@ a user to rekt him)`,
	Command_Rekt_Cant_Rekt_Yourself: `${EmojiRedTickString} You can't rekt yourself"`,
	Command_Rekt_By: `Rekt command by`,
	Command_Rekt_Got_Rekt_By: `Wow, {0} you got rekt by {1}`,

	Command_Welcome_User_Dont_Have_Permission: `${EmojiRedTickString} You don't have the permission to do that ! (**MANAGE_SERVER** is needed)`,
	Command_Welcome_Create_Server_To_Database: `:warning: Creating the server in my DataBase... (redo the command please)`,

	Command_Welcome_Already_Activated: `${EmojiRedTickString} The welcome message is already enabled."`,
	Command_Welcome_Now_Activated: `${EmojiGreenTickString} The welcome message is now activated.`,

	Command_Welcome_Now_Deactivated: `${EmojiRedTickString} The welcome message is now deactivated.`,
	Command_Welcome_Already_Deactivated: `${EmojiRedTickString} The welcome message is already deactivated.`,


	Command_Welcome_No_Channel_In_Message: `${EmojiRedTickString} You didn't put any channel in your message (Exemple: \`{0}welcome set #channel Your message\``,
	Command_Welcome_No_Welcome_Channel_In_Message: `${EmojiRedTickString} You didn't put a welcome message`,
	Command_Welcome_Setting_Up_Your_Welcome_Message: `Setting up your welcome message for:`,
	Command_Welcome_Message_In_Channel_Changed: `Welcome message in the channel: {0} successfully changed.`,

	Command_Welcome_Error_On_Setting_Welcome_Message: `Something went wrong when setting the welcome_message:`,

	Command_Welcome_Welcome_Channel: `Welcome channel: {0} \n`,
	Command_Welcome_Welcome_Message: `Welcome message: {0} \n`,
	Command_Welcome_Welcome_Status: `Welcome is activated: {0} \n`,

	Command_Welcome_Help_Line1: `To configure the welcomer you need to do theres steps:\n\n`,
	Command_Welcome_Help_Line2: `:one: Enable the welcomer via the command: \`{0}welcome on\`\n`,
	Command_Welcome_Help_Line3: `:two: Personalize it with the command: \`{0}welcome set #channel Your message\`\n`,
	Command_Welcome_Help_Line4: `:notepad_spiral: You can tag the new user in the welcome message when setting up the message: \`{user}\`\n`,
	Command_Welcome_Help_Line5: `\nThat's it ! you finally did it ! (easy uh ? :wink:)`,

	Command_Welcome_User_Their_Args: `Use their following arguments:`,

	Command_Staff_No_Message: `${EmojiRedTickString} There is no text in your message.`,
	Command_Staff_Sended_Message: `${EmojiGreenTickString} Your message has been sent to my creators :wink:`,
	//#region SQL_Database
	//#endregion

	//#region Guild Joining

	//When the bot join a new discord server
	guild_joining1: `Hey! I'm **Boti-Panda**\n`,
	guild_joining2: `You can use {0} to see my commands.`,
	guild_joining4: `Here is my discord server`,
	guild_joining5: `Don't hesitate to join it in order to get the most recent informations about the bot`,
	//#endregion

	//#region Lang
	Lang_Changing_To_Default: `Currently changing the lang to default (english)...`,

	Lang_Defined_To_English: `${EmojiGreenTickString} language defined to English`,
	Lang_Defined_To_French: `${EmojiGreenTickString} language defined to French`,
	Lang_Defined_To_Russian: `${EmojiGreenTickString} language defined to Russian`,
	Lang_Defined_To_Spanish: `${EmojiGreenTickString} language defined to Spanish`, //Espagnol
	Lang_Defined_To_Italian: `${EmojiGreenTickString} language defined to Italian`,
	Lang_Defined_To_Deutsch: `${EmojiGreenTickString} language defined to Deutsch`, //Allemand

	Lang_Didnt_Find_Lang: `${EmojiRedTickString} It seems that \`{0}\` isn't existing in my translated language database.`,

	//#endregion

	//#region Music
	Music_Tell_Me_Something_Play_Playlist: `${EmojiRedTickString} Please tell me something to play (the playlist link)`,
	Music_Not_In_Vocal: `${EmojiRedTickString} You have to be connected to a vocal channel`,
	Music_Should_Not_Deafen: `${EmojiRedTickString} You have to be listening (not deafen)`,
	Music_Not_Playlist: `${EmojiRedTickString} It's not a playlist.`,
	Music_Not_Link: `${EmojiRedTickString} Hmm sorry but... it's not a link :/`,

	Music_Tell_Me_Something_Play: `${EmojiRedTickString} Please tell me something to play (a link or a title)`,
	Music_Soundcloud_Not_Supported: `${EmojiRedTickString} Soundcloud isn't actually supported. It will be Soon :tm:`,

	Music_No_Music_Playing: `${EmojiRedTickString} There is no music actually playing`,
	Music_Not_In_The_Same_Vocal: `${EmojiRedTickString} You are not in the same vocal channel as me`,

	Music_Resume_Success: `${EmojiGreenTickString} Successfully resumed`,
	Music_Pause_Success: `${EmojiGreenTickString} Successfully paused`,

	Music_Need_Music_Title: `${EmojiRedTickString} Please, put a music's title`,

	Music_Skip_Not_In_Vocal: `${EmojiRedTickString} You should be in a vocal channel before asking me to skip some musics.`,
	Music_Skip_No_Music_Found: `${EmojiRedTickString} I didn't found any other music.`,
	Music_Skip_Success: `${EmojiGreenTickString} Successfuly skipped the song: `,
	Music_Requested_By: `requested by`,
	Music_Now_Playing: `Now playing`,
	Music_Stopped_From: `${EmojiGreenTickString} Stopped all the music from channel`,

	Music_Currently_Queue_Empty: `${EmojiRedTickString} The queue is actually empty.`,
	Music_Queue_List: `Queue list`,
	Music_Here_Queue_List: `Here is your queue list`,
	Music_Queue_List_Requested_By: `Queue list requested by`,

	Music_And: `And`,
	Music_More: `more...`,
	Music_End_Of_Text: `It's the end of the text`,

	Music_Song_Will_Not_Repeated: `won't be repeated`,
	Music_Song_Will_Be_Repeated: `will be repeated`,

	Music_Status_Status: `Status`,
	Music_Status_No_Music: `${EmojiRedTickString} There's no music`,

	Music_Status_Yes: `Yes`,
	Music_Status_No: `No`,

	Music_Status_Current_Status: `The current status of the song`,
	Music_Status_Current_Song: `The Current song`,

	Music_Status_Track_Loop: `Is the track looped ?`,
	Music_Status_Track_Paused: `Is the track paused ?`,
	Music_Status_Uploaded_By: `Uploaded by`,
	Music_Status_Song_Duration: `Song duration`,
	Music_Status_Time_Remaining: `Time remaining`,
	Music_Status_Views: `Views`,
	Music_Status_Link: `Link`,
	Music_Status_Requested_By: `Status requested by`,
	//#endregion


	// current_lang.
}
module.exports = {
	lang: lang
}
