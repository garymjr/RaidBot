const Discord = require("discord.js");
const bot = new Discord.Client({ fetchAllMembers: true });
const fs = require("fs");

// Try json config first, otherwise use Env
try {
  bot.config = require("./config.json");
} catch (c) {
  if (process.env.botToken) {
    bot.config = {
      botToken: process.env.botToken,
      prefix: process.env.prefix,
      ownerid: process.env.ownerid
    };
  } else {
    throw "No config found, exiting!";
  }
}

// Extend bot
bot.log = (msg) => { console.log(msg) };
bot.plugins = new Discord.Collection();

// Load plugins
fs.readdir("./plugins", (err, files) => {
  if (err) console.log(err);
  let c = 0;
  files.forEach((f) =>  {
    if (f.split(".")[1] === "js") {
      let props = require(`./plugins/${f}`);
      bot.plugins.set(props.help.name, props);
      c++;
    }
  });
  files.forEach((f) => {
    delete require.cache[require.resolve(`./plugins/${f}`)];
  });
  console.log(`Loaded ${c} plugins.`);
});

bot.on("message", (msg) => {
  if (!msg.content.startsWith(bot.config.prefix)) return;
  if (msg.author.id === bot.user.id) return;
  let command = msg.content.split(" ")[0].slice(bot.config.prefix.length);
  let params = msg.content.split(" ").slice(1);
  let cmd;
  if (bot.plugins.has(command)) {
    cmd = bot.plugins.get(command);
  }
  if (cmd.config.enabled) cmd.run(bot, msg, params);
});

bot.on("ready", () => {
  bot.log(`RaidBot is ready to serve ${bot.users.size} users.`);
});

bot.on("error", console.error);
bot.on("warn", console.warn);

bot.login(bot.config.botToken);
