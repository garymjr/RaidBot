exports.run = (bot, msg, params) => {
  msg.channel.sendMessage(`<@${msg.author.id}> pong!`);
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