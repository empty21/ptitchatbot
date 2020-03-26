"use strict";

const {User,Session,Log} = require("../database");
const msgConfig = require("../../../config/message");
const {sendGenericTemplate} = require("./sendMessage");

async function randomPair(user) {
  await sendGenericTemplate([{title: "Finding...", subtitle: "Đang tìm đối"}], user.id);
  let usersToPair = await User.getUserToPair(user);
  if(usersToPair.length === 0) {
    User.changeUserStatus("FINDING", user);
  } else {
    let randomUser = usersToPair[Math.floor(Math.random()*usersToPair.length)];
    await Session.addSession(user, randomUser);
    User.changeUserStatus("PAIRED", user);
    User.changeUserStatus("PAIRED", randomUser);
    sendGenericTemplate([{title: "Matched", subtitle: "Ghép cặp thành công!\nHãy say hi với đối của bạn"}], user.id);
    sendGenericTemplate([{title: "Matched", subtitle: "Ghép cặp thành công!\nHãy say hi với đối của bạn"}], randomUser.id).catch(()=>{});
  }
}
async function unPair(user) {
  let session = await Session.getUserSession(user);
  let partner = await Session.getPartner(user,session);
  Log.createLog(session);
  User.changeUserStatus("FREE", user);
  User.changeUserStatus("FREE", partner);
  session.remove();
  sendGenericTemplate([{title: "Bạn đã huỷ ghép đôi", subtitle: "Bạn có thể tìm người mới!"}], user.id, {quick_replies: msgConfig.quick_replies.FIND});
  sendGenericTemplate([{title: "Đối phương đã huỷ ghép đôi", subtitle: "Chia buồn!"}], partner.id, {quick_replies: msgConfig.quick_replies.FIND}).catch(()=>{});
}
module.exports = {
  randomPair,
  unPair
};