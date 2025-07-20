const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const DS = require("drawshield");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = "!";
const dsremove = "ds  ";

const drawshieldcli = new DS.Client({
  dir: "./shields",
  save: true
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    status: "dnd",
    activities: [{ name: "blazons", type: ActivityType.Listening }]
  });
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  if (command === "motto") {
    const mottos = [
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
    const motto = mottos[Math.floor(Math.random() * mottos.length)];
    const embed = new EmbedBuilder()
      .setDescription(`:scroll: | Your motto is: \`${motto}\``)
      .setColor(8311585);
    message.channel.send({ embeds: [embed] });
  }

if (command === "ds") {
  const blazonbody = message.content.slice(dsremove.length).replace(/\./g, '');
  console.log(blazonbody);

  try {
    await drawshieldcli.drawShield(blazonbody);
    const imagename = blazonbody.replace(/,/g, "").replace(/\s/g, "-");
    const filePath = `./shields/${imagename}.png`;

    const embed = new EmbedBuilder()
      .setDescription(':shield: | Shield drawn!')
      .setColor(8311585)
      .setImage(`attachment://${imagename}.png`);

    await message.channel.send({
      embeds: [embed],
      files: [{
        attachment: filePath,
        name: `${imagename}.png`
      }]
    });

  } catch (err) {
    console.error("Caught an error drawing shield:", err);
    message.channel.send(":warning: Could not draw shield due to an error.");
  }
}

});

var token = "replace_this"
// 🔒 USE A SAFELY STORED TOKEN or hardcode it. I don't care...
// If you want to add a fs call to another file, would probably be best
client.login(token);
