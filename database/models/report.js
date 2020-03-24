"use strict";

const mongoose = require("mongoose");
/*
 *  Export Report Model
 */
let reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  note: String,
  submit_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    default: "PENDING"
  }
});
module.exports = mongoose.model("report",reportSchema);