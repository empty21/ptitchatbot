"use strict";

const {Session} = require("../../../database/models");

function addSession(r_user, l_user) {
  let session = new Session({
    "l_user": r_user._id,
    "r_user": l_user._id
  });
  session.save();
}
async function getUserSession(user) {
  return await Session.findOne({$or: [{"l_user": user._id}, {"r_user": user._id}]})
    .populate("r_user")
    .populate("l_user")
    .exec();
}
function getPartner(user,session) {
  let partner;
  if(user.id === session.l_user.id) {
    partner = session.r_user;
  } else {
    partner = session.l_user;
  }
  return partner;
}

module.exports = {
  addSession,
  getUserSession,
  getPartner
};