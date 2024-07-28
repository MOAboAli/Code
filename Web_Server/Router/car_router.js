const express = require("express");
const router = express.Router();
const path = require('path');

const Controller = require("../../Controller/cars_controller.js");
const EditionsController = require("../../Controller/Editions_controller");

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