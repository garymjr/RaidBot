exports.run = (bot, msg, params=[]) => {
  let addons;
  try {
    addons = require("../data/addons.json");
  } catch (e) {
    bot.log(`Unable to open addons: ${e}`);
  }
  if (addons) {
    if (params.length > 0) {
      if (addons[params[0].toLowerCase()]) {
        msg.channel.sendMessage(addons[params[0]].url);
      }
    } else {
      bot.plugins.get("addons").required = new Array();
      bot.plugins.get("addons").optional = new Array();
      bot.plugins.get("addons").keywords = new Array();
      for (let key of Object.keys(addons)) {
        if (addons[key].required) {
          bot.plugins.get("addons").required.push(addons[key].name);
        } else {
          bot.plugins.get("addons").optional.push(addons[key].name);
        }
        bot.plugins.get("addons").keywords.push(key);
      }
    msg.author.sendMessage("```" + `Required: ${bot.plugins.get("addons").required.join(", ")}\nOptional: ${bot.plugins.get("addons").optional.join(", ")}\nKeywords: ${bot.plugins.get("addons").keywords.join(", ")}` + "```");
    }
  }
};

exports.config = {
  enabled: true,
  permLevel: 0
};


exports.help = {
  name: "addons",
  description: "Displays required addons and links to them",
  usage: "addons [addon]"
};
