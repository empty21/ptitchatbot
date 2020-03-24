"use strict";

const mongoose = require("mongoose");
/*
 *  Export User Model
 */
let userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: String,
  gender: String,
  partner_gender: String,
  status: {
    type: String,
    default: "FREE"
  },
  temp_action: {
    type: String,
    default: null
  },
  credit: {
    type: Number,
    default: 5000
  },
  role: {
    type: String,
    default: "MEMBER"
  },
  student_id: {
    type: String,
    default: null
  }
});
module.exports = mongoose.model("user",userSchema);