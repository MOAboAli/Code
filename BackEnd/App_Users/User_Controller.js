const Cars = require("../Data_Model/Model/Cars_Schema.js");
const callbackify = require("util").callbackify;
const ObjectId = require("mongodb").ObjectId;
const Response = require('../_Utilities/Responce.js');


exports.registration = function (req, res) {
    new Response().solvePromiseAndResponce(Cars.create({ ...req.body }), res);
}



exports.authenticate = function (req, res) {
    new Response().solvePromiseAndResponce(Cars.create({ ...req.body }), res);
}




