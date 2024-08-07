const mongoose = require("mongoose");
const Cars = mongoose.model(process.env.Car_MODEL);
const callbackify = require("util").callbackify;
const ObjectId = require("mongodb").ObjectId;
const Response = require('../_Utilities/Responce.js');










// Get Operations

module.exports.getAllitems = function (req, res) {
    let ResObj = new Response();
    Cars.find()
        .then((Data) => {
            ResObj.Data = Data;
        }).catch((error) => {
            ResObj.Data = error.toString();
            ResObj.statuscode = 500;
        }).finally(() => {
            ResObj.sendResponce(res);
        });
}

module.exports.getgetOneitembyid = function (req, res) {
    let ResObj = new Response();
    Cars.findOne({ _id: new ObjectId(req.params.id) })
        .then((Data) => {
            if (!Data) {
                ResObj.Data = "Item Not Found, Please Check main id";
                ResObj.statuscode = 400;
            }
            else { ResObj.Data = Data; }
        }).catch((error) => {
            ResObj.Data = error.toString();
            ResObj.statuscode = 500;
        }).finally(() => {
            ResObj.sendResponce(res);
        });
}


// Post Operations

exports.createitem = function (req, res) {
    let ResObj = new Response();
    const Newitem = { ...req.body };
    Cars.create(Newitem)
        .then((Data) => {
            ResObj.Data = Data;
        }).catch((error) => {
            ResObj.Data = error.toString();
            ResObj.statuscode = 500;
        }).finally(() => {
            ResObj.sendResponce(res);
        });
}


//Delete Operations

module.exports.deletegetOneitembyid = function (req, res) {
    let ResObj = new Response();
    Cars.findByIdAndDelete({ _id: new ObjectId(req.params.id) })
        .then((Data) => {
            if (!Data) {
                ResObj.Data = "Item Not Found, Please Check main id";
                ResObj.statuscode = 400;
            }
            else { ResObj.Data = Data; }
        }).catch((error) => {
            ResObj.Data = error.toString();
            ResObj.statuscode = 500;
        }).finally(() => {
            ResObj.sendResponce(res);
        });
}


// Update Operations



exports.fullupdateeitem = function (req, res) {
    let ResObj = new Response();
    Cars.findOneAndReplace(
        { _id: new ObjectId(req.params.id) },
        { ...req.body },
        { new: true, useFindAndModify: true, runValidators: true }
    )
        .then((Data) => {
            if (!Data) {
                ResObj.Data = "Item Not Found, Please Check main id";
                ResObj.statuscode = 400;
            }
            else { ResObj.Data = Data; }
        }).catch((error) => {
            ResObj.Data = error.toString();
            ResObj.statuscode = 500;
        }).finally(() => {
            ResObj.sendResponce(res);
        });


}


exports.partialupdateeitem = function (req, res) {
    itemModel.findByIdAndUpdate({ _id: new ObjectId(req.params.id) }, { $set: req.body }, { new: true, overwrite: false })
        .then((Data) => {
            if (!Data) {
                ResObj.Data = "Item Not Found, Please Check main id";
                ResObj.statuscode = 400;
            }
            else { ResObj.Data = Data; }
        }).catch((error) => {
            ResObj.Data = error.toString();
            ResObj.statuscode = 500;
        }).finally(() => {
            ResObj.sendResponce(res);
        });

}


