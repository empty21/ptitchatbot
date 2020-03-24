"use strict";

const {FILTER} = require("../../../config/config");

function filterMessage(str) {
  let regex = new RegExp(FILTER.join("|"),"gi");
  str = str.replace(regex,"***");
  return str;
}
function calculateDuration(timeStart,timeEnd) {
  let durration = timeEnd.getTime() - timeStart.getTime();
  let days = Math.floor(durration/86400000);
  durration%=86400000;
  let hours = Math.floor(durration/3600000);
  durration%=3600000;
  let minutes = Math.floor(durration/60000);
  durration%=60000;
  let seconds = Math.floor(durration/1000);
  return days+"d"+hours+"h"+minutes+"m"+seconds+"s";
}

module.exports = {
  filterMessage,
  calculateDuration
};