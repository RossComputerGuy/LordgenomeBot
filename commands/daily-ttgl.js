const Discord = require("discord.js");
const request = require("request");

const searchPosts = (after,checkCB,cb) => {
  request({
    uri: "https://www.reddit.com/r/gurrenlagann.json"+(after ? "?after="+after : ""),
    json: true
  },(err,res,body) => {
    if(err) return cb(err);
    if(!checkCB(body.data.children)) {
      if(body.data.after) return searchPosts(body.data.after,checkCB,cb);
      else return cb(null);
    }
  });
};

module.exports = (client,msg,argv) => {
  if(isNaN(parseInt(argv["_"][0]))) return msg.reply("Invalid usage, please add the week number");
	msg.channel.startTyping();
	searchPosts(null,posts => {
    for(var post of posts) {
      if(/Daily TTGL #(\d+)/.test(post.data.title)) {
        var numb = parseInt(post.data.title.split("#")[1]);
        if(numb == parseInt(argv["_"][0])) {
          msg.channel.stopTyping(true);
          var embed = new Discord.RichEmbed();
          embed.setThumbnail(post.data.thumbnail);
          embed.setTitle(post.data.title);
          var timestamp = new Date(post.data.created_utc);
		      if(timestamp.getFullYear() == 1970) timestamp = new Date(post.data.created_utc*1000);
          embed.setTimestamp(timestamp);
          embed.setColor(post.data.link_flair_css_class);
          embed.setAuthor(post.data.author,"https://www.redditstatic.com/avatars/avatar_default_10_7193FF.png","https://reddit.com/u/"+post.data.author);
          embed.setImage(post.data.url);
          embed.setURL("https://reddit.com"+post.data.permalink);
          msg.channel.send(embed);
          return true;
        }
      }
    }
    return false;
	},err => {
	  if(err) {
      msg.channel.stopTyping(true);
      return msg.reply(err.toString());
	  }
	  msg.channel.stopTyping(true);
    msg.reply("Day #"+argv["_"][0]+" doesn't exist");
	});
};
