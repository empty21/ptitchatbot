"use strict";

const {callSendAPI} = require("../facebook");
const {User} = require("../database");

function sendTextMessage(text, id, options = {}) {
  let messageData = {
    "recipient": {
      "id": id
    },
    "message": {
      "text": text
    }
  };
  if(options.persona) messageData.persona_id = options.persona;
  if(options.quick_replies) messageData.message.quick_replies = options.quick_replies;
  return callSendAPI(messageData);
}

function sendGenericTemplate(elements, id, options = {}) {
  let messageData = {
    "recipient": {
      "id": id
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": elements
        }
      }
    }
  };
  if(options.persona) messageData.persona_id = options.persona;
  if(options.quick_replies) messageData.message.quick_replies = options.quick_replies;
  return callSendAPI(messageData);
}

function sendAttachment(attachment, id, options = {}) {
  let messageData = {
    "recipient": {
      "id": id
    },
    "message": {
      "attachment": attachment
    }
  };
  if(options.persona) messageData.persona_id = options.persona;
  return callSendAPI(messageData);
}

function sendMessageToAllUser(title,subtitle) {
  User.getAllUser()
    .then((result) => {
    result.forEach((user) => {
      sendGenericTemplate([{title,subtitle}], user.id)
        .catch(() => {});
    })
  })
}

function sendMaintainMessage(id) {
  let messageData = [{
    title: "Server đang bảo trì",
    body: "Chatbot đang được tạm dừng để nâng cấp\nMời bạn quay lại sau!"
  }];
  return sendGenericTemplate(messageData, id);
}

function markSeen(id) {
  let messageData = {
    "recipient": {
      "id": id
    },
    "sender_action": "mark_seen"
  };
  return callSendAPI(messageData);
}


module.exports = {
  sendTextMessage,
  sendGenericTemplate,
  sendAttachment,
  sendMessageToAllUser,
  sendMaintainMessage,
  markSeen
};