"use strict";

const mongoose = require("mongoose");
/*
 *  Export Session Model
 */
let sessionSchema = new mongoose.Schema({
  l_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  r_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  paired_at: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("session",sessionSchema);