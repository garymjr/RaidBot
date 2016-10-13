// utils.formatUptime - Formats the bots uptime as a string
exports.formatUptime = (bot) => {
  let uptime = bot.uptime / 1000; 
  let h = Math.floor(uptime / 3600);
  let m = Math.floor((uptime / 60) % 60);
  let s = Math.floor(uptime) % 60;
  let uptime_arr = new Array();
  if (h > 1) {
    uptime_arr.push(`${h} hours`);
  } else if (h === 1) {
    uptime_arr.push(`${h} hour`);
  }
  if (m > 1) {
    uptime_arr.push(`${m} minutes`);
  } else if (m === 1) {
    uptime_arr.push(`${m} minute`);
  }
  if (s > 1) {
    uptime_arr.push(`${s} seconds`);
  } else if (s === 1) {
    uptime_arr.push(`${s} second`);
  }

  return uptime_arr.join(", ");
};
