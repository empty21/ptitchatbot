"use strict";

const request = require('request');
const PAGE_ACCESS_TOKEN = require("../config/config.json").PAGE_ACCESS_TOKEN;

function removePersistentMenu() {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://graph.facebook.com/me/thread_settings',
      qs: {access_token: PAGE_ACCESS_TOKEN},
      method: 'POST',
      json: {
        setting_type: "call_to_actions",
        thread_state: "existing_thread",
        call_to_actions: []
      }
    }, (err, res, body) => {
      if (body.error) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
}

function addPersistentMenu() {
  request({
    url: 'https://graph.facebook.com/me/messenger_profile',
    qs: {access_token: PAGE_ACCESS_TOKEN},
    method: 'POST',
    json: {
      "get_started": {
        "payload": "START_BOT"
      },
      "persistent_menu": [{
        "locale": "default",
        "composer_input_disabled": false,
        "call_to_actions": [
          {
            "type": "nested",
            "title": "💁 Chat với người lạ",
            "call_to_actions": [
              {
                "type": "postback",
                "title": "🔎 Tìm đối",
                "payload": "FIND"
              },
              {
                "type": "postback",
                "title": "☑️ Chọn giới tính",
                "payload": "SELECT_GENDER"
              },
              {
                "type": "postback",
                "title": "ℹ️ Thông tin của bạn",
                "payload": "INFO"
              }
            ]
          },
          {
            "type": "nested",
            "title": "🎲 Chức năng",
            "call_to_actions": [
              {
                "type": "postback",
                "title": "❓ Trợ giúp",
                "payload": "HELP"
              },
              {
                "type": "postback",
                "title": "⚠️ Tố cáo",
                "payload": "REPORT"
              }
            ]
          }
        ]
      }]
    }
  }, (err, res, body) => {
    if (err||body.error) {
      let error = err||body.error;
      console.log(error);
    } else {
      console.log("SUCCESS");
    }
  });
}
removePersistentMenu()
  .then(addPersistentMenu)
  .catch(error => console.error(error));