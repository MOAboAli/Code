// const Car = require("../Data_Model/Model/Cars_Schema.js");
const mongoose = require("mongoose");
const Cars = mongoose.model(process.env.Car_MODEL);
const callbackify = require("util").callbackify;
const ObjectId = require("mongodb").ObjectId;
const Response = require('../_Utilities/Responce.js');


// Get Operations

module.exports.getAllitems = function (req, res) {
    new Response().solvePromiseAndResponce(Cars.findById(CarID).select("Editions"), res);
}

module.exports.getgetOneitembyid = function (req, res) {
    new Response().solvePromiseAndResponce(Cars.findById({ _id: new ObjectId(req.params.id) }).select("Editions").findOne({ _id: new ObjectId(req.params.Editionsid) }), res);
}


// Post Operations

const finditembackified = callbackify((dataCollection, CarID) => {
    return dataCollection.findOne(CarID);//
});

exports.createitem = function (req, res) {

    const Newitem = {
        Name: req.body.Name,
        Features: req.body.Features,
        Description: req.body.Description

    };

    finditembackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, item) {
        let Responce = new Response()
        if (err) {
            Responce.Data = err.toString();
            Responce.statuscode = process.env.status_Code_not_found;
            Responce.sendResponce(res);
        }

        item.Editions.push(Newitem);
        Responce.solvePromiseAndResponce(
            item.save()
            , res);


    });
}




//Delete Operations


module.exports.deletegetOneitembyid = function (req, res) {
    console.log(req.params.Editionindex);
    finditembackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, item) {

        let Responce = new Response()
        if (err) {
            Responce.Data = err.toString();
            Responce.statuscode = process.env.status_Code_not_found;
            Responce.sendResponce(res);
        }
        const editionIndex = req.params.Editionindex
        if (editionIndex)
            item.Editions.splice(editionIndex, 1);

        Responce.solvePromiseAndResponce(
            item.save()
            , res);


    });


}


// Update Operations

exports.fullupdateeitem = function (req, res) {

    finditembackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, item) {

        let Responce = new Response()
        if (err) {
            Responce.Data = err.toString();
            Responce.statuscode = process.env.status_Code_not_found;
            Responce.sendResponce(res);
        }

        const index = item.Editions.findIndex(edition => edition._id.toString() == req.params.Editionsid);
        if (index === -1) {
            Responce.Data = 'Edition not found';
            Responce.statuscode = process.env.status_Code_not_found;
            Responce.sendResponce(res);
        }

        item.Editions[index] = {
            ...item.Editions[index].toObject(),
            ...req.body
        };


        Responce.solvePromiseAndResponce(
            item.save()
            , res);

    });

}




