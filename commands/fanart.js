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
		var results = [];
		for(var img of images) {
			if(img.common.rating == rating || img.rating == rating) results.push(img);
		}
		var result = results[argv["index"] || Math.floor(Math.random()*results.length)];
		if(typeof(result) != "object") return msg.reply("Couldn't find any images");
		var embed = new Discord.RichEmbed();
		embed.setTitle(result.id+" on "+site);
		embed.setColor(0x6cae7f);
		if(typeof(result.author) == "string") embed.setAuthor(result.author);
		if(typeof(result.preview_url) == "string") embed.setThumbnail(result.preview_url);
		embed.setImage(result.common.fileURL);
		embed.setFooter("Tags: "+result.common.tags.slice(0,10).join(", "));
		msg.channel.send(embed);
		msg.channel.stopTyping(true);
	}).catch(ex => {
		msg.channel.stopTyping(true);
		msg.reply(ex.stack);
	});
};
