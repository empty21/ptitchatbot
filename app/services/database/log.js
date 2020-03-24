"use strict";

const {Log} = require("../../../database/models");
const {calculateDuration} = require("../helpers/tools");

function createLog(session) {
  let now = new Date();
  let log = new Log({
    "l_user": session.l_user._id,
    "r_user": session.r_user._id,
    "paired_at": session.paired_at,
    "unpaired_at": now,
    "duration": calculateDuration(session.paired_at, now)
  });
  log.save();
}
async function checkLog(user) {
  let time = new Date(Date.now() - config.TIME_TO_REMATCH*1000);
  let query = {
    $or: [{"l_user": user._id}, {"r_user": user._id}],
    "unpaired_at": {$gte: time}
  };
  return await Log.find(query)
    .populate("r_user")
    .populate("l_user")
    .select("r_user l_user")
    .exec();
}

module.exports = {
  createLog,
  checkLog
};