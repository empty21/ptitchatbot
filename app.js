"use strict";

global["config"] = require("./config/config.json");
global["app_root"] = __dirname;
require("./app/main");