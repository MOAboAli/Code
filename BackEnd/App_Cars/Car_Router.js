const express = require("express");
const router = express.Router();


const Controller = require("./Car_Controller");


router.route("/")
    .get(Controller.getAllitems)
    .post(Controller.createitem);

router.route("/:id")
    .get(Controller.getgetOneitembyid)
    .delete(Controller.deletegetOneitembyid)
    .put(Controller.fullupdateeitem)
    .patch(Controller.partialupdateeitem)


module.exports = router;