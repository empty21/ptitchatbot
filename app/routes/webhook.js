"use strict";

const {Router} = require("express");
const {webhookController} = require("../controllers");
let router = Router();

router.get("/", webhookController.verifyWebhook);
router.post("/", webhookController.receiveMessage);

module.exports = router;