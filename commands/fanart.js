const Discord = require("discord.js");
const Kaori = require("kaori");

module.exports = (client,msg,argv) => {
	var kaori = new Kaori();
	msg.channel.startTyping();
	var site = argv["site"] || Object.keys(kaori.sites)[Math.floor(Math.random()*Object.keys(kaori.sites).length)];
	kaori.search(site,{
		tags: [argv["_"][0] || "gurren-lagann"],
		limit: parseInt(argv["limit"] || "5"),
		random: argv["random"] || true
	}).then(images => {
		var rating = argv["rating"] || "s";
		if(rating != "s" && !msg.channel.nsfw) {
			msg.channel.stopTyping(true);
			return msg.reply("Please use this command in a NSFW channel.");
		}
		var results = [];
		for(var img of images) {
			if(img.common.rating == rating || img.rating == rating) results.push(img);
		}
		var result = results[argv["index"] || Math.floor(Math.random()*results.length)];
		if(typeof(result) != "object")  {
			msg.channel.stopTyping(true);
			return msg.reply("Couldn't find any images");
		}
		var embed = new Discord.RichEmbed();
		embed.setTitle(result.id+" on "+site);
		embed.setColor(0x6cae7f);
		var timestamp = new Date(result.created_at || result.updated_at);
		if(timestamp.getFullYear() == 1970) timestamp = new Date((result.created_at || result.updated_at)*1000);
		embed.setTimestamp(timestamp);
		if(typeof(result.author) == "string") embed.setAuthor(result.author);
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
