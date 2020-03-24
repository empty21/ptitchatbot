"use strict";

const {filterMessage} = require("./helpers").tools;
const {message,button,gender_vi} = require("../../config/message");
const {User, Report, Session} = require("./database");
const {sendBotMessage, sendTextMessage, sendAttachment,markSeen} = require("./helpers").sendMessage;
const {receivedFindRequest,receivedEndRequest,receivedReportRequest} = require("./helpers").processRequests;

async function receivedMessage(data, user) {
  if(data.text) {
    if(data.text.charAt(0) !== "#") {
      switch (data.text.toLowerCase()) {
        case "/find":
          await receivedFindRequest(user);
          break;
        case "/end":
          await receivedEndRequest(user);
          break;
        case "/gender":
          await sendBotMessage("Bạn thích giới tính nào", "Chọn 1 trong 3", user.id, button.SELECT_GENDER);
          break;
        case "/report":
          await receivedReportRequest(user);
          break;
        case "/help":
          await sendTextMessage(message.HELP, user.id, config.PERSONA.SUPPORTER);
          break;
        case "/info":
          await sendBotMessage(user.name, "Giới tính: " + gender_vi[user.gender] + "\nThích: " + gender_vi[user.partner_gender], user.id);
          break;
        default:
          if (user.temp_action) {
            switch (user.temp_action) {
              case "REPORT":
                User.changeUserTempAction(null, user);
                Report.createReport(user, data.text);
                sendBotMessage(message.REPORT_CONFIRM.title, message.REPORT_CONFIRM.subtitle, user.id);
                break;
              default:
                break;
            }
          } else if (user.status === "PAIRED") {
            let session = await Session.getUserSession(user);
            let partner = await Session.getPartner(user, session);
            let text = await filterMessage(data.text);
            await sendTextMessage(text, partner.id, config.PERSONA[user.role])
              .catch(() => sendBotMessage(message.SEND_FAIL.title, message.SEND_FAIL.subtitle, user.id, button.END));
          }
          break;
      }
    }
  }
  if(data.attachments) {
    if(user.status === "PAIRED") {
      let session = await Session.getUserSession(user);
      let partner = await Session.getPartner(user,session);
      data.attachments.forEach((attachment) => {
        let validType = ["image","audio","video","file"];
        if(validType.some(type => type === attachment.type)) {
          let messageData = {
            "type": attachment.type,
            "payload": {
              "url": attachment.payload.url
            }
          };
          sendAttachment(messageData, partner.id, config.PERSONA[user.role])
            .catch(() => sendBotMessage("Không thể gửi tệp đính kèm", message.SEND_FAIL.subtitle, user.id));
        }
      });
    }
  }
}
async function receivedPostback(data, user) {
  switch (data.payload) {
    case "START_BOT":
      await sendBotMessage(message.START.title, message.START.subtitle, user.id, button.START);
      await sendBotMessage(message.TERM.title, message.TERM.subtitle, user.id, button.TERM);
      break;
    case "HELP":
      await sendTextMessage(message.HELP, user.id, config.PERSONA.SUPPORTER);
      break;
    case "REPORT":
      await receivedReportRequest(user);
      break;
    case "CANCEL_ACTION":
      User.changeUserTempAction(null, user);
      sendBotMessage(message.CANCEL_ACTION.title,message.CANCEL_ACTION.subtitle, user.id);
      break;
    case "FIND":
      await receivedFindRequest(user);
      break;
    case "END":
      await receivedEndRequest(user);
      break;
    case "SELECT_GENDER":
      await sendBotMessage("Bạn thích giới tính nào","Chọn 1 trong 3", user.id, button.SELECT_GENDER);
      break;
    case "GENDER_MALE":
      await User.selectPartnerGender(user,"male");
      await sendBotMessage("Bạn đã chọn: Nam","Đối của bạn sẽ là một bạn nam", user.id, button.FIND);
      break;
    case "GENDER_FEMALE":
      await User.selectPartnerGender(user,"female");
      await sendBotMessage("Bạn đã chọn: Nữ","Đối của bạn sẽ là một bạn nữ", user.id, button.FIND);
      break;
    case "GENDER_ALL":
      await User.selectPartnerGender(user,"all");
      await sendBotMessage("Bạn đã chọn: Tất cả","Đối của bạn sẽ là bất kì giới tính nào", user.id, button.FIND);
      break;
    case "INFO":
      await sendBotMessage(user.name,"Giới tính: "+gender_vi[user.gender]+"\nThích: "+gender_vi[user.partner_gender],user.id);
      break;
    default:
      break;
  }
}
async function receivedSeen(data, user) {
  if(user.status === "PAIRED") {
    let session = await Session.getUserSession(user);
    let partner = await Session.getPartner(user,session);
    await markSeen(partner.id);
  }
}

module.exports = {
  receivedMessage,
  receivedPostback,
  receivedSeen
};