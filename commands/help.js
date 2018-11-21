const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = (client,msg,argv) => {
	var embed = new Discord.RichEmbed();
	embed.setTitle("Lordgenome Bot V"+JSON.parse(fs.readFileSync(path.join(__dirname,"..","package.json")).toString()).version.split(".")[0]);
	embed.setURL("https://github.com/SpaceboyRoss01/LordgenomeBot");
	embed.setColor(0x6cae7f);
	embed.setDescription([
		"**Commands**",
		"\t\* fanart [sauce] - Searches for fanart. By default, it searched for Gurren Lagann fanart. If you change `rating` to something that is not `s` (safe) and your not in a NSFW channel, the bot will stop.",
		"\t\* hacking! - Hack the Cathedral Terra's computer",
		"\t\* help - Lists the commands available",
		"\t\* lazengann - Lordgenome's Gunmen",
		"\t\* past - A short history lesson of the Spiral War",
		"\t\* quote [character] - Displays a random quote, a random character is selected if the character's name is not provided..",
		"\n",
		"Links:",
		"\t\* [GitHub Repository (The bot's code)](https://github.com/SpaceboyRoss01/LordgenomeBot)",
		"\n",
		"Version "+JSON.parse(fs.readFileSync(path.join(__dirname,"..","package.json")).toString()).version+" by [Spaceboy Ross](https://youtube.com/c/SpaceboyRoss/)"
	].join("\n"));
	msg.channel.send(embed);
};
