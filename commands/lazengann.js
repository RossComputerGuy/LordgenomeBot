const Discord = require("discord.js");

module.exports = (client,msg,argv) => {
	switch(argv["_"][0]) {
		case "OVERLOAD":
			msg.reply("https://www.youtube.com/watch?v=72iD5CQfPaM");
			break;
		case "overload":
			msg.reply("https://www.youtube.com/watch?v=9ybOFxNKkzc");
			break;
		case "POWAR":
			msg.reply("https://www.youtube.com/watch?v=D5sICluMOiA");
			break;
		case "help":
		case null:
		case undefined:
			{
				var embed = new Discord.RichEmbed();
				embed.setTitle("Lordgenome Bot");
				embed.setColor(0x6cae7f);
				embed.setDescription([
					"**Lazengann Comamnds**",
					"\t\* OVERLOAD - Become one with the power",
					"\t\* POWAR - Give Simon more SPIRAL POWAR!",
					"\t\* help - Lists the commands available for Lazengann"
				].join("\n"));
				msg.channel.send(embed);
			}
			break;
		default:
			msg.reply("Action \""+argv["_"][0]+"\" doesn't exist");
	}
};
