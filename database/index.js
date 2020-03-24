"use strict";

const mongoose = require("mongoose");
mongoose.connect(config.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true});
const models = require("./models");

module.exports = models;