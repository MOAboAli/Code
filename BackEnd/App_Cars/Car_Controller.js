const mongoose = require("mongoose");
const Cars = mongoose.model(process.env.Car_MODEL);
const ObjectId = require("mongodb").ObjectId;
const Response = require('../_Utilities/Responce.js');


// Get Operations

module.exports.getAllitems = function (req, res) {
    new Response().solvePromiseAndResponce(Cars.find(), res);
}

module.exports.getgetOneitembyid = function (req, res) {
    new Response().solvePromiseAndResponce(Cars.findOne({ _id: new ObjectId(req.params.id) }), res);
}

// Post Operations

exports.createitem = function (req, res) {
    new Response().solvePromiseAndResponce(Cars.create({ ...req.body }), res);
}


//Delete Operations

module.exports.deletegetOneitembyid = function (req, res) {
    new Response().solvePromiseAndResponce(Cars.findByIdAndDelete({ _id: new ObjectId(req.params.id) }), res);
}

// Update Operations

exports.fullupdateeitem = function (req, res) {
    new Response().solvePromiseAndResponce(
        Cars.findOneAndReplace(
            { _id: new ObjectId(req.params.id) },
            { ...req.body },
            { new: true, useFindAndModify: true, runValidators: true }
        ), res);
}


exports.partialupdateeitem = function (req, res) {
    new Response().solvePromiseAndResponce(
        Cars.findByIdAndUpdate({ _id: new ObjectId(req.params.id) }, { $set: req.body }, { new: true, overwrite: false }), res);
}


