"use strict";

const {User,Session,Log,Report} = require("../../database");
const {sendMessageToAllUser} = require("../services/helpers").sendMessage;
const {updateUserInfo} = require("../services/database").User;

function verifyLogin(req,res) {
  if(req.query.secret_key === config.SECRET_KEY) {
    res.status(200).json({
      "status": "success",
      "access_token": config.PAGE_ACCESS_TOKEN
    });
  } else {
    res.status(403).json({
      "error": "Secret key is invalid"
    });
  }
}
function getUsers(req,res) {
  if(req.query.secret_key === config.SECRET_KEY&&req.query.data) {
    let data = req.query.data;
    let page;
    if(data["page"]) page = parseInt(data["page"]);
    else page = 1;
    let limit = parseInt(data.limit)||10;
    let mongoQuery = {};
    if(data.query) {
      let query = data.query;
      if(query.id) mongoQuery.id = parseInt(query.id);
      if(query.name) mongoQuery.name = new RegExp(query.name, "i");
      if(query.gender) mongoQuery.gender = query.gender;
      if(query.partner_gender) mongoQuery.partner_gender = query.partner_gender;
      if(query.status) mongoQuery.status = query.status;
    }
    User.find(mongoQuery)
      .skip((page-1)*limit)
      .limit(limit)
      .sort({"_id":-1})
      .exec(async (error,result) => {
        if(error) {
          res.status(404).json({
            "status": "Unable to find user",
            "error": error
          });
        } else {
          result.forEach(user=>updateUserInfo(user));
          let count = await User.countDocuments(mongoQuery);
          res.status(200).json({
            count: count,
            data: result
          });
        }
      });
  } else {
    res.status(403).json({
      "error": "Secret key is invalid"
    });
  }
}

async function getSessions(req,res) {
  if(req.query.secret_key === config.SECRET_KEY&&req.query.data) {
    let data = req.query.data;
    let page;
    if(data["page"]) page = parseInt(data["page"]);
    else page = 1;
    let limit = parseInt(data.limit)||10;
    let mongoQuery = {};
    if(data.query) {
      if(parseInt(data.query.id)) {
        await User.findOne({id: parseInt(data.query.id)})
          .then(user => {
            mongoQuery.$or = [
              {l_user: user._id},
              {r_user: user._id}
            ]
          }).catch(()=>{});
      }
    }
    Session.find(mongoQuery)
      .populate("r_user", "id name gender partner_gender")
      .populate("l_user", "id name gender partner_gender")
      .skip((page-1)*limit)
      .limit(limit)
      .sort({"_id":-1})
      .exec(async (error,result) => {
        if(error) {
          res.status(404).json({
            "status": "Unable to find Session",
            "error": error
          });
        } else {
          let count = await Session.countDocuments(mongoQuery);
          res.status(200).json({
            count: count,
            data: result
          });
        }
      });
  } else {
    res.status(403).json({
      "error": "Secret key is invalid"
    });
  }
}
async function getLogs(req,res) {
  if(req.query.secret_key === config.SECRET_KEY&&req.query.data) {
    let data = req.query.data;
    let page;
    if(data["page"]) page = parseInt(data["page"]);
    else page = 1;
    let limit = parseInt(data.limit)||10;
    let mongoQuery = {};
    if(data.query) {
      if(parseInt(data.query.id)) {
        await User.findOne({id: parseInt(data.query.id)})
          .then(user => {
            mongoQuery.$or = [
              {l_user: user._id},
              {r_user: user._id}
            ]
          }).catch(()=>{});
      }
    }
    Log.find(mongoQuery)
      .populate("r_user", "id name")
      .populate("l_user", "id name")
      .skip((page-1)*limit)
      .limit(limit)
      .sort({"_id":-1})
      .exec(async (error,result) => {
        if(error) {
          res.status(404).json({
            "status": "Unable to find Log",
            "error": error
          });
        } else {
          let count = await Log.countDocuments(mongoQuery);
          res.status(200).json({
            count: count,
            data: result
          });
        }
      });
  } else {
    res.status(403).json({
      "error": "Secret key is invalid"
    });
  }
}
async function getReports(req,res) {
  if(req.query.secret_key === config.SECRET_KEY&&req.query.data) {
    let data = req.query.data;
    let page;
    if(data["page"]) page = parseInt(data["page"]);
    else page = 1;
    let limit = parseInt(data.limit)||10;
    let mongoQuery = {};
    if(data.query) {
      let query = data.query;
      if(query.id) {
        await User.findOne({id: parseInt(query.id)})
          .then(user => mongoQuery.user = user._id)
          .catch(()=>{});
      }
      if(query.note) mongoQuery.note = new RegExp(query.note, "i");
      if(query.status) mongoQuery.status = query.status;
    }
    Report.find(mongoQuery)
      .populate("user", "id name gender")
      .skip((page-1)*limit)
      .limit(limit)
      .sort({"_id":-1})
      .exec(async (error,result) => {
        if(error) {
          res.status(404).json({
            "status": "Unable to find Report",
            "error": error
          });
        } else {
          let count = await Report.countDocuments(mongoQuery);
          res.status(200).json({
            count: count,
            data: result
          });
        }
      });
  } else {
    res.status(403).json({
      "error": "Secret key is invalid"
    });
  }
}
function updateReport(req,res) {
  if(req.query.secret_key === config.SECRET_KEY) {
    let report_id = req.body.report_id;
    let action = req.body.action;
    if(report_id&&action) {
      Report.findById(report_id, (error, report) => {
        if (error)
          res.status(400).json({
            "status": "Cannot change",
            "error": error
          });
        else {
          report.status = action;
          report.update_at = new Date();
          report.save().then(() => {
            res.status(200).json({
              "status": "Changed"
            });
          });
        }
      });
    } else {
      res.status(400).json({
        "error": "Missing params"
      });
    }
  } else {
    res.status(403).json({
      "error": "Secret key is invalid"
    });
  }
}
function sendMessageToAll(req,res) {
  if(req.query.secret_key === config.SECRET_KEY) {
    let title = req.body.title;
    let subtitle = req.body.subtitle;
    if(title&&subtitle) {
      sendMessageToAllUser(title,subtitle);
      res.status(200).json({
        "status": "Sent"
      });
    } else {
      res.status(400).json({
        "error": "Missing params"
      });
    }
  } else {
    res.status(403).json({
      "error": "Secret key is invalid"
    });
  }
}

module.exports = {
  verifyLogin,
  getUsers,
  getSessions,
  getLogs,
  getReports,
  updateReport,
  sendMessageToAll
};