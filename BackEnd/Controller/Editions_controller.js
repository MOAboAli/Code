const Cars = require("../Data_Model/Model/CarsSchema.js");
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
    return dataCollection.findById(CarID).exec();//
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
            //res.status(process.env.status_Code_server_error).json({ error: err });
            Responce.Data = err.toString();
            Responce.statuscode = 401;
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

    finditembackified(Cars, { _id: new ObjectId(req.params.id) }, function (err, item) {

        let Responce = new Response()
        if (err) {
            Responce.Data = err.toString();
            Responce.statuscode = 401;
            Responce.sendResponce(res);
        }
        const editionIndex = item.Editions.findIndex(edition => edition._id.toString() === new ObjectId(req.params.Editionsid));
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
            Responce.statuscode = 401;
            Responce.sendResponce(res);
        }

        const index = item.Editions.findIndex(edition => edition._id.toString() == req.params.Editionsid);
        if (index === -1) {
            Responce.Data = 'Edition not found';
            Responce.statuscode = 401;
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




