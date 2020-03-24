"use strict";

const mongoose = require("mongoose");
/*
 *  Export Session Logs Model
 */
let logSchema = new mongoose.Schema({
  l_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  r_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  paired_at: Date,
  unpaired_at: Date,
  duration: String
});
module.exports = mongoose.model("log",logSchema);