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
	Something_Done: `${EmojiGreenTickString} Fait`,
	Permission_Manage_Server_Required: `(**MANAGE_SERVER** est nécessaire)`,

	//Database_Error: ``,
	Command_Args_Missing: `${EmojiRedTickString} Plusieurs arguments manquent !`,


	Command_User_Not_Allowed: `${EmojiRedTickString} Vous n'êtes pas autorisé à utiliser cette commande!`,
	Command_User_Message_Is_Empty: `${EmojiRedTickString} Votre message est vide`,
	Command_User_Need_Permission_Manage_Messages: `${EmojiRedTickString} Vous avez besoin de la permission **(MANAGE_MESSAGES)** pour faire cela`,

	Command_Github_Project: `Mon projet GitHub`,
	Command_Bot_My_Ping: `Mon ping est de`,
	Command_Bot_Need_Permission_Manage_Messages: `${EmojiProhibitedString} Malheureusement, je n'ai pas la permission **(MANAGE_MESSAGES)**`,

	Command_Purge_No_Number: `Vous n'avez pas mis le numéro de message que vous voulez effacer`,
	Command_Purge_Not_Number: `${EmojiRedTickString} \`{0}\` n'est pas un nombre.`,
	Command_Purge_Need_Number: `${EmojiRedTickString} S'il vous plait mettez un nombre correpondant au message à purger`,
	Command_Purge_Max_100_Message_Delete: `${EmojiRedTickString} Malheureusement, le bot ne peut supprimer que 100 messages à la fois`,

	Command_Purge_X_Messages: `Suppression de \`{0}\` message(s) :cloud_tornado: :cloud_tornado: :cloud_tornado:`, //don't change emoji plz
	Command_Purged_X_Messages: `Voilà, j'ai supprimé un total de \`{0}\` / \`{1}\` messages`,
	Command_Purge_Deleted_X_Messages: `Supprimé \`{0}\` message(s) ! :cloud_tornado: :cloud_tornado: :cloud_tornado: `,


	Command_Random_Number_No_First_Number: `Vous devez ajouter un nombre (le premier devrait être le minimum)`,
	Command_Random_Number_No_Second_Number: `Vous devez ajouter un nombre (le second devrait être le maximum)`,

	Command_Random_Number_No_Number: `S'il vous plaît, écrivez une valeur minimum et maximum pour générer un nombre aléatoire`,
	Command_Random_Number_No_Minimum_Value: `S'il vous plaît, écrivez une valeur minimum pour générer un nombre aléatoire`,
	Command_Random_Number_No_Maximum_Value: `S'il vous plaît, écrivez une valeur maximum pour générer un nombre aléatoire`,
	Command_Random_Number_Result: `Hmmm laissez-moi réfléchir, ..., entre **{0}** et **{1}** Je choisirais **{2}** !`,


	Command_Random_Member_By: `Random-Member par`, //Don't translate Random-Member
	Command_Random_Member_User_Chosen: `{0} a été choisi parmis les {1} membres du serveur`,

	Command_Poll_No_Question_Or_Answer: `${EmojiRedTickString} Désolé, vous n'avez pas mis de question / réponse1 / réponse2 dans votre sondage.\n(suivez simplement cet exemple: \`{0}poll Question | Réponse1 | Réponse2\`)`,
	Command_Poll_By: `Sondage par`,

	Command_Rekt_Nobody_To_Rekt: `${EmojiRedTickString} Il n'y a personne à rekt (@ un utilisateur pour le rekt)`,
	Command_Rekt_Cant_Rekt_Yourself: `${EmojiRedTickString} Vous ne pouvez pas vous rekt vous même`,
	Command_Rekt_By: `Rekt commande par`,
	Command_Rekt_Got_Rekt_By: `Wow, {0} vous avez été rekt par {1}`,

	Command_Welcome_User_Dont_Have_Permission: `${EmojiRedTickString} Vous n'avez pas la permission de le faire ! (** MANAGE_SERVER ** est nécessaire)`,
	Command_Welcome_Create_Server_To_Database: `:warning: Créer le serveur dans ma base de données ... (refaites la commande s'il vous plait)`,

	Command_Welcome_Now_Activated: `${EmojiGreenTickString} Le message de bienvenue est désormais activé.`,
	Command_Welcome_Already_Activated: `${EmojiRedTickString} Le message de bienvenue est déjà activé.`,

	Command_Welcome_Now_Deactivated: `${EmojiGreenTickString} Le message de bienvenue est désormais désactivé.`,
	Command_Welcome_Already_Deactivated: `${EmojiRedTickString} Le message de bienvenue est déjà désactivé.`,


	Command_Welcome_No_Channel_In_Message: `${EmojiRedTickString} Vous n'avez mis aucun canal dans votre message (Exemple: \`{0}welcome set #channel Votre message\``,
	Command_Welcome_No_Welcome_Channel_In_Message: `${EmojiRedTickString} Vous n'avez pas envoyé de message de bienvenue`,
	Command_Welcome_Setting_Up_Your_Welcome_Message: `Configuration de votre message de bienvenue pour:`,
	Command_Welcome_Message_In_Channel_Changed: `Le message de bienvenue dans le canal: {0} a bien été modifié.`,

	Command_Welcome_Error_On_Setting_Welcome_Message: `Une erreur s'est produite lors de la définition du message de bienvenue_message:`,

	Command_Welcome_Welcome_Channel: `Salon de bienvenue: {0} \n`,
	Command_Welcome_Welcome_Message: `Message de bienvenue: {0} \n`,
	Command_Welcome_Welcome_Status: `Le message de bienvenue est activé: {0} \n`,

	Command_Welcome_Help_Line1: `Pour configurer le welcomer vous devez faire les étapes suivantes:\n\n`,
	Command_Welcome_Help_Line2: `:one: Activer le welcomer via les commandes: \`{0}welcome on\`\n`,
	Command_Welcome_Help_Line3: `:two: Personaliser le avec la commande: \`{0}welcome set #channel Votre message\`\n`,
	Command_Welcome_Help_Line4: `:notepad_spiral: Vous pouvez marquer le nouvel utilisateur dans le message de bienvenue lors de la configuration du message: \`{user}\`\n`,
	Command_Welcome_Help_Line5: `\nC'est tout ! Vous l'avez fait ! (facile hein? :wink:)`,

	Command_Welcome_User_Their_Args: `Utilisez les arguments suivant`,

	Command_Staff_No_Message: `${EmojiRedTickString} Il n'y a pas de texte dans votre message.`,
	Command_Staff_Sended_Message: `${EmojiGreenTickString} Votre message a été envoyé à mes créateurs :wink:`,
	//#region SQL_Database
	//#endregion

	//#region Guild Joining

	//When the bot join a new discord server
	guild_joining1: `Hey! Je suis **Boti-Panda**\n`,
	guild_joining2: `Vous pouvez utilisez {0} pour voir mes commandes.`,
	guild_joining4: `Ici c'est mon serveur discord`,
	guild_joining5: `N'hésitez pas à le rejoindre afin d'obtenir les informations les plus récentes sur le bot`,
	//#endregion

	//#region Lang
	Lang_Changing_To_Default: `En train de changer la langue par défault (anglais)...`,

	Lang_Defined_To_English: `${EmojiGreenTickString} Langue définie en Anglais`,
	Lang_Defined_To_French: `${EmojiGreenTickString} Langue définie en Français`,
	Lang_Defined_To_Russian: `${EmojiGreenTickString} Langue définie en Russe`,
	Lang_Defined_To_Spanish: `${EmojiGreenTickString} Langue définie en Espagnol`, //Espagnol
	Lang_Defined_To_Italian: `${EmojiGreenTickString} Langue définie en Italien`,
	Lang_Defined_To_Deutsch: `${EmojiGreenTickString} Langue définie en Allemand`, //Allemand

	Lang_Didnt_Find_Lang: `${EmojiRedTickString} Il semble que \`{0}\` n'existe pas dans ma base de données de langues traduites.`,

	//#endregion

	//#region Music
	Music_Tell_Me_Something_Play_Playlist: `${EmojiRedTickString} Merci de me dire quoi jouer (le lien playlist)`,
	Music_Not_In_Vocal: `${EmojiRedTickString} Vous devez être connecté à un salon vocal`,
	Music_Should_Not_Deafen: `${EmojiRedTickString} Vous devez être à l'écoute (ne pas être deafen)`,
	Music_Not_Playlist: `${EmojiRedTickString} Ce n'est pas une playlist.`,
	Music_Not_Link: `${EmojiRedTickString} Hmm désolé mais ... ce n'est pas un lien :/`,

	Music_Tell_Me_Something_Play: `${EmojiRedTickString} Merci de me dire quoi jouer (un lien ou un titre)`,
	Music_Soundcloud_Not_Supported: `${EmojiRedTickString} Soundcloud n'est pas réellement supporté. Ce sera bientôt :tm:`,

	Music_No_Music_Playing: `${EmojiRedTickString} Il n'y a pas de musique en train de jouer`,
	Music_Not_In_The_Same_Vocal: `${EmojiRedTickString} Vous n'êtes pas dans le même salon vocal que moi`,

	Music_Resume_Success: `${EmojiGreenTickString} Musique reprise`,
	Music_Pause_Success: `${EmojiGreenTickString} Musique en pause`,

	Music_Need_Music_Title: `${EmojiRedTickString} Merci de mettre un titre de musique`,

	Music_Skip_Not_In_Vocal: `${EmojiRedTickString} Vous devriez être dans un salon vocal avant de me demander de sauter quelques musiques.`,
	Music_Skip_No_Music_Found: `${EmojiRedTickString} Je n'ai trouvé aucune autre musique`,
	Music_Skip_Success: `${EmojiGreenTickString} Saut de la chanson: `,
	Music_Requested_By: `demandé par`,
	Music_Now_Playing: `En train de jouer`,
	Music_Stopped_From: `${EmojiGreenTickString} Toutes les musiques sont coupés sur le salon `,

	Music_Currently_Queue_Empty: `${EmojiRedTickString} La liste est actuellement vide.`,
	Music_Queue_List: `Liste de file d'attente`,
	Music_Here_Queue_List: `Voici votre liste de file d'attente`,
	Music_Queue_List_Requested_By: `Liste de file d'attente demandée par`,

	Music_And: `Et`,
	Music_More: `plus...`,
	Music_End_Of_Text: `C'est la fin du texte`,

	Music_Song_Will_Not_Repeated: `ne sera plus répété`,
	Music_Song_Will_Be_Repeated: `sera répété`,

	Music_Status_Status: `Statut`,
	Music_Status_No_Music: `${EmojiRedTickString} Il n'y a pas de musique`,

	Music_Status_Yes: `Oui`,
	Music_Status_No: `Non`,

	Music_Status_Current_Status: `L'état actuel de la chanson`,
	Music_Status_Current_Song: `La chanson actuelle`,

	Music_Status_Track_Loop: `Le morceau est-il en boucle ?`,
	Music_Status_Track_Paused: `Le morceau est-il en pause ?`,
	Music_Status_Uploaded_By: `Mis en ligne par`,
	Music_Status_Song_Duration: `Durée de`,
	Music_Status_Time_Remaining: `Temps restant`,
	Music_Status_Views: `Vues`,
	Music_Status_Link: `Lien`,
	Music_Status_Requested_By: `Statut demandé par`,
	//#endregion

	//#region autorole
	Command_Autorole_Activated: `${EmojiGreenTickString} L'autorole est activé.`,
	Command_Autorole_Now_Activated: `${EmojiGreenTickString} L'autorole est désormais activé.`,
	Command_Autorole_Already_Activated: `${EmojiRedTickString} L'autorole est déjà activé.`,

	Command_Autorole_Deactivated: `${EmojiGreenTickString} L'autorole est désormais désactivé.`,
	Command_Autorole_Now_Deactivated: `${EmojiGreenTickString} L'autorole est désormais désactivé.`,
	Command_Autorole_Already_Deactivated: `${EmojiRedTickString} L'autorole est déjà désactivé.`,

	Command_Autorole_Is_Now_Defined_As: `${EmojiGreenTickString} L'autorole est désormais sur le rôle: {0}`,

	Command_AutoRole_Not_Found_Role: `${EmojiRedTickString} Le rôle \`{0}\` semble ne pas exister`,
	Command_AutoRole_Not_Defined: `${EmojiRedTickString} Le role n'est pas défini.`,

	//Embed
	Command_AutoRole_Embed_Description1: `Pour utiliser l'\`auto-role\`, voici quelques astuces:\n`,

	Command_AutoRole_Embed_Description2: `:one: Premièrement, vous avez besoin de définir le rôle que vous voulez donner au nouvel utilisateur, avec cette commande: \`{0}auto-role set @role\`\n\n`,
	Command_AutoRole_Embed_Description3: `:two: Après ça, si la première commande est rentrée sans problème, vous devez activer l'autorole, comme ceci: \`{0}auto-role on\`\n\n\n`,

	Command_AutoRole_Embed_Description4: `:information_source: Liste des arguments: \`help, show, on, off\`\n`,
	Command_AutoRole_Embed_Description5: `:information_source: Si vous voulez le **désactiver**, faites tout simplement: \`{0}auto-role off\`\n`,
	Command_AutoRole_Embed_Description6: `:information_source: Vous pouvez utiliser la commande \`{0}autorole\` **à la place de** \`{1}auto-role\`\n`
	//#endregion
	// current_lang.
}
module.exports = {
	lang: lang
}
