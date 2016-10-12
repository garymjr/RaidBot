// utils.formatTime - Formats time as H hour(s) M minute(s) S second(s)
exports.formatTime = (hours, minutes, seconds) => {
  let time_string = "";
  if (hours > 0 && hours < 2) {
    time_string += `${hours} hour`;
  } else if (hours > 0) {
    time_string += `${hours} hours`;
  }
  if (minutes > 0 && minutes < 2) {
    time_string += `${minutes} minute`;
  } else if (minutes > 0) {
    time_string += `${minutes} minutes`;
  }
  if (seconds > 0 && seconds < 2) {
    time_string += `${seconds} second`;
  } else if (seconds > 0) {
    time_string += `${seconds} seconds`;
  }

  return time_string;
};
