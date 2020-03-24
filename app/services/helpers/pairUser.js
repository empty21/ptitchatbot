"use strict";

const {User,Session,Log} = require("../database");
const {button} = require("../../../config/message");
const {sendBotMessage} = require("./sendMessage");

async function randomPair(user) {
  await sendBotMessage("Finding", "Đang tìm đối", user.id);
  let usersToPair = await User.getUserToPair(user);
  if(usersToPair.length === 0) {
    User.changeUserStatus("FINDING", user);
  } else {
    let randomUser = usersToPair[Math.floor(Math.random()*usersToPair.length)];
    await Session.addSession(user, randomUser);
    User.changeUserStatus("PAIRED", user);
    User.changeUserStatus("PAIRED", randomUser);
    sendBotMessage("Matched", "Ghép cặp thành công!", user.id);
    sendBotMessage("Matched", "Ghép cặp thành công!", randomUser.id).catch(()=>{});
  }
}
async function unPair(user) {
  let session = await Session.getUserSession(user);
  let partner = await Session.getPartner(user,session);
  Log.createLog(session);
  User.changeUserStatus("FREE", user);
  User.changeUserStatus("FREE", partner);
  session.remove();
  sendBotMessage("Bạn đã huỷ ghép đôi", "Bạn có thể tìm người mới!", user.id, button.FIND);
  sendBotMessage("Đối phương đã huỷ ghép đôi", "Chia buồn!", partner.id, button.FIND).catch(()=>{});
}
module.exports = {
  randomPair,
  unPair
};