"use strict";

const {Router} = require("express");
const {adminController} = require("../controllers");
let router = Router();

router.get("/", adminController.verifyLogin);
router.get("/user", adminController.getUsers);
router.get("/session", adminController.getSessions);
router.get("/log", adminController.getLogs);
router.get("/report", adminController.getReports);
router.post("/report", adminController.updateReport);
router.post("/send", adminController.sendMessageToAll);


module.exports = router;