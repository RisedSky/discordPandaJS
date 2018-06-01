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
	Something_Done: `${EmojiGreenTickString} Готово`,
	Permission_Manage_Server_Required: `(**Управление Сервером** Понадобится)`,

	//Database_Error: ``,
	Command_User_Not_Allowed: `${EmojiRedTickString} Эта комманда не доступа для тебя!`,
	Command_User_Message_Is_Empty: `${EmojiRedTickString} твое сообщение пустое`,
	Command_User_Need_Permission_Manage_Messages: `${EmojiRedTickString} ты должен иметь право: **(Управление сообщениями)** чтобы зделать это`,

	Command_Github_Project: `мой GitHub проект`,
	Command_Bot_My_Ping: `мой пинг это:`,

	Command_Bot_Need_Permission_Manage_Messages: `${EmojiProhibitedString} У тебя нету **(Управление сообщениями)** Права`,
	Command_Purge_No_Number: `ты не указал кол-во(номер)`,
	Command_Purge_Not_Number: `${EmojiRedTickString} \`{0}\` не кол-во.`,
	Command_Purge_Need_Number: `${EmojiRedTickString} укажыте кол-во удалених сообщений`,
	Command_Purge_Max_100_Message_Delete: `${EmojiRedTickString} Бот может удалить только 100 сообшений`,

	//#region SQL_Database

	//#endregion

	//#region Guild Joining

	//When the bot join a new discord server
	guild_joining1: `Привет! Я **Boti-Panda**\n`,
	guild_joining2: `Ты можешь использовать {0} Чтобы увидеть все мои комманды.`,
	guild_joining4: `это мой Discord Сервер`,
	guild_joining5: `не стесняйся заходить на мой Discord Сервер чтобы увидеть информацию о мне.`,
	//#endregion

	//#region Lang
	Lang_Changing_To_Default: `Currently changing the lang to default (english)...`,

	Lang_Defined_To_English: `${EmojiGreenTickString} Ваш язык был изменен на английский`,
	Lang_Defined_To_French:  `${EmojiGreenTickString} Ваш язык был изменен на Французский`,
	Lang_Defined_To_Russian: `${EmojiGreenTickString} Ваш язык был изменен на русский`,
	Lang_Defined_To_Spanish: `${EmojiGreenTickString} Ваш язык был изменен на испанский`, //Espagnol
	Lang_Defined_To_Italian: `${EmojiGreenTickString} Ваш язык был изменен на итальянский`,
	Lang_Defined_To_Deutsch: `${EmojiGreenTickString} Ваш язык был изменен на немецкий`, //Allemand

	Lang_Didnt_Find_Lang: `${EmojiRedTickString} Язык не найден! \`{0}\` у меня в базе данных нету такого языка`,

	//#endregion

	//#region Music
	Music_Tell_Me_Something_Play_Playlist: `${EmojiRedTickString} Дайте ссылку на ПлейЛист `,
	Music_Not_In_Vocal: `${EmojiRedTickString} Ты должен быть в голосовом канале`,
	Music_Should_Not_Deafen: `${EmojiRedTickString} Ты должен слушать(Включите наушнипкик)`,
	Music_Not_Playlist: `${EmojiRedTickString} Это не ПлейЛист.`,
	Music_Not_Link: `${EmojiRedTickString} хмм... это не ссылка `,

	Music_Tell_Me_Something_Play: `${EmojiRedTickString} Напишите что нужно нужно играть (ссылку или название)`,
	Music_Soundcloud_Not_Supported: `${EmojiRedTickString} Soundcloud Сейчас не доступен(Скоро Будет доступно) :tm:`,

	Music_No_Music_Playing: `${EmojiRedTickString} эта музыка не актуальная для Проигрования`,
	Music_Not_In_The_Same_Vocal: `${EmojiRedTickString} Ты не в Голосовом канале для меня`,

	Music_Resume_Success: `${EmojiGreenTickString} успешно Продолжено`,
	Music_Pause_Success: `${EmojiGreenTickString} Музыка остановлена`,

	Music_Need_Music_Title: `${EmojiRedTickString} Пожалуйста укажыте название музыки`,

	Music_Skip_Not_In_Vocal: `${EmojiRedTickString} ты должен быть в голосовом канале чтобы пропускать музыку.`,
	Music_Skip_No_Music_Found: `${EmojiRedTickString} Я не могу найти Музыку/Видео по этому запросу.`,
	Music_Skip_Success: `${EmojiGreenTickString} успешно пропущена музыка: `,
	Music_Requested_By: `Запрошеный`,
	Music_Now_Playing: `Сейчас играет`,
	Music_Stopped_From: `${EmojiGreenTickString} останавливаю играть музыку в канале`,

	Music_Currently_Queue_Empty: `${EmojiRedTickString} Очередь сейчас пуста.`,
	Music_Queue_List: `список очереди`,
	Music_Here_Queue_List: `твой список очереди`,
	Music_Queue_List_Requested_By: `Список очередей запрошенный`,

	Music_And: `And`,
	Music_More: `more...`,
	Music_End_Of_Text: `It's the end of the text`,

	Music_Song_Will_Not_Repeated: `Не будет повторятся`,
	Music_Song_Will_Be_Repeated: `будет повторятся`,
	Music_Status_Status: `Status`,
	Music_Status_No_Music: `${EmojiRedTickString} это не музыка`,

	Music_Status_Yes: `Да`,
	Music_Status_No: `Нет`,

	Music_Status_Current_Status: `текущий статус муцзыки`,
	Music_Status_Current_Song: `эта песня/музыка`,

	Music_Status_Track_Loop: `Этот трек повтряется?`,
	Music_Status_Track_Paused: `этот трек на паузе?`,
	Music_Status_Uploaded_By: `Автор`,
	Music_Status_Song_Duration: `Длительность`,
	Music_Status_Time_Remaining: `Впемени осталось`,
	Music_Status_Views: `Просмотры`,
	Music_Status_Link: `ссылка`,
	Music_Status_Requested_By: `Запросил`,
	//#endregion


	// current_lang.
	//current translate version: 1.2 BETA
}
module.exports = {
	lang: lang
}