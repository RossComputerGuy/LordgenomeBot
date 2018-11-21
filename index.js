const argsparser = require("yargs-parser");
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

var client = new Discord.Client();

client.on("guildMemberAdd",member => {
	const channel = member.guild.channels.find(ch => ch.name == "member-log");
	if(!channel) return;
	channel.send("Welcome "+member.displayName);
});

client.on("message",msg => {
	if(msg.content.substring(0,1) == "%" && !msg.author.bot) {
		var embed = new Discord.RichEmbed();
		embed.setTitle("POLL: Should chatbot like features be added?");
		embed.setURL("https://www.strawpoll.me/16889251");
		embed.setColor(0x6cae7f);
		msg.channel.send(embed);
		var argv = argsparser(msg.content.substring(1,msg.content.length));
		var cmd = argv["_"].shift();
		try {
			if(require.cache[require.resolve("./commands/"+cmd)]) delete require.cache[require.resolve("./commands/"+cmd)];
			require("./commands/"+cmd)(client,msg,argv);
		} catch(ex) {
			if(ex.message.startsWith("Cannot find module")) msg.reply("Command \""+cmd+"\" doesn't exist");
			else msg.reply(ex.stack);
		}
	}
});

client.login(JSON.parse(fs.readFileSync(path.join(__dirname,"config.json")).toString()).token);
