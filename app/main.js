"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const app = express();
/*
 *  Create server
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/webhook", routes.webhook);
app.use("/admin", routes.admin);
app.use(express.static("public"));
/*
 *  Start server
 */

app.listen(config.SERVER_PORT, () => {
  console.log("App is listening at "+config.SERVER_DOMAIN+":"+config.SERVER_PORT);
});