const fs = require("fs");
let now = new Date();
let LogName_start =
  now.toLocaleDateString() + "" + "-" + now.toLocaleTimeString();
let LogName = LogName_start.replace(/\./g, "-").replace(/\:/g, "-") + ".log";

function CurTime() {
  let time = now.toLocaleDateString() + "" + "-" + now.toLocaleTimeString();
  return time.replace(/\./g, "-").replace(/\:/g, "-");
}

exports.startLogging = () => {
  fs.appendFileSync("./Logs/" + LogName, CurTime() + " Logging start \n");
};
