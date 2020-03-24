"use strict";

const {Report} = require("../../../database/models");

function createReport(user, note) {
  let report = new Report({
    "user": user._id,
    "note": note
  });
  report.save();
}

module.exports = {
  createReport
};