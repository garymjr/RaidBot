const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");

exports.run = (bot, msg, params) => {
  let data;
  try {
    data = require("../data/profiles.json");
  } catch (e) {
    data = {};
  }

  if (params[0] === "register" && !(msg.author.id in data)) {
    let url = "https://" + `us.api.battle.net/wow/character/dalaran/${params[1]}?fields=items&locale=en_US&apikey=${bot.config.battlenetApiKey}`;
    request({
      url: url,
      json: true,
    }, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        data[msg.author.id] = body;
        fs.writeFile("./data/profiles.json", JSON.stringify(data), (err) => {
          if (err) {
            return bot.log("unable to saved profiles data");
          }
          msg.author.sendMessage(`Profile created for character ${data[msg.author.id].name}`);
        });
      }
    });
  }

  if (params[0] === "get" && msg.author.id in data) {
    if (params[1] === "ilvl") {
      msg.channel.sendMessage(`<@${msg.author.id}>, Your ilvl is ${data[msg.author.id].items.averageItemLevel}`);
    }
  }
};

exports.config = {
  enabled: true,
  permLevel: 0
};

exports.help = {
  name: "profile",
  description: "Managed user profiles and link them with battle.net character",
  usage: "profile [register <name>]"
};
