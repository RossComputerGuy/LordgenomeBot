const argsparser = require("yargs-parser");
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

var client = new Discord.Client();

client.on("message",msg => {
	if(msg.content.substring(0,1) == "%" && !msg.author.bot) {
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
