"use strict";

const {message,button} = require("../../../config/message");
const {User,Session} = require("../database");
const {sendBotMessage,sendAttachment} = require("./sendMessage");
const pairUser = require("./pairUser");

async function receivedFindRequest(user) {
  if(user.status === "PAIRED") await sendBotMessage("Bạn đã được ghép đôi", "Kết thúc ghép đôi trước khi tìm đối mới", user.id, button.END);
  else if(user.status === "FINDING") await sendBotMessage("Lỗi", "Bạn vẫn đang tìm đối", user.id, button.CANCEL_FIND);
  else {
    await pairUser.randomPair(user);
  }
}
async function receivedEndRequest(user) {
  if(user.status === "PAIRED") await pairUser.unPair(user);
  else if(user.status === "FINDING") {
    user.status = "FREE";
    await user.save();
    await sendBotMessage("Đã huỷ tìm đối", "Chat /find để tìm đối", user.id, button.FIND);
  } else {
    await sendBotMessage("Bạn đang không chat với ","Chat /find để tìm đối", user.id, button.FIND);
  }
}
async function receivedReportRequest(user) {
  User.changeUserTempAction("REPORT",user);
  await sendBotMessage(message.REPORT_ASK.title, message.REPORT_ASK.subtitle, user.id, button.CANCEL_ACTION);
}

module.exports = {
  receivedFindRequest,
  receivedEndRequest,
  receivedReportRequest
};