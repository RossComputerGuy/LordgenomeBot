const Discord = require("discord.js");

const QUESTIONS = {
  "Is Leeron a boy or a girl": "boy",
  "How many times is the word drill said in the anime?": "73",
  "(**Spoiler**) What episode does the Legend Kamina Die in?": "8",
  "How big is Super Tengen Toppa Gurren Lagann?": "52.8 billion light years",
  "What are the mecha's called in the anime?": "gunmen",
  "Who is the button presser?": "artenborough",
  "Who is Simon's pet?": "boota",
  "How old is Simon in the first arc?": "14",
  "How old is Simon in the second arc?": "21",
  "How long is the time skip?": "7 years",
  "What does Nia want to plant in the movie?": "flowers",
  "What village is Simon from?": "jiha",
  "What does Simon and Kamina call each other? (English ver.)": "bro",
  "What does Simon and Kamina call each other? (Japanese ver.)": "anaki",
  "What can Team (Dai)-Gurren do?", "the impossible"
};

const sortScores = scores => {
  var sortable = [];
  for(var score in scores) sortable.push([score,scores[score]]);
  return sortable.sort((a,b) => a[1]-b[1]);
};

const questionTime = (client,msg,points,count) => {
  const question = Object.keys(QUESTIONS)[Math.floor(Math.random()*Object.keys(QUESTIONS).length)];
  const anwser = QUESTIONS[question];
  msg.channel.send(question);
  var timeout;
  var responses = [];
  const onEnd = () => {
    for(var message of responses) message.delete().then(() => {}).catch(err => msg.channel.send(err.toString()));
    if(count > 0) questionTime(client,msg,points,responses,count-1);
    else {
      var embed = new Discord.RichEmbed();
      embed.setTitle("Lordgenome's TTGL quiz results");
      embed.setDescription("<@"+sortScores(points)[0][0]+"> is the winner!\n"+sortScores(points).map(entry => "<@"+entry[0]+"> - "+entry[1]+" Points").join("\n"));
      msg.channel.send(embed);
    }
  };
  const onResponse = message => {
    if(message.channel.id == msg.channel.id) {
      responses.push(message);
      if(message.content.toLowerCase() == anwser.toLowerCase()) {
        clearTimeout(timeout);
        msg.channel.send(msg.author.toString()+" got that one correct, +1 point");
        if(points[msg.author.id]) points[msg.author.id]++;
        else points[msg.author.id] = 1;
        client.off("message",onResponse);
        onEnd();
      }
    }
  };
  client.on("message",onResponse);
  timeout = setTimeout(() => {
    client.off("message",onResponse);
    msg.channel.send("Nobody got that right, the correct anwser is: \""+anwser+"\".").then(msg => {
      responses.push(message);
      onEnd();
    });
  },6000);
};

module.exports = (client,msg,argv) => {
  var questionCount = parseInt(argv["_"][0] || "5");
  msg.channel.send("Starting quiz in 5 seconds");
  setTimeout(() => {
    msg.channel.send("Starting quiz with "+questionCount+" questions...");
    questionTime(client,msg,{ [msg.author.id]: 0 },questionCount);
  },5000);
};
