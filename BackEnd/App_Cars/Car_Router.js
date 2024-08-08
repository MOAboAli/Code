const express = require("express");
const router = express.Router();
const path = require('path');

const Controller = require("./Car_Controller");
const EditionsController = require("../App_Editions/Editions_Controller.js");

router.route("/")
    .get(Controller.getAllitems)
    .post(Controller.createitem);

router.route("/:id")
    .get(Controller.getgetOneitembyid)
    .delete(Controller.deletegetOneitembyid)
    .put(Controller.fullupdateeitem)
    .patch(Controller.partialupdateeitem)

router.route("/:id/Editions")
    .get(EditionsController.getAllitems)
    .post(EditionsController.createitem);

router.route("/:id/Editions/:Editionsid")
    .get(EditionsController.getgetOneitembyid)
    .delete(EditionsController.deletegetOneitembyid)
    .put(EditionsController.fullupdateeitem)
    .patch(EditionsController.fullupdateeitem)



module.exports = router;