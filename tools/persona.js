"use strict";

const request = require('request');
const PAGE_ACCESS_TOKEN = require("../config/config.json").PAGE_ACCESS_TOKEN;

function createPerona(name,url) {
  let data = {
    "name": name,
    "profile_picture_url": url
  };
  request({
    url: 'https://graph.facebook.com/me/personas',
    qs: {access_token: PAGE_ACCESS_TOKEN},
    method: 'POST',
    json: data
  }, (err, res, body) => {
    if(body.error) {
      console.log(body.error);
    } else {
      console.log('Persona ID: '+ body.id);
    }
  });
}
function getPersonas() {
  request({
    url: 'https://graph.facebook.com/me/personas',
    qs: {access_token: PAGE_ACCESS_TOKEN},
    method: 'GET'
  }, (err, res, body) => {
    if(err||body.error) {
      console.log(err);
      console.log(body.error);
    } else {
      console.log('Success!!');
      let result = JSON.parse(body).data;
      console.log(result);
    }
  });
}
