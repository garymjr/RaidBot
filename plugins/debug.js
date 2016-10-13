exports.run = (bot, msg, params) => {
  if (msg.author.id != bot.config.ownerid) {
    msg.author.sendMessage("Sorry, you're not allowed to use this command");
  } else {
    let eval_code = params.join(" ");
    let eval_result;
    try {
      eval_result = eval(eval_code);
    } catch (e) {
      msg.channel.sendMessage("```" + e + "```");
    }
    if (eval_result) msg.channel.sendMessage("```" + eval_result + "```");
  }
};

exports.config = {
  enabled: true,
  permLevel: 0
};

exports.help = {
  name: "debug",
  description: "allows for live bot debugging",
  usage: "debug [command]"
};
