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
  files.forEach((f) => {
    if (f.split(".")[1] === "js") {
      let props = require(`./plugins/${f}`);
      bot.plugins.set(props.help.name, props);
      c++;
    }
  });
  console.log(`Loaded ${c} plugins.`);
});