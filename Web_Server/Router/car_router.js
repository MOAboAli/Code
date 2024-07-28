const express = require("express");
const router = express.Router();
const path = require('path');

const Controller = require("../../Controller/cars_controller.js");


router.route("/")
    .get(Controller.getAll)


router.route("/addone")
    .post(Controller.addOne);


module.exports = router;