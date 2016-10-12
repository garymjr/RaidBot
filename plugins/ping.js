exports.run = (bot, msg, params) => {
  console.log("pong!");
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