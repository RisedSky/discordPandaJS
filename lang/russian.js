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
	Command_Args_Missing: `${EmojiRedTickString} Некоторые аргументы отсутсвуют!`,

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
	//missed russian

	Command_Purge_X_Messages: `удаляю \`{0}\` сообщений :cloud_tornado: :cloud_tornado: :cloud_tornado:`, //don't change emoji plz
	Command_Purged_X_Messages: `я всего удалил \`{0}\` / \`{1}\` сообщений`,
	Command_Purge_Deleted_X_Messages: `удалено \`{0}\` сообшений ! :cloud_tornado: :cloud_tornado: :cloud_tornado: `,


	Command_Random_Number_No_First_Number: `добавь число (Первое это минимум)`,
	Command_Random_Number_No_Second_Number: `добавь число (второе максимальное)`,

	Command_Random_Number_No_Number: `укажите минимум и максимальное число для генерации номера`,
	Command_Random_Number_No_Minimum_Value: `укажите минимальное число`,
	Command_Random_Number_No_Maximum_Value: `укажите максима`,
	Command_Random_Number_Result: `хмм дай мне подумать, ..., между **{0}** и **{1}** я вибераю **{2}** !`,


	Command_Random_Member_By: `Random-Member by`, //Don't translate Random-Member
	Command_Random_Member_User_Chosen: `{0} был вибран между {1} пользователей сервера!`,

	Command_Poll_No_Question_Or_Answer: `${EmojiRedTickString} извини, ты не указал вопрос/ответ1/ответ2 для вопроса.\n(Просто зделай как на примере: \`{0}вопрос | ответ1 | ответ2\`)`,
	Command_Poll_By: `вопрос от`,

	Command_Rekt_Nobody_To_Rekt: `${EmojiRedTickString} ты не выбрал кого хочешь зделать РЕКТ (упамяни его)`,
	Command_Rekt_Cant_Rekt_Yourself: `${EmojiRedTickString} ты не можешь зделать себя REKT`,
	Command_Rekt_By: `Рект от`,
	Command_Rekt_Got_Rekt_By: `Воу, {0} ты получил REKT от {1}`,

	Command_Welcome_User_Dont_Have_Permission: `${EmojiRedTickString} у тебя нет прав ! (**Управление сервером** понадобится)`,
	Command_Welcome_Create_Server_To_Database: `:warning: Создаем сервер а БД... (Может занять некоторое времмя)`,

	Command_Welcome_Now_Activated: `${EmojiGreenTickString} сообщение при заходе пользователя Активированы.`,
	Command_Welcome_Already_Activated: `${EmojiRedTickString} сообщение при заходе пользователя уже активированы.`,

	Command_Welcome_Now_Deactivated: `${EmojiGreenTickString} сообщение при заходе пользователя деактирированы`,
	Command_Welcome_Already_Deactivated: `${EmojiRedTickString} сообщение при заходе пользователя уже деактивированы.`,


	Command_Welcome_No_Channel_In_Message: `${EmojiRedTickString} ты не вставил в какой  (Пример: \`{0}welcome set #channel твое сообщение\``,
	Command_Welcome_No_Welcome_Channel_In_Message: `${EmojiRedTickString} ты не вставил сообшение при заходе`,
	Command_Welcome_Setting_Up_Your_Welcome_Message: `устанавливаем сообщение при заходе:`,
	Command_Welcome_Message_In_Channel_Changed: `сообщение при заходе в канале: {0} успешно изменено.`,

	Command_Welcome_Error_On_Setting_Welcome_Message: `что-то пошло не так сообщение при заходе:`,

	Command_Welcome_Welcome_Channel: `Сообщение при заходе в канале: {0} \n`,
	Command_Welcome_Welcome_Message: `Сообщение при заходе: {0} \n`,
	Command_Welcome_Welcome_Status: `Сообщение при заходе активированы: {0} \n`,

	Command_Welcome_Help_Line1: `для настройки приветствия следуй этим шагам:\n\n`,
	Command_Welcome_Help_Line2: `:one: активируй приветствие при помощи комманды: \`{0}welcome on\`\n`,
	Command_Welcome_Help_Line3: `:two: зделай сове сообщение и канал: \`{0}welcome set #channel твое сообщение\`\n`,
	Command_Welcome_Help_Line4: `:notepad_spiral: 'это тег пользователя для привес=тствия: \`{user}\`\n`,
	Command_Welcome_Help_Line5: `\nэто все! (легко? :wink:)`,

	Command_Welcome_User_Their_Args: `используй эти аргументы:`,

	Command_Staff_No_Message: `${EmojiRedTickString} это не текст.`,
	Command_Staff_Sended_Message: `${EmojiGreenTickString} твое сообщение было отправлено создателям :wink:`,


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
	Lang_Defined_To_French: `${EmojiGreenTickString} Ваш язык был изменен на Французский`,
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

	//region autorole
	Command_Autorole_Now_Activated: `${EmojiGreenTickString} авто-роль активирована.`,
	Command_Autorole_Now_Activated: `${EmojiGreenTickString} Авто-роль Активирована.`,
	Command_Autorole_Already_Activated: `${EmojiRedTickString} авто-роль уже активрована.`,

	Command_Autorole_Now_Deactivated: `${EmojiGreenTickString} автороль деактивирована.`,
	Command_Autorole_Now_Deactivated: `${EmojiGreenTickString} Авто-роль деативирована.`,
	Command_Autorole_Already_Deactivated: `${EmojiRedTickString} авто-роль уже деактивирована.`,

	Command_Autorole_Is_Now_Defined_As: `${EmojiGreenTickString} теперь автороль выдает каждому роль: {0}`,

	Command_AutoRole_Not_Found_Role: `${EmojiRedTickString} роль  \`{0}\` Не найдена`,
	Command_AutoRole_Not_Defined: `${EmojiRedTickString} Роль не найдена`,

	//Embed
	Command_AutoRole_Embed_Description1: `Что-бы использовать комманду \`auto_role\` надо посмотреть сюда на подсказки :\n`,
	Command_AutoRole_Embed_Description2: `:one: 1-е, тебе надо выбрать роль коммандой : \`{0}auto_role set @role\`\n\n`,
	Command_AutoRole_Embed_Description3: `:two: После этого, если все пошло так как надо тогда включаем авто-роль коммандой: \`{0}auto_role on\`\n\n\n`,

	Command_AutoRole_Embed_Description4: `:information_source: Аргументы к этой комманде: \`help, show, on, off\`\n`,
	Command_AutoRole_Embed_Description5: `:information_source: если тебе надо выключить авто - роль, пропишы эту комманду: \`{0}auto_role off\`\n`,
	Command_AutoRole_Embed_Description6: `:information_source: Вы можете использовать команду \`{0}autorole\` **вместо** \`{1}auto_role\`\n`
	//#endregion
	// current_lang.
}
module.exports = {
	lang: lang
}