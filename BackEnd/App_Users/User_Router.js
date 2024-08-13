const express = require("express");
const router = express.Router();

const Controller = require("./User_Controller.js");

router.route("/registration")
    .post(Controller.registration);

router.route("/authenticate")
    .post(Controller.authenticate);



module.exports = router;