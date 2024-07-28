const express = require("express");
const router = express.Router();
const path = require('path');

const Controller = require("../../Controller/Editions_controller");


router.use((req, res, next) => {
    req.params.id = req.carId; // Make sure req.params.id is set
    next();
});

router.route("/")
    .get(Controller.getAllitems)
    .post(Controller.createitem);

router.route("/:Editionsid")
    .get(Controller.getgetOneitembyid)
    .delete(Controller.deletegetOneitembyid)
    .put(Controller.fullupdateeitem)
//.patch(Controller.partialupdateeitem)




module.exports = router;