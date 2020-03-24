"use strict";

const request = require("request");
const TOKEN = config.PAGE_ACCESS_TOKEN;

function getUserInfoFacebook(id) {
  return new Promise((resolve, reject) => {
    let url = "https://graph.facebook.com/"+id+"?fields=id,name,gender&access_token="+TOKEN;
    request(url, (err,res,body) => {
      if(body.error) reject(false);
      resolve(JSON.parse(body));
    });
  });
}
function callSendAPI(messageData) {
  return new Promise (((resolve, reject) => {
    request({
      uri: 'https://graph.facebook.com/me/messages',
      qs: {access_token: TOKEN},
      method: 'POST',
      json: messageData
    }, function (err, res, body) {
      if (err) {
        reject(false);
      }
      resolve(true);
    });
  }));
}


module.exports = {
  getUserInfoFacebook,
  callSendAPI
};