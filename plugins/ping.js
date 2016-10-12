const utils = require("../utils.js");

exports.run = (bot, msg, params) => {
  let time = new Date();
  let h = time.getHours() - bot.startup.getHours();
  let m = time.getMinutes() - bot.startup.getMinutes();
  let s = time.getSeconds() - bot.startup.getSeconds();
  let uptime = utils.formatTime(h, m, s);
  msg.channel.sendMessage(`<@${msg.author.id}> Pong! Bot uptime: ${uptime}.`);
};

exports.config = {
  enabled: true,
  permLevel: 0
};

exports.help = {
  name: "ping",
  description: "a test plugin",
  usage: "ping"
};
