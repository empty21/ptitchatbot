"use strict";

const {callSendAPI} = require("../facebook");
const {User} = require("../database");

function sendTextMessage(text, id, persona = null) {
  let messageData = {
    "recipient": {
      "id": id
    },
    "message": {
      "text": text
    }
  };
  if(persona) messageData.persona_id = persona;
  return callSendAPI(messageData);
}

function sendBotMessage(title, subtitle, id, buttons = null) {
  let message = {
    "type": "template",
    "payload": {
      "template_type": "generic",
      "elements": [
        {
          "title": title,
          "subtitle": subtitle
        }
      ]
    }
  };
  if(buttons) {
    message.payload.elements[0].buttons = buttons;
  }
  return sendAttachment(message, id);
}

function sendAttachment(attachment, id, persona = null) {
  let messageData = {
    "recipient": {
      "id": id
    },
    "message": {
      "attachment": attachment
    }
  };
  if(persona) messageData.persona_id = persona;
  return callSendAPI(messageData);
}

function sendMessageToAllUser(title,subtitle) {
  User.getAllUser()
    .then((result) => {
    result.forEach(async (user) => {
      sendBotMessage(title,subtitle, user.id)
        .catch(error => {});
    })
  })
}

function sendMaintainMessage(id) {
  let title = "Server đang bảo trì";
  let body = "Chatbot đang được tạm dừng để nâng cấp\nMời bạn quay lại sau!";
  return sendBotMessage(title, body, id);
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
  sendBotMessage,
  sendAttachment,
  sendMessageToAllUser,
  sendMaintainMessage,
  markSeen
};