"use strict";

const msgConfig = require("../../../config/message");
const {User} = require("../database");
const {sendGenericTemplate} = require("./sendMessage");
const pairUser = require("./pairUser");

async function receivedFindRequest(user) {
  if(user.status === "PAIRED") await sendGenericTemplate([{title: "Bạn đã được ghép đôi", subtitle: "Kết thúc ghép đôi trước khi tìm đối mới"}], user.id, {quick_replies: msgConfig.quick_replies.END_ASK});
  else if(user.status === "FINDING") await sendGenericTemplate([{title: "Lỗi", subtitle: "Bạn vẫn đang tìm đối"}], user.id, {quick_replies: msgConfig.quick_replies.CANCEL_FIND});
  else {
    await pairUser.randomPair(user);
  }
}
async function receivedEndRequest(user) {
  if(user.status === "PAIRED")  sendGenericTemplate(msgConfig.generic_template.END_ASK, user.id,{quick_replies: msgConfig.quick_replies.END_CONFIRM});
  else if(user.status === "FINDING") {
    user.status = "FREE";
    await user.save();
    await sendGenericTemplate([{title: "Đã huỷ tìm đối", subtitle: "Chat /find để tìm đối"}], user.id, {quick_replies: msgConfig.quick_replies.FIND});
  } else {
    await sendGenericTemplate([{title: "Bạn đang không chat với ", subtitle: "Chat /find để tìm đối"}], user.id,{quick_replies: msgConfig.quick_replies.FIND});
  }
}
async function receivedReportRequest(user) {
  User.changeUserTempAction("REPORT",user);
  await sendGenericTemplate(msgConfig.generic_template.REPORT_ASK, user.id,{quick_replies: msgConfig.quick_replies.CANCEL_ACTION});
}

module.exports = {
  receivedFindRequest,
  receivedEndRequest,
  receivedReportRequest
};