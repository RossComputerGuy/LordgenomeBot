const argsparser = require("yargs-parser");
const Discord = require("discord.js");
const GoogleTTS = require("google-tts-api");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");

var client = new Discord.Client();

client.on("guildMemberAdd",member => {
	const channel = member.guild.channels.find(ch => ch.name == "member-log");
	if(!channel) return;
	channel.send("Welcome "+member.displayName);
});

function presenceUpdate() {
	var presences = [
		{
			game: {
				name: client.guilds.array().length+" Servers",
				type: "WATCHING"
			}
		},
		{
			game: {
				name: "%help",
				type: "PLAYING"
			}
		}
	];
	client.user.setPresence(presences[Math.floor(Math.random()*presences.length)]);
}

client.on("ready",() => {
	presenceUpdate();
	setInterval(() => {
		presenceUpdate();
	},1000*(60*5));
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
		if(cmd == "voice") {
			switch(argv["_"][0]) {
				case "play-yt-link":
					argv["_"].shift();
					var txt = argv["_"].join(" ");
					var voiceChannel = msg.member.voiceChannel;
					if(!voiceChannel) {
						for(var channel of msg.mentions.channels.array()) {
							if(channel.type == "voice") {
								voiceChannel = channel;
								break;
							}
						}
					}
					if(!argv["_"][0]) return msg.reply("Missing link");
					voiceChannel.join().then(connection => {
						const stream = ytdl(argv["_"][0],{ filter: "audioonly" });
						const dispatcher = connection.playStream(stream,{ seek: 0, volume: 1 });
						dispatcher.on("end",() => {
							connection.disconnect();
						}).on("error",err => {
							msg.reply(err.stack);
						});
					}).catch(err => {
						msg.reply(err.stack);
					});
					break;
				case "tts":
					argv["_"].shift();
					var txt = argv["_"].join(" ");
					var voiceChannel = msg.member.voiceChannel;
					if(!voiceChannel) {
						for(var channel of msg.mentions.channels.array()) {
							if(channel.type == "voice") {
								voiceChannel = channel;
								break;
							}
						}
					}
					if(!voiceChannel) return msg.channel.send(txt,{ tts: true });
					GoogleTTS(txt,argv["lang"] || "en",parseInt(argv["speed"] || "1")).then(url => {
						voiceChannel.join().then(connection => {
							connection.playArbitraryInput(url).on("end",() => {
								connection.disconnect();
							}).on("error",err => {
								msg.reply(err.stack);
							});
						}).catch(err => {
							msg.reply(err.stack);
						});
					}).catch(err => {
						msg.reply(err.stack);
					});
					break;
				case undefined:
				case null:
				case "h":
				case "help":
					{
						var embed = new Discord.RichEmbed();
						embed.setTitle("Lordgenome bot");
						embed.setColor(0x6cae7f);
						embed.setDescription([
							"Voice actions: ",
							"\t\* tts - Text to speech",
							"\t\* play-yt-link <url> [channel] - Plays a video in a voice channel."
						].join("\n"));
						msg.channel.send(embed);
					}
					break;
				default: msg.reply("Invalid action: "+argv["_"][0]);
			}
			return;
		}
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
