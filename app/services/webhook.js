"use strict";

const {filterMessage} = require("./helpers").tools;
const msgConfig = require("../../config/message");
const {User, Report, Session} = require("./database");
const {sendGenericTemplate, sendTextMessage, sendAttachment,markSeen} = require("./helpers").sendMessage;
const {receivedFindRequest,receivedEndRequest,receivedReportRequest} = require("./helpers").processRequests;
const {unPair} = require("./helpers").pairUser;

async function receivedTextMessage(data, user) {
  if(data.charAt(0) !== "#") {
    let message = {}, options = {};
    switch (data.toLowerCase()) {
      case "/find":
        await receivedFindRequest(user);
        break;
      case "/end":
        if(user.status === "PAIRED") await unPair(user);
        else await receivedEndRequest(user);
        break;
      case "/report":
        await receivedReportRequest(user);
        break;
      case "/gender":
        options.quick_replies = msgConfig.quick_replies.SELECT_GENDER;
        await sendGenericTemplate(msgConfig.generic_template.GENDER_ASK,user.id, options);
        break;
      case "/help":
        options.persona = config.PERSONA.SUPPORTER;
        if(user.status === "FREE") options.quick_replies = msgConfig.quick_replies.FIND;
        await sendTextMessage(msgConfig.text.HELP, user.id, options);
        break;
      case "/info":
        message = {
          "title": "Người dùng: "+user.name,
          "subtitle": "Giới tính: " + msgConfig.gender_vi[user.gender] + "\nThích: " + msgConfig.gender_vi[user.partner_gender]
        };
        await sendGenericTemplate([message], user.id);
        break;
      default:
        if (user.temp_action) {
          switch (user.temp_action) {
            case "REPORT":
              User.changeUserTempAction(null, user);
              Report.createReport(user, data);
              await sendGenericTemplate(msgConfig.generic_template.REPORT_CONFIRM, user.id, {persona: config.PERSONA.SUPPORTER});
              break;
            default:
              break;
          }
        } else if (user.status === "PAIRED") {
          let session = await Session.getUserSession(user);
          let partner = await Session.getPartner(user, session);
          let text = await filterMessage(data);
          options.persona = config.PERSONA[user.role];
          sendTextMessage(text, partner.id, options)
            .catch(() => {
              sendGenericTemplate(msgConfig.generic_template.SEND_FAIL, user.id,{quick_replies: msgConfig.quick_replies.END_ASK});
            });
        }
        break;
    }
  }
}
async function receivedAttachments(data, user) {
  if(user.status === "PAIRED") {
    let session = await Session.getUserSession(user);
    let partner = await Session.getPartner(user,session);
    data.forEach((attachment) => {
      let validType = ["image","audio","video","file"];
      if(validType.some(type => type === attachment.type)) {
        let messageData = {
          "type": attachment.type,
          "payload": {
            "url": attachment.payload.url
          }
        };
        let options = {
          persona: config.PERSONA[user.role]
        };
        sendAttachment(messageData, partner.id, options)
          .catch(() => sendGenericTemplate(msgConfig.generic_template.SEND_FAIL, user.id));
      }
    });
  }
}
async function receivedPostback(data, user) {
  let message, options = {};
  switch (data.payload) {
    case "START_BOT":
      await sendGenericTemplate(msgConfig.generic_template.START, user.id,{quick_replies: msgConfig.quick_replies.START});
      break;
    case "HELP":
      options.persona = config.PERSONA.SUPPORTER;
      if(user.status === "FREE") options.quick_replies = msgConfig.quick_replies.FIND;
      await sendTextMessage(msgConfig.text.HELP, user.id, options);
      break;
    case "REPORT":
      await receivedReportRequest(user);
      break;
    case "FIND":
      await receivedFindRequest(user);
      break;
    case "END_REQUEST":
      await receivedEndRequest(user);
      break;
    case "END_CONFIRM":
      if(user.status === "PAIRED") await unPair(user);
      break;
    case "SELECT_GENDER":
      options.quick_replies = msgConfig.quick_replies.SELECT_GENDER;
      await sendGenericTemplate(msgConfig.generic_template.GENDER_ASK,user.id, options);
      break;
    case "SELECT_GENDER_MALE":
      if(user.status === "FREE") options.quick_replies = msgConfig.quick_replies.FIND;
      await User.selectPartnerGender(user,"male");
      await sendGenericTemplate([{title: "Bạn đã chọn: Nam", subtitle: "Đối của bạn sẽ là một bạn nam"}], user.id, options);
      break;
    case "SELECT_GENDER_FEMALE":
      if(user.status === "FREE") options.quick_replies = msgConfig.quick_replies.FIND;
      await User.selectPartnerGender(user,"female");
      await sendGenericTemplate([{title: "Bạn đã chọn: Nữ", subtitle: "Đối của bạn sẽ là một bạn nữ"}], user.id, options);
      break;
    case "SELECT_GENDER_ALL":
      if(user.status === "FREE") options.quick_replies = msgConfig.quick_replies.FIND;
      await User.selectPartnerGender(user,"all");
      await sendGenericTemplate([{title: "Bạn đã chọn: Tất cả", subtitle: "Đối của bạn có thể là nữ hoặc nam"}], user.id, options);
      break;
    case "CANCEL_ACTION":
      User.changeUserTempAction(null, user);
      await sendGenericTemplate(msgConfig.generic_template.CANCEL_ACTION, user.id);
      break;
    case "INFO":
      message = [{
        "title": "Người dùng: "+user.name,
        "subtitle": "Giới tính: " + msgConfig.gender_vi[user.gender] + "\nThích: " + msgConfig.gender_vi[user.partner_gender]
      }];
      await sendGenericTemplate(message, user.id);
      break;
    default:
      break;
  }
}
async function receivedSeen(data, user) {
  if(user.status === "PAIRED") {
    let session = await Session.getUserSession(user);
    if(session) {
      let partner = await Session.getPartner(user,session);
      await markSeen(partner.id);
    }
  }
}

module.exports = {
  receivedTextMessage,
  receivedAttachments,
  receivedPostback,
  receivedSeen
};