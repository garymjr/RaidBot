const utils = require("../utils.js");

exports.run = (bot, msg, params) => {
  let uptime = utils.formatUptime(bot);
  bot.log(bot.uptime);
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
