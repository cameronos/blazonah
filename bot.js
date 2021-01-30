const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzU4MDkxNDUxODIwMjc3ODcy.X2p5rg.kb1Vq4pE69jx7yRIEgfe3spFmSg';
const prefix = "!";
const dsremove = "ds  ";
const DS = require("drawshield");
 
const drawshieldcli = new DS.Client({
  dir: "./shields",
  save: true
});

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}! Status setting`);
    client.user.setPresence({
        status: "dnd",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: "blazons ",  // The message shown
            type: "LISTENING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
 });

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }
  
  if (command === "motto") {
	var mottos = [
	"Nothing is impossible.",
	"I love as I find.",
	"Every man is the son of his works.",
	"He lives twice who lives well.",
	"By virtue and valour I shine",
	"In science truth, in art honour.",
	"Advice comes over night",
	"Taking due diligence",
	"Ego sum",
	"Power you hold is the power you own",
	"AScientia Portas Aperit",
	"Ne Obliviscaris"
	];
	var motto = mottos[Math.floor(Math.random()*mottos.length)];
	console.log(motto);
	const embed = {
	"description": ':scroll: | Your motto is: ' + "``" + motto + "``",
	"color": 8311585,
	};
	message.channel.send({embed});
  }
  
  if (command === "ds") {
	const blazonbody = message.content.slice(dsremove.length);
	periodfix = blazonbody.split('.').join('');
	console.log(periodfix);
	(async function() {
	let result = await drawshieldcli.drawShield(periodfix).catch((err) => { 
	console.log("!!!!!!!!!!!!!!!!!! Caught an error"); 
	message.channel.send(":warning: Could not draw shield due to an error.");
	})
	console.log(result);
	commafix = periodfix.replace(/,/g, "");
	imagename = commafix.replace(/\s/g , "-");
	const dir = "./shields/";
	const embed = {
	"description": ':shield: | Shield drawn!',
	"color": 8311585,
	};
	message.channel.send({embed});
	message.channel.send({files: [dir + imagename + ".png"]});
	})();
  }
  
});


client.login(token);