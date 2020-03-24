"use strict";

const {webhook,database} = require("../services");
const {User} = database;

let verifyWebhook = (req,res) => {
  let VERIFY_TOKEN = config.WEBHOOK_VERIFY_TOKEN;
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};
let receiveMessage = (req,res) => {
  let body = req.body;
  if(body.object === "page") {
    body.entry.forEach(async entry => {
      let webhookEvent = entry.messaging[0];
      let id = webhookEvent.sender.id;
      if(await User.existUser(id) === false) await User.newUser(id);
      let user = await User.getUser(id);
      if(webhookEvent.message) {
        await webhook.receivedMessage(webhookEvent.message, user);
      }
      if(webhookEvent.postback) {
        await webhook.receivedPostback(webhookEvent.postback, user);
      }
      if(webhookEvent.read) {
        await webhook.receivedSeen(webhookEvent.read, user);
      }
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  verifyWebhook,
  receiveMessage
};