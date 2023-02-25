const moment = require("moment");

function formatMesage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}
module.exports = { formatMesage };
