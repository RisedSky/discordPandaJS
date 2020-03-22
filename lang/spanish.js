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
	Something_Done: `${EmojiGreenTickString} Hecho`,
	Permission_Manage_Server_Required: `(Necesitas el permiso **Administrar Servidor**)`,

	//Database_Error: ``,
	Command_Args_Missing: `${EmojiRedTickString} Faltan algunos argumentos!`,

	Command_User_Not_Allowed: `${EmojiRedTickString} No tienes permitido usar ese comando!`,
	Command_User_Message_Is_Empty: `${EmojiRedTickString} Tu mensaje está vacio!`,
	Command_User_Need_Permission_Manage_Messages: `${EmojiRedTickString} Necesitas el permiso **(Administrar Mensajes)** para hacer eso`,

	Command_Github_Project: `Mi proyecto de GitHub`,
	Command_Bot_My_Ping: `Mi ping es`,
	Command_Bot_Need_Permission_Manage_Messages: `${EmojiProhibitedString} Tristemente, no tengo el permiso **(Administrar Mensajes)**`,

	Command_Purge_No_Number: `No has especificado el numero de mensajes que quiere eliminar.`,
	Command_Purge_Not_Number: `${EmojiRedTickString} \`{0}\` no es un numero`,
	Command_Purge_Need_Number: `${EmojiRedTickString} Por favor, introduce un numero de mensajes para eliminar.`,
	Command_Purge_Max_100_Message_Delete: `${EmojiRedTickString} Tristemente, el bot no puede eliminar mas de 100 mensajes a la vez.`,

	Command_Purge_X_Messages: `Borrando \`{0}\` mensaje(s) :cloud_tornado: :cloud_tornado: :cloud_tornado:`, //don't change emoji plz
	Command_Purged_X_Messages: `Ya está, he borrado \`{0}\` / \`{1}\` mensajes`,
	Command_Purge_Deleted_X_Messages: ` \`{0}\` mensaje(s) borrados! :cloud_tornado: :cloud_tornado: :cloud_tornado: `,


	Command_Random_Number_No_First_Number: `Tienes que añadir un número (el primero debería de ser el minimo)`,
	Command_Random_Number_No_Second_Number: `Tienes que añadir un número (el segundo debería de ser el minimo)`,

	Command_Random_Number_No_Number: `Por favor, especifica un valor minimo y maximo para generar un número aleatorio`,
	Command_Random_Number_No_Minimum_Value: `Por favor, especifica un valor minimo para generar un número random.`,
	Command_Random_Number_No_Maximum_Value: `Por favor, especifica un valor máximo para generar un número random.`,
	Command_Random_Number_Result: `Hmmm, dejame pensar..., entre **{0}** y **{1}** elijo el **{2}** !`,


	Command_Random_Member_By: `Random-Member por`, //Don't translate Random-Member
	Command_Random_Member_User_Chosen: `{0} ha sido elegido entre los {1} miembros del servidor!`,

	Command_Poll_No_Question_Or_Answer: `${EmojiRedTickString} No has puesto ninguna pregunta/respuesta1/respuesta2 en tu encuesta.\n(Solo sigue este ejemplo: \`{0}Pregunta | Respuesta1 | Respuesta2\`)`,
	Command_Poll_By: `Encuesta por`,

	Command_Rekt_Nobody_To_Rekt: `${EmojiRedTickString} No hay nadie para rektear (@ un usuario para rektearlo)`,
	Command_Rekt_Cant_Rekt_Yourself: `${EmojiRedTickString} No puedes rektearte a ti mismo`,
	Command_Rekt_By: `Comando de rekt pot`,
	Command_Rekt_Got_Rekt_By: `Wow, {0} has sido rekteado por {1}`,

	Command_Welcome_User_Dont_Have_Permission: `${EmojiRedTickString} No tienes el permiso para hacer eso! (Necesitas el permiso **Administrar Servidor**)`,
	Command_Welcome_Create_Server_To_Database: `:warning: Creando el servidor en mi base de datos (vuelve a esciribir el comando)`,

	Command_Welcome_Now_Activated: `${EmojiGreenTickString} El mensaje de bienvenida ahora esta activado.`,
	Command_Welcome_Already_Activated: `${EmojiRedTickString} El mensaje de bienvenida ya estaba activado`,

	Command_Welcome_Now_Deactivated: `${EmojiGreenTickString} El mensaje de bienvenida ahora esta desactivado`,
	Command_Welcome_Already_Deactivated: `${EmojiRedTickString} El mensaje de bienvenida ya estaba desactivado`,


	Command_Welcome_No_Channel_In_Message: `${EmojiRedTickString} No has puesto ningun canal en tu mensaje (Ejemplo: \`{0}welcome set #channel Tu mensaje\``,
	Command_Welcome_No_Welcome_Channel_In_Message: `${EmojiRedTickString} No has puesto ningun mensaje de bienvenida`,
	Command_Welcome_Setting_Up_Your_Welcome_Message: `Tu mensaje de bienvenida ha cambiado a:`,
	Command_Welcome_Message_In_Channel_Changed: `Mensaje de bienvenida en el canal: {0}cambiado.`,

	Command_Welcome_Error_On_Setting_Welcome_Message: `Ha habido un error al establecer el mensaje de bienvenida:`,

	Command_Welcome_Welcome_Channel: `Canal de bienvenida: {0} \n`,
	Command_Welcome_Welcome_Message: `Mensaje de bienvenida: {0} \n`,
	Command_Welcome_Welcome_Status: `Bienvenida activada: {0} \n`,

	Command_Welcome_Help_Line1: `Para configurar la bienvenida tienes que seguir estos pases:\n\n`,
	Command_Welcome_Help_Line2: `:one: Activa la bienvenida con: \`{0}welcome on\`\n`,
	Command_Welcome_Help_Line3: `:two: Personalizalo con el comando: \`{0}welcome set #channel Tu mensaje\`\n`,
	Command_Welcome_Help_Line4: `:notepad_spiral: Puedes etiquetar al usuario en el mensaje de bienvenida al configurarlo: \`{user}\`\n`,
	Command_Welcome_Help_Line5: `\nYa está hecho! (facil, eh? :wink:)`,

	Command_Welcome_User_Their_Args: `Usa sus respectivos argumentos:`,

	Command_Staff_No_Message: `${EmojiRedTickString} No hay texto en tu mensaje`,
	Command_Staff_Sended_Message: `${EmojiGreenTickString} Tu mensaje ha sido enviado a mis creadores :wink:`,
	//#region SQL_Database
	//#endregion

	//#region Guild Joining

	//When the bot join a new discord server
	guild_joining1: `Hola! Soy **Boti-Panda**\n`,
	guild_joining2: `Puedes usar {0} para ver mis comandos`,
	guild_joining4: `Aquí está mi servidor de discord`,
	guild_joining5: `No dudes en unirte si quieres recibir mis actualizaciones más recientes!`,
	//#endregion

	//#region Lang
	Lang_Changing_To_Default: `Actualmente cambiando el idioma al predeterminado (Inglés)...`,

	Lang_Defined_To_English: `${EmojiGreenTickString} idioma establecido a Inglés`,
	Lang_Defined_To_French: `${EmojiGreenTickString} idioma establecido a Francés`,
	Lang_Defined_To_Russian: `${EmojiGreenTickString} idioma establecido a Ruso`,
	Lang_Defined_To_Spanish: `${EmojiGreenTickString} idioma establecido a Español`, //Espagnol
	Lang_Defined_To_Italian: `${EmojiGreenTickString} idioma establecido a Italiano`,
	Lang_Defined_To_Deutsch: `${EmojiGreenTickString} idioma establecido a Alemán`, //Allemand

	Lang_Didnt_Find_Lang: `${EmojiRedTickString} Parece que el idioma \`{0}\` no existe actualmente en mi base de datos`,

	//#endregion

	//#region Music
	Music_Tell_Me_Something_Play_Playlist: `${EmojiRedTickString} Dime algo que reproducir (el enlace de la playlist)`,
	Music_Not_In_Vocal: `${EmojiRedTickString} Tienes que conectarte a un canal de voz`,
	Music_Should_Not_Deafen: `${EmojiRedTickString} Tienes que estar escuchando (no ensordecido)`,
	Music_Not_Playlist: `${EmojiRedTickString} No es una playlist`,
	Music_Not_Link: `${EmojiRedTickString} Lo siento pero... no es un enlace :/`,

	Music_Tell_Me_Something_Play: `${EmojiRedTickString} Dime algo que reproducir (un link o titulo)`,
	Music_Soundcloud_Not_Supported: `${EmojiRedTickString} Soundcloud no esta actualmente soportado. Lo estara pronto :tm:`,

	Music_No_Music_Playing: `${EmojiRedTickString} Actualmente no hay musica sonando`,
	Music_Not_In_The_Same_Vocal: `${EmojiRedTickString} No estás en el mismo canal de voz que yo`,

	Music_Resume_Success: `${EmojiGreenTickString} Renaudado satisfactoriamente`,
	Music_Pause_Success: `${EmojiGreenTickString} Pausado satisfactoriamente`,

	Music_Need_Music_Title: `${EmojiRedTickString} Por favor, pon el titulo de una cancion`,

	Music_Skip_Not_In_Vocal: `${EmojiRedTickString} Deberias de estar en un canal de voz antes de decirme que salte alguna canción`,
	Music_Skip_No_Music_Found: `${EmojiRedTickString} No he encontrado ninguna otra cancion`,
	Music_Skip_Success: `${EmojiGreenTickString} Canción saltada: `,
	Music_Requested_By: `Pedida por`,
	Music_Now_Playing: `Actualmente reproduciendo`,
	Music_Stopped_From: `${EmojiGreenTickString} Toda la musica del canal ha sido parada.`,

	Music_Currently_Queue_Empty: `${EmojiRedTickString} La cola esta vacia`,
	Music_Queue_List: `Cola de reproduccion`,
	Music_Here_Queue_List: `Aqui esta tu cola de reproduccion`,
	Music_Queue_List_Requested_By: `Cola de reproduccion peida por`,

	Music_And: `Y`,
	Music_More: `más...`,
	Music_End_Of_Text: `Final del texto`,

	Music_Song_Will_Not_Repeated: `no se repetirá`,
	Music_Song_Will_Be_Repeated: `se repetirá`,

	Music_Status_Status: `Estado`,
	Music_Status_No_Music: `${EmojiRedTickString} No hay musica`,

	Music_Status_Yes: `Si`,
	Music_Status_No: `No`,

	Music_Status_Current_Status: `El estado actual de la cancion`,
	Music_Status_Current_Song: `La cancion actual`,

	Music_Status_Track_Loop: `Está la cancion en bucle?`,
	Music_Status_Track_Paused: `Está la canción pausada?`,
	Music_Status_Uploaded_By: `Subida por`,
	Music_Status_Song_Duration: `Duración`,
	Music_Status_Time_Remaining: `Tiempo restante`,
	Music_Status_Views: `Visitas`,
	Music_Status_Link: `Enlace`,
	Music_Status_Requested_By: `Estado pedido por`,
	//#endregion

	//#region autorole
	Command_Autorole_Activated: `${EmojiGreenTickString} El auto rol está activado`,
	Command_Autorole_Now_Activated: `${EmojiGreenTickString} El auto rol está ahora activado`,
	Command_Autorole_Already_Activated: `${EmojiRedTickString} El auto rol ya estaba activado`,

	Command_Autorole_Deactivated: `${EmojiGreenTickString} El auto rol está desactivado`,
	Command_Autorole_Now_Deactivated: `${EmojiGreenTickString} El auto rol está ahora desactivado`,
	Command_Autorole_Already_Deactivated: `${EmojiRedTickString} El auto rol ya estaba desactivado`,

	Command_Autorole_Is_Now_Defined_As: `${EmojiGreenTickString} El auto rol es ahora el rol: {0}`,

	Command_AutoRole_Not_Found_Role: `${EmojiRedTickString} El rol \`{0}\` parece no existir`,
	Command_AutoRole_Not_Defined: `${EmojiRedTickString} Rol no definido`,

	//Embed
	Command_AutoRole_Embed_Description1: `Aqui tienes unos consejos para usar el comando \`auto-role\`:\n`,
	Command_AutoRole_Embed_Description2: `:one: Primero, tienes que definir que rol quieres que se le asigne automaticamente a un usuario con:  \`{0}auto-role set @rol\`\n\n`,
	Command_AutoRole_Embed_Description3: `:two: Despues, si el primer comando no da error, activa el auto rol con: \`{0}auto-role on\`\n\n\n`,

	Command_AutoRole_Embed_Description4: `:information_source: Argumentos validos: \`help, show, on, off\`\n`,
	Command_AutoRole_Embed_Description5: `:information_source: Si tienes que **desactivarlo**, solo haz: \`{0}auto-role off\`\n`,
	Command_AutoRole_Embed_Description6: `:information_source: Puedes usar el comando \`{0}autorole\` **en vez de** \`{1}auto-role\` \n`

	//#endregion
	// current_lang.
}
module.exports = {
	lang: lang
}
