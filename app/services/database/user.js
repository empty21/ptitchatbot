"use strict";

const {User} = require("../../../database");
const {checkLog} = require("./log");
const {getPartner} = require("./session");
const {getUserInfoFacebook} = require("../facebook");

async function existUser(id) {
  return await User.exists({id: id});
}
async function newUser(id) {
  let user = new User({
    id: id
  });
  let userInfo = await getUserInfoFacebook(id);
  if(userInfo.name) {
    user.name = userInfo.name;
    user.gender = userInfo.gender;
    if(user.gender === "male") {
      user.partner_gender = "female"
    } else {
      user.partner_gender = "male";
    }
  } else {
    user.name = null;
    user.gender = "male";
    user.partner_gender = "all";
  }
  return await user.save().catch(()=>{});
}
async function updateUserInfo(user) {
  let userInfo = await getUserInfoFacebook(user.id);
  if(userInfo.gender) {
    user.name = userInfo.name;
    user.gender = userInfo.gender;
  }
  user.save()
    .catch(() => {});
}
async function getUser(id) {
  return await User.findOne({"id": id}).exec();
}

function changeUserStatus(newStatus, user) {
  user.status = newStatus;
  user.save();
}
function changeUserTempAction(tempAction, user) {
  user.temp_action = tempAction;
  user.save();
}
function getUserToPair(user) {
  return new Promise((resolve, reject) => {
    User.find({status: "FINDING"}, async (err, partners) => {
      if(err) reject(false);
      let result = [];
      let removals = [];
      let logs = await checkLog(user);
      await logs.map(log => {
        removals.push(getPartner(user,log));
      });
      await partners.map(partner => {
        if((partner.partner_gender === "all" || partner.partner_gender === user.gender) && (user.partner_gender === "all" || user.partner_gender === partner.gender) && removals.every(remove => remove.id !== partner.id)) result.push(partner);
      });
      resolve(result);
    });
  });
}
async function selectPartnerGender(user, gender) {
  user.partner_gender = gender;
  await user.save();
}
async function changeUserGender(user, gender) {
  user.gender = gender;
  await user.save();
}
async function getAllUser() {
  return await User.find({})
    .select("id name gender")
    .exec();
}
module.exports = {
  existUser,
  newUser,
  updateUserInfo,
  getUser,
  changeUserStatus,
  changeUserTempAction,
  getUserToPair,
  selectPartnerGender,
  changeUserGender,
  getAllUser
};
