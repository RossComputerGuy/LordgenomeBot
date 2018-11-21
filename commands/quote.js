module.exports = (client,msg,argv) => {
	var OST = Math.floor(Math.random()*10);
	if(OST <= 4 && typeof(argv["_"][0]) == "undefined") {
		var quotes = [
			"Do the impossible, see the invisible. / Row! Row! Fight the power! / Touch the untouchable, break the unbreakable/ Row! Row! Fight the power!",
			"**Rappu ha Kan no Tamashii da** Onore wo Shinjite Ten wo Yubisasu Dotou no Otoko Kamina-sama no Teema wo Mimi no Ana Kappojitte Yo~ku Kikiyagare!",
			"**Rap is a man's soul!** Perk up your earholes and listen real close to the theme of Lord Kamina, the man of raging billows who believes in himself and points to heaven."
		];
		msg.reply("\""+quotes[Math.floor(Math.random()*quotes.length)]+"\"");
	} else {
		var characters = {
			"Kamina": [
				"Ore wo dare da to omotte yagaru?!",
				"**Who the hell do you think I am?!**",
				"**Go beyond the impossible and kick reason to the curb!** That's how Team Gurren rolls!",
				"Your drill is the drill that will pierce the Heavens!",
				"Listen up, Simon. Don't believe in yourself. Believe in me! Believe in the Kamina who believes in you!",
				"Who-the-hell-do-you-think-I-am-kick! Hands-off-my-beloved-little-brother-puuuuuuuunch!...Finishing move! Perfect combustion of manly souls cannonball attaaack!",
				"Huh, yea whatever now dig the wax out of your ears because I've got something to say! He takes the blazing sun in his bare hands and endures the searing heat. A mans man sustained by strength of will. When you hear of the great Kamina they're talking about me! You'd best remember that.",
				"SIMON! LET'S SEE YA' GRIT THOSE TEETH!!...Have you snapped out of it yet? I give you my word if you ever doubt yourself, I'll come and belt ya' one.",
				"Who the hell do you think you are? Isn't your drill the one that will pierce the heavens, the earth, and through to tomorrow?",
				"Listen Simon... Don't forget. Believe in yourself. Not in the you who believes in me. Not the me who believes in you. Believe in the you who believes in yourself.",
				"Whenever I feel weak or lack confidence, I remember Simon's back as he dug tirelessly. I wanted to become a man whose back would never break!",
				"Don't be held back by someone else's bullshit in fake memories.The one path you chose for yourself, is the truth of your universe.",
				"A true man never dies ... even when he's killed",
				"That's how Team Gurren rolls!"
			],
			"Simon": [
				"If you're gonna dig, dig to the heavens. No matter what's in my way I won't stop! Once I've dug through, it means that I've WON! Just who the hell do you think I am? I'm Simon. I'm not my Bro. I'm ME! Simon the Digger!",
				"I'm Simon...The Great Gurren Brigade's Leader, Simon the Digger! If you become a wall blocking my way...I'll drill a hole in you and blow you apart anytime! That is...my drill!",
				"Our dead friends...the sorrow of the spiral race...we'll take in all their regrets. We'll take it and turn it into power!",
				"Our friend's hopes and dreams are etched into its body; transforming the infinite darkness into light. Unmatched in heaven and earth. One Machine equal to the Gods; Super Galaxy Gurren Lagann! We're gonna show you... the power of the human race.",
				"Never afraid of what the future holds, never regretful of the present. That's who we are! The Dai-Gurren Brigade!",
				"Don't underestimate us. We don't care about time, or space or... multi-dimensional whatevers! We don't give a damn about that. Force your way down a path YOU choose to take, and do it all yourself! That's the way Team Dai-Gurren rolls!",
				"The tomorrow we're trying to reach is...not a tomorrow you've decided on! We... by ourselves... choose our tomorrow from the infinite universes! We will fight through it... we will fight through it and protect the universe! We'll show you we can do it!",
				"We evolve, beyond the person that we were a minute before. Little by little, we advance with each turn. That's how a drill works!",
				"That's your limitation! You sit here closed off, blocking away other lifeforms like some sort of king! That's nobody's limitation but your own!",
				"MARK MY WORDS...! This drill, will open a hole in the universe. And that hole will be a path for those behind us. The dreams of those who have fallen! The hopes of those who will follow! Those two sets of dreams weave together into a double helix, drilling a path towards tomorrow! And THAT'S Tengen Toppa! That's Gurren-Lagann! My drill is the drill, that creates the HEAVENS!",
				"Even so, I will...! I will believe! I will believe in the me that believes in us, humans and the future! This drill is... my SOUL!",
				"Believe in us humans."
			],
			"Nia": [
				"Goodbye, Father. I will face tomorrow.",
				"If people's faith in you is what gives you your power, then I believe in you with every fiber of my being!",
				"The Human spirit is infinite! I've also bet on that greatness!"
			],
			"Kittan": [
				"Show me a guy who ain't afraid of dyin'!",
				"When you're scared, it's all the more reason to move forward!",
				"I borrowed one of Gurren Lagann's drills as a good luck charm! And believe me, I'm gonna put it to good use...!",
				"(wielding one of Gurren Lagann's drills) This is Simon's soul! Team Dai-Gurren's soul! Humanity's soul... and actually, it's MY SOUL! Do you seriously think it's gonna be wiped out by the likes of you?! King... Kittan... GIGA... DRILL... BREAK!!!",
				"So this is the power of the spiral... Not bad, not bad at all.."
			],
			"Leeron": [
				"I can't miss out on something this interesting, can I? It could be that these two will change something.",
				"When you screw it in, give it a hard manly twist.",
				"When objects revolve at a high speed, even if force is applied, the axis of revolution will always remain in a fixed position. This is one of the laws of the universe. That's right. The faster you spin, the faster you free yourself from Earth's gravity, and seek the heavens."
			],
			"Dayakka": [ "I've got the best wife in the universe swing!!" ]
		};
		var char = argv["_"][0] || Object.keys(characters)[Math.floor(Math.random()*Object.keys(characters).length)];
		var quotes = characters[char];
		if(typeof(quotes) != "object") return msg.reply("Invalid character: "+argv["_"][0]);
		msg.reply("\""+quotes[Math.floor(Math.random()*quotes.length)]+"\" - "+char);
	}
};
