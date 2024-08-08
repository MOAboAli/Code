const express = require("express");
const router = express.Router();

const EditionsController = require("./Editions_Controller.js");

router.route("/:id/Editions")
    .get(EditionsController.getAllitems)
    .post(EditionsController.createitem);

router.route("/:id/Editions/:Editionsid")
    .get(EditionsController.getgetOneitembyid)
    .delete(EditionsController.deletegetOneitembyid)
    .put(EditionsController.fullupdateeitem)
    .patch(EditionsController.fullupdateeitem)



module.exports = router;