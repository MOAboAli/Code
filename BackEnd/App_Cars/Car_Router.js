const express = require("express");
const router = express.Router();


const Controller = require("./Car_Controller");
const UserController = require("../App_Users/User_Controller");

router.route("/")
    .get(Controller.getAllitems)
    .post(UserController.ValidateToken, Controller.createitem);

router.route("/:id")
    .get(Controller.getgetOneitembyid)
    .delete(UserController.ValidateToken, Controller.deletegetOneitembyid)
    .put(UserController.ValidateToken, Controller.fullupdateeitem)
    .patch(UserController.ValidateToken, Controller.partialupdateeitem)


module.exports = router;