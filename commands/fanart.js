const Discord = require("discord.js");
const Kaori = require("kaori");

const RATING = {
	"q": "PURPLE",
	"s": "GREEN",
	"e": "GOLD"
};

module.exports = (client,msg,argv) => {
	if(argv["help"] || argv["h"]) {
		var embed = new Discord.RichEmbed();
		embed.setTitle("Lordgenome: fanart");
		embed.setColor(0x6cae7f);
		embed.setDescription([
			"Usage: %fanart [options] <tags...>",
			"\n",
			"Options:",
			"\t\* random - Enables random searching",
			"\t\* site=<site> - Sets the site to search",
			"\t\* limit=<number> - Sets the limit to use",
			"\t\* rating=<value> - Sets the rating (Values: e(xplicite), s(afe), q(uestionable))",
		].join("\n"));
		return msg.channel.send(embed);
	}
	var kaori = new Kaori();
	msg.channel.startTyping();
	var site = argv["site"] || Object.keys(kaori.sites)[Math.floor(Math.random()*Object.keys(kaori.sites).length)];
	if(Object.keys(kaori.sites).indexOf(site) == -1) {
		msg.channel.stopTyping(true);
		return msg.reply("Invalid site: "+site);
	}
	kaori.search(site,{
		tags: argv["_"].length > 0 ? argv["_"] : ["gurren-lagann"],
		limit: parseInt(argv["limit"] || "10000"),
		random: argv["random"] || false
	}).then(images => {
		var rating = argv["rating"] || "s";
		if(rating[0] == "e" && !msg.channel.nsfw) {
			msg.channel.stopTyping(true);
			return msg.reply("Please use this command with the explicite rating set in a NSFW channel.");
		}
		if(Object.keys(RATING).indexOf(rating[0]) == -1) {
			msg.channel.stopTyping(true);
			return msg.reply("Invalid rating type.");
		}
		var results = [];
		for(var img of images) {
			if(img.common.rating == rating[0] || img.rating == rating[0]) results.push(img);
		}
		var result = results[argv["index"] || Math.floor(Math.random()*results.length)];
		if(typeof(result) != "object")  {
			msg.channel.stopTyping(true);
			return msg.reply("Couldn't find any images");
		}
		var embed = new Discord.RichEmbed();
		embed.setTitle(result.id+" on "+site);
		embed.setColor(RATING[rating[0]]);
		var timestamp = new Date(result.created_at || result.updated_at);
		if(timestamp.getFullYear() == 1970) timestamp = new Date((result.created_at || result.updated_at)*1000);
		embed.setTimestamp(timestamp);
		if(typeof(result.author) == "string") embed.setAuthor(result.author);
		else if(typeof(result.tag_string_artist) == "string") embed.setAuthor(result.tag_string_artist);
		else if(typeof(result.uploader_name) == "string") embed.setAuthor(result.uploader_name);
		if(result.common.fileURL.indexOf("://",result.common.fileURL.indexOf("://")) != -1) result.common.fileURL = result.file_url;
		if(typeof(result.preview_url) == "string") embed.setThumbnail(result.preview_url.split(" ").join("%20"));
		embed.setImage(result.common.fileURL.split(" ").join("%20"));
		embed.setFooter("Tags: "+result.common.tags.slice(0,10).join(", "));
		msg.channel.send(embed);
		msg.channel.stopTyping(true);
	}).catch(ex => {
		msg.channel.stopTyping(true);
		msg.reply(ex.stack);
	});
};
